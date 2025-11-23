import { ethers } from 'ethers';
import { validateExperimentData, isValidAddress, isValidCID } from './validation';

// Contract addresses from deployment
const REGISTRY_ADDRESS = '0xA6Fa61924F06DB9A84B92182B69F5C08F3176554';
const RPC_URL = 'https://api.calibration.node.glif.io/rpc/v1';

// Circuit breaker configuration
let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = 0;
const MAX_FAILURES = 5;
const CIRCUIT_RESET_TIME = 60000; // 1 minute

// Minimal ABI - just the functions we need
const REGISTRY_ABI = [
  'function totalExperiments() view returns (uint256)',
  'function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)',
];

export type OnChainExperiment = {
  id: number;
  submitter: string;
  cid: string;
  dataHash: string;
  metricsHash: string;
  difficulty: number;
  initialRV: number;
  submittedAt: number;
  blockExplorer: string;
};

let provider: ethers.JsonRpcProvider | null = null;
let registry: ethers.Contract | null = null;

/**
 * Circuit breaker check - prevents hammering failed RPC
 */
function checkCircuitBreaker(): void {
  if (circuitOpen) {
    const now = Date.now();
    if (now - lastFailureTime > CIRCUIT_RESET_TIME) {
      console.log('[Web3] Circuit breaker reset');
      circuitOpen = false;
      failureCount = 0;
    } else {
      throw new Error('Circuit breaker is open. RPC unavailable. Try again later.');
    }
  }
}

/**
 * Record failure for circuit breaker
 */
function recordFailure(): void {
  failureCount++;
  lastFailureTime = Date.now();
  
  if (failureCount >= MAX_FAILURES) {
    console.error(`[Web3] Circuit breaker triggered after ${MAX_FAILURES} failures`);
    circuitOpen = true;
  }
}

/**
 * Record success for circuit breaker
 */
function recordSuccess(): void {
  failureCount = 0;
}

function getContract() {
  checkCircuitBreaker();
  
  if (!provider) {
    provider = new ethers.JsonRpcProvider(RPC_URL, undefined, {
      staticNetwork: true, // Optimize for read-only
    });
  }
  if (!registry) {
    registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  }
  return registry;
}

export async function fetchTotalExperiments(): Promise<number> {
  try {
    const contract = getContract();
    const total = await contract.totalExperiments();
    return Number(total);
  } catch (error) {
    console.error('Failed to fetch total experiments:', error);
    return 0;
  }
}

export async function fetchExperiment(id: number): Promise<OnChainExperiment | null> {
  try {
    const contract = getContract();
    const [
      expId,
      submitter,
      cid,
      dataHash,
      metricsHash,
      difficulty,
      initialRV,
      submittedAt,
    ] = await contract.getExperiment(id);

    const experiment = {
      id: Number(expId),
      submitter,
      cid,
      dataHash,
      metricsHash,
      difficulty: Number(difficulty),
      initialRV: Number(initialRV),
      submittedAt: Number(submittedAt),
      blockExplorer: `https://calibration.filscan.io/address/${REGISTRY_ADDRESS}`,
    };

    // Validate experiment data
    try {
      validateExperimentData(experiment);
    } catch (validationError: any) {
      console.warn(`[Web3] Experiment ${id} failed validation:`, validationError.message);
      // Return data anyway but log warning - blockchain is source of truth
    }

    recordSuccess(); // Circuit breaker: record successful call
    return experiment;
    
  } catch (error: any) {
    recordFailure(); // Circuit breaker: record failure
    console.error(`[Web3] Failed to fetch experiment ${id}:`, error.message);
    return null;
  }
}

export async function fetchAllExperiments(): Promise<OnChainExperiment[]> {
  try {
    const total = await fetchTotalExperiments();
    if (total === 0) return [];

    const promises = [];
    for (let i = 0; i < total; i++) {
      promises.push(fetchExperiment(i));
    }

    const results = await Promise.all(promises);
    return results.filter((exp): exp is OnChainExperiment => exp !== null);
  } catch (error) {
    console.error('Failed to fetch all experiments:', error);
    return [];
  }
}

export async function fetchLatestExperiments(count: number = 5): Promise<OnChainExperiment[]> {
  try {
    const total = await fetchTotalExperiments();
    if (total === 0) return [];

    const startId = Math.max(0, total - count);
    const promises = [];
    
    for (let i = total - 1; i >= startId; i--) {
      promises.push(fetchExperiment(i));
    }

    const results = await Promise.all(promises);
    return results.filter((exp): exp is OnChainExperiment => exp !== null);
  } catch (error) {
    console.error('Failed to fetch latest experiments:', error);
    return [];
  }
}

/**
 * Fetch experiment data from IPFS gateway using CID
 * Note: Filecoin piece CIDs (bafkzcibd...) may take time to propagate to IPFS
 */
export async function fetchExperimentData(cid: string): Promise<any> {
  // Skip IPFS fetch for now - Filecoin piece CIDs need special handling
  // For demo, we'll show on-chain metadata only
  // TODO: Implement Synapse SDK download for full data retrieval
  
  console.log(`[IPFS] Skipping fetch for Filecoin piece CID: ${cid.slice(0, 24)}...`);
  return null;
  
  // Future implementation:
  // const synapse = await Synapse.create({ signer: wallet });
  // const data = await synapse.storage.download(cid);
  // return JSON.parse(new TextDecoder().decode(data));
}
