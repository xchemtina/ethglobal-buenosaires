// packages/experiments/src/scoring.ts

import { DifficultyParams, HPLCAnalysis } from "./types";

export const DEFAULT_DIFFICULTY_PARAMS: DifficultyParams = {
  alpha: 1.0,  // weight on nPeaks
  beta: 8.0,   // weight on noise
  gamma: 0.5,  // weight on log(nPoints)
};

export function computeDifficulty(
  analysis: HPLCAnalysis,
  nPoints: number,
  params: DifficultyParams = DEFAULT_DIFFICULTY_PARAMS
): number {
  const { alpha, beta, gamma } = params;
  const { nPeaks, baselineNoise } = analysis;

  const D =
    1 +
    alpha * nPeaks +
    beta * baselineNoise +
    gamma * Math.log(nPoints);

  return Math.max(1, D);
}

/**
 * Reputation Value:
 *   RV = log(1 + D * v) - λ * Δt
 *
 * For MVP:
 *  - v = 1 for valid
 *  - v = 0 for unverified
 *  - invalid is handled as negative log(1 + D)
 * Time decay is in days.
 */
export type ValidationStatus = "valid" | "invalid" | "unverified";

export interface RVParams {
  difficulty: number;
  validation: ValidationStatus;
  submittedAt: number;   // ms since epoch
  now?: number;          // override for tests; default Date.now()
  lambdaPerDay?: number; // decay per day
}

export function computeRV({
  difficulty,
  validation,
  submittedAt,
  now = Date.now(),
  lambdaPerDay = 0.01,
}: RVParams): number {
  const deltaDays = (now - submittedAt) / (1000 * 60 * 60 * 24);

  let base: number;
  if (validation === "valid") {
    base = Math.log(1 + difficulty);
  } else if (validation === "invalid") {
    base = -Math.log(1 + difficulty);
  } else {
    base = 0;
  }

  const rv = base - lambdaPerDay * deltaDays;
  return rv;
}

// Scale RV to an on-chain integer (e.g. 1e6 precision)
export const RV_SCALE = 1_000_000;

export function scaleRVForOnchain(rv: number): bigint {
  return BigInt(Math.round(rv * RV_SCALE));
}
