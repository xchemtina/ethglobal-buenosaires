# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PoX (Proof-of-X) is a decentralized scientific reputation system built for ETH Global Buenos Aires. It validates and rewards experimental scientific work (starting with HPLC chromatography) through a combination of off-chain computation, decentralized storage (Synapse/FilOzone), and on-chain verification using fraud proofs.

**Core Principle**: n×(AI+Scientist) >>> "AI-Scientist"  
The system multiplies human scientific capacity through AI-augmented workflows, not replaces it.

## Architecture

The codebase is organized as a multi-component system:

- **Smart Contracts** (`contracts/`): Solidity contracts for on-chain registration, reputation tracking, and challenge management
- **Off-chain Computation** (`packages/experiments/`): TypeScript library for HPLC simulation, analysis, and difficulty scoring
- **Data Storage**: Synapse (FilOzone) integration for decentralized data availability
- **Verification**: Hash-based fraud proofs enable trustless validation
- **Indexing** (`subgraph/`): Graph Protocol subgraph for querying experiment data
- **Visualization** (`HPLC_traces/`): Python utilities for generating synthetic chromatograms

## Core Commands

### Smart Contracts (Foundry)

```bash
# Build contracts
make build
# Or: forge build

# Run contract tests
make test
# Or: forge test -vvv

# Deploy to testnet
make deploy RPC=$ARBITRUM_SEPOLIA_RPC PK=$PRIVATE_KEY
# Or: forge script script/DeployPoX.s.sol --rpc-url $RPC --broadcast --private-key $PK
```

### Experiment Package (TypeScript)

```bash
# Generate synthetic HPLC experiment
cd packages/experiments
npx tsx src/pox.ts

# This outputs experiment data including:
# - difficulty score
# - initial reputation value (RV)
# - dataHash and metricsHash for on-chain verification
# - analysis results (peaks, noise, area)
```

### Python Chromatogram Generation

```bash
# Generate synthetic HPLC traces
cd HPLC_traces
python GenerateTraces.py
```

### Subgraph (Graph Protocol)

```bash
# Build subgraph
make subgraph
# Or: cd subgraph && graph codegen && graph build

# Deploy subgraph
make subgraph-deploy
# Or: cd subgraph && graph deploy --studio pox
```

### Monorepo Operations

```bash
# Build all packages (uses pnpm workspaces)
pnpm build

# Run linting across all packages
pnpm lint

# Run tests across all packages
pnpm test
```

## Key Concepts

### Difficulty Scoring

Experiments are scored based on analytical complexity:
```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
```
- α=1.0 (peak count weight)
- β=8.0 (noise weight - dominant factor reflecting real analytical challenge)
- γ=0.5 (resolution weight - logarithmic to prevent gaming)

### Reputation Value (RV)

Time-decaying score for validated experiments:
```
RV = ln(1 + D·v) - λ·Δt
```
- v: validation status (1 valid, 0 unverified, -1 invalid)
- λ: decay rate (0.01/day default)
- Δt: time elapsed (days)

Scaled for on-chain storage: `RV_scaled = round(RV × 10⁶)`

### Hash-Based Verification

Two deterministic hashes enable fraud proofs without storing full data on-chain:
- **dataHash**: `keccak256(metadata + raw chromatogram points)`
- **metricsHash**: `keccak256(analysis results)`

Verification flow:
1. Challenger downloads data from Synapse via CID
2. Re-computes analysis off-chain (deterministic)
3. Compares hash to on-chain value
4. Opens challenge if mismatch detected

## Smart Contract Architecture

Three core contracts work together:

### PoXRegistry.sol
- Registers experiments with metadata hashes
- Stores Synapse CID for off-chain data retrieval
- Immutable after registration (no edits/deletions)
- Automatically credits reputation on valid submission

### Reputation.sol
- Unified reputation ledger with access control
- Authorized contracts (Registry + ChallengeManager) can adjust scores
- Non-transferable, domain-specific social capital

### ChallengeManager.sol
- Opens disputes for suspected invalid experiments
- Resolution logic adjusts reputation:
  - Valid experiment: submitter gets +D, challenger gets +D/10
  - Invalid experiment: submitter gets -D, challenger gets +D

**Current Trust Model**: Owner-resolved challenges (centralized). Roadmap includes DAO governance → bisection game → ZK proofs.

## Development Workflow

### Working with Experiments Package

The experiments package uses **deterministic computation** - same seed always produces same results. This enables:
- Reproducible testing
- Hash verification
- Fraud proof validation

Key files:
- `types.ts`: Core data structures
- `simulate.ts`: Gaussian peak generation + noise
- `analyze.ts`: Peak detection, noise estimation
- `scoring.ts`: Difficulty and RV computation
- `pox.ts`: One-shot experiment generator

All JSON is serialized with sorted keys for deterministic hashing.

### Contract Deployment Sequence

Critical: Deploy in correct order due to constructor dependencies:

```bash
# 1. Deploy Reputation first
forge create Reputation --rpc-url $RPC --private-key $PK

# 2. Deploy Registry with reputation address
forge create PoXRegistry --rpc-url $RPC --private-key $PK \
  --constructor-args <REPUTATION_ADDR>

# 3. Deploy ChallengeManager with both addresses  
forge create ChallengeManager --rpc-url $RPC --private-key $PK \
  --constructor-args <REGISTRY_ADDR> <REPUTATION_ADDR>

# 4. Authorize contracts to adjust reputation
cast send <REPUTATION_ADDR> "setAuthorized(address,address)" \
  <REGISTRY_ADDR> <CHALLENGE_MANAGER_ADDR> \
  --rpc-url $RPC --private-key $PK
```

### Integration Testing Pattern

End-to-end flow:
1. Generate experiment (`packages/experiments`)
2. Upload to Synapse (get CID)
3. Register on-chain (`PoXRegistry.registerExperiment()`)
4. Verify retrieval and hash computation
5. (Optional) Test challenge flow

## Technology Stack

- **Blockchain**: Arbitrum Sepolia (low gas, EVM compatible)
- **Smart Contracts**: Solidity 0.8.21 with Foundry
- **Off-chain**: TypeScript/Node.js with ethers.js v6+
- **Storage**: Synapse (FilOzone) on Filecoin
- **Indexing**: Graph Protocol subgraph
- **Simulation**: Python (NumPy, Matplotlib)
- **Package Manager**: pnpm (monorepo with workspaces)

## Important Design Principles

### Determinism
Same seed → same experiment → same hashes. Essential for fraud proofs and verification.

### Transparency
All scoring parameters are explicit and documented. No hidden magic numbers.

### Modularity
HPLC is v1. Architecture supports NMR, GC-MS, and other analytical techniques through same protocol pattern.

### Progressive Decentralization
Current centralization points (owner-resolved challenges) are explicit and documented. Migration path toward trustlessness is clear.

## File Locations

- Contract ABIs: Generated in `out/` after `forge build`
- Deployment scripts: `foundry/script/`
- Configuration: `Makefile` for common operations
- Documentation: Each directory has `README.md` and `THOUGHTS.md` (design rationale)

## Environment Variables

Required for deployment and testing:
```bash
ARBITRUM_SEPOLIA_RPC=<rpc_url>
PRIVATE_KEY=<deployer_private_key>  # Never commit!
```

## Testing Philosophy

- **Contracts**: Use Foundry's test framework (`forge test`)
- **TypeScript**: Tests verify determinism and hash stability
- **Integration**: Test full flow from simulation to on-chain registration

No tests exist yet (hackathon MVP), but infrastructure is ready.

## Critical Notes

- **Never use Docker** - as per project rules
- **Never use Homebrew** - use existing system tools or Nix
- **Gas Optimization**: Contracts store hashes only, not full data (500x cheaper)
- **Reputation Decay**: Prevents hoarding, encourages continuous contribution
- **Fraud Proofs**: Currently owner-gated; roadmap to trustless verification documented

## Philosophical Context

Read `THOUGHTS.md` files for deep dives:
- Root `THOUGHTS.md`: System design philosophy
- `contracts/THOUGHTS.md`: On-chain architecture rationale
- `packages/experiments/THOUGHTS.md`: Difficulty scoring reasoning
- `script-tag/THOUGHTS.md`: Web3 UX patterns

**Core Motto**: *Fortis est Veritas* (Truth is strong)

Scientific work deserves better infrastructure. PoX builds that infrastructure through cryptographic verification, economic incentives, and decentralized coordination.
