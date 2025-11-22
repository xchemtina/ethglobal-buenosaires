import { ethers } from 'ethers';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug: check env vars
if (!process.env.REGISTRY_ADDRESS) {
  console.error('❌ REGISTRY_ADDRESS not found in environment');
  console.log('Loaded env vars:', Object.keys(process.env).filter(k => k.includes('REGISTRY') || k.includes('FIL')));
  process.exit(1);
}

console.log('🧪 HPLC Trace Serialization & Registration Demo\n');
console.log('='.repeat(70));

// Step 1: Generate realistic HPLC trace
console.log('\n📊 Step 1: Generate Realistic HPLC Trace');

const trace = {
  // Rich metadata
  experimentId: `HPLC-${Date.now()}`,
  sampleId: "DEMO-001",
  method: "Reverse Phase C18",
  column: "Waters XBridge C18, 4.6x150mm, 3.5µm",
  mobilePhase: "Acetonitrile/Water (70:30 v/v)",
  flowRate: "1.0 mL/min",
  temperature: "25°C",
  injectionVolume: "10 µL",
  detectionWavelength: "254 nm",
  analyst: "Demo User",
  timestamp: new Date().toISOString(),
  
  // The actual chromatogram data
  points: [],
  
  // Analysis metrics
  metrics: {
    peakCount: 3,
    totalArea: 0,
    baselineNoise: 0.02,
    peakPurity: "98.4%",
    resolution: "1.5",
    retentionTimes: [2.5, 5.0, 7.5]
  }
};

// Generate 500 data points (10 minutes, 0.02 min intervals)
const peaks = [
  { center: 2.5, height: 0.8, width: 0.3 },
  { center: 5.0, height: 1.2, width: 0.4 },
  { center: 7.5, height: 0.6, width: 0.35 }
];

let totalArea = 0;
for (let i = 0; i < 500; i++) {
  const time = i * 0.02; // 0.02 minute intervals
  let signal = 0.05; // baseline
  
  // Add Gaussian peaks
  for (const peak of peaks) {
    signal += peak.height * Math.exp(
      -Math.pow(time - peak.center, 2) / (2 * Math.pow(peak.width, 2))
    );
  }
  
  // Add noise
  signal += (Math.random() - 0.5) * 0.02;
  
  trace.points.push({
    time: parseFloat(time.toFixed(3)),
    signal: parseFloat(signal.toFixed(4))
  });
  
  totalArea += signal * 0.02;
}

trace.metrics.totalArea = parseFloat(totalArea.toFixed(2));

console.log(`✅ Generated: ${trace.sampleId}`);
console.log(`   Data points: ${trace.points.length}`);
console.log(`   Peaks: ${trace.metrics.peakCount}`);
console.log(`   Retention times: ${trace.metrics.retentionTimes.join(', ')} min`);

// Step 2: Serialize to JSON
console.log('\n📝 Step 2: Serialize to JSON');
const json = JSON.stringify(trace, null, 2);
const jsonSize = json.length;
console.log(`✅ JSON size: ${(jsonSize / 1024).toFixed(2)} KB`);
console.log(`   Format: Valid JSON with ${trace.points.length} time/signal pairs`);

// Save to file for inspection
const outputPath = path.join(__dirname, '..', 'data', 'sample-hplc-trace.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, json);
console.log(`   Saved to: ${outputPath}`);

// Step 3: Compute hashes
console.log('\n🔐 Step 3: Compute Verification Hashes');

const dataHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(trace.points)));
const metricsHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(trace.metrics)));

console.log(`✅ dataHash: ${dataHash}`);
console.log(`   metricsHash: ${metricsHash}`);
console.log(`   These hashes prove data integrity without storing all points on-chain`);

// Step 4: Calculate difficulty and RV
console.log('\n📈 Step 4: Calculate Difficulty & Reputation');

const difficulty = trace.metrics.peakCount + Math.floor(trace.metrics.baselineNoise * 50);
const rv = Math.floor(Math.log(1 + difficulty) * 1e6);

console.log(`   Difficulty: ${difficulty} (peaks + noise factor)`);
console.log(`   Initial RV: ${rv} (${(rv / 1e6).toFixed(4)} unscaled)`);

// Step 5: Show what would be uploaded to Filecoin
console.log('\n☁️  Step 5: Filecoin Upload (Conceptual)');
console.log(`   In production, you would:`);
console.log(`   1. Upload this ${(jsonSize/1024).toFixed(1)}KB JSON to Filecoin via Synapse SDK`);
console.log(`   2. Receive back a CID (Content Identifier)`);
console.log(`   3. Anyone can retrieve the data later using that CID`);
console.log(`   `);
console.log(`   Example CID: bafyreihsk3vwo5ydsvxw7nz7dgwo4l4k5j9xjfhvlvfqhukpzh5ozcgfsy`);

const mockCID = "bafyreihsk3vwo5ydsvxw7nz7dgwo4l4k5j9xjfhvlvfqhukpzh5ozcgfsy";

// Step 6: Register on-chain
console.log('\n⛓️  Step 6: Register on Filecoin Cloud Smart Contract');

const provider = new ethers.JsonRpcProvider(process.env.FILECOIN_CLOUD_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load full ABI from forge build output
const abiPath = path.join(__dirname, '..', 'out', 'PoXRegistry.sol', 'PoXRegistry.json');
const registryArtifact = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

const registry = new ethers.Contract(
  process.env.REGISTRY_ADDRESS,
  registryArtifact.abi,
  wallet
);

console.log(`   Contract: ${process.env.REGISTRY_ADDRESS}`);
console.log(`   Deployer: ${wallet.address}`);
console.log(`   `);
console.log(`   Registering experiment with:`);
console.log(`   - CID: ${mockCID}`);
console.log(`   - dataHash: ${dataHash.slice(0, 20)}...`);
console.log(`   - metricsHash: ${metricsHash.slice(0, 20)}...`);
console.log(`   - Difficulty: ${difficulty}`);
console.log(`   - RV: ${rv}`);

try {
  const tx = await registry.registerExperiment(
    mockCID,
    dataHash,
    metricsHash,
    difficulty,
    rv
  );
  
  console.log(`   \n   Transaction sent: ${tx.hash}`);
  console.log(`   Waiting for confirmation...`);
  
  const receipt = await tx.wait();
  console.log(`   ✅ Confirmed in block ${receipt.blockNumber}`);
  
  // Get the experiment ID
  const totalExps = await registry.totalExperiments();
  const expId = totalExps - 1n;
  
  console.log(`\n✅ Step 7: Verify Registration`);
  console.log(`   Experiment ID: ${expId}`);
  console.log(`   Explorer: https://calibration.filscan.io/tx/${tx.hash}`);
  
  console.log('\n' + '='.repeat(70));
  console.log('🎉 SUCCESS! HPLC Trace Registered On-Chain');
  console.log('='.repeat(70));
  
  console.log('\n📋 What Just Happened:');
  console.log('   1. Generated realistic 500-point HPLC chromatogram');
  console.log('   2. Serialized to JSON (14.95 KB)');
  console.log('   3. Computed cryptographic hashes for fraud proofs');
  console.log('   4. Registered metadata on Filecoin Cloud blockchain');
  console.log('   5. Full trace data would be stored on Filecoin via Synapse');
  console.log('   6. Dashboard can now query and visualize this experiment');
  
  console.log('\n💡 Next Steps:');
  console.log('   - Upload actual trace to Synapse to get real CID');
  console.log('   - Connect dashboard to display this experiment');
  console.log('   - Generate multiple traces for testing');
  
} catch (error) {
  console.error('\n❌ Registration failed:', error.message);
  throw error;
}
