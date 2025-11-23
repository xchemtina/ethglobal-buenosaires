# PoX — Proof-of-X

Decentralized peer review for analytical chemistry experiments.

## What It Does

Validates scientific experiments on-chain using type-specific reputation multipliers:
- **PXRD**: 3× (>50% error rate)
- **NMR**: 2× (30-40% error rate)  
- **HPLC**: 1× (5-10% error rate)

## Stack

- Contracts: Solidity on Filecoin
- Storage: Synapse SDK
- Indexing: The Graph
- Frontend: Next.js
- Data: Python (HPLC/NMR simulation)

## Deployed (Filecoin Calibration)

- Reputation: `0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1`
- Registry: `0xA6Fa61924F06DB9A84B92182B69F5C08F3176554`
- ChallengeManager: `0x6e80A987049965127f1EB69Cc49Fb4460AeB5E8B`
- 25 experiments (16 HPLC, 2 Air Quality, 7 NMR)

## Quick Start

```bash
# Dashboard
cd blockchain-status-plotter
pnpm install && pnpm dev

# Subgraph
cd subgraph
npm install
npx graph codegen && npx graph build
```

## License

MIT

---

**ETH Global Buenos Aires 2025**
