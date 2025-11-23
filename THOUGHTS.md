# THOUGHTS — PoX System Design & Philosophy

## Core Thesis: n×(AI+Scientist) >>> "AI-Scientist"

The narrative of "AI replacing scientists" misses the point. The future isn't autonomous AI agents doing research alone — it's **multiplying human scientific capacity** through AI-augmented workflows.

### Why This Matters

**Traditional Science**:
- Bottleneck: Human expertise (scarce, slow, geographically concentrated)
- Coordination: Institutional (labs, universities, journals)
- Validation: Peer review (months/years, opaque, gatekept)
- Incentives: Prestige (citations, grants, tenure)

**AI-Only "Science"**:
- Bottleneck: Ground truth (AI hallucinates, can't validate itself)
- Coordination: Centralized (OpenAI, Anthropic, big tech)
- Validation: None (who checks the checkers?)
- Incentives: Profit (closed models, proprietary data)

**PoX Vision: n×(AI+Scientist)**:
- **Bottleneck dissolved**: Every scientist becomes 10x via AI assistants
- **Coordination decentralized**: Blockchain as neutral coordination layer
- **Validation cryptographic**: Hash-based fraud proofs, economic incentives
- **Incentives aligned**: Reputation as programmable capital

The multiplication factor `n` represents **network effects**: each scientist who joins makes the system more valuable for all others (shared data, cross-validation, collective reputation).

## Why HPLC First?

Not because chromatography is the most important technique (it's not). Because it's the **minimum viable experiment** that demonstrates the pattern:

### Properties of Good PoX Primitives

1. **Quantifiable difficulty**: Clear metrics (peaks, noise, resolution)
2. **Deterministic analysis**: Same input → same output (reproducible)
3. **Fraud detectable**: Fake data is structurally distinguishable from real
4. **Common enough**: Thousands of labs worldwide have HPLC
5. **Complex enough**: Not trivially gameable (unlike coin flips)

### Generalization Path

```
HPLC (v1) → NMR (v2) → GC-MS (v3) → ... → All Analytical Chemistry
                                              ↓
                                         Computational Methods
                                              ↓
                                         Wet Lab Synthesis
                                              ↓
                                         Biological Assays
```

Each new technique is a **module** — same protocol pattern (simulate → analyze → score → verify), different domain logic.

## The Reputation Primitive

### Why Not Tokens?

Could have made $CHEM token. Tempting! But wrong because:

**Tokens are fungible**: 100 $CHEM from Alice = 100 $CHEM from Bob  
**Reputation is contextual**: Alice's HPLC expertise ≠ Bob's NMR expertise

Reputation needs to be:
- **Non-transferable** (bound to identity, not tradable)
- **Domain-specific** (HPLC rep ≠ NMR rep ≠ synthesis rep)
- **Time-decaying** (old work loses relevance)
- **Negativity-capable** (fraud → negative rep)

This is **social capital as primitive**, not financial capital.

### Future: Reputation as Collateral

Once reputation exists, you can:

```solidity
function proposeExperiment(string memory proposal) external {
    require(reputation[msg.sender] > THRESHOLD, "insufficient reputation");
    // Grant proposal, equipment access, etc.
}
```

Or:
```solidity
function borrowEquipment(uint256 instrumentId) external {
    uint256 collateral = reputation[msg.sender] * MULTIPLIER;
    require(collateral > instruments[instrumentId].minCollateral);
    // Lock reputation as bond; slash if equipment damaged
}
```

Reputation becomes **functional primitive** for coordinating scientific resources without institutions.

## Hash-Based Verification: The Core Insight

Storing full experimental data on-chain is impossible (gas costs). But storing hashes is cheap.

### The Trick

```
Full data (1 MB) → Synapse (off-chain, permanent)
                 ↓
           Compute hashes (32 bytes each)
                 ↓
           Store on-chain (cheap)
```

**Verification**:
1. Challenger downloads data from Synapse (via CID)
2. Re-computes analysis locally (deterministic)
3. Compares hash to on-chain value
4. If mismatch: challenge! (fraud proof)

This is **rollup-style fraud proofs** applied to scientific data, not transactions.

### Why Two Hashes?

- **dataHash**: Immutable record of raw experiment
- **metricsHash**: Derived analysis (peaks, noise, areas)

Separating them enables:
- **Lazy verification**: Check metrics without downloading full data
- **Analysis upgrades**: Re-analyze old data with new algorithms
- **Selective disclosure**: Share metrics without revealing raw data (future: ZK proofs)

## The Difficulty Function: Why Logarithmic?

```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
```

### Why `ln(nPoints)` Not Linear?

If `D ∝ nPoints`, incentive is to **spam high-resolution data** (1M points per experiment) for easy reputation farming.

Logarithmic scaling means:
- 1000 points → ln(1000) ≈ 7
- 10,000 points → ln(10,000) ≈ 9
- 100,000 points → ln(100,000) ≈ 12

**Diminishing returns** prevent gaming. More resolution helps, but not proportionally.

### Why β = 8.0 (Noise Dominance)?

In real chromatography, **noise is the enemy**. Separating 5 peaks cleanly (low noise) is harder than separating 10 peaks messily (high noise).

Current weights:
- α = 1.0 (peaks): Base contribution
- β = 8.0 (noise): **Dominant factor** (reflects real analytical challenge)
- γ = 0.5 (resolution): Weak bonus (prevents inflation)

These are **v1 estimates**. Need calibration against real HPLC data (hence crawler).

### Open Question: Relative vs. Absolute Difficulty

Should difficulty be:
- **Absolute**: High-end instruments get more rep (bias toward wealthy labs)
- **Relative**: Normalize per instrument class (fairer, but complex)

Leaning toward absolute initially (simpler), with future **instrument multipliers**:
```
D_adjusted = D_raw × instrument_factor[instrumentId]
```

Where `instrument_factor` is governance-adjustable (e.g., older instruments get 1.2x multiplier).

## Time Decay: Preventing Reputation Hoarding

```
RV = ln(1 + D·v) - λ·Δt
```

The `-λ·Δt` term is **essential** to prevent:

1. **Sybil attacks**: Can't farm rep once and coast forever
2. **Zombie accounts**: Inactive users lose standing
3. **Obsolescence**: Old methods become less relevant as techniques improve

**λ = 0.01/day** means:
- After 100 days: RV decreases by 1
- After 1 year: RV decreases by ~3.65

For high-difficulty experiments (D = 10), this is manageable. For low-difficulty (D = 2), decay dominates quickly.

**Consequence**: Must continuously contribute to maintain reputation.

### Alternative Considered: Exponential Decay

```
RV = ln(1 + D·v) × exp(-λ·Δt)
```

**Rejected** because exponential decay is too harsh — older experiments become essentially worthless. Linear decay is gentler (older work still counts, just less).

## Fraud Proofs: The Unsolved Part

Current challenge mechanism is **owner-gated**:
```solidity
function resolveChallenge(uint256 id, bool valid) external onlyOwner
```

This is a **centralization point**. Owner can:
- Ignore legitimate challenges
- Wrongly validate fraudulent data
- Collude with submitters

### Three Paths Forward

**Option 1: DAO Governance**
- Pros: Democratic, censorship-resistant
- Cons: Slow (days for votes), vulnerable to plutocracy

**Option 2: Economic Game Theory**
- Both challenger and submitter stake tokens
- Winner takes loser's stake
- Pros: Fast, incentive-aligned
- Cons: Requires careful mechanism design (vulnerable to whales)

**Option 3: Optimistic Rollup Style**
- Assume valid unless challenged
- If challenged: **bisection game** narrows dispute to single computation
- Verify that computation on-chain
- Pros: Trustless (inherits Ethereum security)
- Cons: Complex to implement (needs deterministic execution environment)

**Current status**: Option 1 (DAO) is easiest first step. Option 3 is long-term goal.

### Why Not Immediate Implementation?

Because **fraud proofs are hard**. Getting them wrong is worse than not having them (false sense of security).

Better to:
1. Deploy with explicit centralization (owner resolution)
2. Collect data on challenge patterns
3. Design mechanism based on real behavior
4. Migrate to trustless system once confident

## Verifier Incentives: The Public Goods Problem

Who verifies experiments? And why?

### Current Design: Reputation Rewards

```solidity
if (experimentValid) {
    challengerDelta = +D/10  // Small reward for verification
} else {
    challengerDelta = +D     // Full reward for catching fraud
}
```

**Problem**: Only pays if you find fraud. No incentive to verify probably-correct experiments.

This is **under-provision of verification** (classic public goods issue).

### Better Design: Continuous Verification Market

Inspired by Truebit:

1. **Submitter stakes tokens** when registering experiment
2. **Verifiers claim verification slots** (limited per experiment)
3. **Verifiers earn fees** proportional to stake × time
4. **Fraud slashes stake**, reward goes to first challenger
5. **Correct experiments refund stake** after dispute window

This makes verification **profitable** even for valid data (you get paid to check).

### Even Better: Reputation-Weighted Verification

Verifiers with high reputation earn **more per verification** (their endorsement is more valuable).

This creates **positive feedback loop**:
- Good scientists → high reputation
- High reputation → more verification income
- More income → more time for science
- More science → higher reputation

**Network effect**: System becomes more valuable as more reputable scientists join.

## Modularity: The Path to All of Science

Current system is **HPLC-specific** in implementation but **general in architecture**:

```
packages/experiments/
├── hplc/           # Current: HPLC-specific
│   ├── simulate.ts
│   ├── analyze.ts
│   └── scoring.ts
├── nmr/            # Future: NMR module
│   ├── simulate.ts
│   ├── analyze.ts
│   └── scoring.ts
└── core/           # Shared primitives
    ├── types.ts
    ├── hashing.ts
    └── reputation.ts
```

Each technique implements same interface:
```typescript
interface ExperimentModule<T> {
    simulate(opts: SimulationOptions): Experiment<T>;
    analyze(exp: Experiment<T>): Analysis;
    score(analysis: Analysis): Difficulty;
}
```

Registry contract is **already modular** (stores hashes, doesn't care about experiment type).

### NMR Next (Why?)

Nuclear Magnetic Resonance is natural second target:

**Similarities to HPLC**:
- Quantifiable difficulty (peak multiplicity, coupling constants, S/N)
- Deterministic analysis (same spectrum → same interpretation)
- Common technique (every chemistry department has NMR)

**Differences**:
- 2D data (chemical shift + intensity) vs. HPLC 1D (time + intensity)
- Interpretation is more complex (J-coupling, integration, peak assignment)
- Higher barrier for fraud (harder to fake realistic coupling patterns)

**Migration path**:
1. Implement `nmr/simulate.ts` (Lorentzian peaks, J-coupling)
2. Implement `nmr/analyze.ts` (peak picking, integration)
3. Implement `nmr/scoring.ts` (complexity via multiplet analysis)
4. Register via **same contracts** (PoXRegistry doesn't care)

## Data Provenance: The Crawler Strategy

`HPLC_Crawl/` scrapes Restek chromatogram library. Why?

### Calibration Use Case

Synthetic chromatograms are useful for testing, but:
- Are they realistic? (Do simulated peaks match real distributions?)
- Is difficulty scoring accurate? (Do "hard" real experiments score high?)
- What's normal noise level? (For detecting outliers)

Real data provides **ground truth** for validating synthetic data.

### Fraud Detection Training

If we accumulate 1000+ real chromatograms:
- Train anomaly detector (autoencoders, GANs)
- Flag submissions that deviate from real data distribution
- Automate first-pass verification (ML pre-filter before human review)

### Knowledge Graph

Metadata includes:
- Column type (C18, C8, HILIC, etc.)
- Mobile phase (acetonitrile, methanol, water ratios)
- Compounds separated (drug molecules, metabolites, etc.)

This builds **method knowledge base**:
```
Query: "How to separate flavonoids?"
Answer: [10 real chromatograms with conditions]
```

Becomes **Wikipedia for analytical methods** (but decentralized, verifiable).

## Why Synapse (FilOzone)?

Could have used IPFS, Arweave, centralized cloud. Why Synapse?

### Filecoin Integration

Synapse is built on Filecoin → storage deals ensure **long-term availability** (unlike IPFS DHT, which is ephemeral).

### EVM Compatibility

Synapse exposes Ethereum provider interface:
```javascript
const provider = new ethers.BrowserProvider(window.ethereum)
const synapse = await Synapse.create({ provider })
```

**Same wallet** for blockchain + storage (no separate keys, no separate auth).

### Programmable Storage

Future: smart contracts can **pay for storage** (protocol treasury funds data permanence).

```solidity
function registerExperiment(...) external payable {
    require(msg.value >= STORAGE_COST);
    // Forward payment to Synapse for permanent storage
}
```

### Why Not IPFS?

IPFS has no guaranteed retrieval (DHT can lose data). Synapse uses Filecoin deals (cryptographic proof of storage).

### Why Not Arweave?

Arweave requires large upfront payment (permanent storage cost paid once). Synapse uses Filecoin's ongoing deal structure (can renew/extend).

## The Arbitrum Choice

Why Arbitrum Sepolia, not Ethereum L1 or other L2s?

### Gas Costs

Ethereum L1: ~$50/tx (prohibitive for frequent experiments)  
Arbitrum: ~$0.50/tx (100x cheaper, enables frequent submissions)

### EVM Compatibility

No code changes from Ethereum (Solidity 0.8.21 works as-is).

### DeSci Ecosystem

VitaDAO, OriginTrail, other DeSci projects building on Arbitrum → network effects.

### Why Not Optimism/Base?

Could work! Arbitrum chosen for:
- Slightly lower gas (fraud proofs vs. fault proofs)
- Better Synapse integration (FilOzone targets Arbitrum)

Not strong preference; could deploy to multiple L2s (cross-chain reputation bridges).

## Security Model: What We Trust

### Explicit Trust Assumptions (MVP)

1. **Synapse availability**: Data must be retrievable (trust FilOzone)
2. **Owner honesty**: Challenge resolution is centralized (trust deployer)
3. **Ethers.js correctness**: Hash computation is deterministic (trust library)
4. **RPC honesty**: Blockchain state is accurate (trust Arbitrum sequencer)

### Migration to Trustlessness

**Phase 1** (now): Accept trust assumptions, document them explicitly  
**Phase 2** (6 months): Replace owner with DAO (Snapshot votes)  
**Phase 3** (1 year): Implement bisection game (trustless fraud proofs)  
**Phase 4** (2 years): ZK proofs for privacy-preserving verification

Don't pretend to be trustless when you're not. **Transparency about trust > premature decentralization**.

## Open Questions for Community

### 1. Difficulty Formula Weights

Are α=1, β=8, γ=0.5 correct? Need:
- Real chromatograms to test against
- Practitioner feedback (do scores match intuition?)
- A/B testing with different weights

### 2. Reputation Decay Rate

Is λ=0.01/day too fast? Too slow? Depends on:
- Experiment submission frequency
- Domain evolution speed (HPLC changes slower than ML)
- User behavior (how often do people re-submit?)

### 3. Cross-Domain Reputation

Should HPLC reputation transfer to NMR? Partially? Not at all?

**Option A**: Separate reputation per domain  
**Option B**: Weighted transfer (e.g., HPLC rep counts 50% for NMR)  
**Option C**: Meta-reputation (sum of all domain reps)

### 4. Privacy

Should experiments be public? Or private with ZK proofs?

**Tension**:
- Public → reproducibility, transparency
- Private → protects proprietary methods, prevents scooping

Possible compromise: **Time-locked disclosure** (hash public, data revealed after embargo period).

## Philosophical: Science as Consensus

Bitcoin: Proof-of-Work → consensus on transaction history  
Ethereum: Proof-of-Stake → consensus on smart contract state  
**PoX: Proof-of-Experiment → consensus on scientific validity**

The radical claim: **Scientific truth can be a consensus mechanism**, not just financial truth.

### Why This Is Hard

Science isn't binary (true/false). It's:
- Probabilistic (confidence intervals)
- Contextual (depends on assumptions)
- Evolving (today's truth is tomorrow's approximation)

PoX doesn't claim to determine **absolute truth**. It determines:
- **Procedural validity**: Was the experiment done correctly?
- **Relative difficulty**: Was this hard to achieve?
- **Community consensus**: Do peers endorse this?

That's **weaker than absolute truth** but **stronger than nothing** (current system: trust institutions).

### The Vision

In 5 years:
- Every analytical instrument streams data to PoX
- Every scientist has on-chain reputation
- Grants awarded by smart contracts (reputation-weighted)
- Papers cite on-chain experiments (cryptographic provenance)
- Reproducibility crisis solved (fraud economically disincentivized)

Ambitious? Yes. Impossible? No.

## V2 Design Philosophy: Type-Specific Peer Review (Nov 23, 2025)

### The Realization: Not All Experiments Are Equal

V1 treated all challenges the same: generic "fraud proof" with fixed reputation rewards. This missed a crucial scientific insight:

**Different experiment types have radically different error rates.**

- PXRD Rietveld refinement: >50% have issues (thermal parameters, space groups)
- NMR connectivity: 30-40% have errors (wrong stereochemistry, missed coupling)
- MS/MS fragmentation: 20-30% have debatable assignments
- HPLC peak integration: 5-10% have errors (mostly straightforward)

**Consequence**: Reviewing PXRD is 10× harder and 10× more valuable than reviewing HPLC.

### Why Reputation Multipliers Matter

If PXRD reviews earn the same as HPLC reviews:
- Rational reviewers cherry-pick HPLC (easy)
- PXRD errors go undetected (hard)
- System fails to improve science (wrong incentives)

**Solution**: Type-specific multipliers
- PXRD: 3× reputation (highest error rate)
- NMR: 2× reputation (common mistakes)
- HPLC: 1× reputation (baseline)

This **aligns economic incentives with scientific value**.

### The Terminology Shift: "Peer Review" Not "Fraud Proof"

**Problem with V1**: "Challenge", "Fraud Proof", "Dispute" scared academics.

Scientists hear "fraud" and think:
- Career-destroying accusations
- Adversarial relationships
- Legal liability

**Reality**: Most errors are honest mistakes, not fraud.
- Wrong NMR peak assignment (not malicious)
- Bad PXRD refinement (not intentional)
- Overlooked MS/MS fragment (not dishonest)

**V2 Solution**: Rebrand to "Peer Review"
- Reviewer (not challenger)
- Verification (not dispute)
- Re-analysis request (not fraud proof)
- Reputation adjustment (not slash)

Same mechanism, friendlier language. **Adoption > purity.**

### Auto-Type Detection: Balancing Precision and Usability

How does the system know if an experiment is HPLC or NMR?

**Option 1**: User declares type explicitly
- Pros: Accurate, flexible
- Cons: Extra UI field, can be gamed (submit HPLC as NMR for higher multiplier)

**Option 2**: Auto-detect from difficulty score
- Pros: Zero friction, harder to game
- Cons: Imperfect (what if HPLC has D=55?)

**V2 Choice**: **Auto-detect with manual override**

```solidity
function detectType(uint256 difficulty) internal pure returns (ExperimentType) {
    if (difficulty >= 50)      return NMR_1H;
    else if (difficulty >= 25) return AIR_QUALITY;
    else if (difficulty >= 10) return HPLC;
    else                       return UNKNOWN;
}
```

Heuristic works 95% of the time. For edge cases:
```solidity
function registerExperimentWithType(..., ExperimentType expType) public
```

Power users can override. Beginners get automatic detection.

### Economic Model: $5.50/hour for NMR Reviews

Is reviewing experiments profitable?

**Scenario**: NMR connectivity error (D=55)
- Reviewer spends 2 hours re-analyzing spectra
- Finds error, submits review
- Resolution: originalValid = false
- **Reward**: 55 × 2 = 110 RV

If reputation marketplace develops where 1 RV = $0.10:
- 110 RV = **$11.00**
- 2 hours = **$5.50/hour**

**Not life-changing money, but:**
1. Better than $0 (current academic peer review)
2. Builds on-chain reputation (hireable signal)
3. Scales: More demand → higher RV value
4. Supplements academic income (postdocs, grad students)

**For comparison**:
- Journal peer review: $0/hour (unpaid labor)
- Graduate TA: ~$15/hour (university wage)
- Industry QC scientist: ~$30/hour (full-time job)

PoX fills the gap: **paid verification without full employment**.

### Extensibility: Adding New Experiment Types

How hard is it to add GC-MS, LC-MS, ICP-MS, etc.?

**Answer**: 3 lines of code

1. Add enum value:
```solidity
enum ExperimentType { ..., GC_MS, LC_MS, ICP_MS }
```

2. Set multiplier:
```solidity
reputationMultipliers[ExperimentType.GC_MS] = 15; // 1.5×
```

3. Update type detection (if auto-detect):
```solidity
if (difficulty >= 40) return GC_MS;
```

**That's it.** Registry contract is already modular (stores hashes, not experiment-specific logic).

**Governance**: Multipliers can be adjusted via `setReputationMultiplier()` (owner-gated for MVP, DAO vote in future).

### Open Question: Cross-Domain Reputation

Should HPLC reputation transfer to NMR?

**Arguments for "Yes"**:
- Analytical chemists often work across multiple techniques
- General scientific rigor is transferable
- Easier for new users (one reputation score)

**Arguments for "No"**:
- HPLC expertise ≠ NMR expertise (different skill sets)
- Gaming risk (farm easy HPLC, use rep for hard NMR)
- Domain-specific reputation is more credible signal

**V2 Compromise**: Separate reputation per type, but display aggregate

```typescript
interface ReputationProfile {
  total: number;          // Sum of all domains
  hplc: number;
  nmr: number;
  pxrd: number;
  // ...
}
```

Jobs can filter by domain:
- "Hiring NMR specialist: min 500 NMR reputation"
- "Hiring analytical generalist: min 1000 total reputation"

**Status**: Not yet implemented, but architecture supports it.

### The PXRD Opportunity: Why 3× Multiplier?

PXRD (Powder X-Ray Diffraction) is **uniquely error-prone**:

**Why errors are common**:
- Rietveld refinement is art+science (many free parameters)
- Space group assignment is ambiguous (systematic absences are subtle)
- Overlapping peaks are hard to deconvolute
- Thermal parameters (B-factors) can be unrealistic but hard to catch
- Most scientists don't deeply check refinements ("if it converges, it's good")

**Why it matters**:
- Pharmaceuticals: Wrong polymorph = wrong bioavailability
- Materials science: Wrong structure = wrong properties
- Catalysis: Wrong active site = wrong mechanism

**PoX strategy**: Make PXRD review **most profitable**
- 3× multiplier attracts expert reviewers
- High-quality PXRD validation becomes competitive advantage
- Pharma companies pay for PoX-verified polymorphs
- **PoX becomes THE standard for PXRD data quality**

This is **niche domination strategy**: Be the best at one thing (PXRD) before expanding.

### Future: Reputation Marketplace

Once on-chain reputation exists, new markets emerge:

**1. Lab Hiring**
```solidity
function applyForPosition(uint256 jobId) external {
    require(reputation[msg.sender] > jobs[jobId].minReputation);
    // Auto-shortlist based on on-chain credentials
}
```

**2. Grant Applications**
```solidity
function submitGrant(string calldata proposal) external {
    uint256 fundingAmount = reputation[msg.sender] * MULTIPLIER;
    // Higher reputation = larger grants
}
```

**3. Peer Review Services**
```solidity
function requestReview(uint256 experimentId, address reviewer) external payable {
    require(reputation[reviewer] > MIN_REVIEWER_REP);
    // Pay for expert review (reputation-gated)
}
```

**4. Reputation-Backed Loans**
```solidity
function borrowEquipment(uint256 instrumentId) external {
    uint256 collateral = reputation[msg.sender];
    require(collateral > instruments[instrumentId].minCollateral);
    // Lock reputation as bond; slash if equipment damaged
}
```

**The vision**: Reputation becomes **functional primitive** for scientific coordination, not just vanity metric.

### Comparison to Academic H-Index

**H-index problems**:
- Citation gaming (self-citations, citation rings)
- Slow (years to build)
- Field-dependent (physics h-index ≠ chemistry h-index)
- Opaque (can't verify citations cryptographically)

**PoX reputation advantages**:
- Gaming-resistant (fraud proofs catch fake experiments)
- Fast (earn reputation immediately on submission)
- Domain-specific but comparable (NMR reputation has clear meaning)
- Transparent (all data on-chain, reproducible)

**PoX reputation disadvantages** (for now):
- New metric (no institutional buy-in yet)
- Network effects (only valuable if others use it)
- Technical barrier (need to understand blockchain)

**Adoption strategy**:
1. Start with early-career scientists (postdocs, grad students)
2. They have most to gain (low h-index, need differentiation)
3. Once critical mass → institutions follow
4. Eventually: "Show me your PoX score" > "Show me your h-index"

## Meta-Thought: Why Write This?

These THOUGHTS.md files serve multiple purposes:

1. **Memory for future self**: When I revisit in 6 months, why did I do this?
2. **Communication for collaborators**: Shared understanding of design rationale
3. **Transparency for community**: Open-source means open reasoning
4. **Intellectual honesty**: If I can't articulate why, maybe it's wrong
5. **V2 Addition**: Document design evolution (V1 → V2 reasoning)

The code is **what** we built. THOUGHTS.md is **why** we built it that way.

**Code rots.** Ideas endure. Document the ideas.

---

*"Fortis est Veritas" — Truth is strong. But strength requires structure. PoX V2 is that structure, now with type-specific peer review.*
