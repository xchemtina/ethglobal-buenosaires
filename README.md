# PoX — Proof-of-X: Decentralized Scientific Reputation

**Proof-of-concept blockchain protocol for validating and rewarding experimental scientific work.**

## Overview

PoX (Proof-of-X) implements a reputation system where scientists earn verifiable credentials by submitting experimental analytical chemistry data (HPLC chromatograms and VOC sensor readings). The system combines:

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
├── contracts/                 # Solidity smart contracts (Filecoin Cloud)
│   ├── PoXRegistry.sol        # Experiment registration with CID storage
│   ├── Reputation.sol         # Shared reputation ledger
│   └── ChallengeManager.sol   # Fraud proofs & disputes
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
├── packages/experiments/      # TypeScript HPLC simulation (optional)
│   └── src/                   # Peak detection, scoring algorithms
│
└── foundry/                   # Deployment scripts
    └── script/                # Forge deployment automation
```

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

**TO DO**: Build upload script that:
- Reads HPLC traces from `HPLC_traces/` directory
- Uploads each to Synapse
- Returns CID + transaction hash
- **Pays uploader for contribution** (incentive mechanism)

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

**Current Status**: Contracts NOT yet deployed to Filecoin Cloud

### 4. Deploy The Graph Subgraph

```bash
cd subgraph
graph codegen
graph build

# Deploy to The Graph Studio
graph deploy --studio pox-filecoin
```

**TO DO**: Configure subgraph to:
- Index `ExperimentRegistered` events
- Store metadata in LLM-friendly format
- Link Filecoin CID + transaction hash
- Enable GraphQL queries for dashboard

**Current Status**: Subgraph NOT yet deployed

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

**NEW: Real HPLC Trace Integration**
- HPLC traces from `data/traces/*.json` can now be loaded directly
- See `HPLC_TRACES.md` for complete integration guide
- To enable real data: uncomment lines in `lib/data-service.ts`

**TO DO**: Connect to blockchain:
- Replace `data-service.ts` mock functions with:
  - Web3 calls to PoXRegistry contract
  - GraphQL queries to subgraph
  - Synapse SDK calls to fetch HPLC traces by CID
- Add wallet connection (ethers.js + MetaMask)

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

## Critical Integration Points

### 1. Filecoin Upload Script (HIGH PRIORITY)

**What**: Script to upload HPLC traces to Filecoin and register on-chain

**Implementation**:
```typescript
// scripts/upload-experiments.ts
import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import fs from 'fs';

async function uploadAndRegister(hplcFilePath: string) {
  // 1. Read HPLC trace
  const traceData = JSON.parse(fs.readFileSync(hplcFilePath));
  
  // 2. Upload to Synapse
  const provider = new ethers.JsonRpcProvider(process.env.FILECOIN_CLOUD_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const synapse = await Synapse.create({ provider: wallet });
  const cid = await synapse.upload(traceData);
  
  // 3. Compute hashes
  const dataHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(traceData)));
  const metricsHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(traceData.metrics)));
  
  // 4. Register on-chain
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
  const tx = await registry.registerExperiment(
    cid,
    dataHash,
    metricsHash,
    traceData.difficulty,
    traceData.rvInitial,
    { value: ethers.parseEther("0.01") } // Pay for storage
  );
  
  console.log(`Registered experiment ${traceData.sampleId}: tx ${tx.hash}, CID ${cid}`);
}
```

### 2. Dashboard Web3 Integration (HIGH PRIORITY)

**What**: Connect dashboard to contracts and Synapse

**Files to modify**:
- `blockchain-status-plotter/lib/data-service.ts`
- `blockchain-status-plotter/lib/web3.ts` (NEW)
- `blockchain-status-plotter/components/dashboard-layout.tsx`

**Implementation**:
```typescript
// lib/web3.ts
import { ethers } from 'ethers';
import { Synapse } from '@filoz/synapse-sdk';

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  
  return { provider, signer };
}

// lib/data-service.ts
import { ethers } from 'ethers';
import { REGISTRY_ADDRESS, REGISTRY_ABI } from './contracts';

export async function fetchBlockchainTransactions() {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_FILECOIN_RPC);
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  
  // Listen to ExperimentRegistered events
  const filter = registry.filters.ExperimentRegistered();
  const events = await registry.queryFilter(filter, -100); // Last 100 blocks
  
  return events.map(e => ({
    id: e.args.id.toString(),
    submitter: e.args.submitter,
    cid: e.args.cid,
    timestamp: new Date(Number(e.args.submittedAt) * 1000).toISOString(),
    // ...
  }));
}

export async function fetchHplcData(cid: string): Promise<HplcData> {
  const { provider } = await connectWallet();
  const synapse = await Synapse.create({ provider });
  
  // Download raw trace from Filecoin
  const trace = await synapse.download(cid);
  
  return {
    sampleId: trace.sampleId,
    method: trace.method,
    dataPoints: trace.points.map(p => ({
      time: p.time,
      experimental: p.signal,
      theoretical: p.signal * 0.98 // Mock for now
    })),
    metrics: trace.metrics
  };
}
```

### 3. The Graph Subgraph Configuration (MEDIUM PRIORITY)

**What**: Index contract events for GraphQL querying

**Files to create/modify**:
- `subgraph/schema.graphql`
- `subgraph/subgraph.yaml`
- `subgraph/src/mapping.ts`

**Schema** (`schema.graphql`):
```graphql
type Experiment @entity {
  id: ID!
  experimentId: BigInt!
  submitter: Bytes!
  cid: String!
  dataHash: Bytes!
  metricsHash: Bytes!
  difficulty: BigInt!
  initialRV: BigInt!
  submittedAt: BigInt!
  
  # Indexed metadata for LLM
  experimentType: String
  sampleId: String
  method: String
  
  # Relations
  challenges: [Challenge!] @derivedFrom(field: "experiment")
}

type Challenge @entity {
  id: ID!
  challengeId: BigInt!
  experiment: Experiment!
  challenger: Bytes!
  computedMetricsHash: Bytes!
  resolved: Boolean!
  experimentValid: Boolean
}

type ReputationAdjustment @entity {
  id: ID!
  user: Bytes!
  delta: BigInt!
  newScore: BigInt!
  timestamp: BigInt!
}
```

## Development Workflow

### Testing End-to-End Flow (Post-Integration)

1. **Generate data**: `python HPLC_traces/GenerateTraces.py`
2. **Upload**: `npx tsx scripts/upload-experiments.ts trace-001.json`
3. **Verify contract**: Query PoXRegistry to confirm CID stored
4. **Check subgraph**: Query GraphQL endpoint for metadata
5. **View dashboard**: Navigate to experiment in UI, see trace rendered

### Running Dashboard Locally

```bash
cd blockchain-status-plotter
npm install
npm run dev
```

**Environment variables needed** (`.env.local`):
```bash
NEXT_PUBLIC_FILECOIN_RPC=https://api.calibration.node.glif.io/rpc/v1
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/query/...
```

## Critical Next Steps (Priority Order)

### Must Have (For Demo)
1. **Deploy contracts to Filecoin Cloud**
   - Get testnet FIL from faucet
   - Deploy Reputation → Registry → ChallengeManager
   - Save addresses to `.env`

2. **Build upload script**
   - Create `scripts/upload-experiments.ts`
   - Test with one HPLC trace
   - Verify CID and tx hash

3. **Deploy subgraph**
   - Complete `schema.graphql`
   - Write event mappings in `src/mapping.ts`
   - Deploy to The Graph Studio

4. **Connect dashboard to contracts**
   - Add ethers.js to `blockchain-status-plotter`
   - Implement `web3.ts` and update `data-service.ts`
   - Test wallet connection

5. **Display real HPLC traces**
   - Fetch CID from contract
   - Download from Synapse
   - Render in `hplc-analyzer.tsx`

### Should Have (For Polish)
6. Generate 10-20 HPLC traces with Python
7. Batch upload all traces to Filecoin
8. Test challenge flow (fraud proof)
9. Add payment incentive to contract
10. Polish dashboard UI

### Nice to Have (Future)
11. LLM agent integration (query subgraph, learn from experiments)
12. Causality Network integration (real instruments)
13. Multi-sig for ChallengeManager resolution
14. ZK proof prototypes

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
