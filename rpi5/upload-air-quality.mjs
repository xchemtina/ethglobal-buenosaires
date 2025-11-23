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

/**
 * Calculate difficulty for air quality experiment.
 * Based on:
 * - Air Quality Index (higher = more polluted = more difficult)
 * - Number of data points
 * - Sensor diversity
 */
function calculateDifficulty(experiment) {
  const alpha = 0.1;   // AQI weight
  const beta = 0.5;    // Data point count weight
  const gamma = 5.0;   // Base difficulty for multi-sensor
  
  const aqi = experiment.metrics.air_quality_index || 50;
  const nPoints = experiment.points.length;
  const nSensors = experiment.sensors.length;
  
  const difficulty = gamma + 
    alpha * aqi + 
    beta * Math.log(nPoints) +
    nSensors * 2;
  
  return Math.floor(difficulty);
}

function calculateRV(difficulty) {
  const v = 1; // validation status
  const rv = Math.log(1 + difficulty * v);
  return Math.floor(rv * 1e6);
}

async function uploadExperiment(experimentJson) {
  console.log('🚀 Uploading Air Quality Experiment to Filecoin\n');
  console.log('=' .repeat(60));
  
  const experiment = JSON.parse(experimentJson);
  
  console.log(`\n📊 Experiment: ${experiment.sampleId}`);
  console.log(`   Type: ${experiment.experimentType}`);
  console.log(`   Location: ${experiment.location}`);
  console.log(`   Timestamp: ${experiment.timestamp}`);
  console.log(`   Data points: ${experiment.points.length}`);
  console.log(`   Sensors: ${experiment.sensors.length}`);
  
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
    metadata: {
      sampleId: experiment.sampleId,
      experimentType: experiment.experimentType,
      method: experiment.method,
      sensors: experiment.sensors,
      location: experiment.location,
      device: experiment.device,
      timestamp: experiment.timestamp
    },
    points: experiment.points
  });
  
  const metricsHash = hashJson(experiment.metrics);
  
  console.log(`   dataHash: ${dataHash.slice(0, 20)}...`);
  console.log(`   metricsHash: ${metricsHash.slice(0, 20)}...`);
  
  // Calculate difficulty and RV
  const difficulty = calculateDifficulty(experiment);
  const rvInitial = calculateRV(difficulty);
  
  console.log(`\n📈 Scoring:`);
  console.log(`   AQI: ${experiment.metrics.air_quality_index} (${experiment.scenario})`);
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
  console.log(`\n🌍 Retrieve data:`);
  console.log(`   https://ipfs.io/ipfs/${cid}`);
  
  return {
    success: true,
    experimentId,
    cid,
    txHash: tx.hash,
    blockNumber: receipt.blockNumber
  };
}

// Read experiment JSON from stdin or file
async function main() {
  let experimentJson;
  
  // Check if JSON is piped via stdin
  if (process.stdin.isTTY === false) {
    // Read from stdin
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    experimentJson = Buffer.concat(chunks).toString('utf-8');
  } else if (process.argv[2]) {
    // Read from file argument
    const filePath = process.argv[2];
    experimentJson = fs.readFileSync(filePath, 'utf-8');
  } else {
    console.error('Usage: node upload-air-quality.mjs [experiment.json]');
    console.error('   or: python3 read_sensors.py | node upload-air-quality.mjs');
    process.exit(1);
  }
  
  await uploadExperiment(experimentJson);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Upload failed:', error.message);
    process.exit(1);
  });
