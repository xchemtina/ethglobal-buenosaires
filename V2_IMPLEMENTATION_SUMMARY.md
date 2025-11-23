# PoX V2 Implementation Summary
**Type-Specific Peer Review System**

*Built: November 23, 2025, 2:18 AM - 3:30 AM*

---

## 🎯 What Was Built

A complete upgrade from generic "fraud proof" challenges to scientific **type-specific peer review** with experiment-aware reputation multipliers.

### Core Innovation

**Different experiment types have different error rates → different review rewards**

| Experiment Type | Error Rate | Review Multiplier | Why |
|-----------------|------------|-------------------|-----|
| **PXRD** | >50% | **3×** | Rietveld refinement errors are rampant |
| **NMR (¹H/¹³C)** | 30-40% | **2×** | Connectivity/stereochemistry mistakes |
| **MS/MS** | 20-30% | **2×** | Fragment assignment errors |
| **HPLC** | 5-10% | **1×** | Peak integration (straightforward) |
| **Air Quality** | varies | **1×** | Sensor data (baseline) |

---

## 📦 What Was Created

### 1. Smart Contracts (Solidity)

#### `contracts/PoXRegistryV2.sol` (174 lines)
- **NEW**: `ExperimentType` enum (10 types: HPLC, NMR_1H, NMR_13C, NMR_2D, PXRD, MS, MS_MS, GC_MS, AIR_QUALITY, UNKNOWN)
- **NEW**: `expType` field in `Experiment` struct
- **NEW**: `detectType(difficulty)` - Auto-detects experiment type from difficulty score
- **NEW**: `registerExperimentWithType()` - Explicit type registration for power users
- Backward compatible: `registerExperiment()` still works (auto-detects type)

**Type Detection Heuristic**:
```solidity
if (difficulty >= 50)       => NMR_1H     // Complex NMR spectra
else if (difficulty >= 25)  => AIR_QUALITY // Multi-sensor data
else if (difficulty >= 10)  => HPLC        // Chromatography
else                        => UNKNOWN     // Fallback
```

#### `contracts/PeerReviewManager.sol` (307 lines)
- **NEW**: Complete peer review system (replaces ChallengeManager)
- **NEW**: `ReviewType` enum (VERIFICATION, REINTERPRETATION, ERROR_DETECTION)
- **NEW**: `PeerReview` struct with alternative interpretation storage
- **NEW**: `reputationMultipliers` mapping (type → multiplier)
- **NEW**: `submitReview()` - Reviewer submits alternative + justification
- **NEW**: `resolveReview()` - Owner-gated resolution with type-specific rewards
- **NEW**: `getReviewsForExperiment()` - Query review history

**Reputation Logic**:
```solidity
// If experiment is CORRECT:
submitterDelta = +D × multiplier        // Original author rewarded
reviewerDelta  = +(D/10) × multiplier   // Small verification reward

// If experiment has ERROR:
submitterDelta = -D × multiplier        // Original author slashed
reviewerDelta  = +D × multiplier        // Reviewer gets full reward
```

**Default Multipliers** (scaled by 10 in contract):
- UNKNOWN: 10 (1×)
- HPLC: 10 (1×)
- NMR_1H: 20 (2×)
- NMR_13C: 20 (2×)
- NMR_2D: 25 (2.5×)
- **PXRD: 30 (3×)** ← Highest!
- MS: 15 (1.5×)
- MS_MS: 20 (2×)
- GC_MS: 15 (1.5×)
- AIR_QUALITY: 10 (1×)

### 2. TypeScript SDK (177 lines)

#### `packages/experiments/src/types-v2.ts`
- **NEW**: `ExperimentType` enum (TypeScript mirror of Solidity enum)
- **NEW**: `ReviewType` enum
- **NEW**: `ExperimentV2` interface (with `expType` field)
- **NEW**: `PeerReview` interface
- **NEW**: `ReputationMultipliers` type + defaults
- **NEW**: `detectExperimentType(difficulty)` - Client-side type detection
- **NEW**: `calculateReviewReward()` - Preview reputation changes
- **NEW**: Type guards (`isExperimentV2`, `isPeerReview`)
- **NEW**: UI helpers (labels, colors for badges)

**Example Usage**:
```typescript
import { detectExperimentType, ExperimentType, calculateReviewReward } from './types-v2';

// Detect type
const expType = detectExperimentType(difficulty); // NMR_1H for D=55

// Calculate reward
const reviewerReward = calculateReviewReward(
  55,                     // difficulty
  ExperimentType.NMR_1H,  // type
  false,                  // original is INVALID
  true                    // is reviewer
);
// Returns: 110 (55 × 2 = 110 RV)
```

### 3. Deployment Infrastructure

#### `foundry/script/DeployV2.s.sol` (46 lines)
- Foundry deployment script for all V2 contracts
- Proper deployment order (Reputation → Registry → ReviewManager)
- Auto-authorization after deployment

#### `deploy-v2.sh` (91 lines)
- Bash script for manual deployment
- Error handling + JSON parsing
- Outputs addresses for .env file

#### `DEPLOY_V2_MANUAL.md` (105 lines)
- Manual deployment guide (in case automation fails)
- Step-by-step with `cast` commands
- Testing instructions
- Option to reuse existing Reputation or deploy new one

### 4. Documentation

#### `PEER_REVIEW_ROADMAP.md` (484 lines)
- **Comprehensive multi-modal roadmap**
- Error analysis by experiment type
- 4-phase implementation plan (Phase 1 complete, Phases 2-4 planned)
- Real-world use cases (natural products, pharma QC, metabolomics)
- Economic model ($5.50/hour for NMR reviews if 1 RV = $0.10)
- Academic integration strategy (journal pilots)
- Technical architecture diagrams
- Terminology guide (Challenge → Peer Review)

#### This document (`V2_IMPLEMENTATION_SUMMARY.md`)
- What was built
- How it works
- How to use it
- What's next

---

## 🔧 How It Works

### Flow 1: Submitting an Experiment

```typescript
// Off-chain: Generate experiment
const experiment = generateHPLCExperiment(seed);
const difficulty = experiment.difficulty; // e.g., 15

// On-chain: Register with auto-detection
await registryV2.registerExperiment(
  cid,
  dataHash,
  metricsHash,
  difficulty,
  initialRV
);
// Contract auto-detects: difficulty=15 → HPLC
// Submitter earns +15 RV (base, no multiplier yet)
```

### Flow 2: Submitting a Peer Review

```typescript
// Off-chain: Reviewer downloads data from Filecoin
const originalData = await downloadFromFilecoin(cid);

// Reviewer re-analyzes (finds error in peak integration)
const alternativeAnalysis = reanalyze(originalData);

// Upload alternative to IPFS
const alternativeCID = await uploadToIPFS(alternativeAnalysis);
const justificationCID = await uploadToIPFS("Detailed explanation...");

// On-chain: Submit review
await reviewManager.submitReview(
  experimentId,
  keccak256(alternativeCID),      // Hash of alternative
  justificationCID,                // IPFS link to justification
  ReviewType.ERROR_DETECTION       // Type of review
);
// Review ID returned, awaiting resolution
```

### Flow 3: Resolving a Peer Review

```typescript
// Owner (or DAO in future) resolves review
await reviewManager.resolveReview(
  reviewId,
  false  // originalValid = false (reviewer found error)
);

// Contract logic:
// 1. Fetches experiment: D=55, type=NMR_1H
// 2. Gets multiplier: NMR_1H → 2×
// 3. Calculates deltas:
//    - Submitter: -55 × 2 = -110 RV (slashed)
//    - Reviewer:  +55 × 2 = +110 RV (rewarded)
// 4. Applies reputation adjustments
// 5. Emits ReviewResolved event
```

---

## 📊 Example Scenarios

### Scenario 1: HPLC Verification (Correct)
- Experiment: D=15, type=HPLC
- Reviewer verifies data is correct
- Resolution: originalValid = true
- **Submitter**: +15 × 1 = **+15 RV**
- **Reviewer**: +1.5 × 1 = **+1.5 RV** (10% verification reward)

### Scenario 2: NMR Connectivity Error (Wrong)
- Experiment: D=55, type=NMR_1H
- Reviewer finds wrong molecular structure
- Resolution: originalValid = false
- **Submitter**: -55 × 2 = **-110 RV** (slashed!)
- **Reviewer**: +55 × 2 = **+110 RV** (full reward for finding error)

### Scenario 3: PXRD Rietveld Refinement Error (Wrong)
- Experiment: D=80, type=PXRD
- Reviewer finds bad thermal parameters
- Resolution: originalValid = false
- **Submitter**: -80 × 3 = **-240 RV** (maximum penalty!)
- **Reviewer**: +80 × 3 = **+240 RV** (maximum reward!)

**Why 3× for PXRD?** Because >50% of Rietveld refinements have issues, and finding these errors requires deep expertise. We want to incentivize PXRD reviewers maximally.

---

## 🎨 UI Integration (Conceptual)

### Dashboard Changes Needed

1. **Experiment Cards**:
   - Add type badge (color-coded):
     - HPLC: Blue
     - NMR: Purple
     - PXRD: Red (highest multiplier!)
     - MS/MS: Green
     - Air Quality: Orange
   
2. **Review Dialog**:
   - Type-specific fields:
     - NMR: "Proposed alternative connectivity"
     - PXRD: "R-factor comparison (Rwp, Rp, GOF)"
     - MS/MS: "Alternative fragmentation tree"
   - Justification upload (PDF/markdown)
   - Review type selector (Verification / Reinterpretation / Error Detection)

3. **Review History**:
   - Per-experiment review list
   - Status (Pending / Resolved / Valid / Invalid)
   - Reputation deltas shown

4. **Reputation Multiplier Display**:
   - Tooltip: "NMR reviews earn 2× reputation"
   - Warning for PXRD: "3× multiplier! High-value reviews"

### API Routes Needed

```typescript
// app/api/review/submit/route.ts
POST /api/review/submit
{
  experimentId: number,
  alternativeHash: string,  // CID of alternative analysis
  justificationCID: string, // IPFS link
  reviewType: "VERIFICATION" | "REINTERPRETATION" | "ERROR_DETECTION"
}

// app/api/review/list/route.ts
GET /api/review/list?experimentId=123
Returns: PeerReview[]

// app/api/review/resolve/route.ts (owner only)
POST /api/review/resolve
{
  reviewId: number,
  originalValid: boolean
}
```

---

## 🧪 Testing

### Contract Testing

```bash
# Check type detection
cast call $REGISTRY_V2 "detectType(uint256)" 55 --rpc-url $RPC
# Should return: 2 (NMR_1H)

# Check multipliers
cast call $REVIEW_MANAGER "reputationMultipliers(uint8)" 2 --rpc-url $RPC
# Should return: 20 (2× for NMR_1H)

cast call $REVIEW_MANAGER "reputationMultipliers(uint8)" 5 --rpc-url $RPC
# Should return: 30 (3× for PXRD)
```

### Integration Testing

1. **Register NMR experiment** (D=55)
2. **Submit review** with alternative interpretation
3. **Resolve review** (originalValid = false)
4. **Verify reputation changes**:
   - Submitter: -110 RV
   - Reviewer: +110 RV

---

## 🚀 Deployment Status

### Contracts Built ✅
- `PoXRegistryV2.sol` compiled
- `PeerReviewManager.sol` compiled
- No compilation errors

### Contracts Deployed ⏳
- **Status**: Deployment scripts ready, awaiting manual execution
- **Reason**: Automated deployment had issues with private key parsing
- **Solution**: Manual deployment guide created (DEPLOY_V2_MANUAL.md)

### Next Step
Execute manual deployment:

```bash
cd /Users/crischimiadao/ETHGlobalBuenosAires
# Follow DEPLOY_V2_MANUAL.md steps 1-3
```

---

## 📈 Impact

### For Hackathon Demo

**Before V2**:
- "We have a challenge system for fraud detection"
- Generic rewards, no experiment awareness
- Scary terminology ("fraud", "dispute")

**After V2**:
- "We have type-specific peer review with scientifically-calibrated incentives"
- PXRD reviews earn 3× because >50% have errors
- NMR reviews earn 2× because connectivity mistakes are common
- Friendly terminology ("peer review", "verification")

### For Production

- **Academic adoption**: Journals want "peer review", not "fraud proof"
- **Economic viability**: $5.50/hour for NMR reviews (at 1 RV = $0.10)
- **Quality signal**: PXRD 3× multiplier signals "this matters most"
- **Extensibility**: Easy to add new types (GC-MS, LC-MS, ICP-MS, etc.)

---

## 🗺️ What's Next (Post-Hackathon)

### Week 1
- [ ] Deploy V2 contracts to testnet
- [ ] Update dashboard to show experiment types
- [ ] Add type-specific review UI
- [ ] Survey scientists: "Would you review for RV?"

### Month 1
- [ ] Build NMR connectivity validator (MVP)
- [ ] Build PXRD Rietveld checker (MVP)
- [ ] Partner with 3 labs for beta testing
- [ ] Collect real-world error data

### Month 3
- [ ] Launch reputation marketplace
- [ ] Onboard 50+ experiments with reviews
- [ ] Publish case study: "We found an error via PoX"
- [ ] Pitch to *J. Org. Chem.* editorial board

### Year 1
- [ ] 1,000+ experiments on mainnet
- [ ] 100+ peer reviews submitted
- [ ] 10+ partner labs
- [ ] 1 journal pilot (CID requirement)
- [ ] $100k+ reputation marketplace volume

---

## 🧠 Key Insights

1. **Terminology Matters**: "Fraud proof" scares scientists. "Peer review" is trusted.

2. **Different Errors, Different Rewards**: PXRD Rietveld refinement is notoriously error-prone (>50% rate) → deserves 3× multiplier.

3. **Reputation = Capital**: If 1 RV = $0.10, a 2-hour NMR review earns $5.50/hour. Not huge, but:
   - Better than $0 (current system)
   - Builds on-chain reputation (hireable signal)
   - Scalable (more demand → higher RV value)

4. **Smart Contract Simplicity**: Type-specific logic fits cleanly in Solidity with enums + mappings. No complex math.

5. **Future-Proof**: Adding new experiment types (MS, GC-MS, NMR-2D, etc.) is trivial. Just:
   - Add enum value
   - Set multiplier
   - Deploy

---

## 📚 Files Created

### Smart Contracts
1. `/contracts/PoXRegistryV2.sol` (174 lines)
2. `/contracts/PeerReviewManager.sol` (307 lines)

### Deployment
3. `/foundry/script/DeployV2.s.sol` (46 lines)
4. `/deploy-v2.sh` (91 lines)
5. `/DEPLOY_V2_MANUAL.md` (105 lines)

### TypeScript SDK
6. `/packages/experiments/src/types-v2.ts` (177 lines)

### Documentation
7. `/PEER_REVIEW_ROADMAP.md` (484 lines)
8. `/V2_IMPLEMENTATION_SUMMARY.md` (this file)

**Total**: ~1,384 lines of new code + documentation

---

## 🎬 Demo Script Addition

Add this to JUDGES.md demo:

> **Slide 7: Type-Specific Peer Review**
> 
> "Not all experiments are created equal. PXRD Rietveld refinements have a >50% error rate. NMR connectivity mistakes are common in natural products chemistry. HPLC peak integration? Rarely wrong.
> 
> So we built type-specific reputation multipliers:
> - PXRD reviews: **3× reputation** (highest!)
> - NMR reviews: **2× reputation**
> - HPLC reviews: **1× reputation** (baseline)
> 
> This aligns incentives with scientific reality. Find a PXRD error? You get 3× the reward because it's 3× harder and 3× more valuable.
> 
> **Live Demo**: [Show experiment card with PXRD badge, 3× multiplier tooltip]"

---

**Fortis est Veritas** ⚡

*Built in 72 minutes at 3:30 AM. Science never sleeps.*
