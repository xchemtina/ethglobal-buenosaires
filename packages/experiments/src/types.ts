// packages/experiments/src/types.ts

export interface HPLCPoint {
  t: number;        // time (e.g. minutes)
  intensity: number;
}

export interface HPLCMetadata {
  instrumentId: string;
  methodId: string;
  operator: string;
  date: string;   // ISO 8601
  seed: string;   // RNG seed for reproducibility
}

export interface HPLCExperiment {
  id: string;             // local id (e.g. "exp-<timestamp>")
  metadata: HPLCMetadata;
  points: HPLCPoint[];
}

export interface HPLCPeak {
  id: number;
  tRetention: number;
  height: number;
  area: number;
}

export interface HPLCAnalysis {
  nPeaks: number;
  peaks: HPLCPeak[];
  baselineNoise: number;
  totalArea: number;
  mainPeakPurity: number;   // mainPeakArea / totalArea
}

export interface DifficultyParams {
  alpha: number;
  beta: number;
  gamma: number;
}

export interface SimulationOptions {
  seed?: string;
  nPoints?: number;
  totalTime?: number;
  nPeaks?: number;
  noiseLevel?: number;
}

export interface PoXComputed {
  experiment: HPLCExperiment;
  analysis: HPLCAnalysis;
  difficulty: number;
  rvInitial: number;         // floating value, before on-chain scaling
  dataHash: string;          // keccak256 hash (0x...)
  metricsHash: string;       // keccak256 hash (0x...)
}
