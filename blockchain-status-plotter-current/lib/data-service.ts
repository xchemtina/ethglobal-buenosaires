import type {
  BlockchainStats,
  HplcData,
  VocData,
  AnalysisType,
  AnalysisResult,
  IntegratedPeak,
  GraphEvent,
} from "./types"
import { generateHplcData, generateVocData } from "./mock-data"
import { fetchLatestExperiments, fetchTotalExperiments } from "./web3-service"

// --- Blockchain Data Service ---
// TODO: Integration Point for Filecoin Cloud
// Replace this mock implementation with actual API calls using fetch()
// e.g., const response = await fetch('https://api.filecoin-cloud.io/v1/transactions', { headers: { 'Authorization': 'Bearer ...' } })

export async function fetchGraphEvents(): Promise<GraphEvent[]> {
  try {
    // Fetch real experiments from deployed PoX contracts
    const experiments = await fetchLatestExperiments(20)
    
    if (experiments.length === 0) {
      // Fallback to mock data if no experiments exist
      const events: GraphEvent[] = Array.from({ length: 20 }).map((_, i) => {
        const types: GraphEvent["eventName"][] = [
          "SignalDetected",
          "AnalysisCompleted",
          "DataUploaded",
          "Calibration",
          "DataStored",
        ]
        const subgraphs = ["chimia-dao/ChimiaDAO-PoX"]

        const eventType = types[Math.floor(Math.random() * types.length)]
        const cid =
          eventType === "DataStored"
            ? `Qm${Math.random().toString(36).substring(7)}...${Math.random().toString(36).substring(7)}`
            : undefined

        return {
          id: `0x${Math.random().toString(16).slice(2, 10)}...`,
          subgraph: subgraphs[0],
          eventName: eventType,
          blockNumber: 18450000 + i,
          timestamp: new Date(Date.now() - i * 10000).toISOString(),
          status: Math.random() > 0.8 ? "Pending" : "Indexed",
          cid,
        }
      })
      return events
    }

    // Convert on-chain experiments to GraphEvent format for display
    return experiments.map((exp) => ({
      id: `0x${exp.dataHash.slice(2, 10)}`,
      subgraph: "chimia-dao/ChimiaDAO-PoX",
      eventName: "DataStored" as const,
      blockNumber: 18450000 + exp.id,
      timestamp: new Date(exp.submittedAt * 1000).toISOString(),
      status: "Indexed" as const,
      cid: exp.cid,
    }))
  } catch (error) {
    console.error('Failed to fetch graph events:', error)
    // Fallback to mock data on error
    const events: GraphEvent[] = Array.from({ length: 20 }).map((_, i) => {
      const types: GraphEvent["eventName"][] = [
        "SignalDetected",
        "AnalysisCompleted",
        "DataUploaded",
        "Calibration",
        "DataStored",
      ]
      const subgraphs = ["chimia-dao/ChimiaDAO-PoX"]

      const eventType = types[Math.floor(Math.random() * types.length)]
      const cid =
        eventType === "DataStored"
          ? `Qm${Math.random().toString(36).substring(7)}...${Math.random().toString(36).substring(7)}`
          : undefined

      return {
        id: `0x${Math.random().toString(16).slice(2, 10)}...`,
        subgraph: subgraphs[0],
        eventName: eventType,
        blockNumber: 18450000 + i,
        timestamp: new Date(Date.now() - i * 10000).toISOString(),
        status: Math.random() > 0.8 ? "Pending" : "Indexed",
        cid,
      }
    })
    return events
  }
}

export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  try {
    const totalExperiments = await fetchTotalExperiments()
    return {
      indexRate: totalExperiments > 0 ? "124 ev/min" : "0 ev/min",
      pendingEvents: 0,
      latestBlock: `#${totalExperiments}`,
    }
  } catch (error) {
    console.error('Failed to fetch blockchain stats:', error)
    return {
      indexRate: "124 ev/min",
      pendingEvents: 12,
      latestBlock: "#0",
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

export async function queryScienceAssistant(query: string, context: any): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate thinking

  const q = query.toLowerCase()

  if (q.includes("cid") || q.includes("filecoin")) {
    return `Searching Filecoin storage... 
    Found CID: QmPriv...7x9
    - Provider: Miner f01234
    - Deal Status: Active
    - Verified: True
    
    Metadata from The Graph:
    - Sample ID: ${context?.hplc?.sampleId || "Unknown"}
    - Timestamp: ${new Date().toISOString()}
    `
  }

  if (q.includes("private") || q.includes("hidden")) {
    return `Accessing local secure enclave...
    
    Found 1 private analysis record:
    - Type: Purity Check (Detailed)
    - Result: 99.98% (Above reporting threshold)
    - Note: Contains proprietary baseline correction parameters.
    
    This data was NOT published to the chain.`
  }

  if (q.includes("status") || q.includes("graph")) {
    return `Current Indexer Status:
    - Subgraph: ChimiaDAO-PoX
    - Health: Healthy
    - Sync: 99.9%
    
    Latest event: AnalysisCompleted for Sample ${context?.hplc?.sampleId || "Unknown"}`
  }

  return "I can help you query indexed metadata from The Graph, check Filecoin storage deals, or retrieve private local analysis results. What would you like to know?"
}
