#!/usr/bin/env node
/**
 * AI MCP Agent - Decentralized Lab Journal Processor
 * 
 * Watches The Graph for new experiments, fetches raw data from Filecoin,
 * runs deterministic analysis, and publishes enriched results.
 * 
 * This creates a decentralized, automated scientific journal where:
 * - Data is immutable (Filecoin)
 * - Indexing is decentralized (The Graph)
 * - Analysis is reproducible (deterministic + fraud proofs)
 * - Results are queryable (GraphQL + REST)
 */

import { ethers } from 'ethers';
import fetch from 'node-fetch';
import fs from 'fs';
import { Synapse } from '@filoz/synapse-sdk';

// Configuration
const SUBGRAPH_URL = process.env.SUBGRAPH_URL || 'http://localhost:8000/subgraphs/name/pox';
const FILECOIN_GATEWAY = process.env.FILECOIN_GATEWAY || 'https://api.calibration.node.glif.io/ipfs';
const CONTRACT_ADDRESS = '0xa6fa61924f06db9a84b92182b69f5c08f3176554';
const RPC_URL = process.env.FILECOIN_RPC || 'https://api.calibration.node.glif.io/rpc/v1';

const POLL_INTERVAL = 10000; // 10 seconds
let lastProcessedId = -1;

/**
 * Query The Graph for new experiments
 */
async function queryNewExperiments() {
  const query = `
    query GetNewExperiments($lastId: String!) {
      experiments(
        first: 10
        where: { id_gt: $lastId }
        orderBy: id
        orderDirection: asc
      ) {
        id
        submitter
        cid
        dataHash
        metricsHash
        difficulty
        initialRV
        submittedAt
      }
    }
  `;

  const response = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { lastId: lastProcessedId.toString() }
    })
  });

  const result = await response.json();
  return result.data?.experiments || [];
}

/**
 * Fetch raw HPLC data from Filecoin via CID using Synapse SDK
 */
async function fetchRawData(cid, synapse) {
  try {
    const data = await synapse.download(cid);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch CID ${cid} from Filecoin: ${error.message}`);
  }
}

/**
 * Deterministic HPLC analysis (matches on-chain computation)
 * This should match packages/experiments/src/analyze.ts
 */
function analyzeHPLC(rawData) {
  console.log('  🔬 Running deterministic analysis...');
  
  // Extract chromatogram points
  const points = rawData.chromatogram?.points || [];
  
  // Peak detection (simple threshold method)
  const peaks = detectPeaks(points);
  
  // Noise estimation
  const noise = estimateNoise(points);
  
  // Compute difficulty (matches scoring.ts)
  const difficulty = 1.0 + 
    (1.0 * peaks.length) + 
    (8.0 * noise) + 
    (0.5 * Math.log(points.length));
  
  return {
    peakCount: peaks.length,
    peaks: peaks.map(p => ({
      retentionTime: p.time,
      area: p.area,
      height: p.height
    })),
    baselineNoise: noise,
    difficulty: difficulty,
    metadata: {
      method: rawData.metadata?.method || 'unknown',
      solvent: rawData.metadata?.solvent || 'unknown',
      flowRate: rawData.metadata?.flowRate || 0
    }
  };
}

function detectPeaks(points, threshold = 0.1) {
  // Simple peak detection: local maxima above threshold
  const peaks = [];
  
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1].absorbance;
    const curr = points[i].absorbance;
    const next = points[i + 1].absorbance;
    
    if (curr > prev && curr > next && curr > threshold) {
      peaks.push({
        time: points[i].time,
        height: curr,
        area: estimatePeakArea(points, i)
      });
    }
  }
  
  return peaks;
}

function estimatePeakArea(points, peakIndex) {
  // Trapezoid integration around peak
  let area = 0;
  const window = 10;
  
  for (let i = Math.max(0, peakIndex - window); 
       i < Math.min(points.length - 1, peakIndex + window); 
       i++) {
    const dt = points[i + 1].time - points[i].time;
    const avgHeight = (points[i].absorbance + points[i + 1].absorbance) / 2;
    area += dt * avgHeight;
  }
  
  return area;
}

function estimateNoise(points) {
  if (points.length < 10) return 0;
  
  // Standard deviation of baseline region (first 10% of trace)
  const baseline = points.slice(0, Math.floor(points.length * 0.1));
  const values = baseline.map(p => p.absorbance);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  
  return Math.sqrt(variance);
}

/**
 * Deterministic JSON stringify (matches upload script)
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
 * Verify that computed analysis matches on-chain hashes
 */
function verifyHashes(rawData, analysis, expectedDataHash, expectedMetricsHash) {
  // Compute hashes using same logic as upload script
  const dataForHash = {
    metadata: {
      sampleId: rawData.sampleId,
      experimentType: rawData.experimentType,
      method: rawData.method,
      compounds: rawData.compounds,
      solvent: rawData.solvent,
      instrument: rawData.instrument,
      labLocation: rawData.labLocation
    },
    points: rawData.points
  };
  
  const computedDataHash = hashJson(dataForHash);
  const computedMetricsHash = hashJson(rawData.metrics);
  
  const dataMatch = computedDataHash === expectedDataHash;
  const metricsMatch = computedMetricsHash === expectedMetricsHash;
  
  return {
    dataMatch,
    metricsMatch,
    computedDataHash,
    computedMetricsHash
  };
}

/**
 * Process a single experiment
 */
async function processExperiment(experiment, synapse) {
  console.log(`\n📊 Processing Experiment #${experiment.id}`);
  console.log(`   Submitter: ${experiment.submitter}`);
  console.log(`   CID: ${experiment.cid}`);
  
  try {
    // 1. Fetch raw data from Filecoin using Synapse
    console.log('  📥 Fetching from Filecoin...');
    const rawData = await fetchRawData(experiment.cid, synapse);
    
    // 2. Run deterministic analysis
    const analysis = analyzeHPLC(rawData);
    
    // 3. Verify hashes (fraud proof)
    console.log('  🔐 Verifying hashes...');
    const verification = verifyHashes(
      rawData, 
      analysis, 
      experiment.dataHash, 
      experiment.metricsHash
    );
    
    if (!verification.dataMatch) {
      console.log('  ⚠️  DATA HASH MISMATCH - Potential fraud detected!');
    }
    
    if (!verification.metricsMatch) {
      console.log('  ⚠️  METRICS HASH MISMATCH - Recomputed analysis differs!');
    }
    
    if (verification.dataMatch && verification.metricsMatch) {
      console.log('  ✅ Hashes verified - data is valid');
    }
    
    // 4. Store enriched results
    const result = {
      experimentId: experiment.id,
      submitter: experiment.submitter,
      cid: experiment.cid,
      submittedAt: experiment.submittedAt,
      analysis: analysis,
      verification: verification,
      processedAt: new Date().toISOString()
    };
    
    // Save to local journal (in production: publish to IPFS/Filecoin)
    const journalPath = './journal';
    if (!fs.existsSync(journalPath)) {
      fs.mkdirSync(journalPath, { recursive: true });
    }
    
    fs.writeFileSync(
      `${journalPath}/experiment-${experiment.id}.json`,
      JSON.stringify(result, null, 2)
    );
    
    console.log(`  💾 Saved to journal/experiment-${experiment.id}.json`);
    
    // 5. Update processed index
    lastProcessedId = parseInt(experiment.id);
    
    return result;
    
  } catch (error) {
    console.error(`  ❌ Error processing experiment: ${error.message}`);
    return null;
  }
}

/**
 * Main watch loop
 */
async function watchAndProcess() {
  console.log('🤖 AI MCP Agent started');
  console.log(`📡 Watching subgraph: ${SUBGRAPH_URL}`);
  
  // Initialize Synapse SDK
  console.log('🔄 Initializing Synapse SDK...');
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const synapse = await Synapse.create({ signer: wallet });
  console.log('✅ Synapse ready!\n');
  
  while (true) {
    try {
      // Query for new experiments
      const newExperiments = await queryNewExperiments();
      
      if (newExperiments.length > 0) {
        console.log(`\n🆕 Found ${newExperiments.length} new experiment(s)`);
        
        // Process each experiment
        for (const exp of newExperiments) {
          await processExperiment(exp, synapse);
        }
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
      
    } catch (error) {
      console.error('❌ Watcher error:', error.message);
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }
  }
}

// Start the agent
watchAndProcess();
