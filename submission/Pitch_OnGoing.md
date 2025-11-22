# PoX — Proof-of-Experiment

**Tagline**: Decentralized reputation for scientists via verifiable experimental work

## One-Sentence Summary

PoX is a blockchain protocol that rewards scientists with on-chain reputation for submitting and validating HPLC experiments, creating a trust-minimized alternative to traditional peer review.

---

## The Problem

### Reproducibility Crisis
- **70% of research fails to replicate** (Nature survey, 2016)
- Fraud detection takes years (average: 4.9 years from publication to retraction)
- No economic incentive to share negative results or raw data

### Centralized Validation
- Peer review is opaque, slow (6-12 months), and gatekept by journals
- Institutional reputation ≠ scientific merit
- Junior scientists struggle to build credibility outside academia

### Data Silos
- Experimental data locked in lab notebooks, proprietary databases
- No standardized format for sharing analytical chemistry data
- No cryptographic proof of data provenance

**Scientists need infrastructure that rewards intellectual work, not just capital.**

---

## The Solution

PoX implements a **Proof-of-Experiment** protocol where:

1. **Scientists submit HPLC chromatograms** → upload to Synapse (Filecoin storage)
2. **Smart contracts verify experiments** → store hashes on Arbitrum
3. **Difficulty scoring rewards complex work** → harder experiments = more reputation
4. **Fraud proofs enable challenges** → anyone can verify, challenge if invalid
5. **Reputation accrues on-chain** → portable, programmable, censorship-resistant

### Technical Innovation: Hash-Based Verification

Instead of storing full data on-chain (expensive):
- **Data** → Synapse (Filecoin) → returns CID
- **Hashes** → Smart contracts (cheap)
- **Verification** → Download via CID, recompute, compare hashes

If hashes match → experiment is valid  
If hashes don't match → fraud proof, challenger wins reward

**This is rollup-style fraud proofs applied to scientific data, not transactions.**

---

## Why HPLC?

High-Performance Liquid Chromatography is the **minimum viable experiment**:
- **Quantifiable difficulty**: Peaks, noise, resolution are objective metrics
- **Deterministic analysis**: Same data → same analysis (reproducible)
- **Fraud detectable**: Fake chromatograms have structural fingerprints
- **Ubiquitous**: Every chemistry lab has HPLC (~$500B analytical market)

But the architecture is **modular**:
- HPLC today
- NMR tomorrow
- GC-MS, microscopy, genomics next
- **All analytical science** eventually

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│ 1. Generate Experiment                                  │
│    Scientist runs HPLC → exports chromatogram           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Compute Metrics                                      │
│    Peak detection, noise estimation, difficulty score   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Upload to Synapse                                    │
│    Full data → Filecoin storage → returns CID           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Register On-Chain                                    │
│    Store: CID, dataHash, metricsHash, difficulty, RV    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Earn Reputation                                      │
│    RV credited to submitter's address                   │
└─────────────────────────────────────────────────────────┘
```

**Verification Loop**:
- Other scientists download data via CID
- Re-run analysis (deterministic)
- Compare computed hash to on-chain hash
- If mismatch → challenge → reward/slash

---

## Core Thesis: n×(AI+Scientist) >>> "AI-Scientist"

The future isn't AI replacing scientists. It's **AI multiplying scientific capacity**.

**Traditional Science**: Bottlenecked by human expertise  
**AI-Only "Science"**: No ground truth, hallucinates, can't self-verify  
**PoX Vision**: Every scientist becomes 10x productive via AI assistants

The `n` represents network effects: each scientist joining makes the system more valuable for all others (shared data, cross-validation, collective reputation).

---

## Traction

### Deployed Infrastructure
- ✅ Synapse integration tested: [INSERT CID]
- ✅ Working CLI tool: `pox generate`, `pox submit`
- ✅ Live demo: [INSERT URL]

### Technical Completeness
- ✅ HPLC simulation engine (deterministic)
- ✅ Peak detection algorithms
- ✅ Difficulty scoring formula
- ✅ Hash-based fraud proofs
- ✅ Real chromatogram crawler (Restek library)

### Modular Architecture
Ready to extend beyond HPLC:
- NMR (Nuclear Magnetic Resonance)
- GC-MS (Gas Chromatography–Mass Spectrometry)
- Microscopy, genomics, proteomics
- **Any quantifiable experiment**

---

## Market Opportunity

### Total Addressable Market
- **5 million scientists** globally (chemistry, biology, physics)
- **$60B analytical instrumentation market** (2023)
- **2+ million HPLC instruments** worldwide

### Go-to-Market
1. **Phase 1**: Academic labs (early adopters, reputation-motivated)
2. **Phase 2**: Pharma/biotech (compliance, IP protection, data sharing)
3. **Phase 3**: Contract research orgs (monetize verified data)

### Network Effects
- More scientists → more data → better fraud detection
- More data → better ML models → better analysis
- Better analysis → higher quality experiments → stronger reputation

**Flywheel effect**: System becomes more valuable as it grows.

---

## Competitive Landscape

| Solution | Proof Mechanism | Data Storage | Reputation |
|----------|----------------|--------------|------------|
| **PoX** | Experimental difficulty | Filecoin (Synapse) | On-chain, time-decaying |
| Gitcoin Passport | Social attestations | Off-chain | Trust scores |
| ResearchHub | Token staking | Centralized | Token-based |
| Ocean Protocol | Data exchange | Any | No reputation |
| Traditional journals | Peer review | Paywalled | Prestige (opaque) |

**PoX differentiator**: Scientific work as proof mechanism, not just social proof or capital.

---

## Why Filecoin?

**Synapse (FilOzone)** is the only storage layer that:
1. **Guarantees retrieval**: Filecoin storage deals (cryptographic proofs)
2. **Integrates with EVM**: Same wallet for blockchain + storage
3. **Enables programmable storage**: Smart contracts can pay for permanence

**Why not IPFS?** No guaranteed retrieval (DHT can lose data)  
**Why not Arweave?** Upfront cost model (Filecoin is ongoing deals)  
**Why not S3/Google Cloud?** Defeats purpose (centralized, censorable)

**Filecoin is essential** for decentralized science infrastructure.

---

## Roadmap

### Immediate (Post-Hackathon)
- ✅ Deploy to Arbitrum mainnet
- ✅ Onboard 10 beta users (chemistry PhD students)
- ✅ Scrape 100+ real chromatograms for calibration

### Q1 2025
- Add NMR module (second analytical technique)
- Implement staking mechanism (fraud deterrent)
- Launch DAO governance (decentralize dispute resolution)

### Q2 2025
- Integrate with lab instruments (automated uploads)
- Build anomaly detector (ML-based fraud detection)
- Partnership with analytical chemistry journals

### Q3-Q4 2025
- Expand to GC-MS, microscopy, proteomics
- Grant program for researchers (reputation-weighted)
- Cross-chain deployment (Polygon, Base, etc.)

---

## Team

**Cristina Castro ChimiaDAO** (Founder)
- Professional synthetic chemist
- Deep expertise in analytical chemistry (HPLC, NMR, GC-MS)
- Background in blockchain infrastructure
- Based in Bogota, Colombia as well as Oxford, England and San Diego, California

**Seeking collaborators**:
- Blockchain engineers (fraud proofs, ZK primitives)
- Analytical chemists (domain experts for new modules)
- DeSci community (researchers, early adopters)

---

## The Ask

### Funding
- **Seed round**: $500K for 18 months runway
- **Use of funds**: 
  - 2 engineers (full-time)
  - 1 chemist (part-time)
  - Cloud infra + Filecoin storage
  - Marketing/community building

### Partnerships
- **Filecoin/Protocol Labs**: DeSci primitive collaboration
- **Analytical instrument vendors**: Restek, Waters, Agilent (data access)
- **Universities**: Beta testing in academic labs

### Community
- **Researchers**: Submit experiments, earn reputation
- **Validators**: Verify data, earn rewards
- **Developers**: Build modules for new techniques

---

## Why This Matters

Science has a **trust crisis**. Journals retract papers. Labs can't reproduce results. Institutions gatekeep validation.

Blockchain enables **cryptographic truth** — not philosophical truth, but procedural validity:
- Was the experiment done correctly? (hash verification)
- How hard was it? (difficulty scoring)
- Who vouches for it? (reputation endorsements)

**PoX makes scientific reputation programmable, portable, and verifiable.**

In 10 years:
- Every analytical instrument streams data to PoX
- Every scientist has on-chain reputation
- Grants awarded by smart contracts (reputation-weighted)
- Papers cite on-chain experiments (cryptographic provenance)

**Reproducibility crisis → solved. Fraud economically disincentivized. Science becomes permissionless.**

---

## Contact

- **GitHub**: [Repository link]
- **Demo**: [Live deployment]
- **Video**: [Demo recording]
- **Email**: [Contact]
- **Twitter**: [@PoX_Protocol]

---

*"Fortis est Veritas" — Truth is strong. But strength requires structure. PoX is that structure.*
