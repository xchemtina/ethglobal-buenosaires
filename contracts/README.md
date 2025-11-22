# Contracts — PoX On-Chain Protocol

Solidity smart contracts implementing the Proof-of-X reputation system for decentralized experimental validation.

## Architecture

Three core contracts form the protocol backbone:

```
┌─────────────────┐
│  PoXRegistry    │  ← Experiment storage + registration
└────────┬────────┘
         │ calls
         ▼
┌─────────────────┐
│   Reputation    │  ← Shared reputation ledger
└────────┬────────┘
         ▲
         │ adjusts
┌────────┴────────┐
│ChallengeManager │  ← Fraud proofs + dispute resolution
└─────────────────┘
```

## Contract Overview

### PoXRegistry.sol
**Purpose**: Immutable registry for experiment submissions  
**Key Operations**:
- `registerExperiment()` — Submit experiment with metadata hashes
- `getExperiment()` — Query experiment by ID
- `totalExperiments()` — Count registered experiments

**Storage Schema**:
```solidity
struct Experiment {
    uint256 id;
    address submitter;
    string cid;           // Synapse pieceCid for off-chain data
    bytes32 dataHash;     // keccak256(metadata + raw points)
    bytes32 metricsHash;  // keccak256(analysis results)
    uint256 difficulty;   // Computed difficulty score
    int256 initialRV;     // Scaled reputation value (×10⁶)
    uint64 submittedAt;   // Block timestamp
}
```

**Design Rationale**:
- Stores **hashes**, not full data (gas optimization)
- Uses Synapse `cid` for decentralized storage retrieval
- Immutable after registration (no edits/deletions)
- Automatically credits reputation on valid submission

### Reputation.sol
**Purpose**: Unified reputation ledger with access control  
**Key Operations**:
- `setAuthorized()` — Grant adjustment permissions to Registry + ChallengeManager
- `adjustReputation()` — Modify user scores (authorized contracts only)

**Access Model**:
```
Owner (deployer)
  ├─ authorizes → PoXRegistry
  └─ authorizes → ChallengeManager
```

**Why Separate Contract?**  
Reputation is **shared state** across multiple protocol components (experiments, challenges, future governance). Centralizing it:
- Prevents fragmentation (one source of truth)
- Enables atomic updates from multiple callers
- Simplifies access control auditing

### ChallengeManager.sol
**Purpose**: Dispute resolution via fraud proofs  
**Key Operations**:
- `openChallenge()` — Submit alternate analysis for experiment
- `resolveChallenge()` — Owner adjudicates dispute outcome

**Challenge Lifecycle**:
```
Experiment submitted
      ↓
User suspects invalid analysis
      ↓
openChallenge(experimentId, computedMetricsHash)
      ↓
Off-chain verification (compare hashes)
      ↓
resolveChallenge(challengeId, experimentValid)
      ↓
Reputation adjusted: slash fraud / reward validator
```

**Resolution Logic** (MVP):
```solidity
if (experimentValid) {
    submitterDelta = +D      // Confirmed correct
    challengerDelta = +D/10  // Small reward for verification
} else {
    submitterDelta = -D      // Slashed for fraud
    challengerDelta = +D     // Full reward to challenger
}
```

## Integration with Off-Chain System

### Data Flow

1. **User computes experiment** (via `packages/experiments`)
   - Generates `dataHash`, `metricsHash`, difficulty, RV
   
2. **User uploads to Synapse** (decentralized storage)
   - Receives `pieceCid` for retrieval
   
3. **User calls `registerExperiment()`**
   - On-chain: stores hashes + metadata
   - Reputation: credits initial RV
   
4. **Verifier retrieves data** (via Synapse CID)
   - Re-computes analysis off-chain
   - If mismatch: calls `openChallenge()`
   
5. **Owner resolves** (via `resolveChallenge()`)
   - In production: replace with DAO vote or optimistic rollup

### Why Hashes, Not Data?

Storing full chromatograms on-chain would cost:
```
2048 points × 16 bytes/point × $0.05/KB ≈ $1.60 per experiment
```

With hashes:
```
2 × 32 bytes × $0.05/KB ≈ $0.0032 per experiment
```

**500x cheaper** while maintaining fraud-proof security via hash verification.

## Security Model

### Trust Assumptions (MVP)
- **Owner-resolved challenges**: Centralized adjudication (migration path: DAO)
- **No stake requirement**: Free submissions (migration path: collateral bonding)
- **No time limits**: Challenges never expire (migration path: dispute windows)

### Attack Vectors & Mitigations

| Attack | Current State | Future Mitigation |
|--------|--------------|-------------------|
| Spam submissions | None | Stake requirement |
| Frivolous challenges | None | Challenge bond (slashed if invalid) |
| Owner manipulation | Single point of failure | Multi-sig or governance |
| Hash collision | Cryptographically hard | Switch to SHA3-512 if quantum risk |

## Deployment Notes

### Constructor Dependencies
```solidity
// 1. Deploy Reputation first
Reputation reputation = new Reputation();

// 2. Deploy Registry + ChallengeManager with reputation address
PoXRegistry registry = new PoXRegistry(address(reputation));
ChallengeManager challenges = new ChallengeManager(
    address(registry),
    address(reputation)
);

// 3. Authorize contracts
reputation.setAuthorized(address(registry), address(challenges));
```

### Gas Costs (Arbitrum Sepolia estimates)
- `registerExperiment()`: ~150k gas
- `openChallenge()`: ~80k gas
- `resolveChallenge()`: ~120k gas

## Future Extensions

### 1. Stake Mechanism
```solidity
function registerExperiment(...) external payable {
    require(msg.value >= MIN_STAKE, "insufficient stake");
    // Lock stake until challenge window expires
}
```

### 2. Bisection Game (Optimistic Fraud Proofs)
Instead of owner-resolved challenges:
- Challenger submits disputed analysis
- On-chain bisection narrows down mismatch point
- Final step: verify single computation on-chain

### 3. Dynamic Difficulty Adjustment
```solidity
function adjustDifficultyParams(
    uint256 alpha,
    uint256 beta,
    uint256 gamma
) external onlyGovernance {
    // Network-wide recalibration based on submission stats
}
```

### 4. Reputation Decay On-Chain
Currently handled off-chain. Could add:
```solidity
function getAdjustedReputation(address user) external view returns (int256) {
    uint256 elapsed = block.timestamp - lastUpdate[user];
    return reputation[user] - (elapsed * DECAY_RATE);
}
```

### 5. Multi-Experiment Challenges
Current system: one challenge per experiment. Could batch:
```solidity
function openBatchChallenge(
    uint256[] calldata experimentIds,
    bytes32[] calldata computedHashes
) external {
    // More efficient for systemic fraud detection
}
```

## Development Workflow

### Testing
```bash
forge test --match-contract PoXRegistry
forge test --match-contract ChallengeManager
```

### Deployment (Foundry)
```bash
forge script script/Deploy.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC --broadcast
```

### Verification
```bash
forge verify-contract $CONTRACT_ADDRESS PoXRegistry --chain arbitrum-sepolia
```

## Why Arbitrum?

- **Low gas costs**: ~10x cheaper than Ethereum L1
- **EVM compatibility**: No code changes from Ethereum
- **DeSci adoption**: Growing ecosystem (OriginTrail, VitaDAO)
- **Synapse integration**: FilOzone's data availability layer

## Comparison to Existing Systems

### vs. Gitcoin Passport
- **Gitcoin**: Identity attestations (GitHub, Twitter)
- **PoX**: Work attestations (experiments, analysis)
- **Similarity**: Both build reputation graphs
- **Difference**: PoX is domain-specific (scientific labor)

### vs. Optimism RetroPGF
- **Optimism**: Retroactive funding based on impact
- **PoX**: Real-time reputation based on difficulty
- **Similarity**: Both reward public goods
- **Difference**: PoX validates work cryptographically, not via voting

### vs. Ocean Protocol
- **Ocean**: Data marketplace with compute-to-data
- **PoX**: Experiment registry with fraud proofs
- **Similarity**: Both bridge off-chain data to on-chain verification
- **Difference**: PoX focuses on reproducibility, not monetization

## Open Questions

1. **Who should resolve challenges?**
   - Owner (fast, centralized)
   - DAO vote (slow, democratic)
   - Economic game (fast, trust-minimized)

2. **How to prevent Sybil attacks?**
   - Stake requirements
   - Proof of personhood (Worldcoin, BrightID)
   - Rate limiting per address

3. **Should reputation be transferable?**
   - Non-transferable (binds to identity)
   - Soulbound token (ERC-5484)
   - Tradable (enables reputation markets)

4. **How to handle cross-chain reputation?**
   - Bridge to other chains (Axelar, LayerZero)
   - Replicate on each chain (fragmentation)
   - Unified registry on one chain (centralization risk)
