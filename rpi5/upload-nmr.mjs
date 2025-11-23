import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { CID } from 'multiformats/cid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const FILECOIN_RPC = process.env.FILECOIN_CLOUD_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS;

if (!FILECOIN_RPC || !PRIVATE_KEY || !REGISTRY_ADDRESS) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const REGISTRY_ABI = [
  "function registerExperiment(string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV) returns (uint256)",
  "function totalExperiments() view returns (uint256)",
  "event ExperimentRegistered(uint256 indexed id, address indexed submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)"
];

// Stable JSON stringification for deterministic hashing
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

function calculateRV(difficulty) {
  const v = 1; // validation status
  const rv = Math.log(1 + difficulty * v);
  return Math.floor(rv * 1e6);
}

async function uploadExperiment(experimentJson) {
  console.log('🚀 Uploading NMR Experiment to Filecoin\n');
  console.log('=' .repeat(60));
  
  const experiment = JSON.parse(experimentJson);
  
  console.log(`\n🧪 Experiment: ${experiment.sampleId}`);
  console.log(`   Type: ${experiment.experimentType}`);
  console.log(`   Method: ${experiment.method}`);
  console.log(`   Nucleus: ${experiment.metadata.nucleus}`);
  console.log(`   Frequency: ${experiment.metadata.frequency} MHz`);
  console.log(`   Solvent: ${experiment.metadata.solvent}`);
  console.log(`   Data points: ${experiment.dataPoints.length}`);
  console.log(`   Peaks: ${experiment.peaks.length}`);
  console.log(`   Difficulty: ${experiment.difficulty}`);
  
  // Connect to Filecoin
  const provider = new ethers.JsonRpcProvider(FILECOIN_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
  
  console.log(`\n🔗 Wallet: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`   Balance: ${ethers.formatEther(balance)} tFIL`);
  
  // Upload to Synapse
  console.log('\n⬆️  Uploading to Filecoin via Synapse...');
  const synapse = await Synapse.create({ signer: wallet });
  
  const experimentBytes = new TextEncoder().encode(experimentJson);
  const uploadResult = await synapse.storage.upload(experimentBytes);
  
  const cidBytes = uploadResult.pieceCid['/'];
  const cidObj = CID.decode(cidBytes);
  const cid = cidObj.toString();
  
  console.log(`✅ Uploaded!`);
  console.log(`   CID: ${cid}`);
  console.log(`   Size: ${uploadResult.size} bytes`);
  
  // Compute hashes
  console.log('\n🔐 Computing verification hashes...');
  const dataHash = hashJson({
    metadata: experiment.metadata,
    dataPoints: experiment.dataPoints
  });
  
  const metricsHash = hashJson(experiment.metrics);
  
  console.log(`   dataHash: ${dataHash.slice(0, 20)}...`);
  console.log(`   metricsHash: ${metricsHash.slice(0, 20)}...`);
  
  // Calculate RV
  const difficulty = experiment.difficulty;
  const rvInitial = calculateRV(difficulty);
  
  console.log(`\n📈 Scoring:`);
  console.log(`   Peaks: ${experiment.peaks.length}`);
  console.log(`   Complex peaks: ${experiment.metrics.complexPeaks}`);
  console.log(`   Difficulty: ${difficulty}`);
  console.log(`   Initial RV: ${(rvInitial / 1e6).toFixed(6)} (scaled: ${rvInitial})`);
  
  // Register on-chain
  console.log(`\n📝 Registering on-chain...`);
  const tx = await registry.registerExperiment(
    cid,
    dataHash,
    metricsHash,
    difficulty,
    rvInitial
  );
  
  console.log(`   Tx hash: ${tx.hash}`);
  console.log('   Waiting for confirmation...');
  
  const receipt = await tx.wait();
  console.log(`✅ Confirmed! Block: ${receipt.blockNumber}`);
  
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
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 SUCCESS!');
  console.log('='.repeat(60));
  console.log(`\n📋 Summary:`);
  console.log(`   Experiment ID: ${experimentId}`);
  console.log(`   Sample ID: ${experiment.sampleId}`);
  console.log(`   CID: ${cid}`);
  console.log(`   Transaction: ${tx.hash}`);
  console.log(`   Block: ${receipt.blockNumber}`);
  console.log(`\n🔗 View on explorer:`);
  console.log(`   https://calibration.filscan.io/tx/${tx.hash}`);
  
  return {
    success: true,
    experimentId,
    cid,
    txHash: tx.hash,
    blockNumber: receipt.blockNumber
  };
}

// Read experiment JSON from file
async function main() {
  if (!process.argv[2]) {
    console.error('Usage: node upload-nmr.mjs <experiment.json>');
    process.exit(1);
  }
  
  const filePath = process.argv[2];
  const experimentJson = fs.readFileSync(filePath, 'utf-8');
  
  await uploadExperiment(experimentJson);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Upload failed:', error.message);
    process.exit(1);
  });
