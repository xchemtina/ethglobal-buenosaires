# THOUGHTS — PoX HPLC Experiments

## Architectural Reflections

### Why HPLC as Proof-of-X?

The choice of High-Performance Liquid Chromatography experiments as a Proof-of-X substrate is non-trivial. Unlike generic computational work (PoW) or capital locking (PoS), HPLC represents **proof of laboratory capacity** — a bridge between on-chain reputation and off-chain scientific work.

Key properties:
- **Non-fungible work**: Each chromatogram is unique but comparable via difficulty metrics
- **Natural complexity gradation**: Noise, resolution, peak count create intrinsic difficulty
- **Verifiable without replication**: Deterministic hashing enables fraud proofs without redoing experiments
- **Real-world anchor**: Maps to actual analytical chemistry workflows (drug purity, metabolomics)

### Difficulty as Information Density

The difficulty formula is not arbitrary:

```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
```

This encodes three dimensions of experimental information:
1. **Signal complexity** (`nPeaks`): More peaks → harder separation → higher skill
2. **Signal clarity** (`baselineNoise`): Noise requires better technique to resolve
3. **Data granularity** (`ln(nPoints)`): Logarithmic scaling prevents trivial inflation

The weights (`α=1`, `β=8`, `γ=0.5`) reflect relative contribution to analytical challenge. Notably, **noise dominates** — aligning with real chromatography where baseline stability is critical.

### Time Decay as Anti-Gaming

The reputation value decay:

```
RV = ln(1 + D·v) - λ·Δt
```

Serves multiple purposes:
- **Prevents hoarding**: Old experiments lose value → continuous engagement required
- **Reflects knowledge obsolescence**: Methods improve → old work becomes less impressive
- **Mitigates Sybil attacks**: Can't farm reputation once and coast forever

The logarithmic base score (`ln(1 + D·v)`) ensures **diminishing returns on difficulty** — prevents arms race toward impractically complex experiments.

### Hashing Strategy: Data vs. Metrics

Two separate hashes are computed:
- `dataHash`: Raw experimental data (points + metadata)
- `metricsHash`: Derived analysis (peaks, noise, areas)

This separation enables **layered verification**:
1. **Lazy evaluation**: Contract can verify metrics without storing full data
2. **Fraud proofs**: Challenge by providing alternate analysis → compare hashes
3. **Data availability**: Full data stored off-chain (IPFS, Arweave) but anchored by hash

The stable JSON serialization (sorted keys) ensures **canonical representation** — critical for distributed verification where execution environments differ.

## Open Questions

### 1. Peak Detection Sensitivity
Current implementation uses simple local maxima with 3σ threshold. Real HPLC software uses:
- Derivative-based detection (inflection points)
- Wavelet transforms for multi-scale features
- Machine learning for noisy data

**Tradeoff**: Simplicity (gas cost, auditability) vs. accuracy (matches real instruments)

### 2. Gaming Vectors
Potential attacks:
- **Noise injection**: Artificially increase `baselineNoise` to inflate difficulty
  - Mitigation: Cap noise contribution or require external validation
- **Peak splitting**: Fragment one peak into many to boost `nPeaks`
  - Mitigation: Minimum peak width/area thresholds
- **Replay**: Resubmit same experiment with new metadata
  - Mitigation: Check `dataHash` uniqueness on-chain

### 3. Validation Oracle Design
Who decides `v ∈ {valid, invalid, unverified}`?

Options:
- **Centralized lab**: Trusted entity validates (not credibly neutral)
- **Optimistic rollup**: Assume valid unless challenged (requires fraud proof mechanism)
- **Multi-oracle**: Consensus among independent validators (coordination overhead)
- **Economic bonding**: Submitter stakes tokens, slashed if challenged successfully

Current system assumes **oracle exists** but doesn't specify implementation. This is deliberate — allows pluggable validation backends.

### 4. Cross-Instrument Calibration
Different HPLC instruments have different:
- Noise floors
- Resolution limits
- Peak shape characteristics

Should difficulty be **absolute** (favors high-end equipment) or **relative** (normalized per instrument class)?

Potential solution: **Instrument difficulty multiplier** stored on-chain, adjusted via governance.

## Design Patterns Observed

### Pure Function Chains
The pipeline is entirely deterministic:
```
seed → simulate → analyze → score → hash
```

No side effects, no external dependencies (except `ethers` for hashing). This makes the system:
- **Testable**: Golden test vectors can verify correctness
- **Auditable**: No hidden state or timing dependencies
- **Portable**: Runs identically on any JS runtime

### Separation of Concerns
Each module has single responsibility:
- `simulate.ts`: Knows nothing about scoring
- `analyze.ts`: Knows nothing about on-chain representation
- `scoring.ts`: Knows nothing about HPLC specifics
- `pox.ts`: Orchestrates but doesn't implement logic

This modularity enables:
- Swapping simulation models (real data vs. synthetic)
- Upgrading difficulty formulas without touching analysis
- Testing components in isolation

### Type-Driven Development
The `types.ts` module acts as **interface specification**:
- `HPLCExperiment`: Off-chain representation
- `PoXComputed`: Bridge to on-chain state
- `SimulationOptions`: User-facing configuration

This makes the system **self-documenting** — types encode protocol semantics.

## Philosophical Notes

### Science as Public Good
Traditional lab work is **non-excludable but rivalrous**:
- Results are public (papers, patents)
- Capacity is limited (instrument time, reagents)

PoX flips this: **Work is verifiable but capacity is expandable**
- Anyone can submit experiments
- Network scales with participants
- Reputation accrues to contributors, not gatekeepers

This aligns with **open science** ethos — reputation becomes a commons, not a moat.

### Proof-of-X as Generalized DeSci Primitive
HPLC is one instantiation. The pattern generalizes to any experimental domain with:
1. **Measurable difficulty** (computational, material, temporal)
2. **Deterministic verification** (reproducible analysis)
3. **Fraud detectability** (challenge mechanisms)

Future variants:
- Proof-of-Synthesis (organic chemistry)
- Proof-of-Sequencing (genomics)
- Proof-of-Observation (astronomy, microscopy)

The core insight: **Scientific work can be a consensus mechanism**.

### Trust Minimization vs. Practicality
The system makes pragmatic compromises:
- **Assumes validation oracle** (trust assumption)
- **Accepts off-chain data storage** (availability assumption)
- **Uses floating-point arithmetic** (determinism caveat)

These tradeoffs are **explicit and documented** rather than hidden. The goal is not zero trust, but **minimal necessary trust** given real-world constraints.

---

## Next Steps for Research

1. **Implement fraud proof protocol** (bisection game for disputed analyses)
2. **Design incentive-compatible validation market** (staking + slashing economics)
3. **Benchmark against real HPLC data** (validate simulation realism)
4. **Gas cost analysis** (on-chain operations, storage requirements)
5. **Privacy layer** (zero-knowledge proofs for proprietary methods)

The current implementation is **proof-of-concept** — demonstrates feasibility, not production readiness. Moving to mainnet requires hardening each assumption and closing each attack vector.

But the core thesis holds: **Scientific labor can be credibly signaled on-chain without replicating the work itself.**
