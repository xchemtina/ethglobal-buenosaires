// --- Blockchain Data Types ---
export type TransactionStatus = "Confirmed" | "Pending" | "Failed"

export type Transaction = {
  id: string
  network: "Filecoin Cloud" | "Solana"
  type: "Transfer" | "Contract Call" | "Storage Deal" | "Validator Vote"
  status: TransactionStatus
  confirmations: number
  nodeId: string
  timestamp: string
  gasFee: string
}

export type BlockchainStats = {
  avgGas: string
  pending: number
  blockHeight: string
}

// --- HPLC Data Types ---
export type HplcDataPoint = {
  time: number // minutes
  experimental: number // mAU
  theoretical: number // mAU
}

export type HplcMetrics = {
  peakPurity: string
  retentionShift: string
  areaPercent: string
  status: string
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
