import type { Transaction, BlockchainStats, HplcData, VocData } from "./types"
import { generateHplcData, generateTransactions, generateVocData } from "./mock-data"
import { fetchLatestExperiments, fetchTotalExperiments } from "./web3-service"

// --- Blockchain Data Service ---
export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  try {
    // Fetch real experiments from deployed PoX contracts
    const experiments = await fetchLatestExperiments(15)
    
    if (experiments.length === 0) {
      // Fallback to mock data if no experiments exist
      return generateTransactions(15)
    }

    // Convert on-chain experiments to Transaction format for display
    return experiments.map((exp) => ({
      id: `0x${exp.dataHash.slice(2, 10)}`, // First 8 chars of dataHash as TX ID
      network: "Filecoin Cloud" as const,
      type: "Contract Call" as const,
      status: "Confirmed" as const,
      confirmations: 6,
      nodeId: exp.cid.slice(0, 16), // First 16 chars of CID
      timestamp: new Date(exp.submittedAt * 1000).toLocaleTimeString(),
      gasFee: "0.0001",
    }))
  } catch (error) {
    console.error('Failed to fetch blockchain transactions:', error)
    // Fallback to mock data on error
    return generateTransactions(15)
  }
}

export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  try {
    const totalExperiments = await fetchTotalExperiments()
    return {
      avgGas: "0.0001",
      pending: 0,
      blockHeight: `#${totalExperiments}`,
    }
  } catch (error) {
    console.error('Failed to fetch blockchain stats:', error)
    return {
      avgGas: "0.0042",
      pending: 142,
      blockHeight: "#0",
    }
  }
}

// --- HPLC Data Service ---
export async function fetchHplcData(): Promise<HplcData> {
  // Load real trace from public/traces/ directory
  // To use real data: copy JSON files to public/traces/ and uncomment below
  // const { fetchHplcTraceFile } = await import("./hplc-loader")
  // return fetchHplcTraceFile("trace-001.json")
  
  // Fallback to mock data for development
  return {
    sampleId: "#HPLC-8892-X",
    method: "Reverse Phase C18",
    dataPoints: generateHplcData(150),
    metrics: {
      peakPurity: "98.4%",
      retentionShift: "+0.05m",
      areaPercent: "99.1%",
      status: "PASS",
    },
  }
}

// --- VOC Data Service ---
export async function fetchVocData(): Promise<VocData> {
  // TODO: Connect to IoT Sensor Gateway
  return {
    labZone: "Lab Zone B",
    sensorId: "#VOC-204",
    dataPoints: generateVocData(24),
    metrics: {
      avgVoc: "420 ppb",
      pm25Level: "12.4 µg/m³",
      ventilation: "ACTIVE",
      status: "NORMAL",
    },
  }
}
