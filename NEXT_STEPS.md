# Next Steps

## Immediate Fixes
1.  **Fix Foundry Script Path**:
    - Update `scripts/upload_and_submit.mjs` to point to `foundry/script/RegisterDataset.s.sol` instead of `script/RegisterDataset.s.sol`.
    - OR move `foundry/script` to `script` in the root to match standard Foundry layout.

2.  **Environment Setup**:
    - Create a `.env.example` file listing all required variables (`PRIVATE_KEY`, `RPC_URL`, `OPENAI_API_KEY`, `SUBGRAPH_URL`).

## Features & Improvements

### Decentralize the Journal
- **Current State**: Enriched analysis lives in local `./journal` JSON files.
- **Goal**: Upload the verification results (Fraud/Valid status) back to Filecoin or an off-chain database (like Tableland or a separate contract registry).
- **Benefit**: Allows multiple AI agents to share the same verification state without sharing a file system.

### Enhanced Fraud Proofs
- **Current State**: The watcher logs "Fraud Detected" to the console.
- **Goal**: Implement a `ChallengeManager` contract interaction. If fraud is detected, the watcher should automatically submit a challenge transaction to slash the submitter's reputation.

### UI Integration
- **Current State**: CLI Chat and Web Dashboard are separate.
- **Goal**: Embed the Chat Interface into the Next.js Dashboard (`blockchain-status-plotter`) for a unified experience.

### Real Data Ingestion
- **Current State**: Python script generates synthetic data.
- **Goal**: Connect `rpi5/` sensors to the upload pipeline to feed real-world enviromental data into the system.
