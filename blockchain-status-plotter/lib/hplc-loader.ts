// lib/hplc-loader.ts
import type { HplcData, HplcDataPoint } from "./types"

interface HPLCJsonPoint {
  time: number
  signal: number
}

interface HPLCJsonFile {
  sampleId: string
  experimentType: string
  method: string
  points: HPLCJsonPoint[]
  metrics?: {
    peakCount?: number
    peakPurity?: number
    areaPercent?: number
    retentionShift?: number
  }
}

/**
 * Load HPLC trace from JSON file structure
 * Transforms Python-generated traces to frontend format
 */
export function loadHplcTrace(jsonData: HPLCJsonFile): HplcData {
  // Transform points: map signal → experimental, theoretical = experimental (single trace)
  const dataPoints: HplcDataPoint[] = jsonData.points.map((pt) => ({
    time: Number(pt.time.toFixed(2)),
    experimental: Number(pt.signal.toFixed(3)),
    theoretical: Number(pt.signal.toFixed(3)), // Same as experimental for real data
  }))

  // Extract or compute metrics
  const metrics = jsonData.metrics || {}
  
  return {
    sampleId: jsonData.sampleId,
    method: jsonData.method || "Unknown Method",
    dataPoints,
    metrics: {
      peakPurity: metrics.peakPurity ? `${(metrics.peakPurity * 100).toFixed(1)}%` : "N/A",
      retentionShift: metrics.retentionShift ? `${metrics.retentionShift.toFixed(2)}m` : "N/A",
      areaPercent: metrics.areaPercent ? `${(metrics.areaPercent * 100).toFixed(1)}%` : "N/A",
      status: "LOADED", // Real data doesn't have pass/fail yet
    },
  }
}

/**
 * Fetch HPLC trace from public directory
 * Place your JSON files in public/traces/
 */
export async function fetchHplcTraceFile(filename: string): Promise<HplcData> {
  const response = await fetch(`/traces/${filename}`)
  if (!response.ok) {
    throw new Error(`Failed to load trace: ${filename}`)
  }
  const jsonData: HPLCJsonFile = await response.json()
  return loadHplcTrace(jsonData)
}
