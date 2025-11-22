// lib/web3-integration.ts
import { ethers } from 'ethers'
import { graphqlClient, GET_EXPERIMENTS, GET_EXPERIMENT } from './graphql-client'
import type { HplcData, Transaction } from './types'

// Contract addresses (will be provided by other instance)
const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || '0x0000000000000000000000000000000000000000'
const REPUTATION_ADDRESS = process.env.NEXT_PUBLIC_REPUTATION_ADDRESS || '0x0000000000000000000000000000000000000000'

// RPC endpoint
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.arbitrum.io/rpc'

// Contract ABIs (minimal - just what we need)
const REGISTRY_ABI = [
  'event ExperimentRegistered(uint256 indexed experimentId, address indexed submitter, string cid, uint256 difficulty)',
  'function experiments(uint256) view returns (address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, uint256 rvInitial, uint256 submittedAt)',
]

const REPUTATION_ABI = [
  'function reputation(address) view returns (int256)',
  'event ReputationChanged(address indexed user, int256 delta, int256 newReputation)',
]

/**
 * Check if Web3 is configured (contracts deployed)
 */
export function isWeb3Configured(): boolean {
  return REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000' &&
         REPUTATION_ADDRESS !== '0x0000000000000000000000000000000000000000' &&
         process.env.NEXT_PUBLIC_SUBGRAPH_URL !== undefined
}

/**
 * Get ethers provider
 */
export function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL)
}

/**
 * Get contract instances
 */
export function getContracts() {
  const provider = getProvider()
  return {
    registry: new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider),
    reputation: new ethers.Contract(REPUTATION_ADDRESS, REPUTATION_ABI, provider),
  }
}

/**
 * Fetch experiments from The Graph subgraph
 */
export async function fetchExperimentsFromSubgraph(limit = 20) {
  try {
    const { data } = await graphqlClient.query({
      query: GET_EXPERIMENTS,
      variables: { first: limit },
    })
    return data.experiments
  } catch (error) {
    console.error('Error fetching from subgraph:', error)
    return []
  }
}

/**
 * Fetch single experiment with full details
 */
export async function fetchExperimentById(id: string) {
  try {
    const { data } = await graphqlClient.query({
      query: GET_EXPERIMENT,
      variables: { id },
    })
    return data.experiment
  } catch (error) {
    console.error('Error fetching experiment:', error)
    return null
  }
}

/**
 * Fetch user reputation from contract
 */
export async function fetchUserReputation(address: string): Promise<bigint> {
  try {
    const { reputation } = getContracts()
    return await reputation.reputation(address)
  } catch (error) {
    console.error('Error fetching reputation:', error)
    return BigInt(0)
  }
}

/**
 * Convert subgraph experiment to HPLC dashboard format
 */
export function experimentToHplcData(experiment: any): HplcData {
  // This will need actual trace data from Synapse via CID
  // For now, return structure that dashboard expects
  return {
    sampleId: experiment.sampleId || `#${experiment.experimentId}`,
    method: experiment.method || 'Unknown Method',
    dataPoints: [], // Will be fetched from Synapse using CID
    metrics: {
      peakPurity: experiment.peakPurity ? `${(experiment.peakPurity * 100).toFixed(1)}%` : 'N/A',
      retentionShift: 'N/A', // Not stored on-chain
      areaPercent: 'N/A', // Not stored on-chain
      status: 'ON-CHAIN',
    },
  }
}

/**
 * Convert subgraph events to transaction feed format
 */
export function experimentsToTransactions(experiments: any[]): Transaction[] {
  return experiments.map((exp) => ({
    id: exp.experimentId,
    network: 'Filecoin Cloud' as const,
    type: 'Contract Call' as const,
    status: 'Confirmed' as const,
    confirmations: 100, // Assume finalized
    nodeId: exp.submitter.slice(0, 10),
    timestamp: new Date(exp.submittedAt * 1000).toISOString(),
    gasFee: '0.001', // Mock for now
  }))
}

/**
 * Fetch HPLC trace from Synapse using CID
 * (Will be implemented when Synapse integration is ready)
 */
export async function fetchTraceFromSynapse(cid: string): Promise<any> {
  // TODO: Implement Synapse SDK integration
  // const synapse = await Synapse.create({ provider })
  // const data = await synapse.download(cid)
  // return data
  
  console.warn('Synapse integration not yet implemented')
  return null
}

/**
 * Main function to fetch dashboard data from Web3
 */
export async function fetchWeb3DashboardData() {
  const experiments = await fetchExperimentsFromSubgraph(20)
  
  return {
    experiments,
    transactions: experimentsToTransactions(experiments),
    isLive: isWeb3Configured(),
  }
}
