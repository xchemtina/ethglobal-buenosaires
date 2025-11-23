// Mock Data Generators

// --- Blockchain Data ---

export type Transaction = {
  id: string
  network: "Filecoin Cloud" | "Solana"
  type: "Transfer" | "Contract Call" | "Storage Deal" | "Validator Vote"
  status: "Confirmed" | "Pending" | "Failed"
  confirmations: number
  nodeId: string
  timestamp: string
  gasFee: string
}

const NODES = ["Node-Alpha", "Node-Beta", "Node-Gamma", "Validator-01", "Validator-02"]

export function generateTransactions(count = 10): Transaction[] {
  return Array.from({ length: count })
    .map((_, i) => {
      const isSolana = Math.random() > 0.5
      const network = isSolana ? "Solana" : "Filecoin Cloud"
      const statusRandom = Math.random()
      const status = statusRandom > 0.2 ? "Confirmed" : statusRandom > 0.1 ? "Pending" : "Failed"

      return {
        id: `tx-${Math.random().toString(36).substring(2, 9)}`,
        network,
        type: isSolana ? "Transfer" : "Storage Deal",
        status,
        confirmations: status === "Confirmed" ? Math.floor(Math.random() * 100) + 1 : 0,
        nodeId: NODES[Math.floor(Math.random() * NODES.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
        gasFee: (Math.random() * 0.01).toFixed(6),
      }
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// --- HPLC Data ---

export type HplcDataPoint = {
  time: number // minutes
  experimental: number // mAU
  theoretical: number // mAU
}

// Gaussian function for peak generation
function gaussian(x: number, height: number, pos: number, width: number) {
  return height * Math.exp(-Math.pow(x - pos, 2) / (2 * Math.pow(width, 2)))
}

export function generateHplcData(points = 200): HplcDataPoint[] {
  const data: HplcDataPoint[] = []
  const maxTime = 10 // minutes

  // Define peaks (Height, Position, Width)
  const peaks = [
    { h: 80, p: 2.5, w: 0.15 },
    { h: 150, p: 4.2, w: 0.2 },
    { h: 40, p: 6.8, w: 0.3 },
    { h: 90, p: 8.1, w: 0.18 },
  ]

  for (let i = 0; i < points; i++) {
    const time = (i / points) * maxTime

    // Calculate Theoretical (perfect gaussian sum)
    let theoretical = 0
    peaks.forEach((peak) => {
      theoretical += gaussian(time, peak.h, peak.p, peak.w)
    })

    // Add baseline drift
    theoretical += time * 2

    // Calculate Experimental (theoretical + noise + shift)
    let experimental = 0
    // Slight retention time shift for experimental
    peaks.forEach((peak) => {
      experimental += gaussian(time, peak.h * 0.95, peak.p + 0.05, peak.w * 1.1)
    })

    // Add baseline drift + noise
    experimental += time * 2.1 + (Math.random() - 0.5) * 5

    // Ensure no negative values for absorbance
    data.push({
      time: Number(time.toFixed(2)),
      experimental: Math.max(0, Number(experimental.toFixed(2))),
      theoretical: Math.max(0, Number(theoretical.toFixed(2))),
    })
  }

  return data
}

// --- VOC Data ---

export type VocDataPoint = {
  time: string
  voc: number // ppb
  particulates: number // µg/m³
}

export function generateVocData(points = 24): VocDataPoint[] {
  const data: VocDataPoint[] = []
  const now = new Date()

  let currentVoc = 450 // Starting baseline for VOC
  let currentPm = 12 // Starting baseline for PM2.5

  for (let i = 0; i < points; i++) {
    const time = new Date(now.getTime() - (points - 1 - i) * 15 * 60 * 1000) // 15 min intervals

    // Random walk for realistic sensor data
    currentVoc += (Math.random() - 0.5) * 50
    currentPm += (Math.random() - 0.5) * 5

    // Constrain values
    currentVoc = Math.max(200, Math.min(800, currentVoc))
    currentPm = Math.max(5, Math.min(35, currentPm))

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      voc: Math.round(currentVoc),
      particulates: Number(currentPm.toFixed(1)),
    })
  }
  return data
}
