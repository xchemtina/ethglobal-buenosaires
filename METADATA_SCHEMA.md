# PoX Metadata Schema v1.0

## Principle
**More metadata = Higher reputation**

Complete experimental documentation increases difficulty score and initial RV. Incomplete submissions receive lower reputation rewards.

## Schema Levels

### Level 1: Minimal (Current - Low Reputation)
Basic data required for fraud proof validation:
- Raw trace data (required for hash verification)
- Timestamp
- Submitter address

**Difficulty Multiplier: 1.0x (base)**

### Level 2: Standard (Target for Synthetic Data)
Instrument & Method documentation:
```json
{
  "experimentType": "HPLC" | "NMR" | "GC-MS",
  "instrument": {
    "manufacturer": "Agilent" | "Waters" | "Shimadzu" | "Bruker",
    "model": "1260 Infinity II",
    "serialNumber": "optional",
    "location": {
      "institution": "University of Buenos Aires",
      "lab": "Analytical Chemistry Lab",
      "country": "Argentina",
      "city": "Buenos Aires",
      "coordinates": "optional GPS"
    }
  },
  "method": {
    "column": {
      "type": "C18",
      "length": "150mm",
      "diameter": "4.6mm",
      "particleSize": "5µm",
      "manufacturer": "Agilent Zorbax"
    },
    "solvents": [
      {
        "name": "Water + 0.1% TFA",
        "grade": "HPLC grade",
        "supplier": "Merck"
      },
      {
        "name": "Acetonitrile",
        "grade": "HPLC grade", 
        "supplier": "Sigma-Aldrich"
      }
    ],
    "gradient": [
      {"time": 0, "mobile_phase_B": 5},
      {"time": 10, "mobile_phase_B": 95},
      {"time": 12, "mobile_phase_B": 95},
      {"time": 13, "mobile_phase_B": 5}
    ],
    "flowRate": "1.0 mL/min",
    "temperature": "25°C",
    "injectionVolume": "10 µL",
    "detectionWavelength": "254 nm"
  },
  "sample": {
    "name": "Caffeine standard" | "Unknown mixture",
    "description": "optional detailed description",
    "preparation": "Dissolved in mobile phase A",
    "concentration": "1 mg/mL",
    "matrix": "aqueous"
  }
}
```

**Difficulty Multiplier: 2.0x**

### Level 3: Research Grade (Gold Standard)
Adds regulatory & reproducibility data:
```json
{
  // All Level 2 fields plus:
  "operator": {
    "name": "optional (for institutional users)",
    "orcid": "0000-0001-2345-6789",
    "institution": "must match instrument.location"
  },
  "calibration": {
    "lastCalibrationDate": "2025-11-20",
    "calibrationStandards": ["Caffeine", "Theophylline"],
    "certificates": ["optional IPFS CID of calibration cert"]
  },
  "qualityControl": {
    "blanks": ["pre-run blank IPFS CID"],
    "standards": ["standard run IPFS CID"],
    "replicates": 3,
    "acceptance_criteria": "RSD < 2%"
  },
  "regulatory": {
    "standard": "USP <621>" | "EP 2.2.46" | "ISO 17025",
    "compliance": true,
    "auditTrail": "optional IPFS CID"
  },
  "postProcessing": {
    "software": "ChemStation B.04.03",
    "integrationMethod": "auto with manual review",
    "baselineCorrection": "polynomial fit",
    "peakIdentification": {
      "method": "retention time + UV spectrum",
      "library": "NIST MS library v2.3"
    }
  }
}
```

**Difficulty Multiplier: 3.5x**

### Level 4: Publication Ready (Maximum Reputation)
Adds peer review & data linkage:
```json
{
  // All Level 3 fields plus:
  "publication": {
    "doi": "10.xxxx/journal.xxx",
    "preprint": "arXiv:2501.xxxxx",
    "supplementaryData": ["IPFS CID of raw data package"]
  },
  "reproducibility": {
    "protocolDoi": "protocols.io dx.doi.org/xxx",
    "reagentIdentifiers": [
      "RRID:AB_123456",  // antibody
      "CVCL_0033"        // cell line
    ],
    "dataAvailability": "All raw data on Filecoin via PoX"
  },
  "provenance": {
    "dataIntegrity": {
      "checksums": "SHA256 of all instrument files",
      "timestamps": "Trusted timestamp authority",
      "witnessing": "Lab notebook entries"
    },
    "chainOfCustody": [
      {
        "actor": "Instrument",
        "action": "Data acquisition",
        "timestamp": "2025-11-22T10:30:00Z",
        "signature": "instrument firmware hash"
      },
      {
        "actor": "Operator",
        "action": "Data review",
        "timestamp": "2025-11-22T11:00:00Z",
        "signature": "optional GPG signature"
      }
    ]
  },
  "linkedData": {
    "relatedExperiments": ["PoX experiment IDs"],
    "compoundDatabases": [
      {"name": "PubChem", "cid": "2519"},
      {"name": "ChEMBL", "chembl_id": "CHEMBL113"}
    ]
  }
}
```

**Difficulty Multiplier: 5.0x**

## Difficulty Scoring Formula (Updated)

```
D = baseComplexity × metadataMultiplier × analyticalDifficulty

Where:
- baseComplexity = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
- metadataMultiplier = 1.0 (minimal) to 5.0 (publication-ready)
- analyticalDifficulty = technique-specific factor
  * HPLC: 1.0x
  * NMR: 1.5x (more complex interpretation)
  * GC-MS: 1.3x (adds mass spec dimension)
```

## Implementation Strategy

### For Synthetic Data
Generate Level 2 (Standard) metadata:
1. Realistic instrument specifications
2. Common HPLC methods (C18 columns, ACN/Water gradients)
3. Known compounds (caffeine, aspirin, etc.)
4. Institutional affiliations (universities, pharma companies)

### For Real Submissions
Provide templates and validators:
1. JSON schema validation
2. Metadata completeness checker
3. Reputation calculator (preview before submission)
4. Metadata editor UI

## Fraud Proof Compatibility

All metadata fields are **off-chain** (stored in Filecoin):
- On-chain contract only stores:
  - `dataHash` (raw trace + metadata JSON)
  - `metricsHash` (analysis results)
  - `difficulty` (computed from metadata completeness)
  
- Challengers download full package from Filecoin
- Verify both trace analysis AND metadata completeness
- Difficulty recalculation must match on-chain value

## Example: Caffeine HPLC Run

```json
{
  "version": "PoX-Metadata-v1.0",
  "experimentType": "HPLC",
  "timestamp": "2025-11-22T23:46:30.000Z",
  "instrument": {
    "manufacturer": "Agilent",
    "model": "1260 Infinity II",
    "location": {
      "institution": "ETH Zurich",
      "lab": "Pharmaceutical Sciences",
      "country": "Switzerland",
      "city": "Zurich"
    }
  },
  "method": {
    "column": {
      "type": "C18",
      "length": "150mm",
      "diameter": "4.6mm",
      "particleSize": "5µm",
      "manufacturer": "Agilent Zorbax Eclipse Plus"
    },
    "solvents": [
      {"name": "Water + 0.1% TFA", "grade": "HPLC"},
      {"name": "Acetonitrile", "grade": "HPLC"}
    ],
    "gradient": [
      {"time": 0, "B": 5},
      {"time": 10, "B": 95},
      {"time": 12, "B": 95},
      {"time": 13, "B": 5}
    ],
    "flowRate": "1.0 mL/min",
    "temperature": "25°C",
    "injectionVolume": "10 µL",
    "detectionWavelength": "254 nm"
  },
  "sample": {
    "name": "Caffeine Reference Standard",
    "description": "USP grade caffeine for method validation",
    "concentration": "1.0 mg/mL",
    "preparation": "Dissolved in 50:50 water:ACN",
    "matrix": "aqueous"
  },
  "trace": {
    "points": [...],  // Time-signal pairs
    "samplingRate": "20 Hz",
    "units": {"time": "minutes", "signal": "mAU"}
  }
}
```

**This would receive:**
- Base difficulty: ~9 (from peak detection)
- Metadata multiplier: 2.0x (Level 2 - Standard)
- Final difficulty: 18
- Initial RV: ~2,890,000 (scaled)

## Benefits

1. **Incentivizes Quality**: Better documentation = more reputation
2. **Enables Reproducibility**: Full method details allow replication
3. **Facilitates Discovery**: Rich metadata makes experiments searchable
4. **Supports Compliance**: Regulatory fields for GMP/GLP environments
5. **Builds Trust**: Transparent provenance and chain of custody

## Next Steps

1. Update experiment generator to include Level 2 metadata
2. Create metadata validator library
3. Update difficulty scoring to include metadata multiplier
4. Build metadata editor UI for real submissions
5. Document metadata standard for users
