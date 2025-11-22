import type {
  Transaction,
  BlockchainStats,
  HplcData,
  VocData,
  AnalysisType,
  AnalysisResult,
  IntegratedPeak,
} from "./types"
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
      uploadStatus: "IDLE",
      visibility: "private",
    },
  }
}

export async function uploadHplcDataToChain(
  sampleId: string,
  visibility: "public" | "private" = "private",
): Promise<{ cid: string; hash: string }> {
  // Simulate upload delay (Local -> Filecoin Storage)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate FVM transaction delay (Storage Reference -> Smart Contract)
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const prefix = visibility === "private" ? "QmPriv" : "QmPub"

  return {
    cid: `${prefix}beigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`,
    hash: "0x7f9b...3a12",
  }
}

export async function runHplcAnalysis(type: AnalysisType, data: HplcData): Promise<AnalysisResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock analysis logic
  // TODO: Replace these mock transformations with real algorithms (e.g., scipy.signal.detrend or integration logic)
  let result: AnalysisResult

  switch (type) {
    case "Peak Integration":
      // Mock finding the main peak around 6-8 minutes
      const peaks: IntegratedPeak[] = [
        { startTime: 6.0, endTime: 8.5, area: 1240.5 },
        { startTime: 11.2, endTime: 12.8, area: 450.2 },
      ]

      result = {
        type,
        value: "98.5%",
        details: "Identified 2 major peaks. Main peak area: 1240.5 mAU*min.",
        timestamp: new Date().toISOString(),
        detectedPeaks: peaks,
      }
      break

    case "Purity Check":
      result = {
        type,
        value: "PASS",
        details: "Spectral homogeneity confirmed across primary peak (2.4m - 2.8m).",
        timestamp: new Date().toISOString(),
      }
      break

    case "Baseline Correction":
      // Mock a baseline correction algorithm
      // Here we just flatten the data slightly to simulate removing drift
      const correctedData = data.dataPoints.map((point) => ({
        ...point,
        experimental: point.experimental > 5 ? point.experimental * 0.9 : 0, // Flatten baseline noise
      }))

      result = {
        type,
        value: "Corrected",
        details: "Linear drift removed. Baseline flattened.",
        timestamp: new Date().toISOString(),
        processedData: correctedData,
      }
      break
  }

  return result
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
