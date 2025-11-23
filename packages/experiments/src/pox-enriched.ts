#!/usr/bin/env node
/**
 * PoX Enriched Experiment Generator
 * Generates HPLC experiments with Level 2 metadata for maximum reputation
 */

import { simulateHPLC } from "./simulate.js";
import { analyzeExperiment } from "./analyze.js";
import { computeDifficulty, computeRV, scaleRVForOnchain } from "./scoring.js";
import { generateHPLCMetadata, calculateMetadataMultiplier, type ExperimentMetadata } from "./metadata-generator.js";
import { createHash } from "crypto";

interface EnrichedExperiment {
  // Metadata (Level 2)
  metadata: ExperimentMetadata;
  
  // Trace data
  trace: {
    times: number[];
    signals: number[];
  };
  
  // Analysis results
  analysis: {
    nPeaks: number;
    baselineNoise: number;
    avgArea: number;
    peaks: Array<{
      time: number;
      height: number;
      area: number;
    }>;
  };
  
  // Difficulty & Reputation
  scoring: {
    baseDifficulty: number;
    metadataMultiplier: number;
    techniqueMultiplier: number;
    finalDifficulty: number;
    initialRV: number;
    scaledRV: string;
  };
  
  // Fraud proof hashes
  hashes: {
    dataHash: string;
    metricsHash: string;
  };
  
  // Blockchain submission data
  submission: {
    cid: string; // Placeholder - will be filled after Filecoin upload
    dataHash: string;
    metricsHash: string;
    difficulty: number;
    initialRV: string;
  };
}

/**
 * Generate a single enriched HPLC experiment
 */
function generateEnrichedExperiment(seed: number = Date.now()): EnrichedExperiment {
  console.log(`🧪 Generating enriched experiment (seed: ${seed})...`);
  
  // 1. Generate Level 2 metadata
  const metadata = generateHPLCMetadata(seed);
  console.log(`✓ Metadata: ${metadata.instrument.manufacturer} ${metadata.instrument.model}`);
  console.log(`  Institution: ${metadata.instrument.location.institution}`);
  console.log(`  Sample: ${metadata.sample.name} (${metadata.sample.casNumber})`);
  
  // 2. Simulate HPLC trace
  const experiment = simulateHPLC({ seed: seed.toString(), nPoints: 1024, nPeaks: 5 });
  console.log(`✓ Simulated ${experiment.points.length} data points`);
  
  // 3. Analyze trace
  const analysis = analyzeExperiment(experiment);
  console.log(`✓ Analysis: ${analysis.nPeaks} peaks, noise=${analysis.baselineNoise.toFixed(4)}`);
  
  // 4. Calculate difficulty with metadata multiplier
  const metadataMultiplier = calculateMetadataMultiplier(metadata);
  const techniqueMultiplier = 1.0; // HPLC base technique
  
  // Import computeBaseDifficulty for detailed logging
  const baseDifficulty = 1 + 
    1.0 * analysis.nPeaks + 
    8.0 * analysis.baselineNoise + 
    0.5 * Math.log(experiment.points.length);
  
  const finalDifficulty = baseDifficulty * metadataMultiplier * techniqueMultiplier;
  
  console.log(`✓ Difficulty:`);
  console.log(`  Base (analytical): ${baseDifficulty.toFixed(2)}`);
  console.log(`  Metadata multiplier: ${metadataMultiplier.toFixed(2)}x (Level ${metadata.metadataLevel})`);
  console.log(`  Final: ${finalDifficulty.toFixed(2)}`);
  
  // 5. Calculate initial reputation value
  const initialRV = computeRV({
    difficulty: finalDifficulty,
    validation: "valid",
    submittedAt: Date.now()
  });
  const scaledRV = scaleRVForOnchain(initialRV).toString();
  
  console.log(`✓ Initial RV: ${initialRV.toFixed(6)} (scaled: ${scaledRV})`);
  
  // 6. Compute fraud proof hashes
  const traceData = {
    times: experiment.points.map(p => p.t),
    signals: experiment.points.map(p => p.intensity)
  };
  
  const dataPayload = {
    metadata,
    trace: traceData,
    timestamp: metadata.timestamp
  };
  
  const metricsPayload = {
    nPeaks: analysis.nPeaks,
    baselineNoise: analysis.baselineNoise,
    avgArea: analysis.avgArea,
    peaks: analysis.peaks
  };
  
  // Deterministic JSON serialization
  const dataJson = JSON.stringify(dataPayload, Object.keys(dataPayload).sort());
  const metricsJson = JSON.stringify(metricsPayload, Object.keys(metricsPayload).sort());
  
  const dataHash = createHash("sha256").update(dataJson).digest("hex");
  const metricsHash = createHash("sha256").update(metricsJson).digest("hex");
  
  console.log(`✓ Hashes:`);
  console.log(`  dataHash: ${dataHash.substring(0, 16)}...`);
  console.log(`  metricsHash: ${metricsHash.substring(0, 16)}...`);
  
  // 7. Package everything
  const enrichedExperiment: EnrichedExperiment = {
    metadata,
    trace: traceData,
    analysis: {
      nPeaks: analysis.nPeaks,
      baselineNoise: analysis.baselineNoise,
      avgArea: analysis.avgArea,
      peaks: analysis.peaks
    },
    scoring: {
      baseDifficulty,
      metadataMultiplier,
      techniqueMultiplier,
      finalDifficulty,
      initialRV,
      scaledRV
    },
    hashes: {
      dataHash: `0x${dataHash}`,
      metricsHash: `0x${metricsHash}`
    },
    submission: {
      cid: "PLACEHOLDER_UPLOAD_TO_FILECOIN",
      dataHash: `0x${dataHash}`,
      metricsHash: `0x${metricsHash}`,
      difficulty: Math.round(finalDifficulty),
      initialRV: scaledRV
    }
  };
  
  return enrichedExperiment;
}

/**
 * Main execution
 */
function main() {
  console.log("=".repeat(60));
  console.log("PoX Enriched Experiment Generator");
  console.log("Level 2 Metadata - 2.0x Reputation Multiplier");
  console.log("=".repeat(60));
  console.log();
  
  // Generate experiment
  const seed = Date.now();
  const experiment = generateEnrichedExperiment(seed);
  
  console.log();
  console.log("=".repeat(60));
  console.log("📊 EXPERIMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Technique: ${experiment.metadata.experimentType}`);
  console.log(`Instrument: ${experiment.metadata.instrument.manufacturer} ${experiment.metadata.instrument.model}`);
  console.log(`Institution: ${experiment.metadata.instrument.location.institution}, ${experiment.metadata.instrument.location.country}`);
  console.log(`Sample: ${experiment.metadata.sample.name}`);
  console.log(`Column: ${experiment.metadata.method.column.type} (${experiment.metadata.method.column.manufacturer})`);
  console.log(`Difficulty: ${experiment.scoring.finalDifficulty.toFixed(2)} (${experiment.scoring.metadataMultiplier}x metadata bonus)`);
  console.log(`Initial RV: ${experiment.scoring.initialRV.toFixed(6)}`);
  console.log();
  console.log("Ready for Filecoin upload + on-chain registration!");
  console.log("=".repeat(60));
  
  // Save to file
  const output = JSON.stringify(experiment, null, 2);
  console.log();
  console.log("JSON Output:");
  console.log(output);
  
  return experiment;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateEnrichedExperiment, type EnrichedExperiment };
