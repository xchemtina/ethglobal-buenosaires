// packages/experiments/src/simulate.ts

import { makeRng } from "./rng";
import {
  HPLCExperiment,
  HPLCMetadata,
  HPLCPoint,
  SimulationOptions,
} from "./types";

export function simulateHPLC(opts: SimulationOptions = {}): HPLCExperiment {
  const seed = opts.seed ?? `seed-${Date.now()}`;
  const nPoints = opts.nPoints ?? 1024;
  const totalTime = opts.totalTime ?? 10; // minutes
  const nPeaks = opts.nPeaks ?? 3;
  const noiseLevel = opts.noiseLevel ?? 0.02;

  const rand = makeRng(seed);

  const metadata: HPLCMetadata = {
    instrumentId: "SIM-HPLC-01",
    methodId: "SIM-METHOD-01",
    operator: "simulator",
    date: new Date().toISOString(),
    seed,
  };

  // Random peak centers, heights, widths
  const peaks = Array.from({ length: nPeaks }, () => {
    const center = rand() * totalTime * 0.9 + totalTime * 0.05;
    const height = 1 + rand() * 4;          // 1–5 arbitrary units
    const width = 0.1 + rand() * 0.4;       // 0.1–0.5 time units
    return { center, height, width };
  });

  const dt = totalTime / (nPoints - 1);
  const points: HPLCPoint[] = [];

  for (let i = 0; i < nPoints; i++) {
    const t = i * dt;

    let intensity = 0;
    for (const p of peaks) {
      const x = (t - p.center) / p.width;
      const gauss = Math.exp(-0.5 * x * x);
      intensity += p.height * gauss;
    }

    // Add Gaussian-ish noise
    const eps =
      (rand() + rand() + rand() - 1.5) * 2 * noiseLevel; // approx N(0, noiseLevel)
    intensity = Math.max(0, intensity + eps);

    points.push({ t, intensity });
  }

  const experiment: HPLCExperiment = {
    id: `exp-${Date.now()}`,
    metadata,
    points,
  };

  return experiment;
}
