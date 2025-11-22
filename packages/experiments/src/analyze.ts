// packages/experiments/src/analyze.ts

import { HPLCAnalysis, HPLCExperiment, HPLCPeak } from "./types";

export function analyzeExperiment(experiment: HPLCExperiment): HPLCAnalysis {
  const { points } = experiment;
  if (points.length < 3) {
    return {
      nPeaks: 0,
      peaks: [],
      baselineNoise: 0,
      totalArea: 0,
      mainPeakPurity: 0,
    };
  }

  const intensities = points.map((p) => p.intensity);
  const times = points.map((p) => p.t);

  // Estimate baseline noise as standard deviation of the lowest 20% intensities
  const sorted = [...intensities].sort((a, b) => a - b);
  const lowCount = Math.max(5, Math.floor(sorted.length * 0.2));
  const baselineSlice = sorted.slice(0, lowCount);
  const mean =
    baselineSlice.reduce((acc, x) => acc + x, 0) / baselineSlice.length;
  const variance =
    baselineSlice.reduce((acc, x) => acc + (x - mean) ** 2, 0) /
    baselineSlice.length;
  const baselineNoise = Math.sqrt(variance);

  // Total area via trapezoidal rule
  let totalArea = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dt = times[i + 1] - times[i];
    totalArea += dt * (intensities[i] + intensities[i + 1]) * 0.5;
  }

  const minPeakHeight = baselineNoise * 3; // 3σ rule
  const peaks: HPLCPeak[] = [];

  for (let i = 1; i < points.length - 1; i++) {
    const yPrev = intensities[i - 1];
    const y = intensities[i];
    const yNext = intensities[i + 1];

    if (y > yPrev && y > yNext && y > minPeakHeight) {
      const tRetention = times[i];

      // crude local area: integrate ±N points around the peak
      const window = 10;
      const iStart = Math.max(0, i - window);
      const iEnd = Math.min(points.length - 1, i + window);

      let area = 0;
      for (let j = iStart; j < iEnd; j++) {
        const dt = times[j + 1] - times[j];
        area += dt * (intensities[j] + intensities[j + 1]) * 0.5;
      }

      peaks.push({
        id: peaks.length,
        tRetention,
        height: y,
        area,
      });
    }
  }

  const mainPeak = peaks.reduce(
    (max, p) => (p.area > max.area ? p : max),
    peaks[0] ?? { area: 0, height: 0, id: -1, tRetention: 0 }
  );

  const mainPeakPurity = totalArea > 0 ? mainPeak.area / totalArea : 0;

  return {
    nPeaks: peaks.length,
    peaks,
    baselineNoise,
    totalArea,
    mainPeakPurity,
  };
}
