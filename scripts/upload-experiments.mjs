import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const FILECOIN_RPC = process.env.FILECOIN_CLOUD_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS;

if (!FILECOIN_RPC || !PRIVATE_KEY || !REGISTRY_ADDRESS) {
  console.error('❌ Missing environment variables!');
  console.error('   Required: FILECOIN_CLOUD_RPC, PRIVATE_KEY, REGISTRY_ADDRESS');
  process.exit(1);
}

// Registry ABI - just the functions we need
const REGISTRY_ABI = [
  "function registerExperiment(string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV) returns (uint256)",
  "function totalExperiments() view returns (uint256)",
  "event ExperimentRegistered(uint256 indexed id, address indexed submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)"
];

/**
 * Compute deterministic hash of data.
 * Uses stable JSON stringification (sorted keys).
 */
function stableStringify(obj) {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  
  if (Array.isArray(obj)) {
    return '[' + obj.map(v => stableStringify(v)).join(',') + ']';
  }
  
  const keys = Object.keys(obj).sort();
  const entries = keys.map(k => `"${k}":${stableStringify(obj[k])}`);
  return `{${entries.join(',')}}`;
}

function hashJson(obj) {
  const jsonStr = stableStringify(obj);
  return ethers.keccak256(ethers.toUtf8Bytes(jsonStr));
}

/**
 * Calculate difficulty score based on experiment metrics.
 * D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
 */
function calculateDifficulty(experiment) {
  const alpha = 1.0;   // Peak count weight
  const beta = 8.0;    // Noise weight (dominant)
  const gamma = 0.5;   // Resolution weight
  
  const nPeaks = experiment.metrics.peakCount;
  const baselineNoise = experiment.metrics.baselineNoise;
  const nPoints = experiment.points.length;
  
  const difficulty = 1 + 
    alpha * nPeaks + 
    beta * baselineNoise + 
    gamma * Math.log(nPoints);
  
  return Math.floor(difficulty); // Integer for contract
}

/**
 * Calculate initial Reputation Value (RV).
 * RV = ln(1 + D·v)
 * Scaled by 1e6 for on-chain storage.
 */
function calculateRV(difficulty) {
  const v = 1; // validation status (1 = valid, initially)
  const rv = Math.log(1 + difficulty * v);
  return Math.floor(rv * 1e6); // Scale to integer
}

/**
 * Upload single experiment to Filecoin and register on-chain.
 */
async function uploadExperiment(filePath, provider, wallet, registry, synapse) {
  console.log(`\n📄 Processing ${path.basename(filePath)}...`);
  
  try {
    // 1. Read experiment
    const experiment = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`   Sample: ${experiment.sampleId}`);
    console.log(`   Peaks: ${experiment.metrics.peakCount}, Scenario: ${experiment.scenario}`);
    
    // 2. Upload to Synapse (Filecoin)
    console.log(`   ⬆️  Uploading to Filecoin...`);
    // Convert JSON to Uint8Array for Synapse
    const experimentJson = JSON.stringify(experiment);
    const experimentBytes = new TextEncoder().encode(experimentJson);
    const cid = await synapse.storage.upload(experimentBytes);
    console.log(`   ✅ Filecoin CID: ${cid}`);
    
    // 3. Compute hashes
    const dataHash = hashJson({
      metadata: {
        sampleId: experiment.sampleId,
        experimentType: experiment.experimentType,
        method: experiment.method,
        compounds: experiment.compounds,
        solvent: experiment.solvent,
        instrument: experiment.instrument,
        labLocation: experiment.labLocation
      },
      points: experiment.points
    });
    
    const metricsHash = hashJson(experiment.metrics);
    
    console.log(`   🔐 dataHash: ${dataHash.slice(0, 10)}...`);
    console.log(`   🔐 metricsHash: ${metricsHash.slice(0, 10)}...`);
    
    // 4. Calculate difficulty and RV
    const difficulty = calculateDifficulty(experiment);
    const rvInitial = calculateRV(difficulty);
    
    console.log(`   📊 Difficulty: ${difficulty}`);
    console.log(`   ⭐ Initial RV: ${rvInitial / 1e6} (scaled: ${rvInitial})`);
    
    // 5. Register on-chain
    console.log(`   📝 Registering on-chain...`);
    const tx = await registry.registerExperiment(
      cid,
      dataHash,
      metricsHash,
      difficulty,
      rvInitial
    );
    
    console.log(`   ⏳ Tx: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`   ✅ Confirmed! Block: ${receipt.blockNumber}`);
    
    // Extract experiment ID from event
    const event = receipt.logs
      .map(log => {
        try {
          return registry.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find(e => e && e.name === 'ExperimentRegistered');
    
    const experimentId = event ? event.args.id.toString() : 'unknown';
    
    return {
      success: true,
      sampleId: experiment.sampleId,
      experimentId,
      cid,
      txHash: tx.hash,
      difficulty,
      blockNumber: receipt.blockNumber
    };
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      success: false,
      sampleId: path.basename(filePath),
      error: error.message
    };
  }
}

/**
 * Main upload function.
 */
async function main() {
  console.log('🚀 Starting Filecoin Upload & On-Chain Registration\n');
  
  // Connect to Filecoin
  const provider = new ethers.JsonRpcProvider(FILECOIN_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
  
  console.log(`Wallet: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} tFIL`);
  console.log(`Registry: ${REGISTRY_ADDRESS}`);
  
  // Check current total experiments
  const totalBefore = await registry.totalExperiments();
  console.log(`Total experiments (before): ${totalBefore}\n`);
  
  // Initialize Synapse
  console.log('🔄 Initializing Synapse SDK...');
  const synapse = await Synapse.create({ signer: wallet });
  console.log('✅ Synapse ready!\n');
  
  // Find all trace files
  const tracesDir = path.join(__dirname, '..', 'data', 'traces');
  const files = fs.readdirSync(tracesDir)
    .filter(f => f.startsWith('trace-') && f.endsWith('.json'))
    .sort();
  
  console.log(`📦 Found ${files.length} trace files\n`);
  console.log('=' .repeat(60));
  
  // Upload each trace
  const results = [];
  for (const file of files) {
    const filePath = path.join(tracesDir, file);
    const result = await uploadExperiment(filePath, provider, wallet, registry, synapse);
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 UPLOAD SUMMARY\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}\n`);
  
  if (successful.length > 0) {
    console.log('Successful uploads:');
    successful.forEach(r => {
      console.log(`  • ${r.sampleId}: Experiment #${r.experimentId} | CID: ${r.cid.slice(0, 12)}...`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\nFailed uploads:');
    failed.forEach(r => {
      console.log(`  • ${r.sampleId}: ${r.error}`);
    });
  }
  
  // Check final total
  const totalAfter = await registry.totalExperiments();
  console.log(`\nTotal experiments (after): ${totalAfter}`);
  console.log(`Added: ${Number(totalAfter) - Number(totalBefore)}`);
  
  // Save results
  const resultsPath = path.join(__dirname, '..', 'data', 'upload-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${resultsPath}`);
  
  console.log('\n🎉 Upload complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Deploy The Graph subgraph to index experiment metadata');
  console.log('2. Update dashboard to query subgraph and display traces');
  console.log(`3. View experiments on explorer: https://calibration.filscan.io/address/${REGISTRY_ADDRESS}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  });
