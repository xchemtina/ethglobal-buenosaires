#!/usr/bin/env tsx
/**
 * NMR Experiment Generator CLI
 * Usage: npm run generate [seed] [complexity]
 * Example: npm run generate 42 moderate
 */

import { generateNMRSpectrum, calculateNMRDifficulty, formatNMRForUpload } from './simulate-nmr.js';
import fs from 'fs';
import path from 'path';

function main() {
  const seed = process.argv[2] ? parseInt(process.argv[2]) : Math.floor(Math.random() * 1000000);
  const complexity = (process.argv[3] || 'moderate') as 'simple' | 'moderate' | 'complex';
  
  console.log(`\n🧪 Generating NMR Experiment`);
  console.log(`   Seed: ${seed}`);
  console.log(`   Complexity: ${complexity}\n`);
  
  // Generate spectrum
  const spectrum = generateNMRSpectrum(seed, complexity);
  const difficulty = calculateNMRDifficulty(spectrum);
  const formatted = formatNMRForUpload(spectrum, difficulty);
  
  // Print summary
  console.log(`📊 Spectrum Details:`);
  console.log(`   Sample ID: ${spectrum.metadata.sampleId}`);
  console.log(`   Nucleus: ${spectrum.metadata.nucleus}`);
  console.log(`   Frequency: ${spectrum.metadata.frequency} MHz`);
  console.log(`   Solvent: ${spectrum.metadata.solvent}`);
  console.log(`   Temperature: ${spectrum.metadata.temperature}K (${spectrum.metadata.temperature - 273}°C)`);
  console.log(`   Data points: ${spectrum.points.length}`);
  console.log(`   Peak groups: ${spectrum.peaks.length}`);
  console.log(`   Difficulty: ${difficulty}\n`);
  
  // Print peak table
  console.log(`📋 Peak List:`);
  console.log(`   δ (ppm)  | Int | Mult      | J (Hz)`);
  console.log(`   ---------|-----|-----------|-------`);
  
  // Group peaks by similar chemical shift (within 0.1 ppm)
  const peakGroups: { shift: number; peaks: typeof spectrum.peaks }[] = [];
  for (const peak of spectrum.peaks) {
    const existingGroup = peakGroups.find(g => Math.abs(g.shift - peak.chemicalShift) < 0.1);
    if (existingGroup) {
      existingGroup.peaks.push(peak);
    } else {
      peakGroups.push({ shift: peak.chemicalShift, peaks: [peak] });
    }
  }
  
  peakGroups.sort((a, b) => b.shift - a.shift); // Sort by chemical shift (high to low)
  
  for (const group of peakGroups) {
    const representativePeak = group.peaks[0];
    const avgShift = group.peaks.reduce((sum, p) => sum + p.chemicalShift, 0) / group.peaks.length;
    const totalInt = group.peaks.reduce((sum, p) => sum + p.integration, 0);
    const mult = representativePeak.multiplicity.charAt(0).toUpperCase();
    const coupling = representativePeak.couplingConstant ? representativePeak.couplingConstant.toFixed(1) : '-';
    
    console.log(`   ${avgShift.toFixed(2).padStart(7)} | ${totalInt.toString().padStart(3)}H | ${representativePeak.multiplicity.padEnd(9)} | ${coupling.padStart(5)}`);
  }
  
  // Save to file
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filename = `${spectrum.metadata.sampleId}.json`;
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(formatted, null, 2));
  
  console.log(`\n✅ Saved to: ${filepath}`);
  console.log(`\n💡 To upload to Filecoin:`);
  console.log(`   cd ../../rpi5`);
  console.log(`   node upload-nmr.mjs ../packages/nmr-experiments/output/${filename}\n`);
}

main();
