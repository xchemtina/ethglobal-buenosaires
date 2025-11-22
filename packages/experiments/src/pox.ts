// packages/experiments/src/pox.ts

import { keccak256, toUtf8Bytes } from "ethers";
import {
  HPLCAnalysis,
  HPLCExperiment,
  PoXComputed,
  SimulationOptions,
} from "./types";
import { simulateHPLC } from "./simulate";
import { analyzeExperiment } from "./analyze";
import { computeDifficulty, computeRV } from "./scoring";

/**
 * Deterministic JSON stringify helper:
 * sorts object keys; arrays kept as-is.
 */
function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    return "[" + obj.map((v) => stableStringify(v)).join(",") + "]";
  }

  const keys = Object.keys(obj).sort();
  const entries = keys.map((k) => `"${k}":${stableStringify(obj[k])}`);
  return `{${entries.join(",")}}`;
}

function hashJson(obj: any): string {
  const s = stableStringify(obj);
  return keccak256(toUtf8Bytes(s));
}

export function computeHashes(
  experiment: HPLCExperiment,
  analysis: HPLCAnalysis
): { dataHash: string; metricsHash: string } {
  const rawData = {
    metadata: experiment.metadata,
    points: experiment.points,
  };
  const metricsData = analysis;

  const dataHash = hashJson(rawData);
  const metricsHash = hashJson(metricsData);

  return { dataHash, metricsHash };
}

// One-shot helper for CLI: simulate → analyze → score → hashes
export function generatePoXExperiment(
  opts: SimulationOptions = {}
): PoXComputed {
  const experiment = simulateHPLC(opts);
  const analysis = analyzeExperiment(experiment);
  const difficulty = computeDifficulty(analysis, experiment.points.length);

  const submittedAt = Date.now();
  const rvInitial = computeRV({
    difficulty,
    validation: "valid",
    submittedAt,
    now: submittedAt,
  });

  const { dataHash, metricsHash } = computeHashes(experiment, analysis);

  return {
    experiment,
    analysis,
    difficulty,
    rvInitial,
    dataHash,
    metricsHash,
  };
}
