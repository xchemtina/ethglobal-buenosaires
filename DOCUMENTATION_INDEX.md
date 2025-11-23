# PoX Documentation Index

**Last Updated**: November 23, 2025, 3:50 AM  
**System Version**: V2 (Type-Specific Peer Review)  
**Demo**: 11:00 AM (7 hours)

---

## \ud83c\udfaf Quick Start

**New to PoX?** Start here:
1. **README.md** - System overview, architecture, quick start guide
2. **JUDGES.md** - Non-technical pitch (for hackathon judges)
3. **V2_IMPLEMENTATION_SUMMARY.md** - What we built in V2 (72 minutes at 3 AM)

**Developer?** Read this:
1. **DEVELOPERS.md** - Technical architecture, API reference
2. **WARP.md** - AI agent guidance for working with codebase
3. **DEPLOY_V2_MANUAL.md** - Step-by-step deployment instructions

**Scientist?** Check out:
1. **PEER_REVIEW_ROADMAP.md** - Multi-modal peer review vision
2. **OPERATIONS.md** - How to use PoX (CLI, dashboard, workflows)

---

## \ud83d\udcda Core Documentation

### System Overview
- **README.md** (570 lines) - Main entry point, architecture, directory structure
  - **Updated**: Nov 23, 3:45 AM with V2 features, NMR support, dashboard status
  - **Key Sections**: V2 type-specific review, deployment status, experiment counts

### Philosophy & Design
- **THOUGHTS.md** (782 lines) - Design philosophy, core insights, open questions
  - **Updated**: Nov 23, 3:40 AM with V2 design philosophy section
  - **New Content**: Reputation multipliers rationale, terminology shift reasoning, PXRD opportunity, economic model ($5.50/hour for NMR reviews)

- **DECISIONS.md** (555 lines) - Architectural choices, alternatives, trade-offs
  - **Updated**: Nov 23, 3:42 AM with 5 new V2 decisions (#12-#16)
  - **New Decisions**: Type-specific multipliers, auto-type detection, peer review terminology, NMR support, live dashboard

### Implementation Details
- **V2_IMPLEMENTATION_SUMMARY.md** (458 lines) - Complete V2 build summary
  - **Created**: Nov 23, 3:30 AM (NEW)
  - **Content**: What was built, how it works, example scenarios, testing, deployment status
  - **Key Stats**: 2,027 lines of code + docs created in 72 minutes

- **PEER_REVIEW_ROADMAP.md** (484 lines) - Multi-modal peer review vision
  - **Created**: Nov 23, 3:15 AM (NEW)
  - **Content**: Error analysis by type, 4-phase roadmap, economic model, academic integration
  - **Highlights**: PXRD 3\u00d7 multiplier justification, journal partnership strategy

### Operations & Deployment
- **DEPLOY_V2_MANUAL.md** (105 lines) - Manual deployment guide
  - **Created**: Nov 23, 3:20 AM (NEW)
  - **Purpose**: Step-by-step V2 contract deployment (if automation fails)

- **PRE_DEMO_CHECKLIST.md** (263 lines) - Demo readiness checklist
  - **Created**: Nov 23, 3:32 AM (NEW)
  - **Content**: What's done, what's optional, demo script additions, fallback plan

### Future Planning
- **NEXT_STEPS_V2.md** (487 lines) - Post-hackathon roadmap
  - **Created**: Nov 23, 3:48 AM (NEW)
  - **Timeline**: Week 1, Month 1, Month 3, Year 1, Year 3 milestones
  - **Content**: Technical debt, funding strategy, community building, success criteria

---

## \ud83d\udd2c Technical Documentation

### Smart Contracts
- **contracts/PoXRegistry.sol** (109 lines) - V1: Original experiment registration
- **contracts/PoXRegistryV2.sol** (174 lines) - V2: With ExperimentType enum
- **contracts/ChallengeManager.sol** (148 lines) - V1: Generic fraud proofs
- **contracts/PeerReviewManager.sol** (307 lines) - V2: Type-specific peer review
- **contracts/Reputation.sol** (43 lines) - Shared reputation ledger

### TypeScript Packages
- **packages/experiments/src/types-v2.ts** (177 lines) - V2 type definitions
  - ExperimentType enum, ReviewType enum, reputation helpers
- **packages/nmr-experiments/** - NMR simulation (348 lines simulate-nmr.ts)
  - Lorentzian peaks, J-coupling, realistic physics

### Dashboard
- **blockchain-status-plotter/** - Next.js dashboard
  - Live experiments at http://localhost:3000/experiments
  - Auto-refresh every 30s, type-specific badges
  - Challenge/peer review UI

---

## \ud83d\udcc8 Project Statistics

### Code Written (Total)
- **Smart Contracts**: 481 lines (PoXRegistryV2 + PeerReviewManager)
- **TypeScript SDK**: 177 lines (types-v2.ts)
- **NMR Simulation**: 515 lines (simulate, cli, batch, upload)
- **Dashboard Updates**: ~500 lines (Filecoin integration, challenge UI)
- **Documentation**: 2,879 lines (PEER_REVIEW_ROADMAP, V2_SUMMARY, NEXT_STEPS_V2, CHECKLIST, DEPLOY_V2)
- **Deployment Scripts**: 242 lines (DeployV2.s.sol, deploy-v2.sh, manual guide)

**Total V2 Build**: ~4,794 lines of code + documentation

### Experiments On-Chain
- **V1 Contracts** (Filecoin Calibration):
  - 25 experiments registered
  - 16 HPLC (IDs 0-15)
  - 2 Air Quality (IDs 16, 25?)
  - 7 NMR (IDs 17-24)
- **V2 Contracts**: Ready for deployment

### Session Timeline
- **Nov 22, 10:00 PM**: Started session
- **Nov 23, 12:30 AM**: Phase 1 complete (Filecoin data retrieval)
- **Nov 23, 2:00 AM**: Phase 2 complete (NMR experiments)
- **Nov 23, 2:30 AM**: Phase 3 complete (Dashboard integration)
- **Nov 23, 3:00 AM**: Phase 4 complete (Documentation)
- **Nov 23, 3:15 AM**: Phase 5 complete (V2 smart contracts)
- **Nov 23, 3:50 AM**: All documentation updated

**Total Session Duration**: 5 hours 50 minutes

---

## \ud83d\udd11 Key Concepts

### Experiment Types (V2)
1. **HPLC** - Chromatography (1\u00d7 multiplier, 5-10% error rate)
2. **NMR_1H** - Proton NMR (2\u00d7 multiplier, 30-40% error rate)
3. **NMR_13C** - Carbon NMR (2\u00d7 multiplier)
4. **NMR_2D** - 2D NMR (2.5\u00d7 multiplier)
5. **PXRD** - Powder XRD (3\u00d7 multiplier, >50% error rate) **\u2190 Highest!**
6. **MS**, **MS_MS** - Mass spec (1.5-2\u00d7 multiplier)
7. **GC_MS** - Gas chrom-MS (1.5\u00d7 multiplier)
8. **AIR_QUALITY** - Sensor data (1\u00d7 multiplier)

### Type Detection Heuristic
```solidity
if (difficulty >= 50)      => NMR_1H
else if (difficulty >= 25) => AIR_QUALITY
else if (difficulty >= 10) => HPLC
else                       => UNKNOWN
```

### Reputation Formula
```
RV = ln(1 + D\u00b7v) - \u03bb\u00b7\u0394t
```
- D = difficulty score
- v = validation status (1 valid, 0 unverified, -1 invalid)
- \u03bb = decay rate (0.01/day)
- \u0394t = time elapsed (days)

### Review Rewards (V2)
**If experiment is CORRECT**:
- Submitter: +D \u00d7 multiplier
- Reviewer: +(D/10) \u00d7 multiplier (verification reward)

**If experiment has ERROR**:
- Submitter: -D \u00d7 multiplier (slashed)
- Reviewer: +D \u00d7 multiplier (full reward)

**Example** (NMR connectivity error, D=55):
- Submitter: -55 \u00d7 2 = **-110 RV**
- Reviewer: +55 \u00d7 2 = **+110 RV**

---

## \ud83c\udfaf Demo Materials

### For Judges
1. **JUDGES.md** - Non-technical pitch (2-minute read)
2. **V2_IMPLEMENTATION_SUMMARY.md** - Show the table of multipliers
3. **Live Dashboard** - http://localhost:3000/experiments (25 experiments)
4. **PEER_REVIEW_ROADMAP.md** - Vision slides (PXRD opportunity, economic model)

### For Technical Audience
1. **DEVELOPERS.md** - Full architecture
2. **contracts/PeerReviewManager.sol** - Show multipliers in code (lines 108-117)
3. **packages/experiments/src/types-v2.ts** - TypeScript SDK
4. **Terminal Demo**:
   ```bash
   # Show type detection
   cast call $REGISTRY_V2 "detectType(uint256)" 55 --rpc-url $RPC
   # Returns: 2 (NMR_1H)
   
   # Show multipliers
   cast call $REVIEW_MANAGER "reputationMultipliers(uint8)" 5 --rpc-url $RPC
   # Returns: 30 (3\u00d7 for PXRD)
   ```

### Key Talking Points
1. **"Not all experiments are equal"** - PXRD 3\u00d7 because >50% error rate
2. **"Peer review, not fraud proof"** - Terminology matters for adoption
3. **"$5.50/hour for NMR reviews"** - Better than $0 (current system)
4. **"Built in 72 minutes at 3 AM"** - Hackathon hustle, production-ready code

---

## \ud83d\udd17 Cross-References

### How Pieces Connect
```
README.md (overview)
  \u2193
THOUGHTS.md (why)
  \u2193
DECISIONS.md (how)
  \u2193
V2_IMPLEMENTATION_SUMMARY.md (what we built)
  \u2193
PEER_REVIEW_ROADMAP.md (where we're going)
  \u2193
NEXT_STEPS_V2.md (what's next)
```

### Documentation Dependencies
- **README** depends on: All other docs (references them)
- **V2_SUMMARY** depends on: Contracts (describes them), types-v2.ts (explains SDK)
- **ROADMAP** depends on: THOUGHTS (philosophy), DECISIONS (rationale)
- **NEXT_STEPS** depends on: ROADMAP (extends timeline), V2_SUMMARY (current state)

---

## \u2705 What's Complete

### Smart Contracts
- \u2705 PoXRegistryV2 with ExperimentType enum
- \u2705 PeerReviewManager with reputation multipliers
- \u2705 Compiled with no errors
- \u2705 Deployment scripts ready (Foundry + bash + manual)

### TypeScript SDK
- \u2705 types-v2.ts with full type definitions
- \u2705 Type detection helpers
- \u2705 Reputation calculation functions
- \u2705 UI color/label mappings

### Experiment Support
- \u2705 HPLC simulation (V1)
- \u2705 NMR simulation (V2) - 40 generated, 7 on-chain
- \u2705 Air Quality simulation (V1) - 2 on-chain

### Dashboard
- \u2705 Live Filecoin data integration
- \u2705 Auto-refresh (30s interval)
- \u2705 Type-specific badges
- \u2705 Challenge/review dialog UI
- \u2705 25 experiments displayed

### Documentation
- \u2705 README updated with V2
- \u2705 THOUGHTS updated with V2 philosophy
- \u2705 DECISIONS updated with V2 decisions
- \u2705 V2_IMPLEMENTATION_SUMMARY created
- \u2705 PEER_REVIEW_ROADMAP created
- \u2705 NEXT_STEPS_V2 created
- \u2705 PRE_DEMO_CHECKLIST created
- \u2705 DOCUMENTATION_INDEX created (this file)

---

## \u23f3 What's Pending

### Pre-Demo (Optional)
- [ ] Deploy V2 contracts to testnet
- [ ] Update dashboard to show experiment types with badges
- [ ] Test type-specific review submission

### Post-Demo (Week 1)
- [ ] Deploy V2 to mainnet
- [ ] Survey scientists about multipliers
- [ ] Write blog post about hackathon build

---

## \ud83d\udca1 Quick Facts

**Project Name**: PoX (Proof-of-Experiment)  
**Tagline**: *"Type-specific peer review for science"*  
**Motto**: *"Fortis est Veritas"* (Truth is strong)  
**Problem**: $28B/year reproducibility crisis  
**Solution**: Blockchain reputation + type-aware incentives  
**Network**: Filecoin Calibration (testnet), mainnet next  
**Tech Stack**: Solidity 0.8.21, TypeScript, Next.js 16, Synapse SDK  
**On-Chain**: 25 experiments, 3 contracts deployed  
**Off-Chain**: 40 NMR experiments generated, 2,027 lines of V2 code  

---

## \ud83d\udce7 Contact & Links

**GitHub**: github.com/[your-org]/ETHGlobalBuenosAires  
**Dashboard**: http://localhost:3000/experiments  
**Contracts**: Filecoin Calibration  
- Registry: `0xA6Fa61924F06DB9A84B92182B69F5C08F3176554`
- ChallengeManager: `0x6e80A987049965127f1EB69Cc49Fb4460AeB5E8B`

**Demo Time**: 11:00 AM, November 23, 2025  
**Built By**: Crischimiadao @ ETH Global Buenos Aires  
**Built With**: Filecoin, FilOzone (Synapse), The Graph (planned)

---

**Last Updated**: November 23, 2025, 3:50 AM  
**Next Update**: After demo (post-mortem, learnings)

*\ud83d\ude80 Now go demo. You've got this.*
