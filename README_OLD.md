# PoX — Proof-of-X: Decentralized Scientific Reputation

**Proof-of-concept blockchain protocol for validating and rewarding experimental scientific work.**

## Overview

PoX (Proof-of-X) implements a reputation system where scientists earn verifiable credentials by submitting experimental analytical chemistry data (HPLC chromatograms and VOC sensor readings). The system combines:

- **Off-chain data generation**: Python scripts generate synthetic HPLC/VOC traces for testing
- **Decentralized storage**: Synapse (FilOzone/Filecoin) stores raw experimental data
- **On-chain verification**: Smart contracts on Filecoin Cloud track experiments, reputation, and challenges
- **Indexed metadata**: The Graph subgraph indexes experiment metadata for querying
- **LLM-readable journal**: Structured metadata enables AI agents to learn from the network's lab journal

This repository was created for **ETH Global Buenos Aires** hackathon, with future collaboration with **Causality Network** for real lab instrument integration.

## Architecture

```
┌──────────────────────┐
│ Python Trace Gen     │  Generate HPLC/VOC synthetic data
│ (GenerateTraces.py)  │  Multiple traces for testing
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Filecoin Cloud       │  Upload raw traces → get CID
│ (Synapse SDK)        │  Incentivize uploaders with payment
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Smart Contracts      │  Register experiment on Filecoin Cloud
│ (Filecoin EVM)       │  Store: CID, hashes, difficulty, reputation
└──────────┬───────────┘
           │
           ├─────────────────────────┐
           │                         │
           ▼                         ▼
┌──────────────────────┐   ┌──────────────────────┐
│ The Graph Subgraph   │   │ ChallengeManager     │
│ (Metadata Indexing)  │   │ (Fraud Proofs)       │
│ - LLM-readable       │   │ - Verify hashes      │
│ - Lab journal        │   │ - Slash/reward       │
└──────────┬───────────┘   └──────────────────────┘
           │
           ▼
┌──────────────────────┐
│ Next.js Dashboard    │  Query subgraph + display traces
│ (blockchain-status-  │  Visualize HPLC/VOC from Synapse
│  plotter)            │  Show blockchain transactions
└──────────────────────┘
```

## Directory Structure

```
ETHGlobalBuenosAires/
├── packages/
│   └── experiments/        # HPLC simulation, analysis, scoring
│       ├── src/
│       │   ├── types.ts    # Core data structures
│       │   ├── simulate.ts # Chromatogram generation
│       │   ├── analyze.ts  # Peak detection, noise estimation
│       │   ├── scoring.ts  # Difficulty & reputation computation
│       │   └── pox.ts      # One-shot PoX experiment generator
│       ├── README.md
│       └── THOUGHTS.md     # Design philosophy & open questions
│
├── contracts/              # Solidity smart contracts
│   ├── PoXRegistry.sol     # Experiment registration
│   ├── Reputation.sol      # Shared reputation ledger
│   ├── ChallengeManager.sol # Fraud proofs & disputes
│   ├── README.md
│   └── THOUGHTS.md
│
├── HPLC_Crawl/             # Web scraper for real chromatograms
│   ├── crawl_restek_lc.py  # Playwright + BeautifulSoup crawler
│   ├── README.md
│   └── THOUGHTS.md
│
├── script-tag/             # Synapse SDK browser demo
│   ├── index.html          # ESM-based minimal example
│   ├── README.md
│   └── THOUGHTS.md
│
├── scripts/                # Deployment automation (empty placeholder)
│   └── README.md
│
├── apps/                   # User-facing applications (empty placeholder)
│   ├── cli/                # Command-line interface (planned)
│   ├── dashboard/          # Web dashboard (planned)
│   └── README.md
│
└── README.md               # This file
```

## Quick Start

### 1. Generate Synthetic Experiment

```bash
cd packages/experiments
npm install
npx tsx src/pox.ts
```

Outputs:
```json
{
  "experiment": { ... },
  "analysis": {
    "nPeaks": 3,
    "baselineNoise": 0.0194,
    "totalArea": 12.34
  },
  "difficulty": 4.87,
  "rvInitial": 1.634,
  "dataHash": "0x...",
  "metricsHash": "0x..."
}
```

### 2. Crawl Real HPLC Data (Optional)

```bash
cd HPLC_Crawl
python -m venv venv
source venv/bin/activate
pip install requests beautifulsoup4 playwright
playwright install firefox
python crawl_restek_lc.py
```

### 3. Deploy Contracts (Manual)

```bash
# Using Foundry
forge create contracts/Reputation.sol:Reputation --rpc-url $ARBITRUM_SEPOLIA_RPC --private-key $PK

# Using Hardhat
npx hardhat run scripts/deploy.ts --network arbitrum-sepolia
```

### 4. Test Synapse Integration

```bash
cd script-tag
npm install
npm run dev
# Open http://localhost:8080 in browser with MetaMask
```

## Core Concepts

### Difficulty Scoring

Experiments are scored based on analytical complexity:

```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
```

- `α = 1.0`: Weight on peak count (more peaks = harder separation)
- `β = 8.0`: Weight on noise (higher noise = harder to resolve)
- `γ = 0.5`: Weight on data resolution (diminishing returns)

### Reputation Value (RV)

Time-decaying score for validated experiments:

```
RV = ln(1 + D·v) - λ·Δt
```

- `v`: Validation status (1 for valid, 0 for unverified, -1 for invalid)
- `λ`: Decay rate (0.01/day default)
- `Δt`: Time elapsed since submission (days)

Prevents reputation hoarding; encourages continuous contribution.

### Hash-Based Verification

Two hashes per experiment:
- **dataHash**: `keccak256(metadata + raw chromatogram points)`
- **metricsHash**: `keccak256(analysis results)`

Enables fraud proofs:
1. Challenger downloads data from Synapse via CID
2. Re-computes analysis off-chain
3. Compares hash to on-chain value
4. Opens challenge if mismatch
5. Owner/DAO resolves dispute

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Blockchain** | Arbitrum Sepolia | Low gas costs, EVM compatibility |
| **Smart Contracts** | Solidity 0.8.21 | Registry, reputation, challenges |
| **Off-Chain Compute** | TypeScript/Node.js | Experiment simulation & analysis |
| **Data Storage** | Synapse (FilOzone) | Decentralized data availability |
| **Data Harvesting** | Python (Playwright + BeautifulSoup) | Real chromatogram crawling |
| **Frontend** | HTML + ESM | Zero-build browser demo |

## Key Features

### ✅ Implemented

- [x] Deterministic HPLC simulation (Gaussian peaks + noise)
- [x] Peak detection & analysis algorithms
- [x] Difficulty & reputation scoring formulas
- [x] Keccak256 hash computation for verification
- [x] Smart contracts (registry, reputation, challenges)
- [x] Synapse SDK browser integration demo
- [x] Real chromatogram web scraper

### 🚧 Partially Implemented

- [ ] Challenge resolution (owner-gated, needs DAO)
- [ ] Staking mechanism (free submissions currently)
- [ ] Time-based dispute windows

### 📋 Planned

- [ ] CLI tool for experiment submission
- [ ] Web dashboard for browsing/visualization
- [ ] Automated deployment scripts
- [ ] Fraud proof bisection game
- [ ] Multi-experiment batch verification
- [ ] OCR pipeline for image chromatograms

## Security Considerations

### Current Trust Assumptions (MVP)

1. **Owner-resolved challenges**: Centralized dispute arbitration
2. **No stake requirement**: Free to submit experiments
3. **Off-chain data availability**: Trust Synapse network
4. **Client-side hash computation**: Trust user's computation

### Mitigation Roadmap

1. **DAO governance**: Replace owner with token-weighted voting
2. **Economic staking**: Require collateral for submissions
3. **Incentive-compatible verification**: Pay verifiers via fees
4. **ZK proofs**: Prove computation correctness without revealing data

## Use Cases

### 1. Academic Reputation
Researchers build verifiable publication history:
- Experiments → on-chain reputation
- Reputation → grant eligibility
- Fraud detection → retractions/corrections

### 2. Instrument Calibration
Cross-lab validation of HPLC methods:
- Submit benchmark separations
- Community verifies reproducibility
- Build database of "known good" methods

### 3. Data Marketplace
Scientists monetize experimental data:
- High-rep users = trusted data sources
- Buyers pay for verified datasets
- Reputation as collateral for quality

### 4. DeSci Governance
Reputation-weighted decision making:
- Protocol upgrades require X reputation to propose
- Voting power proportional to contribution
- Sybil-resistant via proof-of-work analogy

## Comparison to Existing Systems

| System | Proof Mechanism | Data Type | Consensus |
|--------|----------------|-----------|-----------|
| **PoX** | Experimental difficulty | Scientific data | Hash-based fraud proofs |
| **Proof-of-Work** | Computational difficulty | Random hashes | Longest chain |
| **Proof-of-Stake** | Capital lock | Token balance | BFT consensus |
| **Gitcoin Passport** | Identity attestations | Social accounts | Trust scores |
| **Ocean Protocol** | Data exchange | Marketplace listings | Smart contracts |

**PoX differentiator**: Work-based reputation for science, not finance.

## Development

### Prerequisites

```bash
# Node.js + package manager
node --version  # v20+
npm --version

# Python (for crawler)
python --version  # 3.9+

# Foundry (for contracts)
forge --version
```

### Install Dependencies

```bash
# Experiments package
cd packages/experiments && npm install

# Synapse demo
cd script-tag && npm install

# Crawler
cd HPLC_Crawl && pip install -r requirements.txt
```

### Testing

```bash
# Contracts (when tests added)
forge test

# TypeScript packages
npm test
```

### Deployment

See individual README files in:
- `contracts/README.md` — Contract deployment
- `packages/experiments/README.md` — Off-chain setup
- `script-tag/README.md` — Frontend integration

## Contributing

This is a hackathon project and not open for external contributions yet. However, if you're interested in:
- Extending to other analytical techniques (GC-MS, NMR, etc.)
- Building fraud-proof mechanisms
- Designing tokenomics for verifier incentives
- Implementing the CLI/dashboard

Feel free to fork and experiment! Reach out if you'd like to collaborate post-hackathon.

## License

TBD (likely MIT or Apache 2.0 for open science)

## Acknowledgments

- **ETH Global Buenos Aires** — Hackathon opportunity
- **Arbitrum** — Scalable blockchain infrastructure
- **FilOzone** — Synapse decentralized storage
- **Restek** — Public chromatogram library (for crawler)
- **Foundry/Hardhat** — Smart contract tooling

## Contact

- **GitHub**: [This repo]
- **Twitter/X**: TBD
- **Email**: TBD

## Additional Resources

For deeper technical context, see individual THOUGHTS.md files:
- `packages/experiments/THOUGHTS.md` — Difficulty scoring philosophy
- `contracts/THOUGHTS.md` — On-chain design rationale
- `HPLC_Crawl/THOUGHTS.md` — Data sourcing ethics
- `script-tag/THOUGHTS.md` — Web3 UX patterns

---

**Built with skepticism, curiosity, and a belief that scientific work deserves better infrastructure.**

*Fortis est Veritas.*
