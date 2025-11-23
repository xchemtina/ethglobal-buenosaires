/**
 * Metadata Generator for PoX Experiments
 * Generates realistic Level 2 metadata for synthetic experiments
 */

export interface InstrumentMetadata {
  manufacturer: string;
  model: string;
  serialNumber?: string;
  location: {
    institution: string;
    lab: string;
    country: string;
    city: string;
    coordinates?: string;
  };
}

export interface HPLCMethod {
  column: {
    type: string;
    length: string;
    diameter: string;
    particleSize: string;
    manufacturer: string;
  };
  solvents: Array<{
    name: string;
    grade: string;
    supplier: string;
  }>;
  gradient: Array<{
    time: number;
    mobile_phase_B: number;
  }>;
  flowRate: string;
  temperature: string;
  injectionVolume: string;
  detectionWavelength: string;
}

export interface NMRMethod {
  nucleus: string;
  frequency: string;
  solvent: string;
  temperature: string;
  pulseSequence: string;
  numberOfScans: number;
  relaxationDelay: string;
}

export interface SampleInfo {
  name: string;
  description: string;
  preparation: string;
  concentration: string;
  matrix: string;
  casNumber?: string;
  molecularFormula?: string;
}

export interface ExperimentMetadata {
  version: string;
  experimentType: 'HPLC' | 'NMR' | 'GC-MS';
  timestamp: string;
  instrument: InstrumentMetadata;
  method: HPLCMethod | NMRMethod;
  sample: SampleInfo;
  metadataLevel: 1 | 2 | 3 | 4;
}

// Realistic instrument databases
const HPLC_INSTRUMENTS = [
  { manufacturer: 'Agilent', model: '1260 Infinity II' },
  { manufacturer: 'Waters', model: 'Acquity UPLC H-Class' },
  { manufacturer: 'Shimadzu', model: 'Nexera X2' },
  { manufacturer: 'Thermo Fisher', model: 'Vanquish UHPLC' }
];

const NMR_INSTRUMENTS = [
  { manufacturer: 'Bruker', model: 'Avance Neo 400' },
  { manufacturer: 'Bruker', model: 'Avance III HD 600' },
  { manufacturer: 'JEOL', model: 'JNM-ECZ500R' },
  { manufacturer: 'Varian', model: 'VNMRS 500' }
];

const INSTITUTIONS = [
  { name: 'ETH Zurich', lab: 'Pharmaceutical Sciences', country: 'Switzerland', city: 'Zurich' },
  { name: 'University of Buenos Aires', lab: 'Analytical Chemistry', country: 'Argentina', city: 'Buenos Aires' },
  { name: 'MIT', lab: 'Chemical Engineering', country: 'USA', city: 'Cambridge' },
  { name: 'University of Oxford', lab: 'Chemistry Research Laboratory', country: 'UK', city: 'Oxford' },
  { name: 'Kyoto University', lab: 'Graduate School of Pharmaceutical Sciences', country: 'Japan', city: 'Kyoto' },
  { name: 'Max Planck Institute', lab: 'Chemical Physics', country: 'Germany', city: 'Göttingen' },
  { name: 'National University of Singapore', lab: 'Chemistry Department', country: 'Singapore', city: 'Singapore' }
];

const HPLC_COLUMNS = [
  { type: 'C18', length: '150mm', diameter: '4.6mm', particleSize: '5µm', manufacturer: 'Agilent Zorbax Eclipse Plus' },
  { type: 'C18', length: '100mm', diameter: '2.1mm', particleSize: '3µm', manufacturer: 'Waters Acquity BEH' },
  { type: 'C8', length: '150mm', diameter: '4.6mm', particleSize: '5µm', manufacturer: 'Phenomenex Luna' },
  { type: 'Phenyl-Hexyl', length: '100mm', diameter: '4.6mm', particleSize: '3µm', manufacturer: 'Shimadzu Shim-pack' }
];

const COMMON_COMPOUNDS = [
  { 
    name: 'Caffeine', 
    cas: '58-08-2', 
    formula: 'C8H10N4O2',
    description: 'USP grade caffeine for method validation'
  },
  { 
    name: 'Aspirin', 
    cas: '50-78-2', 
    formula: 'C9H8O4',
    description: 'Acetylsalicylic acid pharmaceutical standard'
  },
  { 
    name: 'Paracetamol', 
    cas: '103-90-2', 
    formula: 'C8H9NO2',
    description: 'Acetaminophen reference standard'
  },
  { 
    name: 'Ibuprofen', 
    cas: '15687-27-1', 
    formula: 'C13H18O2',
    description: 'Non-steroidal anti-inflammatory drug standard'
  },
  { 
    name: 'Vitamin C', 
    cas: '50-81-7', 
    formula: 'C6H8O6',
    description: 'L-Ascorbic acid food grade standard'
  }
];

const NMR_SOLVENTS = [
  'CDCl3 (Deuterated Chloroform)',
  'D2O (Deuterium Oxide)',
  'DMSO-d6 (Deuterated DMSO)',
  'CD3OD (Deuterated Methanol)',
  'Acetone-d6'
];

/**
 * Generate realistic HPLC metadata
 */
export function generateHPLCMetadata(seed: number = Date.now()): ExperimentMetadata {
  const rng = seededRandom(seed);
  
  const instrument = HPLC_INSTRUMENTS[Math.floor(rng() * HPLC_INSTRUMENTS.length)];
  const institution = INSTITUTIONS[Math.floor(rng() * INSTITUTIONS.length)];
  const column = HPLC_COLUMNS[Math.floor(rng() * HPLC_COLUMNS.length)];
  const compound = COMMON_COMPOUNDS[Math.floor(rng() * COMMON_COMPOUNDS.length)];
  
  // Generate realistic gradient
  const gradient = [
    { time: 0, mobile_phase_B: 5 },
    { time: 10, mobile_phase_B: 95 },
    { time: 12, mobile_phase_B: 95 },
    { time: 13, mobile_phase_B: 5 }
  ];
  
  const metadata: ExperimentMetadata = {
    version: 'PoX-Metadata-v1.0',
    experimentType: 'HPLC',
    timestamp: new Date().toISOString(),
    instrument: {
      manufacturer: instrument.manufacturer,
      model: instrument.model,
      serialNumber: `SN${Math.floor(rng() * 10000).toString().padStart(6, '0')}`,
      location: institution
    },
    method: {
      column,
      solvents: [
        { name: 'Water + 0.1% TFA', grade: 'HPLC grade', supplier: 'Merck' },
        { name: 'Acetonitrile', grade: 'HPLC grade', supplier: 'Sigma-Aldrich' }
      ],
      gradient,
      flowRate: '1.0 mL/min',
      temperature: '25°C',
      injectionVolume: '10 µL',
      detectionWavelength: '254 nm'
    },
    sample: {
      name: compound.name,
      description: compound.description,
      preparation: 'Dissolved in 50:50 water:acetonitrile',
      concentration: `${(rng() * 2 + 0.5).toFixed(1)} mg/mL`,
      matrix: 'aqueous',
      casNumber: compound.cas,
      molecularFormula: compound.formula
    },
    metadataLevel: 2
  };
  
  return metadata;
}

/**
 * Generate realistic NMR metadata
 */
export function generateNMRMetadata(seed: number = Date.now()): ExperimentMetadata {
  const rng = seededRandom(seed);
  
  const instrument = NMR_INSTRUMENTS[Math.floor(rng() * NMR_INSTRUMENTS.length)];
  const institution = INSTITUTIONS[Math.floor(rng() * INSTITUTIONS.length)];
  const compound = COMMON_COMPOUNDS[Math.floor(rng() * COMMON_COMPOUNDS.length)];
  const solvent = NMR_SOLVENTS[Math.floor(rng() * NMR_SOLVENTS.length)];
  
  const metadata: ExperimentMetadata = {
    version: 'PoX-Metadata-v1.0',
    experimentType: 'NMR',
    timestamp: new Date().toISOString(),
    instrument: {
      manufacturer: instrument.manufacturer,
      model: instrument.model,
      serialNumber: `NMR${Math.floor(rng() * 1000).toString().padStart(4, '0')}`,
      location: institution
    },
    method: {
      nucleus: '1H',
      frequency: instrument.model.includes('400') ? '400 MHz' : 
                 instrument.model.includes('500') ? '500 MHz' : '600 MHz',
      solvent,
      temperature: '298 K',
      pulseSequence: 'zg30',
      numberOfScans: 16,
      relaxationDelay: '1.0 s'
    },
    sample: {
      name: compound.name,
      description: compound.description,
      preparation: `Dissolved in ${solvent.split(' ')[0]}`,
      concentration: `${(rng() * 10 + 5).toFixed(1)} mM`,
      matrix: 'solution',
      casNumber: compound.cas,
      molecularFormula: compound.formula
    },
    metadataLevel: 2
  };
  
  return metadata;
}

/**
 * Calculate metadata completeness score
 * Returns multiplier from 1.0 (minimal) to 5.0 (publication-ready)
 */
export function calculateMetadataMultiplier(metadata: Partial<ExperimentMetadata>): number {
  if (!metadata || !metadata.experimentType) return 1.0;
  
  let score = 1.0;
  
  // Has instrument info (+0.3)
  if (metadata.instrument) {
    score += 0.3;
    if (metadata.instrument.location) score += 0.2;
    if (metadata.instrument.serialNumber) score += 0.1;
  }
  
  // Has method info (+0.4)
  if (metadata.method) {
    score += 0.4;
    const method = metadata.method as any;
    if (method.column || method.nucleus) score += 0.2;
    if (method.gradient || method.pulseSequence) score += 0.2;
  }
  
  // Has sample info (+0.3)
  if (metadata.sample) {
    score += 0.3;
    if (metadata.sample.casNumber) score += 0.1;
    if (metadata.sample.molecularFormula) score += 0.1;
  }
  
  // Has version/timestamp (+0.1)
  if (metadata.version && metadata.timestamp) {
    score += 0.1;
  }
  
  return Math.min(score, 5.0);
}

/**
 * Seeded random number generator for reproducibility
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/**
 * Export metadata as JSON string with sorted keys for deterministic hashing
 */
export function serializeMetadata(metadata: ExperimentMetadata): string {
  return JSON.stringify(metadata, Object.keys(metadata).sort());
}
