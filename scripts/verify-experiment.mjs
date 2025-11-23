import { ethers } from 'ethers';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ABI = [
  'function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)',
  'function totalExperiments() view returns (uint256)'
];

const provider = new ethers.JsonRpcProvider(process.env.FILECOIN_CLOUD_RPC);
const registry = new ethers.Contract(process.env.REGISTRY_ADDRESS, ABI, provider);

const total = await registry.totalExperiments();
console.log('✅ Total experiments:', total.toString());

// Check experiment #8 (first successful upload)
const exp = await registry.getExperiment(8);
console.log('\n📊 Experiment #8 (HPLC-0001):');
console.log('  Submitter:', exp.submitter);
console.log('  CID:', exp.cid);
console.log('  Difficulty:', exp.difficulty.toString());
console.log('  Initial RV:', (Number(exp.initialRV) / 1e6).toFixed(6));
console.log('  Submitted:', new Date(Number(exp.submittedAt) * 1000).toISOString());
console.log('\n🔗 View on explorer:');
console.log(`  https://calibration.filscan.io/address/${process.env.REGISTRY_ADDRESS}`);
