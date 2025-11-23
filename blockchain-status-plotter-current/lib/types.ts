// --- Blockchain Data Types ---
export type EventStatus = "Indexed" | "Pending" | "Failed"

export type GraphEvent = {
  id: string
  subgraph: string // e.g., "lab-nodes/hplc-v1"
  eventName: "SignalDetected" | "AnalysisCompleted" | "DataUploaded" | "Calibration" | "DataStored"
  blockNumber: number
  timestamp: string
  status: EventStatus
  cid?: string
}

export type BlockchainStats = {
  indexRate: string // e.g., "45 events/min"
  pendingEvents: number
  latestBlock: string
}

// --- HPLC Data Types ---
export type HplcDataPoint = {
  time: number // minutes
  experimental: number // mAU
  theoretical: number // mAU
}

export type ExperimentStatus = "IDLE" | "UPLOADING" | "ON_CHAIN" | "ANALYZING"

export type AnalysisType = "Peak Integration" | "Purity Check" | "Baseline Correction"

export type IntegratedPeak = {
  startTime: number
  endTime: number
  area: number
}

export type AnalysisResult = {
  type: AnalysisType
  value: string
  details?: string
  timestamp: string
  processedData?: HplcDataPoint[] // For baseline correction
  detectedPeaks?: IntegratedPeak[] // For peak integration
}

export type HplcMetrics = {
  peakPurity: string
  retentionShift: string
  areaPercent: string
  status: string
  cid?: string
  uploadStatus: ExperimentStatus
  lastSync?: string
  visibility: "public" | "private"
  analysisResults?: AnalysisResult[]
}

export type HplcData = {
  sampleId: string
  method: string
  dataPoints: HplcDataPoint[]
  metrics: HplcMetrics
}

// --- VOC Data Types ---
export type VocDataPoint = {
  time: string
  voc: number // ppb
  particulates: number // µg/m³
}

export type VocMetrics = {
  avgVoc: string
  pm25Level: string
  ventilation: string
  status: string
}

export type VocData = {
  labZone: string
  sensorId: string
  dataPoints: VocDataPoint[]
  metrics: VocMetrics
}

// --- Air Quality Data Types (RPi5 Integration) ---
export type AirQualityDataPoint = {
  time: number // seconds
  formaldehyde: number // ppb
  pm2_5: number // μg/m³
  light: number // ADC value
}

export type AirQualityMetrics = {
  avg_formaldehyde_ppb: number
  max_formaldehyde_ppb: number
  avg_pm2_5_ugm3: number
  max_pm2_5_ugm3: number
  humidity_rh: number
  temperature_c: number
  light_level: number
  air_quality_index: number
  status: string
}

export type AirQualityData = {
  sampleId: string
  experimentType: "AIR_QUALITY" | "HPLC"
  method: string
  sensors: string[]
  location: string
  device: string
  timestamp: string
  dataPoints: AirQualityDataPoint[]
  metrics: AirQualityMetrics
  scenario: "good" | "moderate" | "unhealthy_sensitive" | "unhealthy" | "hazardous"
  cid?: string
  onChainId?: number
}
