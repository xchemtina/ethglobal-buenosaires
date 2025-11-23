#!/usr/bin/env node
/**
 * Simple event indexer - alternative to The Graph
 * Queries ExperimentRegistered events directly from Filecoin Calibration
 */

import { ethers } from 'ethers';
import fs from 'fs';

// Configuration
const RPC_URL = process.env.FILECOIN_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
const CONTRACT_ADDRESS = '0xa6fa61924f06db9a84b92182b69f5c08f3176554';
const START_BLOCK = 3217000; // Actual deployment block (experiments start at 3217627)

// Load ABI
const abiPath = '../out/PoXRegistry.sol/PoXRegistry.json';
const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const abi = contractJson.abi;

async function queryExperiments() {
  console.log('🔍 Connecting to Filecoin Calibration...');
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  
  // Get current block
  const currentBlock = await provider.getBlockNumber();
  console.log(`📦 Current block: ${currentBlock}`);
  console.log(`📦 Querying from block ${START_BLOCK} to ${currentBlock}`);
  
  // Query ExperimentRegistered events
  const filter = contract.filters.ExperimentRegistered();
  const events = await contract.queryFilter(filter, START_BLOCK, currentBlock);
  
  console.log(`\n✅ Found ${events.length} experiments:\n`);
  
  const experiments = events.map(event => {
    const args = event.args;
    return {
      id: args.id.toString(),
      submitter: args.submitter,
      cid: args.cid,
      dataHash: args.dataHash,
      metricsHash: args.metricsHash,
      difficulty: args.difficulty.toString(),
      initialRV: args.initialRV.toString(),
      submittedAt: new Date(Number(args.submittedAt) * 1000).toISOString(),
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash
    };
  });
  
  // Print summary
  experiments.forEach((exp, idx) => {
    console.log(`Experiment #${exp.id}`);
    console.log(`  Submitter: ${exp.submitter}`);
    console.log(`  CID: ${exp.cid}`);
    console.log(`  Difficulty: ${exp.difficulty}`);
    console.log(`  Initial RV: ${exp.initialRV}`);
    console.log(`  Submitted: ${exp.submittedAt}`);
    console.log(`  Block: ${exp.blockNumber}`);
    console.log(`  Tx: ${exp.transactionHash}`);
    console.log('');
  });
  
  // Save to JSON for frontend/demo
  const outputPath = './experiments.json';
  fs.writeFileSync(outputPath, JSON.stringify(experiments, null, 2));
  console.log(`💾 Saved to ${outputPath}`);
  
  return experiments;
}

// Run
queryExperiments()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
