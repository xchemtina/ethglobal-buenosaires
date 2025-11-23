#!/usr/bin/env tsx
/**
 * Batch NMR Experiment Generator
 * Generates multiple NMR experiments with varied complexity
 * Usage: npm run batch [count]
 */

import { generateNMRSpectrum, calculateNMRDifficulty, formatNMRForUpload } from './simulate-nmr.js';
import fs from 'fs';
import path from 'path';

function main() {
  const count = process.argv[2] ? parseInt(process.argv[2]) : 10;
  const complexities: Array<'simple' | 'moderate' | 'complex'> = ['simple', 'moderate', 'complex'];
  
  console.log(`\n🧪 Batch Generating ${count} NMR Experiments\n`);
  console.log(`ID      | Seed    | Complexity | Peaks | Difficulty`);
  console.log(`--------|---------|------------|-------|------------`);
  
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const experiments: any[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use sequential seeds for reproducibility
    const seed = 1000 + i;
    
    // Vary complexity: 40% simple, 40% moderate, 20% complex
    const rand = Math.random();
    const complexity = rand < 0.4 ? 'simple' : rand < 0.8 ? 'moderate' : 'complex';
    
    // Generate spectrum
    const spectrum = generateNMRSpectrum(seed, complexity);
    const difficulty = calculateNMRDifficulty(spectrum);
    const formatted = formatNMRForUpload(spectrum, difficulty);
    
    // Save to file
    const filename = `${spectrum.metadata.sampleId}.json`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(formatted, null, 2));
    
    experiments.push({
      id: spectrum.metadata.sampleId,
      seed,
      complexity,
      peaks: spectrum.peaks.length,
      difficulty,
      filepath,
    });
    
    console.log(
      `${spectrum.metadata.sampleId} | ${seed.toString().padEnd(7)} | ${complexity.padEnd(10)} | ${spectrum.peaks.length.toString().padStart(5)} | ${difficulty.toString().padStart(10)}`
    );
  }
  
  console.log(`\n✅ Generated ${count} experiments in ${outputDir}/`);
  console.log(`\n📊 Statistics:`);
  console.log(`   Simple: ${experiments.filter(e => e.complexity === 'simple').length}`);
  console.log(`   Moderate: ${experiments.filter(e => e.complexity === 'moderate').length}`);
  console.log(`   Complex: ${experiments.filter(e => e.complexity === 'complex').length}`);
  console.log(`   Avg difficulty: ${(experiments.reduce((sum, e) => sum + e.difficulty, 0) / count).toFixed(1)}`);
  console.log(`   Difficulty range: ${Math.min(...experiments.map(e => e.difficulty))} - ${Math.max(...experiments.map(e => e.difficulty))}`);
  
  // Create batch upload script
  const batchScript = experiments.map(e => 
    `echo "Uploading ${e.id}..."; node upload-nmr.mjs ${e.filepath}`
  ).join(' && ');
  
  const scriptPath = path.join(outputDir, 'batch-upload.sh');
  fs.writeFileSync(scriptPath, `#!/bin/bash\ncd ../../rpi5\n${batchScript}\n`);
  fs.chmodSync(scriptPath, '755');
  
  console.log(`\n💡 To upload all experiments:`);
  console.log(`   cd ${outputDir}`);
  console.log(`   ./batch-upload.sh\n`);
}

main();
