# PoX Peer Review System: Multi-Modal Roadmap
**Scientific Data Verification at Scale**

*From NMR connectivity errors to PXRD Rietveld refinement mistakes*

---

## 🧪 Core Insight

**Different experiment types have radically different error modes.**

Traditional "fraud proof" framing assumes malicious intent. **Wrong.** Most errors in science are:
1. **Interpretation errors** (wrong molecular connectivity in NMR)
2. **Refinement errors** (bad Rietveld fit in PXRD)
3. **Assignment errors** (wrong fragments in MS/MS)
4. **Methodological errors** (wrong baseline in HPLC)

→ **Solution**: Type-specific peer review, not generic fraud detection.

---

## 📊 Experiment-Type Error Analysis

### NMR (Nuclear Magnetic Resonance)
**Error Frequency**: HIGH (30-40% of published structures have minor errors)

**Common Mistakes**:
- Wrong molecular connectivity (misinterpreted COSY/HSQC)
- Incorrect stereochemistry assignment
- Misidentified coupling patterns (J-coupling)
- Overlooked impurities (solvent peaks misassigned)

**Review Method**:
- Re-interpret 2D spectra (COSY, HSQC, HMBC)
- Propose alternative connectivity
- Check consistency with chemical shift databases

**Reputation Multiplier**: **2×D** (requires expertise)

**Why This Matters**:
- Natural products chemistry: ONE wrong connectivity = entire paper retracted
- Drug discovery: Wrong structure = millions wasted
- Academic reputation: Errors damage credibility permanently

---

### PXRD (Powder X-Ray Diffraction)
**Error Frequency**: **VERY HIGH** (>50% of Rietveld refinements have issues)

**Common Mistakes**:
- Wrong space group assignment
- Incorrect unit cell parameters
- Poor peak fitting (overlapping peaks)
- Unidentified impurity phases
- Bad thermal parameters (unrealistic B-factors)

**Review Method**:
- Check systematic absences (space group validation)
- Re-run Rietveld refinement with different models
- Compare R-factors (Rwp, Rp, GOF)
- Validate atomic positions (bond lengths, angles)

**Reputation Multiplier**: **3×D** (highest difficulty!)

**Why This Matters**:
- Materials science: Wrong structure = wrong properties
- Pharmaceuticals: Polymorphism detection is critical
- Most scientists don't check Rietveld fits carefully (easy to game)
- **PoX could become THE standard for PXRD data validation**

---

### MS/MS-MS (Tandem Mass Spectrometry)
**Error Frequency**: MODERATE (20-30% have debatable assignments)

**Common Mistakes**:
- Wrong parent ion identification
- Incorrect fragment pathway
- Missed rearrangements
- Contamination not accounted for
- Isotope pattern misinterpretation

**Review Method**:
- Re-analyze fragmentation tree
- Check isotope ratios
- Validate molecular formula
- Propose alternative fragmentation mechanisms

**Reputation Multiplier**: **2×D** (especially for biologics)

**Why This Matters**:
- Proteomics: Wrong peptide ID = wrong biological conclusion
- Metabolomics: Isomers are indistinguishable by MS alone
- Drug metabolism: Incorrect metabolite structures

---

### HPLC (High-Performance Liquid Chromatography)
**Error Frequency**: LOW (5-10% have issues)

**Common Mistakes**:
- Peak integration errors (rare)
- Baseline correction artifacts
- Overlapping peaks not deconvoluted
- Retention time drift not accounted for

**Review Method**:
- Re-integrate peaks
- Check baseline fit
- Validate peak purity

**Reputation Multiplier**: **1×D** (straightforward)

**Why This Matters**:
- Purity analysis: 99% vs 95% purity = huge difference
- Quantification: Wrong integration = wrong concentrations
- Least controversial (good starting point for PoX)

---

## 🎯 Roadmap by Experiment Type

### Phase 1 (Current): HPLC + Air Quality + NMR ✅
**Status**: Deployed on testnet

**Capabilities**:
- Upload experiments to Filecoin
- Register on-chain with difficulty scoring
- Open peer reviews (generic, not type-specific yet)
- Dashboard visualization

**Limitations**:
- No type-specific review logic
- No alternative interpretation storage
- No reputation multipliers
- No review history UI

---

### Phase 2 (Next 3 Months): Type-Specific Reviews

**Goal**: Experiment-type-aware review system

**Smart Contract Changes**:
```solidity
enum ExperimentType { HPLC, NMR_1H, NMR_13C, NMR_2D, PXRD, MS, MS_MS, GC_MS, AIR_QUALITY }

struct PeerReview {
    uint256 id;
    uint256 experimentId;
    ExperimentType expType;
    address reviewer;
    bytes32 alternativeHash;  // Their reinterpretation CID
    string justificationCID;  // IPFS link to detailed explanation
    uint256 timestamp;
    bool resolved;
    bool originalValid;
}

mapping(ExperimentType => uint256) public reputationMultipliers;

function submitReview(
    uint256 experimentId,
    bytes32 alternativeHash,
    string calldata justificationCID
) external returns (uint256 reviewId);

function resolveReview(
    uint256 reviewId,
    bool originalValid
) external onlyOwner;
```

**Dashboard Changes**:
- Type-specific review forms (different fields for NMR vs PXRD)
- Alternative interpretation upload
- Justification document (PDF/markdown)
- Review history per experiment

**Reputation Logic**:
- HPLC: +D for valid review
- NMR: +2D for valid review
- PXRD: +3D for valid review
- MS/MS: +2D for valid review

---

### Phase 3 (6 Months): NMR + PXRD Focus

**Goal**: Deep integration for most error-prone types

**NMR Specific Features**:
- Upload 2D spectra (COSY, HSQC, HMBC)
- Connectivity graph comparison
- Chemical shift prediction integration (ML models)
- Stereochemistry validation tools
- Solvent peak library (auto-flag common contaminants)

**PXRD Specific Features**:
- Rietveld refinement parameter storage
- R-factor comparison (Rwp, Rp, GOF thresholds)
- Space group validation (systematic absence checker)
- Bond length/angle sanity checks
- Peak deconvolution tools

**UI/UX**:
- Split-screen spectrum viewer (original vs review)
- Connectivity editor (draw alternative structures)
- Refinement parameter diff view
-Annotated peak assignments

**Example Review Flow (NMR)**:
1. Reviewer downloads NMR spectra from Filecoin
2. Loads into NMR analysis software (e.g., MestReNova)
3. Re-interprets 2D spectra
4. Proposes alternative molecular structure
5. Uploads structure + annotated spectra to IPFS
6. Submits review with CID
7. Earns 2×D reputation if correct

---

### Phase 4 (12 Months): MS/MS + Biologics

**Goal**: Proteomics and metabolomics support

**MS/MS Features**:
- Fragmentation tree visualization
- Peptide sequence validation
- Isotope pattern matching
- Metabolite database integration (HMDB, METLIN)
- Lipid identification tools

**Biologics Support**:
- Protein mass fingerprinting
- Glycosylation site validation
- Post-translational modification detection
- Intact mass analysis

**Partnership Targets**:
- Proteomics labs (university core facilities)
- Metabolomics consortia
- Pharma QC departments
- CROs (contract research organizations)

---

## 💰 Economic Model: Review Incentives

### Current Problem
**Reviewing data is unpaid labor.** Academics do it for "prestige" but it's:
- Time-consuming (hours per paper)
- Unrecognized (anonymous reviews)
- Thankless (no reputation boost)

### PoX Solution: **Reputation = Capital**

**Reputation Earning Mechanisms**:
1. **Valid Experiments**: +D (difficulty-weighted)
2. **Valid Reviews**: +D to +3D (type-weighted)
3. **Correct Re-Analysis**: Bonus multiplier (if original was wrong)
4. **Time Decay**: -λ·Δt (encourages continuous contribution)

**Reputation Spending Mechanisms** (Future):
1. **Lab Hiring**: Labs filter candidates by on-chain reputation
2. **Grant Applications**: NSF/NIH check PoX reputation
3. **Marketplace**: Labs "hire" high-reputation scientists for reviews
4. **Staking**: Stake reputation to validate experiments (get slashed if wrong)

**Example Economics** (NMR connectivity error):
- Original submitter: D = 55 (complex spectrum)
- Reviewer finds error, proposes correct structure
- Resolution: Original invalid
  - Submitter: -55 reputation (slashed)
  - Reviewer: +110 reputation (2×D for NMR)
- Reviewer invested 2 hours → earned 110 RV
- **Hourly rate**: 55 RV/hour
- If 1 RV = $0.10 in marketplace → **$5.50/hour** for scientific review

**This changes the game.**

---

## 🔬 Real-World Use Cases

### Use Case 1: Natural Products Lab
**Problem**: Published total synthesis relies on NMR structure. Competitor suspects wrong stereochemistry.

**PoX Flow**:
1. Competitor downloads NMR data from Filecoin (CID in paper supplement)
2. Re-analyzes NOESY spectra, finds inconsistency
3. Proposes alternative stereochemistry
4. Submits review with annotated spectra
5. Original authors verify → Competitor is correct
6. Competitor earns 2×D reputation
7. Original paper correction published with PoX review CID

**Impact**: Faster error correction, credited reviewers, preserved data.

---

### Use Case 2: Pharma QC Lab
**Problem**: PXRD confirms API polymorph, but Rietveld fit is suspicious.

**PoX Flow**:
1. Regulatory reviewer downloads PXRD data
2. Re-runs refinement, finds bad thermal parameters
3. Proposes better fit (lower Rwp)
4. Submits review
5. Pharma lab verifies → Reviewer is correct
6. Reviewer earns 3×D reputation (PXRD multiplier)
7. Batch gets re-analyzed, potential recall avoided

**Impact**: Better drug quality, incentivized QC reviewers.

---

### Use Case 3: Metabolomics Consortium
**Problem**: MS/MS database has wrong metabolite assignments.

**PoX Flow**:
1. Expert downloads MS/MS data for 100 metabolites
2. Batch-reviews fragmentation patterns
3. Flags 15 incorrect assignments
4. Proposes corrections with references
5. Consortium verifies → 14/15 correct
6. Expert earns 2×D × 14 = 28D reputation
7. Database updated, cited in PoX

**Impact**: Cleaner databases, incentivized curation.

---

## 🏗️ Technical Architecture Changes

### Smart Contract Stack (Updated)

```
┌─────────────────────────────────────┐
│       ExperimentRegistry            │
│  - Stores: CID, type, difficulty    │
│  - New: experimentType field        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       PeerReviewManager             │  ← New contract
│  - submitReview(id, altHash, just)  │
│  - resolveReview(id, valid)         │
│  - Type-specific multipliers        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       ReputationLedger              │
│  - Unified RV tracking              │
│  - Time decay logic                 │
│  - Type-aware adjustments           │
└─────────────────────────────────────┘
```

### Off-Chain Components

**Review Processor**:
- Downloads original + alternative from Filecoin
- Runs deterministic comparison
- Generates comparison report
- Uploads to IPFS
- Submits on-chain

**Type-Specific Analyzers**:
- NMR: Connectivity validator, chemical shift predictor
- PXRD: Rietveld re-fitter, space group checker
- MS/MS: Fragment tree generator, isotope pattern matcher

**Dashboard**:
- Review submission UI (type-specific)
- Review history viewer
- Reputation leaderboard
- Split-screen data comparison

---

## 🎓 Academic Integration

### Journal Requirements (Future)
**Goal**: PoX CID required for publication

**Process**:
1. Authors upload raw data to PoX
2. Get CID for each experiment
3. Include CID in paper supplement
4. Reviewers download data via CID
5. Reviews recorded on-chain
6. Paper acceptance contingent on PoX validation

**Pilot Partners** (Target):
- *Journal of Organic Chemistry* (NMR focus)
- *Acta Crystallographica* (PXRD focus)
- *Journal of Proteome Research* (MS/MS focus)

---

## 📈 Growth Metrics

### Success Indicators (Year 1)
- [ ] 1,000+ experiments on mainnet
- [ ] 100+ peer reviews submitted
- [ ] 10+ partner labs using PoX
- [ ] 1 journal pilot integration
- [ ] $100k+ total reputation value in marketplace

### Success Indicators (Year 3)
- [ ] 100,000+ experiments
- [ ] 10,000+ reviews
- [ ] 1,000+ labs
- [ ] 10+ journals require PoX CIDs
- [ ] $10M+ reputation marketplace

---

## 🚀 Why This Will Work

1. **Real Problem**: Errors in analytical data are rampant
2. **Expensive Problem**: Wrong structures = wasted R&D (millions)
3. **Unmet Need**: No incentive for data review currently
4. **Network Effects**: More data → Better ML models → Better validation
5. **Economic Alignment**: Reviewers earn, labs save money, science improves

---

## 🎯 Immediate Next Steps (Post-Hackathon)

### Week 1
- [ ] Survey NMR chemists: "Would you use this?"
- [ ] Survey PXRD crystallographers: "How often do you find errors?"
- [ ] Draft journal partnership proposal
- [ ] Calculate reputation marketplace economics

### Month 1
- [ ] Implement experiment type field in registry
- [ ] Deploy reputation multipliers
- [ ] Build NMR connectivity validator (MVP)
- [ ] Build PXRD Rietveld checker (MVP)
- [ ] Partner with 3 labs for beta testing

### Month 3
- [ ] Launch reputation marketplace
- [ ] Onboard 50+ experiments with reviews
- [ ] Publish case study: "We found an error via PoX"
- [ ] Pitch to *J. Org. Chem.* editorial board

---

## 💬 Terminology Guide

| Old (Hackathon) | New (Production) | Why? |
|-----------------|------------------|------|
| Challenge | **Peer Review** | Less confrontational |
| Fraud Proof | **Data Verification** | Assumes good faith |
| Challenger | **Reviewer** | Scientific norm |
| Dispute | **Re-Analysis Request** | Collaborative framing |
| Slash | **Reputation Adjustment** | Neutral language |
| Challenge Manager | **Peer Review Manager** | Aligns with academia |

---

## 🔥 Closing Thought

**n×(AI+Scientist) >>> "AI-Scientist"**

PoX doesn't replace peer review. **It incentivizes it.**

Bad data isn't fraud. **It's inevitable.** The question is:
- Do we hide it (current system)?
- Or do we find it, fix it, and reward the finders (PoX)?

**The scientific method demands the latter.**

---

**Fortis est Veritas** ⚡

*Truth is strong. Especially when it pays.*
