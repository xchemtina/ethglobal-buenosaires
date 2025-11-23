#!/usr/bin/env node
import { ethers } from 'ethers';

const REGISTRY_ADDRESS = '0xA6Fa61924F06DB9A84B92182B69F5C08F3176554';
const RPC_URL = 'https://api.calibration.node.glif.io/rpc/v1';

const ABI = [
  'function totalExperiments() view returns (uint256)',
  'function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)'
];

async function test() {
  console.log('🔗 Connecting to Filecoin Calibration...\n');
  
  const provider = new ethers.JsonRpcProvider(RPC_URL, undefined, {
    staticNetwork: true,
  });
  
  const registry = new ethers.Contract(REGISTRY_ADDRESS, ABI, provider);
  
  try {
    const total = await registry.totalExperiments();
    console.log(`✅ Total experiments: ${total}`);
    
    if (total > 0) {
      console.log('\n📊 Latest 5 experiments:');
      const startId = Math.max(0, Number(total) - 5);
      
      for (let i = Number(total) - 1; i >= startId; i--) {
        const exp = await registry.getExperiment(i);
        console.log(`\nExperiment ${i}:`);
        console.log(`  Submitter: ${exp.submitter}`);
        console.log(`  CID: ${exp.cid.slice(0, 40)}...`);
        console.log(`  Difficulty: ${exp.difficulty}`);
        console.log(`  Initial RV: ${exp.initialRV}`);
        console.log(`  Submitted: ${new Date(Number(exp.submittedAt) * 1000).toISOString()}`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
