# PoX — Proof-of-X: Type-Specific Peer Review for Science

**Decentralized reputation protocol rewarding validated scientific experiments with type-aware incentives.**

## Overview

PoX (Proof-of-X) is a blockchain-based reputation system where scientists earn credentials by submitting analytical chemistry data. **V2 Update**: The system now features **experiment-type-specific peer review** with scientifically-calibrated reputation multipliers (PXRD 3×, NMR 2×, HPLC 1×) that align incentives with real error rates.

The system combines:

- **Off-chain data generation**: Python scripts generate synthetic HPLC/VOC traces for testing
- **Decentralized storage**: Synapse (FilOzone/Filecoin) stores raw experimental data
- **On-chain verification**: Smart contracts on Filecoin Cloud track experiments, reputation, and challenges
- **Indexed metadata**: The Graph subgraph indexes experiment metadata for querying
- **LLM-readable journal**: Structured metadata enables AI agents to learn from the network's lab journal
- **AI-powered queries**: The Graph's Subgraph MCP enables natural language queries ("Show me all caffeine experiments")
- **Real-time visualization**: Next.js dashboard displays experiments, traces, and blockchain activity

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
├── HPLC_traces/               # Python scripts for generating synthetic data
│   └── GenerateTraces.py      # Creates HPLC chromatograms with peaks, noise
│
├── contracts/                 # Solidity smart contracts (Filecoin Calibration)
│   ├── PoXRegistry.sol        # V1: Original experiment registration
│   ├── PoXRegistryV2.sol      # V2: With ExperimentType support
│   ├── Reputation.sol         # Shared reputation ledger
│   ├── ChallengeManager.sol   # V1: Generic fraud proofs
│   └── PeerReviewManager.sol  # V2: Type-specific peer review system
│
├── subgraph/                  # The Graph Protocol indexer
│   ├── schema.graphql         # GraphQL schema for metadata
│   ├── subgraph.yaml          # Subgraph manifest
│   └── src/                   # Mapping handlers for events
│
├── blockchain-status-plotter/ # Next.js dashboard (LabNodes Interface)
│   ├── app/                   # Next.js 16 app directory
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── blockchain-monitor.tsx  # Transaction feed
│   │   │   ├── hplc-analyzer.tsx       # Chromatogram display
│   │   │   └── voc-analyzer.tsx        # VOC sensor display
│   │   └── dashboard-layout.tsx
│   ├── lib/
│   │   ├── data-service.ts    # API layer (TO DO: connect to contracts)
│   │   ├── hplc-loader.ts     # NEW: Real HPLC trace loader
│   │   ├── types.ts           # TypeScript interfaces
│   │   └── mock-data.ts       # Temporary mock data
│   ├── scripts/
│   │   └── copy-traces.sh     # NEW: Copy traces to public/
│   ├── HPLC_TRACES.md         # NEW: Integration guide
│   └── INTEGRATION_SUMMARY.md # NEW: Technical overview
│
├── script-tag/                # Synapse SDK browser demo
│   └── index.html             # Minimal ESM example
│
├── packages/
│   ├── experiments/           # TypeScript HPLC simulation
│   │   └── src/
│   │       ├── types.ts       # Core types
│   │       ├── types-v2.ts    # V2: Experiment types, review types
│   │       ├── pox.ts         # HPLC experiment generation
│   │       └── scoring.ts     # Difficulty scoring
│   └── nmr-experiments/       # NMR experiment simulation
│       └── src/
│           ├── simulate-nmr.ts # Lorentzian peaks, J-coupling
│           ├── cli.ts          # Command-line interface
│           └── batch-generate.ts # Batch generation
│
└── foundry/                   # Deployment scripts
    └── script/                # Forge deployment automation
```

## What's New in V2 (Nov 23, 2025)

### Type-Specific Peer Review System

**Core Innovation**: Different experiment types have different error rates → different review rewards

| Experiment Type | Error Rate | Review Multiplier | Why |
|-----------------|------------|-------------------|-----|
| **PXRD** | >50% | **3×** | Rietveld refinement errors rampant |
| **NMR** | 30-40% | **2×** | Connectivity/stereochemistry mistakes |
| **MS/MS** | 20-30% | **2×** | Fragment assignment errors |
| **HPLC** | 5-10% | **1×** | Peak integration (straightforward) |
| **Air Quality** | varies | **1×** | Sensor data (baseline) |

**Key Features**:
- Auto-detection of experiment type from difficulty score
- Type-aware reputation multipliers in PeerReviewManager contract
- Review submissions with alternative interpretations (stored as CIDs)
- Economic incentives aligned with scientific reality

**New Contracts** (V2):
- `PoXRegistryV2.sol` (174 lines): ExperimentType enum, auto-type detection
- `PeerReviewManager.sol` (307 lines): Type-specific reputation multipliers

**New SDK** (V2):
- `packages/experiments/src/types-v2.ts` (177 lines): TypeScript types, helpers

**New Docs**:
- `PEER_REVIEW_ROADMAP.md` (484 lines): Multi-modal vision, 4-phase roadmap
- `V2_IMPLEMENTATION_SUMMARY.md` (458 lines): Complete technical details

### NMR Experiment Support

**Real NMR Simulation**: 40 ¹H NMR experiments generated with realistic physics:
- Lorentzian lineshapes (not Gaussian)
- Chemical shift regions (aromatic, aliphatic, TMS)
- Multiplet generation (singlets, doublets, triplets, quartets)
- J-coupling patterns
- 8,192 data points per spectrum
- Difficulty formula: `D = 8 + 0.8·nPeaks + 2.0·complexPeaks`

**Generated**: 40 NMR experiments (seeds 1000-1029) in `packages/nmr-experiments/output/`

**On-Chain**: 7 NMR experiments uploaded to Filecoin (IDs 17-24 on testnet)

### Dashboard Enhancements

**Live Dashboard**: http://localhost:3000/experiments or https://chimiadaopox-n5tm7nkgf-chimia-dao-foundation.vercel.app/
- 25 experiments on-chain (16 HPLC + 2 Air Quality + 7 NMR)
- Auto-refresh every 30 seconds
- Type-specific badges and icons
- Peer review challenge system UI
- Real-time Filecoin data retrieval via Synapse SDK

## Quick Start

### 1. Generate Synthetic HPLC/VOC Data

```bash
cd HPLC_traces
python GenerateTraces.py

# This creates multiple chromatogram files with:
# - Gaussian peaks (retention times, heights, widths)
# - Baseline noise and drift
# - Tailing effects (exponential decay)
```

### 2. Upload to Filecoin via Synapse

```bash
# Test Synapse integration
cd script-tag
npm install
npm run dev
# Open http://localhost:8080
# Connect MetaMask to Filecoin network
# Upload HPLC trace → receive CID
```

### 3. Deploy Smart Contracts to Filecoin Cloud

```bash
# Deploy in correct order (constructor dependencies)
forge create contracts/Reputation.sol:Reputation \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY

forge create contracts/PoXRegistry.sol:PoXRegistry \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args <REPUTATION_ADDR>

forge create contracts/ChallengeManager.sol:ChallengeManager \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args <REGISTRY_ADDR> <REPUTATION_ADDR>

# Authorize contracts to adjust reputation
cast send <REPUTATION_ADDR> "setAuthorized(address,address)" \
  <REGISTRY_ADDR> <CHALLENGE_MANAGER_ADDR> \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY
```

**Deployment Status** (Nov 23, 2025):
- **V1 Contracts** (Filecoin Calibration Testnet):
  - Reputation: `0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1`
  - Registry: `0xA6Fa61924F06DB9A84B92182B69F5C08F3176554`
  - ChallengeManager: `0x6e80A987049965127f1EB69Cc49Fb4460AeB5E8B`
  - Network: Filecoin Calibration (Chain ID: 314159)
  - 25 experiments registered (16 HPLC + 2 Air Quality + 7 NMR)

- **V2 Contracts** (Ready for deployment):
  - PoXRegistryV2: Compiled, deployment scripts ready
  - PeerReviewManager: Compiled, deployment scripts ready
  - Deployment guide: `DEPLOY_V2_MANUAL.md`

### 4. Deploy The Graph Subgraph

```bash
cd subgraph
graph codegen
graph build

# Deploy to The Graph Studio
graph deploy --studio pox-filecoin
```

### 5. Run Dashboard Locally

```bash
cd blockchain-status-plotter

# Install dependencies
pnpm install

# Copy HPLC traces to public directory
./scripts/copy-traces.sh

# Run dev server
pnpm dev
# Open http://localhost:3000
```

**Current Status**: Dashboard runs locally with mock data OR real HPLC traces

## Core Concepts

### Data Flow: HPLC Trace → Filecoin → The Graph → Dashboard

1. **Generate**: Python script creates synthetic HPLC chromatogram
2. **Upload**: Synapse SDK uploads raw data to Filecoin → returns CID
3. **Register**: Smart contract stores CID + metadata on Filecoin Cloud
4. **Index**: The Graph subgraph listens to contract events, indexes metadata
5. **Query**: Dashboard fetches metadata from subgraph
6. **Display**: Dashboard downloads actual trace from Synapse using CID
7. **Visualize**: Recharts renders chromatogram in browser

### Payment Incentive for Data Upload

**Problem**: Who pays for Filecoin storage?

**Solution**: Protocol treasury pays uploaders

```solidity
// TO DO: Add to PoXRegistry.sol
function registerExperiment(...) external payable {
    require(msg.value >= UPLOAD_REWARD, "insufficient payment");
    
    // Register experiment
    experiments[experimentId] = Experiment(...);
    
    // Pay uploader
    payable(msg.sender).transfer(UPLOAD_REWARD);
    
    // Remainder goes to treasury for Filecoin storage deals
}
```

### LLM-Readable Lab Journal

The Graph subgraph stores metadata in structured format:

```graphql
type Experiment @entity {
  id: ID!
  cid: String!           # Filecoin CID for raw data
  submitter: Bytes!
  difficulty: BigInt!
  submittedAt: BigInt!
  
  # Human/LLM readable fields
  experimentType: String!    # "HPLC" or "VOC"
  sampleId: String!
  method: String!            # "Reverse Phase C18"
  peakCount: Int!
  peakPurity: String!
  retentionTimes: [Float!]!
  
  # Chemistry context
  compounds: [String!]!      # ["caffeine", "theobromine"]
  solvent: String!           # "acetonitrile/water 70:30"
  
  # Provenance
  instrumentId: String       # Future: link to Causality Network device
  labLocation: String
}
```

**Use case**: LLM agent queries subgraph, reads experiments like a lab notebook:
```
"Show me all HPLC separations of caffeine using C18 columns in the last week"
```

### Hash-Based Verification

Two deterministic hashes enable fraud proofs:
- **dataHash**: `keccak256(raw HPLC points + metadata)`
- **metricsHash**: `keccak256(analysis: peaks, purity, areas)`

Verification flow:
1. Challenger downloads data from Synapse via CID
2. Re-computes analysis locally
3. Compares hash to on-chain value
4. If mismatch: opens challenge via `ChallengeManager`

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Blockchain** | Filecoin Cloud (EVM) | Low gas costs, native Filecoin integration |
| **Smart Contracts** | Solidity 0.8.21 | Registry, reputation, challenges |
| **Data Storage** | Synapse (FilOzone) | Decentralized data availability on Filecoin |
| **Indexing** | The Graph Protocol | GraphQL API for experiment metadata |
| **Data Generation** | Python (NumPy, Matplotlib) | Synthetic HPLC/VOC traces |
| **Frontend** | Next.js 16, React 19, TypeScript | Dashboard with real-time updates |
| **UI Components** | Radix UI, Tailwind CSS | Modern, accessible components |
| **Charts** | Recharts | Chromatogram visualization |
| **Package Manager** | pnpm | Monorepo with workspaces |

## Environment Variables Required

```bash
# Filecoin Cloud
FILECOIN_CLOUD_RPC=https://api.calibration.node.glif.io/rpc/v1
PRIVATE_KEY=0x...  # NEVER COMMIT!

# Contracts (after deployment)
REGISTRY_ADDRESS=0x...
REPUTATION_ADDRESS=0x...
CHALLENGE_MANAGER_ADDRESS=0x...

# The Graph
SUBGRAPH_URL=https://api.studio.thegraph.com/query/...

# Synapse (if API key needed)
SYNAPSE_API_KEY=...
```

## Contributing

This is a hackathon project and not open for external contributions yet. However, if you're interested in:
- Extending to other analytical techniques (NMR, GC-MS, etc.)
- Building LLM agents to learn from experiment data
- Integrating with Causality Network for real lab instruments
- Designing tokenomics for verifier incentives

Feel free to fork and experiment!

## License

TBD (likely MIT or Apache 2.0 for open science)

## Acknowledgments

- **ETH Global Buenos Aires** — Hackathon opportunity
- **Filecoin / FilOzone** — Synapse decentralized storage
- **The Graph** — Subgraph indexing infrastructure
- **Causality Network** — Future lab instrument integration
- **Foundry** — Smart contract tooling

---

**Built with skepticism, curiosity, and a belief that scientific work deserves better infrastructure.**

*Fortis est Veritas.*
