import type { Transaction, BlockchainStats, HplcData, VocData } from "./types"
import { generateHplcData, generateTransactions, generateVocData } from "./mock-data"

// --- Blockchain Data Service ---
// TODO: Integration Point for Filecoin Cloud
// Replace this mock implementation with actual API calls using fetch()
// e.g., const response = await fetch('https://api.filecoin-cloud.io/v1/transactions', { headers: { 'Authorization': 'Bearer ...' } })
export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  // For now, return realistic mock data to simulate the feed
  return generateTransactions(15)
}

export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  // TODO: Fetch live chain stats from Filecoin/Solana RPC nodes
  return {
    avgGas: "0.0042",
    pending: 142,
    blockHeight: "#892,120",
  }
}

// --- HPLC Data Service ---
export async function fetchHplcData(): Promise<HplcData> {
  // TODO: Connect to Lab Instrument API or LIMS database
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
