/**
 * NMR (Nuclear Magnetic Resonance) Experiment Simulator
 * Generates synthetic ¹H NMR spectra with realistic chemical shifts and multiplets
 * 
 * NMR Basics:
 * - Chemical shift (δ, ppm): Position of signal relative to reference (TMS = 0 ppm)
 * - Coupling constant (J, Hz): Splitting pattern due to neighboring protons
 * - Integration: Area under peak (proportional to number of protons)
 * - Multiplicity: Singlet (s), Doublet (d), Triplet (t), Quartet (q), Multiplet (m)
 */

export type NMRPeak = {
  chemicalShift: number;  // δ in ppm (0-14 range for ¹H NMR)
  intensity: number;       // Relative intensity (0-1)
  integration: number;     // Number of protons
  multiplicity: 'singlet' | 'doublet' | 'triplet' | 'quartet' | 'multiplet';
  couplingConstant?: number; // J in Hz (if applicable)
  width: number;           // Peak width in ppm
};

export type NMRSpectrum = {
  points: { ppm: number; intensity: number }[];
  peaks: NMRPeak[];
  metadata: {
    sampleId: string;
    nucleus: '1H' | '13C' | '31P';
    solvent: string;
    frequency: number;  // MHz (e.g., 400 for 400 MHz NMR)
    temperature: number; // K
    acquisitionTime: number; // seconds
    spectralWidth: number; // Hz
  };
};

/**
 * Common chemical shift ranges for ¹H NMR
 */
const CHEMICAL_SHIFT_REGIONS = {
  alkane: { min: 0.5, max: 2.0 },     // CH3, CH2 on alkanes
  aromatic: { min: 6.5, max: 8.5 },   // Benzene rings, aromatics
  aldehyde: { min: 9.0, max: 10.0 },  // CHO
  alcohol: { min: 1.0, max: 5.0 },    // OH (variable)
  ether: { min: 3.0, max: 4.5 },      // OCH3, OCH2
  alkene: { min: 4.5, max: 6.5 },     // C=CH
  amine: { min: 0.5, max: 3.0 },      // NH2, NR2
};

/**
 * Common solvents and their residual peaks
 */
const SOLVENTS = {
  'CDCl3': { shift: 7.26, name: 'Chloroform-d' },
  'DMSO-d6': { shift: 2.50, name: 'DMSO-d6' },
  'D2O': { shift: 4.79, name: 'Water-d2' },
  'CD3CN': { shift: 1.94, name: 'Acetonitrile-d3' },
};

/**
 * Seeded random number generator (for determinism)
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 2**32;
    return state / 2**32;
  };
}

/**
 * Generate Lorentzian peak (typical NMR lineshape)
 */
function lorentzian(x: number, center: number, width: number): number {
  const gamma = width / 2;
  return (gamma ** 2) / ((x - center) ** 2 + gamma ** 2);
}

/**
 * Generate multiplet (splitting pattern)
 */
function generateMultiplet(
  center: number,
  multiplicity: string,
  couplingConstant: number,
  intensity: number,
  spectralResolution: number // ppm per Hz
): NMRPeak[] {
  const subpeaks: NMRPeak[] = [];
  
  switch (multiplicity) {
    case 'singlet':
      subpeaks.push({
        chemicalShift: center,
        intensity,
        integration: 1,
        multiplicity: 'singlet',
        width: 0.005, // Very sharp singlet
      });
      break;
    
    case 'doublet': {
      const spacing = couplingConstant * spectralResolution;
      subpeaks.push(
        {
          chemicalShift: center - spacing / 2,
          intensity: intensity / 2,
          integration: 1,
          multiplicity: 'doublet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center + spacing / 2,
          intensity: intensity / 2,
          integration: 1,
          multiplicity: 'doublet',
          couplingConstant,
          width: 0.008,
        }
      );
      break;
    }
    
    case 'triplet': {
      const spacing = couplingConstant * spectralResolution;
      subpeaks.push(
        {
          chemicalShift: center - spacing,
          intensity: intensity / 4,
          integration: 1,
          multiplicity: 'triplet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center,
          intensity: intensity / 2,
          integration: 2,
          multiplicity: 'triplet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center + spacing,
          intensity: intensity / 4,
          integration: 1,
          multiplicity: 'triplet',
          couplingConstant,
          width: 0.008,
        }
      );
      break;
    }
    
    case 'quartet': {
      const spacing = couplingConstant * spectralResolution;
      subpeaks.push(
        {
          chemicalShift: center - 1.5 * spacing,
          intensity: intensity / 8,
          integration: 1,
          multiplicity: 'quartet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center - 0.5 * spacing,
          intensity: intensity * 3 / 8,
          integration: 3,
          multiplicity: 'quartet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center + 0.5 * spacing,
          intensity: intensity * 3 / 8,
          integration: 3,
          multiplicity: 'quartet',
          couplingConstant,
          width: 0.008,
        },
        {
          chemicalShift: center + 1.5 * spacing,
          intensity: intensity / 8,
          integration: 1,
          multiplicity: 'quartet',
          couplingConstant,
          width: 0.008,
        }
      );
      break;
    }
    
    default: // multiplet - complex overlapping peaks
      for (let i = 0; i < 5; i++) {
        subpeaks.push({
          chemicalShift: center + (i - 2) * 0.01,
          intensity: intensity * (1 - Math.abs(i - 2) * 0.15),
          integration: 1,
          multiplicity: 'multiplet',
          width: 0.01,
        });
      }
  }
  
  return subpeaks;
}

/**
 * Generate realistic NMR spectrum for a compound
 */
export function generateNMRSpectrum(
  seed: number,
  compoundType: 'simple' | 'moderate' | 'complex' = 'moderate'
): NMRSpectrum {
  const rand = seededRandom(seed);
  
  // Choose random solvent
  const solventKeys = Object.keys(SOLVENTS) as (keyof typeof SOLVENTS)[];
  const solvent = solventKeys[Math.floor(rand() * solventKeys.length)];
  const solventData = SOLVENTS[solvent];
  
  // Spectral parameters
  const frequency = 400; // 400 MHz standard
  const spectralWidth = 6000; // Hz (typical for ¹H)
  const spectralResolution = 14 / spectralWidth; // ppm per Hz (14 ppm range)
  
  // Generate peaks based on complexity
  const numPeakGroups = compoundType === 'simple' ? 3 : compoundType === 'moderate' ? 5 : 8;
  const peaks: NMRPeak[] = [];
  
  for (let i = 0; i < numPeakGroups; i++) {
    // Choose chemical shift region
    const regions = Object.values(CHEMICAL_SHIFT_REGIONS);
    const region = regions[Math.floor(rand() * regions.length)];
    const shift = region.min + rand() * (region.max - region.min);
    
    // Choose multiplicity and coupling
    const multiplicities: Array<'singlet' | 'doublet' | 'triplet' | 'quartet' | 'multiplet'> = 
      ['singlet', 'doublet', 'triplet', 'quartet', 'multiplet'];
    const multiplicity = multiplicities[Math.floor(rand() * multiplicities.length)];
    
    const couplingConstant = multiplicity === 'singlet' ? undefined : 5 + rand() * 10; // 5-15 Hz typical
    const integration = Math.floor(1 + rand() * 5); // 1-5 protons
    const intensity = 0.3 + rand() * 0.7; // 0.3-1.0 relative
    
    // Generate multiplet subpeaks
    const subpeaks = generateMultiplet(shift, multiplicity, couplingConstant || 0, intensity, spectralResolution);
    peaks.push(...subpeaks);
  }
  
  // Add solvent residual peak
  peaks.push({
    chemicalShift: solventData.shift,
    intensity: 0.1 + rand() * 0.2, // Small residual peak
    integration: 1,
    multiplicity: 'singlet',
    width: 0.005,
  });
  
  // Generate continuous spectrum from peaks
  const ppmRange = { min: 0, max: 14 };
  const nPoints = 8192; // Typical FID size
  const ppmStep = (ppmRange.max - ppmRange.min) / nPoints;
  
  const points: { ppm: number; intensity: number }[] = [];
  for (let i = 0; i < nPoints; i++) {
    const ppm = ppmRange.max - i * ppmStep; // Reverse order (standard NMR convention)
    
    // Sum contributions from all peaks
    let totalIntensity = 0;
    for (const peak of peaks) {
      totalIntensity += peak.intensity * lorentzian(ppm, peak.chemicalShift, peak.width);
    }
    
    // Add baseline noise
    const noise = (rand() - 0.5) * 0.01;
    totalIntensity += noise;
    
    points.push({ ppm, intensity: Math.max(0, totalIntensity) });
  }
  
  // Normalize to max intensity = 1
  const maxIntensity = Math.max(...points.map(p => p.intensity));
  points.forEach(p => p.intensity /= maxIntensity);
  
  return {
    points,
    peaks,
    metadata: {
      sampleId: `NMR-${seed.toString().padStart(6, '0')}`,
      nucleus: '1H',
      solvent: solventData.name,
      frequency,
      temperature: 298, // 25°C = 298K
      acquisitionTime: 2.0 + rand() * 1.0, // 2-3 seconds
      spectralWidth,
    },
  };
}

/**
 * Calculate difficulty score for NMR spectrum
 * Based on:
 * - Number of peaks (more peaks = harder to analyze)
 * - Peak overlap (complex multiplets = harder)
 * - Spectral complexity
 */
export function calculateNMRDifficulty(spectrum: NMRSpectrum): number {
  const alpha = 0.8;  // Peak count weight
  const beta = 2.0;   // Multiplet complexity weight
  const gamma = 8.0;  // Base difficulty
  
  const nPeaks = spectrum.peaks.length;
  
  // Count complex multiplets (triplets, quartets, multiplets)
  const complexPeaks = spectrum.peaks.filter(p => 
    p.multiplicity === 'triplet' || 
    p.multiplicity === 'quartet' || 
    p.multiplicity === 'multiplet'
  ).length;
  
  const difficulty = gamma + alpha * nPeaks + beta * complexPeaks;
  return Math.floor(difficulty);
}

/**
 * Format NMR spectrum for upload to Filecoin
 */
export function formatNMRForUpload(spectrum: NMRSpectrum, difficulty: number) {
  return {
    experimentType: 'NMR',
    sampleId: spectrum.metadata.sampleId,
    method: `¹H NMR (${spectrum.metadata.frequency} MHz)`,
    timestamp: new Date().toISOString(),
    metadata: spectrum.metadata,
    dataPoints: spectrum.points,
    peaks: spectrum.peaks,
    difficulty,
    metrics: {
      numPeaks: spectrum.peaks.length,
      numDataPoints: spectrum.points.length,
      spectralWidth: spectrum.metadata.spectralWidth,
      complexPeaks: spectrum.peaks.filter(p => 
        p.multiplicity !== 'singlet'
      ).length,
    },
  };
}
