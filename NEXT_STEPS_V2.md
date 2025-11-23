# NEXT_STEPS \u2014 Post-Hackathon Roadmap (V2)

**Current State** (Nov 23, 2025, 3:45 AM):
- \u2705 25 experiments on Filecoin Calibration testnet (16 HPLC + 2 Air + 7 NMR)
- \u2705 Live dashboard with real blockchain data
- \u2705 V2 smart contracts (PoXRegistryV2, PeerReviewManager) compiled and ready
- \u2705 Comprehensive documentation (PEER_REVIEW_ROADMAP, V2_IMPLEMENTATION_SUMMARY)
- \u23f3 V2 contracts NOT yet deployed (manual deployment guide ready)

**Demo Time**: 11:00 AM (7 hours from now)

---

## Immediate (Pre-Demo, Next 4 Hours)

### Option A: Sleep 3 Hours, Deploy V2 in Morning (\u2b50 RECOMMENDED)
**3:45 AM - 7:00 AM**: Sleep
**7:00 AM - 8:00 AM**: Wake, coffee, deploy V2 contracts
**8:00 AM - 10:30 AM**: Polish demo, practice pitch
**10:30 AM - 11:00 AM**: Travel to venue

**V2 Deployment** (30 min in morning):
```bash
cd /Users/crischimiadao/ETHGlobalBuenosAires

# Follow DEPLOY_V2_MANUAL.md
export PRIVATE_KEY="..."
export RPC="https://api.calibration.node.glif.io/rpc/v1"

# Deploy PoXRegistryV2 (reuse existing Reputation)
# Deploy PeerReviewManager
# Test with cast calls
```

### Option B: Deploy V2 Now, Sleep 2 Hours
**3:45 AM - 4:15 AM**: Deploy V2 contracts
**4:15 AM - 6:15 AM**: Sleep
**6:15 AM - 10:30 AM**: Morning routine, practice demo

### Option C: Continue Coding (NOT RECOMMENDED)
You have a complete, demo-ready system. Sleep > more features.

---

## Week 1 (Post-Hackathon)

### Deploy V2 to Mainnet
- [ ] Get mainnet FIL from exchange
- [ ] Deploy PoXRegistryV2, PeerReviewManager to Filecoin mainnet
- [ ] Update dashboard to point to mainnet contracts
- [ ] Announce deployment on Twitter, Discord

### Survey Scientists
- [ ] Create Google Form: "Would you use PoX for peer review?"
- [ ] Target: r/chemistry, r/labrats, ChemTwitter
- [ ] Questions:
  - Which techniques do you use? (HPLC, NMR, MS, PXRD, etc.)
  - How often do you find errors in published data?
  - Would you review experiments for reputation rewards?
  - What reputation multipliers feel fair?

### Document Hackathon Build
- [ ] Write blog post: "Building Type-Specific Peer Review in 72 Hours"
- [ ] Record 10-minute technical walkthrough video
- [ ] Submit to ETH Global showcase
- [ ] Post on Hacker News, Dev.to

---

## Month 1 (Weeks 2-4)

### Build NMR Connectivity Validator (MVP)
**Goal**: Semi-automated NMR error detection

**Implementation**:
```typescript
// packages/nmr-validator/
class ConnectivityValidator {
  // Compare proposed structure to 2D NMR data
  validateStructure(structure: Molecule, cosy: 2DSpectrum, hsqc: 2DSpectrum): ValidationResult {
    // 1. Check if COSY correlations match bond connectivity
    // 2. Check if HSQC correlations match C-H assignments
    // 3. Flag inconsistencies
  }
}
```

**Deliverable**: Tool that flags "likely error" for human reviewer to investigate

### Build PXRD Rietveld Checker (MVP)
**Goal**: Automated sanity checks for Rietveld refinements

**Implementation**:
```python
# packages/pxrd-validator/
class RietveldValidator:
    def validate_refinement(self, cif_file: str) -> ValidationReport:
        # 1. Parse CIF file (structure + refinement params)
        # 2. Check R-factors (Rwp < 15%, GOF < 2.0)
        # 3. Check bond lengths (within 3\u03c3 of expected)
        # 4. Check thermal parameters (B-factors reasonable)
        # 5. Check space group (systematic absences consistent)
        return report
```

**Deliverable**: Pre-filter for PXRD peer reviews (catches obvious errors)

### Partner with 3 Labs for Beta Testing
**Target**:
1. Academic analytical chemistry lab (university)
2. Pharma QC department (industry)
3. Materials science group (national lab)

**Offer**:
- Early access to mainnet PoX
- Co-design reputation multipliers
- Case study collaboration (we help write paper)
- Acknowledgment in future publications

**Ask**:
- Upload 10-20 real experiments
- Test peer review flow
- Provide feedback on difficulty scoring

---

## Month 3 (Months 2-3)

### Launch Reputation Marketplace (Alpha)
**Goal**: Enable scientists to hire reviewers for reputation

**Platform Features**:
- Post review requests: "Need PXRD review, paying 200 RV"
- Browse available reviewers (sorted by reputation)
- Escrow system (stake RV, release on completion)
- Rating system (reviewers get rated by requesters)

**MVP Implementation**:
```solidity
contract ReputationMarketplace {
    struct ReviewRequest {
        uint256 id;
        uint256 experimentId;
        uint256 offeredRV;
        address requester;
        address assignedReviewer;
        bool completed;
    }
    
    function postRequest(uint256 experimentId, uint256 offeredRV) external;
    function acceptRequest(uint256 requestId) external;
    function completeReview(uint256 requestId) external;
}
```

### Onboard 50+ Experiments with Reviews
**Goal**: Prove the review system works at scale

**Strategy**:
1. Batch-generate 100 HPLC + NMR experiments
2. Introduce 10-20 deliberate errors (wrong peaks, bad integration)
3. Invite beta testers to find errors
4. Reward first correct reviews with bonus reputation
5. Publish results: "We found X errors via PoX"

### Publish Case Study
**Title**: "Decentralized Peer Review Catches PXRD Rietveld Refinement Error"

**Story**:
1. Pharma partner uploads polymorph PXRD data
2. PoX reviewer flags suspicious thermal parameters
3. Re-refinement confirms error (wrong space group!)
4. Correct structure uploaded, reviewer earns 3\u00d7 reputation
5. Pharma avoids costly clinical trial with wrong polymorph

**Publication Targets**:
- *Journal of Applied Crystallography* (PXRD focus)
- *Nature Chemistry* (News & Views)
- Medium blog (broader audience)

### Pitch to Journal Editorial Board
**Target**: *Journal of Organic Chemistry* (ACS publication)

**Pitch**:
> "We propose requiring PoX CIDs for all HPLC/NMR data in supporting information. Authors upload raw data to Filecoin (permanent, verifiable). Reviewers can cryptographically verify analyses. This would make *J. Org. Chem.* the first blockchain-verified journal."

**Pilot Program**:
- 10 papers in special issue require PoX CIDs
- Track submission/review times (does PoX speed it up?)
- Measure data quality (fewer retractions?)
- Publish results after 1 year

---

## Year 1 (Months 4-12)

### Academic Integration Milestones
- [ ] 1,000+ experiments on mainnet
- [ ] 100+ peer reviews submitted (10% of experiments)
- [ ] 10+ partner labs using PoX regularly
- [ ] 1 journal pilot integration (CID requirement)
- [ ] $100k+ total reputation value in marketplace

### Implement DAO Governance for Reviews
**Goal**: Replace owner-gated resolution with community voting

**Mechanism**:
1. Reputation-weighted voting (1 RV = 1 vote)
2. Minimum quorum (100 RV total)
3. 3-day voting period
4. Simple majority wins (>50%)

**Smart Contract**:
```solidity
contract PeerReviewDAO {
    function proposeResolution(uint256 reviewId, bool originalValid) external;
    function vote(uint256 proposalId, bool support) external;
    function executeResolution(uint256 proposalId) external;
}
```

**Migration**: Gradually increase DAO power, decrease owner power

### Build PXRD-Specific Dashboard
**Goal**: Specialized UI for crystallographers

**Features**:
- Upload CIF files directly
- Visualize crystal structures (3D viewer)
- Display R-factors prominently
- Show bond length/angle tables
- Flag suspicious refinements automatically

**Why Separate Dashboard?**
- PXRD is most valuable review opportunity (3\u00d7 multiplier)
- Crystallographers want domain-specific tools
- Differentiation: "PoX is THE platform for PXRD validation"

### Launch Reputation-Backed Grants
**Goal**: Use reputation as collateral for research funding

**Mechanism**:
```solidity
contract ReputationGrants {
    function applyForGrant(string calldata proposal) external {
        require(reputation[msg.sender] > 500 RV, "insufficient reputation");
        
        uint256 fundingAmount = reputation[msg.sender] * 10 DAI; // 1 RV = 10 DAI
        // Max $5,000 for 500 RV scientist
    }
}
```

**Funded by**: Protocol treasury, DeSci DAOs (VitaDAO, ValleyDAO)

**Target**: Early-career scientists (postdocs, grad students) who lack traditional credentials

---

## Year 3 Vision (Months 13-36)

### Metrics of Success
- [ ] 100,000+ experiments on mainnet
- [ ] 10,000+ peer reviews (10% review rate sustained)
- [ ] 1,000+ labs (every major university)
- [ ] 10+ journals require PoX CIDs
- [ ] $10M+ reputation marketplace volume
- [ ] DAO governance fully operational
- [ ] ZK proofs for privacy-preserving reviews (optional)

### Experiment Type Expansion
**Roadmap**:
- Year 1: HPLC, NMR, Air Quality \u2705
- Year 2: PXRD, MS/MS
- Year 3: GC-MS, LC-MS, ICP-MS, UV-Vis, IR, Raman
- Year 4: Computational methods (DFT, MD simulations)
- Year 5: Wet lab synthesis (reaction yields, characterization)

**Each new type follows same pattern**:
1. Define difficulty formula
2. Set reputation multiplier
3. Build simulation/validation tools
4. Onboard domain experts
5. Integrate into dashboard

### Real Instrument Integration (Causality Network)
**Goal**: Stream data directly from lab instruments to PoX

**Architecture**:
```
Lab Instrument (HPLC) 
    \u2193 USB/Ethernet
Causality Box (edge device)
    \u2193 Sign data with instrument key
Filecoin (Synapse upload)
    \u2193 CID
PoX Registry (on-chain)
```

**Benefits**:
- Provenance: Data signed by instrument (harder to fake)
- Real-time: Experiments registered as they run
- Automation: No manual upload step
- Calibration: Compare real vs. synthetic difficulty distributions

### University Adoption Strategy
**Phase 1**: Early adopters (postdocs, grad students)
**Phase 2**: Lab PIs (once postdocs advocate)
**Phase 3**: Departments (once multiple labs use it)
**Phase 4**: Universities (once multiple departments use it)

**Incentive Alignment**:
- Students: Build reputation for job market
- PIs: Attract better students (reputation-filtered)
- Departments: Improve research quality (fewer retractions)
- Universities: Prestige (first "blockchain-verified" institution)

---

## Technical Debt to Address

### Smart Contracts
- [ ] Gas optimization (batch operations, storage packing)
- [ ] Upgrade patterns (proxy contracts for future changes)
- [ ] Multi-sig for owner functions (immediate)
- [ ] Formal verification (Certora, Trail of Bits audit)

### TypeScript SDK
- [ ] Complete test coverage (unit + integration)
- [ ] Error handling (retry logic, timeout management)
- [ ] Type safety (strict mode, no `any`)
- [ ] Documentation (JSDoc for all exports)

### Dashboard
- [ ] Performance optimization (virtualized lists for 1000+ experiments)
- [ ] Offline support (service worker, IndexedDB cache)
- [ ] Accessibility (WCAG 2.1 AA compliance)
- [ ] Mobile responsive (currently desktop-only)

### Documentation
- [ ] API reference (auto-generated from code)
- [ ] Tutorial videos (YouTube series)
- [ ] FAQ for scientists (non-technical)
- [ ] Security audit report (once audited)

---

## Funding Strategy

### Grant Applications
- **Protocol Labs RFP**: Filecoin/IPFS use case
- **Ethereum Foundation**: Public goods funding
- **VitaDAO**: DeSci infrastructure grant
- **NSF SBIR** (if incorporated): Phase I ($275k)

### Token Launch (Optional, Controversial)
**Arguments For**:
- Easier fundraising (ICO > traditional VC)
- Community ownership (governance token)
- Liquidity for reputation marketplace

**Arguments Against**:
- Regulatory risk (SEC scrutiny)
- Off-mission (reputation should be non-financial)
- Distraction (token economics > product)

**Decision**: Defer until Year 2. Focus on reputation, not tokens.

---

## Open Research Questions

### 1. Optimal Reputation Decay Rate
**Question**: Is \u03bb=0.01/day too fast? Too slow?

**Experiment**:
- Deploy 3 versions with different \u03bb (0.005, 0.01, 0.02)
- Track user behavior over 6 months
- Measure: Re-submission frequency, reputation hoarding

### 2. Cross-Domain Reputation Transfer
**Question**: Should HPLC reputation count for NMR?

**Options**:
- A) Full transfer (1 HPLC RV = 1 NMR RV)
- B) Partial transfer (1 HPLC RV = 0.5 NMR RV)
- C) No transfer (separate reputation tracks)

**User Study**: Survey scientists about credibility of each option

### 3. Privacy vs. Transparency
**Question**: Should experiments be public or private?

**Tension**:
- Public \u2192 Reproducibility, transparency
- Private \u2192 Protects IP, prevents scooping

**Compromise**: Time-locked disclosure (hash public, data revealed after embargo)

---

## Community Building

### Discord Server
- [ ] Create PoX Discord
- [ ] Channels: #general, #support, #dev, #nmr, #pxrd, #governance
- [ ] Invite beta testers
- [ ] Weekly office hours (Fridays 3 PM UTC)

### Twitter/X Presence
- [ ] @PoXProtocol handle
- [ ] Daily updates during buildout
- [ ] Engage with ChemTwitter, CryptoTwitter
- [ ] Highlight experiments (showcase cool data)

### Academic Outreach
- [ ] Email chemists at top 50 universities
- [ ] Offer free reputation for early adopters
- [ ] Sponsor ACS Division of Analytical Chemistry mixer
- [ ] Present poster at Pittcon (major analytical chem conference)

---

## Red Flags to Watch For

### Technical
- \u26a0\ufe0f Filecoin Calibration testnet instability
- \u26a0\ufe0f Synapse SDK breaking changes
- \u26a0\ufe0f Gas costs explode on mainnet
- \u26a0\ufe0f Smart contract vulnerabilities discovered

### Adoption
- \u26a0\ufe0f Scientists don't trust blockchain
- \u26a0\ufe0f Reputation multipliers feel unfair
- \u26a0\ufe0f Review quality is low (spam)
- \u26a0\ufe0f No one uses reputation marketplace

### Regulatory
- \u26a0\ufe0f SEC classifies reputation as security
- \u26a0\ufe0f Data privacy laws (GDPR) conflict with immutability
- \u26a0\ufe0f Universities ban blockchain-based research

**Mitigation**: Stay flexible, pivot if needed, document decisions

---

## Success Criteria (How We Know It's Working)

### Month 1
- \u2705 50+ experiments registered by non-developers
- \u2705 5+ peer reviews submitted
- \u2705 1+ error found and corrected

### Month 6
- \u2705 500+ experiments
- \u2705 50+ reviews
- \u2705 3+ labs using regularly
- \u2705 1+ case study published

### Year 1
- \u2705 5,000+ experiments
- \u2705 500+ reviews
- \u2705 10+ labs
- \u2705 1+ journal integration

### Year 3
- \u2705 100,000+ experiments
- \u2705 10,000+ reviews
- \u2705 100+ labs
- \u2705 10+ journal integrations
- \u2705 "Show me your PoX score" becomes common phrase

---

## The North Star

**Vision**: Every analytical instrument in every lab streams data to PoX. Every scientist has on-chain reputation. Grants are awarded by smart contracts. Papers cite on-chain experiments. Reproducibility crisis solved.

**Tagline**: *"PoX: Where scientific work earns what it deserves."*

**Motto**: *"Fortis est Veritas"* \u2014 Truth is strong.

---

**Now go demo the hell out of this at 11 AM.** \ud83d\ude80

*Built with skepticism, curiosity, and a belief that science deserves better infrastructure.*
