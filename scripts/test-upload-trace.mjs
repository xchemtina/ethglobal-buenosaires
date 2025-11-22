import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const FILECOIN_RPC = process.env.FILECOIN_CLOUD_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS;

const REGISTRY_ABI = [
  "function registerExperiment(string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV) returns (uint256)",
  "function totalExperiments() view returns (uint256)",
  "function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)"
];

// Generate a realistic HPLC trace
function generateHPLCTrace() {
  const trace = {
    // Metadata
    experimentId: `HPLC-${Date.now()}`,
    sampleId: "TEST-001",
    method: "Reverse Phase C18",
    column: "Waters XBridge C18, 4.6x150mm, 3.5µm",
    mobilePhase: "Acetonitrile/Water (70:30)",
    flowRate: "1.0 mL/min",
    temperature: "25°C",
    injectionVolume: "10 µL",
    detectionWavelength: "254 nm",
    analyst: "Demo User",
    timestamp: new Date().toISOString(),
    
    // Simulated chromatogram data points
    // Time in minutes, signal in mAU (milli-absorbance units)
    points: [],
    
    // Analysis results
    metrics: {
      peakCount: 0,
      totalArea: 0,
      baselineNoise: 0,
      peakPurity: "98.4%",
      resolution: "1.5",
      retentionTimes: []
    }
  };
  
  // Generate 500 data points over 10 minutes (0.02 min intervals)
  const totalTime = 10; // minutes
  const numPoints = 500;
  const dt = totalTime / numPoints;
  
  // Define 3 Gaussian peaks
  const peaks = [
    { center: 2.5, height: 0.8, width: 0.3 },   // Early peak
    { center: 5.0, height: 1.2, width: 0.4 },   // Main peak
    { center: 7.5, height: 0.6, width: 0.35 }   // Late peak
  ];
  
  let totalArea = 0;
  
  for (let i = 0; i < numPoints; i++) {
    const time = i * dt;
    let signal = 0.05; // Baseline
    
    // Add Gaussian peaks
    for (const peak of peaks) {
      const gaussian = peak.height * Math.exp(
        -Math.pow(time - peak.center, 2) / (2 * Math.pow(peak.width, 2))
      );
      signal += gaussian;
    }
    
    // Add small noise
    signal += (Math.random() - 0.5) * 0.02;
    
    trace.points.push({
      time: parseFloat(time.toFixed(3)),
      signal: parseFloat(signal.toFixed(4))
    });
    
    totalArea += signal * dt;
  }
  
  // Calculate metrics
  trace.metrics.peakCount = peaks.length;
  trace.metrics.totalArea = parseFloat(totalArea.toFixed(2));
  trace.metrics.baselineNoise = 0.02;
  trace.metrics.retentionTimes = peaks.map(p => p.center);
  
  return trace;
}

async function main() {
  console.log('🧪 HPLC Trace Upload Test\n');
  console.log('='.repeat(60));
  
  // 1. Generate HPLC trace
  console.log('\n📊 Step 1: Generate HPLC Trace');
  const trace = generateHPLCTrace();
  console.log(`✅ Generated trace: ${trace.sampleId}`);
  console.log(`   Points: ${trace.points.length}`);
  console.log(`   Peaks: ${trace.metrics.peakCount}`);
  console.log(`   Total area: ${trace.metrics.totalArea}`);
  console.log(`   Retention times: ${trace.metrics.retentionTimes.join(', ')} min`);
  
  // Show JSON size
  const jsonSize = JSON.stringify(trace).length;
  console.log(`   JSON size: ${(jsonSize / 1024).toFixed(2)} KB`);
  
  // 2. Connect to Filecoin
  console.log('\n🌐 Step 2: Connect to Filecoin');
  const provider = new ethers.JsonRpcProvider(FILECOIN_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log(`✅ Connected as: ${wallet.address}`);
  
  const balance = await provider.getBalance(wallet.address);
  console.log(`   Balance: ${ethers.formatEther(balance)} tFIL`);
  
  // 3. Upload to Synapse (Filecoin storage)
  console.log('\n☁️  Step 3: Upload to Filecoin (Synapse)');
  console.log('   This may take 10-30 seconds...');
  
  try {
    // Create Synapse with wallet as signer
    const synapse = await Synapse.create({ signer: wallet });
    console.log('   Synapse SDK initialized');
    
    const cid = await synapse.upload(trace);
    console.log(`✅ Uploaded to Filecoin!`);
    console.log(`   CID: ${cid}`);
    console.log(`   Gateway: https://ipfs.io/ipfs/${cid}`);
    
    // 4. Compute hashes
    console.log('\n🔐 Step 4: Compute Verification Hashes');
    
    // Hash the raw data points
    const dataHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(trace.points))
    );
    console.log(`   dataHash: ${dataHash.slice(0, 20)}...`);
    
    // Hash the metrics
    const metricsHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(trace.metrics))
    );
    console.log(`   metricsHash: ${metricsHash.slice(0, 20)}...`);
    
    // 5. Calculate difficulty and RV
    console.log('\n📈 Step 5: Calculate Difficulty & Reputation Value');
    
    // Simple difficulty: based on peak count and noise
    const difficulty = trace.metrics.peakCount + Math.floor(trace.metrics.baselineNoise * 50);
    console.log(`   Difficulty: ${difficulty}`);
    
    // RV = ln(1 + D) scaled by 1e6
    const rv = Math.floor(Math.log(1 + difficulty) * 1e6);
    console.log(`   Initial RV: ${rv} (${(rv / 1e6).toFixed(4)} unscaled)`);
    
    // 6. Register on-chain
    console.log('\n⛓️  Step 6: Register on Filecoin Cloud Smart Contract');
    
    const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
    
    console.log('   Sending transaction...');
    const tx = await registry.registerExperiment(
      cid,
      dataHash,
      metricsHash,
      difficulty,
      rv
    );
    
    console.log(`   Transaction hash: ${tx.hash}`);
    console.log('   Waiting for confirmation...');
    
    const receipt = await tx.wait();
    console.log(`✅ Confirmed in block ${receipt.blockNumber}`);
    
    // 7. Verify registration
    console.log('\n✅ Step 7: Verify Registration');
    
    const totalExperiments = await registry.totalExperiments();
    const experimentId = totalExperiments - 1n; // Last experiment
    
    const experiment = await registry.getExperiment(experimentId);
    
    console.log(`   Experiment ID: ${experimentId}`);
    console.log(`   Submitter: ${experiment.submitter}`);
    console.log(`   CID: ${experiment.cid}`);
    console.log(`   Difficulty: ${experiment.difficulty}`);
    console.log(`   Initial RV: ${experiment.initialRV}`);
    console.log(`   Submitted at: ${new Date(Number(experiment.submittedAt) * 1000).toISOString()}`);
    
    // 8. Test retrieval (download from Filecoin)
    console.log('\n⬇️  Step 8: Test Data Retrieval');
    console.log('   Downloading from Filecoin...');
    
    const retrieved = await synapse.download(cid);
    console.log(`✅ Retrieved experiment: ${retrieved.sampleId}`);
    console.log(`   Points retrieved: ${retrieved.points.length}`);
    console.log(`   Matches original: ${retrieved.points.length === trace.points.length}`);
    
    // Verify hashes match
    const retrievedDataHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(retrieved.points))
    );
    const retrievedMetricsHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(retrieved.metrics))
    );
    
    console.log('\n🔍 Hash Verification:');
    console.log(`   Data hash matches: ${retrievedDataHash === dataHash ? '✅' : '❌'}`);
    console.log(`   Metrics hash matches: ${retrievedMetricsHash === metricsHash ? '✅' : '❌'}`);
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS! Complete Upload & Registration Flow');
    console.log('='.repeat(60));
    console.log(`\n📋 Summary:`);
    console.log(`   Experiment ID: ${experimentId}`);
    console.log(`   Filecoin CID: ${cid}`);
    console.log(`   Contract: ${REGISTRY_ADDRESS}`);
    console.log(`   Transaction: ${tx.hash}`);
    console.log(`   Explorer: https://calibration.filscan.io/tx/${tx.hash}`);
    
    console.log('\n✅ All steps completed successfully!');
    console.log('\nNext: View this experiment in your dashboard by querying:');
    console.log(`   registry.getExperiment(${experimentId})`);
    
  } catch (error) {
    console.error('\n❌ Error during upload:', error.message);
    
    if (error.message.includes('Synapse')) {
      console.log('\n💡 Synapse SDK issue detected.');
      console.log('   Make sure you have @filoz/synapse-sdk installed:');
      console.log('   cd scripts && npm install @filoz/synapse-sdk');
    }
    
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
