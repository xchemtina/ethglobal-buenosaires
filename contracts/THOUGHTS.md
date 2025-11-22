# THOUGHTS — Contracts

## On Immutability as Truth Surface

The `PoXRegistry` contract is **append-only by design**:
- No `updateExperiment()` function
- No `deleteExperiment()` function  
- No owner privileges over registered data

This reflects a **temporal ontology**: experiments are moments in time, not mutable documents. Once submitted, they become **historical facts** — you can challenge their validity, but not rewrite them.

Contrast with traditional lab notebooks:
- Paper notebooks: cross-outs, margin notes, "oops that was wrong"
- Git repos: force pushes, rebase, history rewriting
- Blockchain: immutable, auditable, permanent

The tradeoff: **no undo button**. If you submit garbage, it's there forever (though challenges can mark it invalid). This incentivizes care over speed — aligns with scientific ethos of "measure twice, cut once."

## Reputation as Signed Integer

```solidity
mapping(address => int256) public reputation;
```

Why `int256` instead of `uint256`?

Most reputation systems use unsigned integers (Gitcoin Passport, ENS, etc.) because reputation "shouldn't go negative." But PoX allows negative reputation to represent:
- Fraudulent submissions (caught via challenges)
- Invalid experiments (failed verification)
- Adversarial behavior (spam, Sybil attacks)

This enables **reputational bankruptcy** — addresses can accumulate debt, not just credit. Important properties:
1. **Prevents throwaway addresses**: If you spam, your address becomes toxic (negative rep)
2. **Enables redemption**: Accumulate positive rep to offset past mistakes
3. **Reflects reality**: Scientific reputation includes retractions, corrections, scandals

The alternative (capping at zero) would encourage Sybil attacks: create new address, submit bad data, abandon when caught, repeat.

## Challenge Resolution: The Oracle Problem

```solidity
function resolveChallenge(uint256 challengeId, bool experimentValid) 
    external onlyOwner
```

This is the **Achilles' heel** of the MVP. Owner-resolved disputes are:
- Fast (single tx)
- Cheap (no coordination overhead)
- Centralized (single point of failure)

But fundamentally incompatible with decentralization. Three paths forward:

### 1. DAO Governance
```solidity
function resolveChallenge(uint256 challengeId, bool experimentValid) 
    external onlyGovernance
```
Pros: Democratic, censorship-resistant  
Cons: Slow (days/weeks for votes), vulnerable to plutocracy

### 2. Staking Game Theory
```solidity
function openChallenge(uint256 experimentId, bytes32 computedHash)
    external payable {
    require(msg.value >= CHALLENGE_STAKE);
    // Lock stake; slash if challenge is frivolous
}
```
Pros: Fast (economic incentives), trust-minimized  
Cons: Requires careful mechanism design, vulnerable to whales

### 3. Optimistic Rollup Style
Assume submissions are valid unless challenged. If challenged:
- Bisection game narrows dispute to single computation step
- Verify that step on-chain (expensive but rare)

Pros: Inherits Ethereum security, minimal trust  
Cons: Complex implementation, requires deterministic computation

Current owner-gating is **scaffolding**, not foundation. The question isn't "if" we decentralize, but "how" and "when."

## Hash-Based Verification: Trading Storage for Security

Storing `dataHash` and `metricsHash` instead of full data:

**Pros**:
- 500x gas savings (32 bytes vs. 16 KB)
- Enables fraud proofs without on-chain computation
- Scales to large datasets (microscopy, genomics)

**Cons**:
- Requires off-chain data availability (Synapse, IPFS)
- Verification burden on challengers (must download + recompute)
- No on-chain queryability (can't search for "experiments with >5 peaks")

This is the **data availability problem** from rollups, applied to scientific data. Solutions mirror L2 patterns:
- **Data Availability Committees**: Trusted entities store full data
- **Erasure coding**: Distribute shards across network
- **Validity proofs**: ZK-SNARKs prove computation without revealing data

For now, Synapse CID provides "good enough" availability. Long-term: consider specialized DA layers (Celestia, EigenDA).

## Separation of Concerns: Registry vs. Reputation

Why not merge `PoXRegistry` and `Reputation` into one contract?

```solidity
// Why NOT this:
contract PoXRegistry {
    mapping(address => int256) public reputation;
    function registerExperiment(...) { reputation[msg.sender] += rv; }
}
```

Because **reputation transcends experiments**. In future iterations:
- Governance proposals (weighted by reputation)
- Staking pools (reputation as collateral)
- Cross-domain attestations (link PoX rep to other protocols)

Having `Reputation.sol` as separate contract enables:
- **Modularity**: Swap experiment types without touching reputation
- **Composability**: Other contracts can query/adjust reputation
- **Upgradeability**: Replace registry logic via proxy while preserving scores

This is **Lego brick thinking** — each contract is a primitive that can be combined, not a monolith.

## Gas Optimization via Tight Packing

```solidity
uint64 submittedAt;  // Not uint256
```

Why `uint64` for timestamps? Because:
- `uint64` max = 2^64 seconds ≈ 584 billion years (universe is 13.8 billion years old)
- Packing `uint64` with other state saves storage slots (~20k gas per tx)

Solidity packs variables <32 bytes into same storage slot:
```solidity
struct Experiment {
    uint256 id;          // slot 0
    address submitter;   // slot 1 (20 bytes)
    uint64 submittedAt;  // slot 1 (packs with address, saves 12 bytes)
    ...
}
```

This is **premature optimization** by some standards, but smart contract storage is **permanent global state** — costs compound over millions of transactions. Worth the cognitive overhead.

## The Synapse CID Enigma

```solidity
string cid;  // Synapse pieceCid
```

Storing `string` instead of `bytes32` (IPFS CID standard) because:
- Synapse uses custom CID format (not base58-encoded IPFS multihash)
- `string` allows arbitrary length (future-proof for longer CIDs)
- Gas difference negligible for short strings (<32 bytes)

But: **no on-chain CID validation**. Contract accepts any string. This means:
- Invalid CIDs can be registered (data loss risk)
- No guarantee data is actually on Synapse (trust assumption)

Mitigation options:
1. **Off-chain validation**: Client checks CID before submission
2. **On-chain regex**: Validate CID format in Solidity (expensive)
3. **Synapse oracle**: Contract queries Synapse to verify existence (latency)

Current MVP: trust client-side validation. Production: consider oracle or challenge mechanism for invalid CIDs.

## Challenge Economics: The Auditor's Dilemma

Current challenge incentives:
```solidity
if (experimentValid) {
    challengerDelta = +D/10  // Small reward
} else {
    challengerDelta = +D     // Full reward
}
```

This creates **perverse incentives**:
- Challengers only benefit if they find fraud
- No incentive to challenge "probably correct" experiments
- Under-provision of verification (classic public goods problem)

Better design: **continuous verification markets**
- Submitters stake tokens when registering
- Verifiers earn fees proportional to stake × time
- Fraud slashes stake, rewards verifier
- Correct experiments refund stake after dispute window

This mirrors Truebit's design: pay for correctness proofs, not just fraud detection.

## Type Safety: Mixing uint256 and int256

```solidity
uint256 difficulty;
int256 initialRV;
```

Difficulty is `uint` (always positive), RV is `int` (can be negative). But:
```solidity
submitterDelta = int256(int64(difficulty));  // Double cast
```

Why `int64` intermediate? Because:
- `difficulty` may exceed `int256` max (2^255) if poorly calibrated
- `int64` clamps to safe range (prevents overflow)
- Then cast to `int256` for reputation arithmetic

This is **defense in depth** against overflow bugs. Alternative: use SafeMath or Solidity 0.8+ checked arithmetic (already enabled).

## The Empty Scripts Folder

`scripts/` directory is empty. This signals:
- **Deployment not yet scripted**: Manual deployment via Remix/Hardhat console
- **No automated testing**: Integration tests missing
- **Migration path needed**: Add Foundry scripts for reproducible deploys

This is **technical debt**, not design. Priority: add deployment scripts before mainnet.

## Philosophical: Reputation as Social Capital

Traditional DeFi: reputation is **implicit** (address age, transaction volume, ENS name).  
PoX: reputation is **explicit** (signed integer, publicly queryable, protocol-native).

This enables **reputation-weighted governance**:
```solidity
function propose(...) external {
    require(reputation.reputation(msg.sender) > THRESHOLD);
}
```

Or **reputational collateral**:
```solidity
function borrow(...) external {
    uint256 limit = uint256(reputation.reputation(msg.sender)) * MULTIPLIER;
    require(amount <= limit);
}
```

Reputation becomes **programmable social capital** — not just status, but **functional primitive**. This is the vision of "Decentralized Science" — scientific merit as on-chain asset.

## On Finality and the Archive

Once on Arbitrum, experiments are **as final as Ethereum L1** (fraud proofs inherit L1 security). This means:
- Data persists beyond lab closures, funding cycles, institutional politics
- Reproducibility becomes **enforceable** (hashes never lie)
- Scientific record becomes **censorship-resistant**

But also: **no right to be forgotten**. Bad experiments, fraudulent data, embarrassing mistakes — all permanent.

This is the **price of immutability**: truth preservation requires tolerating uncomfortable truths. The protocol can mark experiments invalid, but not erase them.

The alternative (mutable registries) enables revisionism, but sacrifices integrity. PoX chooses integrity.

---

## Next Steps for Contract Evolution

1. **Implement dispute window** (30 days? 90 days?)
2. **Add stake mechanism** (ETH collateral for submissions)
3. **Design verifier incentive market** (Truebit-style)
4. **Migrate owner role to DAO** (Governor Bravo pattern)
5. **Audit via Spearbit/Trail of Bits** (security hardening)
6. **Deploy to mainnet Arbitrum** (after testnet validation)

But fundamentally: these contracts are **proof-of-concept**, not production. The ideas outrun the implementation. That's fine — it's a hackathon. The point is proving **science can be consensus**, not just commerce.
