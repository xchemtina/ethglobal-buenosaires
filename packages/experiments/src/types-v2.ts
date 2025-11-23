// packages/experiments/src/types-v2.ts
/**
 * Type definitions for PoX V2 with experiment type support
 */

export enum ExperimentType {
  UNKNOWN = 0,
  HPLC = 1,
  NMR_1H = 2,
  NMR_13C = 3,
  NMR_2D = 4,
  PXRD = 5,
  MS = 6,
  MS_MS = 7,
  GC_MS = 8,
  AIR_QUALITY = 9,
}

export enum ReviewType {
  VERIFICATION = 0,      // Confirms data is correct
  REINTERPRETATION = 1,  // Proposes alternative analysis
  ERROR_DETECTION = 2,   // Flags errors/mistakes
}

export interface ExperimentV2 {
  id: number;
  submitter: string;
  cid: string;
  dataHash: string;
  metricsHash: string;
  difficulty: number;
  initialRV: number;
  submittedAt: number;
  expType: ExperimentType;
}

export interface PeerReview {
  id: number;
  experimentId: number;
  reviewer: string;
  alternativeHash: string;
  justificationCID: string;
  reviewType: ReviewType;
  submittedAt: number;
  resolved: boolean;
  originalValid: boolean;
}

export interface ReputationMultipliers {
  [ExperimentType.UNKNOWN]: number;
  [ExperimentType.HPLC]: number;
  [ExperimentType.NMR_1H]: number;
  [ExperimentType.NMR_13C]: number;
  [ExperimentType.NMR_2D]: number;
  [ExperimentType.PXRD]: number;
  [ExperimentType.MS]: number;
  [ExperimentType.MS_MS]: number;
  [ExperimentType.GC_MS]: number;
  [ExperimentType.AIR_QUALITY]: number;
}

// Default reputation multipliers (scaled by 10)
export const DEFAULT_MULTIPLIERS: ReputationMultipliers = {
  [ExperimentType.UNKNOWN]: 10,      // 1×
  [ExperimentType.HPLC]: 10,         // 1×
  [ExperimentType.NMR_1H]: 20,       // 2×
  [ExperimentType.NMR_13C]: 20,      // 2×
  [ExperimentType.NMR_2D]: 25,       // 2.5×
  [ExperimentType.PXRD]: 30,         // 3× (highest!)
  [ExperimentType.MS]: 15,           // 1.5×
  [ExperimentType.MS_MS]: 20,        // 2×
  [ExperimentType.GC_MS]: 15,        // 1.5×
  [ExperimentType.AIR_QUALITY]: 10,  // 1×
};

// Type detection based on difficulty (matches Solidity logic)
export function detectExperimentType(difficulty: number): ExperimentType {
  if (difficulty >= 50) {
    return ExperimentType.NMR_1H;
  } else if (difficulty >= 25) {
    return ExperimentType.AIR_QUALITY;
  } else if (difficulty >= 10) {
    return ExperimentType.HPLC;
  } else {
    return ExperimentType.UNKNOWN;
  }
}

// Human-readable labels
export const EXPERIMENT_TYPE_LABELS: Record<ExperimentType, string> = {
  [ExperimentType.UNKNOWN]: "Unknown",
  [ExperimentType.HPLC]: "HPLC",
  [ExperimentType.NMR_1H]: "¹H NMR",
  [ExperimentType.NMR_13C]: "¹³C NMR",
  [ExperimentType.NMR_2D]: "2D NMR",
  [ExperimentType.PXRD]: "PXRD",
  [ExperimentType.MS]: "MS",
  [ExperimentType.MS_MS]: "MS/MS",
  [ExperimentType.GC_MS]: "GC-MS",
  [ExperimentType.AIR_QUALITY]: "Air Quality",
};

export const REVIEW_TYPE_LABELS: Record<ReviewType, string> = {
  [ReviewType.VERIFICATION]: "Verification",
  [ReviewType.REINTERPRETATION]: "Reinterpretation",
  [ReviewType.ERROR_DETECTION]: "Error Detection",
};

// Type guards
export function isExperimentV2(exp: any): exp is ExperimentV2 {
  return (
    typeof exp === 'object' &&
    exp !== null &&
    'expType' in exp &&
    typeof exp.expType === 'number'
  );
}

export function isPeerReview(review: any): review is PeerReview {
  return (
    typeof review === 'object' &&
    review !== null &&
    'reviewType' in review &&
    'alternativeHash' in review &&
    'justificationCID' in review
  );
}

// Reputation calculation helpers
export function calculateReviewReward(
  difficulty: number,
  expType: ExperimentType,
  originalValid: boolean,
  isReviewer: boolean
): number {
  const multiplier = DEFAULT_MULTIPLIERS[expType] / 10; // Convert from scaled (10 = 1×)
  
  if (originalValid) {
    // Experiment is correct
    if (isReviewer) {
      // Reviewer gets 10% of full reward for verification
      return Math.floor((difficulty * multiplier) / 10);
    } else {
      // Submitter gets full reward
      return Math.floor(difficulty * multiplier);
    }
  } else {
    // Experiment has error
    if (isReviewer) {
      // Reviewer gets full reward for finding error
      return Math.floor(difficulty * multiplier);
    } else {
      // Submitter gets slashed
      return -Math.floor(difficulty * multiplier);
    }
  }
}

// Badge colors for UI
export const EXPERIMENT_TYPE_COLORS: Record<ExperimentType, string> = {
  [ExperimentType.UNKNOWN]: "gray",
  [ExperimentType.HPLC]: "blue",
  [ExperimentType.NMR_1H]: "purple",
  [ExperimentType.NMR_13C]: "purple",
  [ExperimentType.NMR_2D]: "purple",
  [ExperimentType.PXRD]: "red",      // Highest error rate!
  [ExperimentType.MS]: "green",
  [ExperimentType.MS_MS]: "green",
  [ExperimentType.GC_MS]: "green",
  [ExperimentType.AIR_QUALITY]: "orange",
};

export const REVIEW_TYPE_COLORS: Record<ReviewType, string> = {
  [ReviewType.VERIFICATION]: "green",
  [ReviewType.REINTERPRETATION]: "blue",
  [ReviewType.ERROR_DETECTION]: "red",
};
