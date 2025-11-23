# Architectural Decisions

## 1. Hybrid On-Chain / Off-Chain Verification
**Decision:** Store raw data and analysis metrics on Filecoin, but anchor cryptographic hashes on-chain (Filecoin EVM).
**Rationale:** Storing full chromatography traces on-chain is too expensive and unnecessary. By storing hashes (`dataHash`, `metricsHash`), we ensure integrity. Any verifier can download the raw data, re-run the analysis, and verify the hashes match the on-chain record.

## 2. The Graph for Discovery
**Decision:** Use The Graph to index `ExperimentRegistered` events instead of querying the blockchain directly or maintaining a custom SQL database.
**Rationale:** Provides a standard GraphQL API for the frontend and AI agents to discover experiments, filter by difficulty, and track global stats without complex RPC calls.

## 3. Deterministic Python/JS Analysis mirroring
**Decision:** The data generation (Python) and the Watcher analysis (Node.js) seemingly implement similar logic for metrics calculation.
**Rationale:** The system relies on "Deterministic Analysis". If the uploaded `metricsHash` (calculated during generation) doesn't match the watcher's re-calculated hash, fraud is detected. This requires the analysis algorithms to be deterministic across implementations.

## 4. AI Agent as a Consumer
**Decision:** The AI Agent is built as a "read-only" consumer that aggregates data from The Graph and the verified local journal.
**Rationale:** This decouples the "User Interface" (Chat) from the "Verification Worker" (Watcher). The Chat interface doesn't need to process heavy data; it just queries the prepared indices.

## 5. Synapse SDK for Storage
**Decision:** Use `@filoz/synapse-sdk`.
**Rationale:** Simplifies the interaction with Filecoin storage providers, handling the upload and retrieval mechanics via a clean API.
