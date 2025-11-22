# HPLC Experiments — Proof-of-X (PoX) System

Computational core for simulating, analyzing, and scoring High-Performance Liquid Chromatography (HPLC) experiments within a Proof-of-X reputation protocol.

## Overview

This package implements a deterministic pipeline for:

1. **Simulation** — Synthetic HPLC chromatogram generation with reproducible RNG
2. **Analysis** — Peak detection, baseline noise estimation, and purity calculation
3. **Scoring** — Difficulty computation and Reputation Value (RV) calculation with time decay
4. **Hashing** — Deterministic keccak256 hashing for on-chain verification

## Structure

```
src/
├── types.ts       # Core interfaces (HPLCExperiment, HPLCAnalysis, PoXComputed, etc.)
├── rng.ts         # Deterministic PRNG (seeded randomness)
├── simulate.ts    # HPLC chromatogram simulation (Gaussian peaks + noise)
├── analyze.ts     # Peak detection, noise estimation, area integration
├── scoring.ts     # Difficulty (D) and Reputation Value (RV) computation
└── pox.ts         # One-shot PoX experiment generator + hash computation
```

## Key Concepts

### Difficulty (D)
Quantifies experiment complexity based on:
- Number of peaks detected
- Baseline noise level
- Data resolution (number of points)

Formula:
```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
```

Default weights: `α=1.0`, `β=8.0`, `γ=0.5`

### Reputation Value (RV)
Time-decaying score for validated experiments:
```
RV = ln(1 + D·v) - λ·Δt
```
- `v` = validation status (1 for valid, 0 for unverified, -1 for invalid)
- `λ` = decay rate (default: 0.01/day)
- `Δt` = time elapsed since submission (days)

Scaled to on-chain integer: `RV_scaled = round(RV × 10⁶)`

### Data Hashing
Two deterministic hashes for on-chain verification:
- **dataHash**: `keccak256(metadata + raw points)`
- **metricsHash**: `keccak256(analysis results)`

Both use stable JSON serialization (sorted keys).

## Usage Example

```typescript
import { generatePoXExperiment } from './pox';

const result = generatePoXExperiment({
  seed: 'experiment-seed-123',
  nPoints: 2048,
  totalTime: 15,  // minutes
  nPeaks: 4,
  noiseLevel: 0.03
});

console.log({
  difficulty: result.difficulty,
  rvInitial: result.rvInitial,
  dataHash: result.dataHash,
  metricsHash: result.metricsHash,
  peaks: result.analysis.peaks.length
});
```

## Design Principles

- **Determinism**: Same seed → same experiment → same hashes
- **Transparency**: All scoring parameters are explicit and tunable
- **Verifiability**: Hashes enable on-chain fraud proofs without storing full data
- **Realism**: Simulated chromatograms mimic real HPLC characteristics (Gaussian peaks, baseline drift)

## Dependencies

- `ethers` (v6+) for keccak256 hashing
- TypeScript with ES module output

## Integration Points

- **Smart Contract**: Expects `dataHash`, `metricsHash`, scaled RV
- **Oracle**: Can verify off-chain analysis by recomputing hashes
- **Frontend**: Can visualize chromatograms and peak annotations

## Future Extensions

- Multi-dimensional chromatography (LC-MS, GC-MS)
- Peak integration refinement (asymmetric peaks, baseline correction)
- Dynamic difficulty adjustment based on network-wide statistics
- Fraud proof challenges via bisection protocols
