# Analysis of PoX (Proof-of-X) Codebase

## Overview
The PoX codebase is a decentralized peer review system for analytical chemistry, leveraging Filecoin for storage, The Graph for indexing, and AI agents for analysis and fraud detection. It is a complex multi-component system.

## Architecture Components

### 1. Data Generation & Ingestion
- **Source**: Synthetic HPLC data is generated via Python scripts (`data/GenerateTracesForUpload.py`).
- **Format**: JSON files containing metadata (method, solvent, etc.) and raw chromatography points.
- **Upload**: `scripts/upload_and_submit.mjs` uses the Synapse SDK to upload these JSONs to Filecoin/IPFS.

### 2. Smart Contracts (Solidity)
- **Registry**: `PoXRegistry.sol` is the source of truth. It registers the `CID`, `dataHash`, `metricsHash`, and `difficulty`.
- **Reputation**: Integrated reputation system (likely `Reputation.sol`) updates user scores based on submissions.
- **Security**: Hashes ensure data integrity. `metricsHash` ensures the analysis (peak counting, noise calc) performed off-chain matches the on-chain expectation (or can be verified).

### 3. Indexing (The Graph)
- **Subgraph**: Indexes `ExperimentRegistered` events.
- **Entity**: `Experiment` entity mirrors the contract struct.
- **Purpose**: Allows efficient querying of experiments by difficulty, submitter, or time.

### 4. AI Agent / Watcher
- **Watcher (`ai-agent/watcher.mjs`)**:
    - Polls The Graph for new experiments.
    - Fetches raw data from Filecoin using the CID.
    - Re-runs the analysis (peak detection, etc.) locally to verify results.
    - Checks for "Fraud" (hash mismatches).
    - Saves enriched data (Analysis + Verification) to a local `./journal` directory.
- **Chat Interface (`ai-agent/chat-interface.mjs`)**:
    - Uses OpenAI GPT-4.
    - Has access to The Graph (for general queries) and the local `./journal` (for deep analysis details).
    - Can answer questions like "Show me suspicious experiments".

## Observations & Issues

### Path Inconsistency
- The `scripts/upload_and_submit.mjs` calls `forge script script/RegisterDataset.s.sol`.
- However, the file appears to be located at `foundry/script/RegisterDataset.s.sol`.
- This will likely cause the submission step to fail unless a symlink exists or the command is updated.

### "Local" Journal
- The AI agent relies on a local filesystem (`./journal`) to store the "enriched" data.
- In a fully decentralized version, this enriched analysis should probably be posted back to IPFS/Filecoin or a database, rather than sitting on the watcher's local disk.
- Currently, the Chat Interface and Watcher must run on the same machine.

### Synapse Integration
- The project uses `@filoz/synapse-sdk` for Filecoin interactions, abstracting away some of the complexity of dealing with storage providers directly.

## Data Flow
1. `GenerateTracesForUpload.py` -> `trace.json`
2. `upload_and_submit.mjs` -> Uploads to Filecoin (CID) -> Calls Contract
3. Contract -> Emits Event
4. Subgraph -> Indexes Event
5. Watcher -> Sees Event -> Downloads CID -> Verifies -> Writes to `./journal`
6. Chat Interface -> Reads Subgraph + `./journal` -> Answers User
