# DECISIONS — Key Architectural Choices

This document records major technical decisions made during PoX development, including rationale, alternatives considered, and trade-offs.

---

## 1. Filecoin Cloud Instead of Arbitrum Sepolia

**Decision**: Deploy smart contracts on Filecoin Cloud (EVM-compatible Filecoin network), not Arbitrum Sepolia

**Rationale**:
- **Native Filecoin integration**: Direct access to Filecoin storage deals and Synapse SDK
- **Story coherence**: "Filecoin for storage + Filecoin for contracts" makes intuitive sense to judges
- **FilOzone partnership**: Synapse is built specifically for Filecoin ecosystem
- **Lower switching costs**: Filecoin Cloud has EVM compatibility, same Solidity code works

**Alternatives Considered**:
- **Arbitrum Sepolia**: Lower gas, more mature tooling, but conceptually disconnected from Filecoin storage
- **Ethereum L1**: Too expensive for frequent experiment submissions
- **Polygon**: Similar to Arbitrum, but even less connection to Filecoin narrative

**Trade-offs**:
- ✅ Stronger narrative: "Full-stack Filecoin DeSci"
- ✅ Simplified architecture: One ecosystem instead of bridge/relay
- ❌ Less mature: Filecoin Cloud tooling still evolving
- ❌ Smaller community: Fewer devs familiar with Filecoin EVM

**Status**: Decided, not yet implemented (contracts need deployment)

---

## 2. The Graph for Metadata Indexing

**Decision**: Use The Graph Protocol subgraph to index contract events and provide GraphQL API

**Rationale**:
- **LLM-friendly queries**: GraphQL is easier for AI agents to consume than raw RPC calls
- **Structured metadata**: Subgraph schema enforces data model (experiment type, sample ID, etc.)
- **Performance**: Indexed queries much faster than scanning blockchain directly
- **Lab journal abstraction**: Subgraph becomes "network's lab notebook" that LLMs can read

**Alternatives Considered**:
- **Direct RPC queries**: Too slow, no indexing, hard to query complex relationships
- **Custom indexer**: Reinventing wheel, maintenance burden
- **Dune Analytics**: Great for dashboards, but not programmable for LLM agents

**Trade-offs**:
- ✅ Standard Web3 infrastructure
- ✅ GraphQL is self-documenting (introspection for LLMs)
- ❌ Another service to deploy and maintain
- ❌ Centralization risk if hosted service goes down

**Implementation Priority**: HIGH (needed for dashboard to query experiments)

---

## 3. Python for Synthetic Data Generation

**Decision**: Use Python (NumPy, Matplotlib) for generating HPLC/VOC traces, not TypeScript

**Rationale**:
- **Scientific libraries**: NumPy/SciPy are standard for signal processing
- **Visualization**: Matplotlib for quick inspection of generated traces
- **Chemist-friendly**: Python is lingua franca of computational chemistry
- **Prototyping speed**: Generate 100 traces in minutes vs. building TypeScript pipeline

**Alternatives Considered**:
- **TypeScript** (`packages/experiments`): Exists but overkill for simple trace generation
- **MATLAB/Octave**: Industry standard for chromatography, but proprietary/clunky
- **R**: Strong stats, but less popular in chemistry community

**Trade-offs**:
- ✅ Fast prototyping
- ✅ Familiar to target audience (chemists)
- ❌ Language boundary (Python → TypeScript → Solidity)
- ❌ Need to serialize to JSON for upload

**Note**: TypeScript `packages/experiments` still useful for *analysis* (peak detection, scoring) but not primary data gen tool

---

## 4. Payment Incentive for Uploaders

**Decision**: Smart contract pays users for uploading experiments to Filecoin

**Rationale**:
- **Cold start problem**: No data = no network value. Need to bootstrap with incentives
- **Storage costs**: Filecoin deals aren't free. Protocol should subsidize early adopters
- **Reputation bootstrapping**: Early contributors get both payment *and* reputation
- **Sybil resistance**: Paying for *quality* experiments (based on difficulty score) not just uploads

**Implementation**:
```solidity
function registerExperiment(...) external payable {
    require(msg.value >= MIN_CONTRIBUTION, "need treasury funding");
    
    // Store experiment
    experiments[experimentId] = Experiment(...);
    
    // Reward uploader (scaled by difficulty)
    uint256 reward = difficulty * REWARD_MULTIPLIER;
    payable(msg.sender).transfer(reward);
    
    emit ExperimentRegistered(...);
}
```

**Alternatives Considered**:
- **No payment**: Pure reputation system. Risk: no one uploads data initially
- **Token minting**: Create $POX token. Risk: regulatory issues, complex tokenomics
- **NFT minting**: Each experiment as NFT. Risk: over-financialization, off-mission

**Trade-offs**:
- ✅ Simple: just ETH/FIL payments
- ✅ Immediate incentive (no token speculation)
- ❌ Requires protocol treasury funding
- ❌ Could attract spam if not gated by difficulty

**Status**: Designed, not yet implemented in contract

---

## 5. Two-Hash System (dataHash + metricsHash)

**Decision**: Store two separate keccak256 hashes on-chain instead of one combined hash

**Rationale**:
- **Granular verification**: Can challenge analysis *without* re-downloading full raw data
- **Lazy verification**: Check metricsHash first (32 bytes). Only download full trace if mismatch
- **Future flexibility**: Can re-analyze old data with new algorithms, update metricsHash
- **Privacy gradient**: Could reveal metricsHash publicly but keep dataHash private (ZK future)

**Alternatives Considered**:
- **Single hash**: `keccak256(data || metrics)`. Simpler but forces full re-download every time
- **Merkle tree**: More complex, overkill for binary (data vs. metrics) split
- **No hashes**: Store full data on-chain. Prohibitively expensive

**Trade-offs**:
- ✅ Cheaper verification (gas-wise)
- ✅ Enables progressive disclosure
- ❌ Slightly more complex contract interface
- ❌ Two hashes to manage in UI

**Implementation**: Already in contracts (`PoXRegistry.sol`)

---

## 6. Owner-Gated Challenge Resolution (MVP)

**Decision**: ChallengeManager uses `onlyOwner` modifier for resolving disputes

**Rationale**:
- **MVP speed**: Multi-sig or DAO voting takes weeks to implement correctly
- **Transparency**: Centralization is *explicit* and documented as temporary
- **Learning phase**: Need to observe challenge patterns before designing game theory
- **Security**: Wrong mechanism design is worse than centralized-but-honest resolution

**Future Migration Path**:
1. **Phase 1** (now): Owner resolution
2. **Phase 2** (post-hackathon): Multi-sig (3-of-5 trusted scientists)
3. **Phase 3** (6 months): DAO vote with reputation-weighted voting
4. **Phase 4** (1 year): Optimistic fraud proofs (bisection game)
5. **Phase 5** (2 years): ZK proofs for analysis correctness

**Alternatives Considered**:
- **Immediate DAO**: Too complex for hackathon, likely buggy
- **Economic game**: Staking/slashing requires careful mechanism design (Truebit-style)
- **Trusted verifiers**: Off-chain computation with on-chain verification (TLS Notary, etc.)

**Trade-offs**:
- ✅ Ship working MVP fast
- ✅ Honest about trust assumptions
- ❌ Centralization risk (owner can collude)
- ❌ Not credibly neutral (yet)

**Status**: Implemented, documented as temporary

---

## 7. Next.js Dashboard Over Pure React SPA

**Decision**: Use Next.js 16 (App Router) for dashboard instead of Create React App or Vite

**Rationale**:
- **SSR for metadata**: Pre-render experiment lists for SEO (future: public lab journal)
- **API routes**: Built-in backend for proxying RPC calls (avoids CORS issues)
- **Performance**: Image optimization, code splitting out-of-box
- **Production-ready**: Vercel deployment is one command

**Alternatives Considered**:
- **Vite + React**: Faster dev, but manual SSR setup
- **Remix**: Great SSR, but smaller ecosystem than Next.js
- **Plain HTML + ESM** (like `script-tag`): Too primitive for complex dashboard

**Trade-offs**:
- ✅ Modern best practices
- ✅ Great dev experience
- ❌ Learning curve for Next.js 16 (App Router is new)
- ❌ Heavier than SPA (but worth it for features)

**Status**: Dashboard exists, needs Web3 integration

---

## 8. Recharts for Visualization Over D3.js

**Decision**: Use Recharts library for chromatogram plots, not D3.js or Chart.js

**Rationale**:
- **React-native**: Recharts is built for React (declarative components)
- **Responsive**: Works on mobile without extra config
- **TypeScript support**: Strong types, fewer bugs
- **Good enough**: 95% of D3 power with 10% of complexity

**Alternatives Considered**:
- **D3.js**: Ultimate flexibility but steep learning curve, imperative API
- **Chart.js**: Popular but less React-friendly, limited for scientific plots
- **Plotly.js**: Great for science but huge bundle size (500KB+)

**Trade-offs**:
- ✅ Fast to prototype
- ✅ Looks professional
- ❌ Limited customization vs. D3
- ❌ Somewhat bloated for simple line charts

**Status**: Already integrated in dashboard

---

## 9. Mock Data During Development

**Decision**: Dashboard uses `mock-data.ts` with realistic synthetic data during development

**Rationale**:
- **Parallel development**: Frontend team doesn't wait for contracts to deploy
- **Demo-ready**: Can show UI without live blockchain
- **Testing edge cases**: Generate corner cases (huge peaks, no noise, etc.) easily
- **Fast iteration**: No wallet connections, no gas fees, no RPC latency

**Transition Plan**:
1. **Now**: All mock data
2. **After contract deployment**: Swap `data-service.ts` to real Web3 calls
3. **Keep mocks**: Use for unit tests and Storybook components

**Trade-offs**:
- ✅ UI development doesn't block on backend
- ✅ Predictable, fast feedback loop
- ❌ Risk of divergence (mock data schema != real schema)
- ❌ Need to remember to swap to real data

**Status**: Active, mocks are placeholder until integration

---

## 10. pnpm Over npm/yarn

**Decision**: Use pnpm for package management in monorepo

**Rationale**:
- **Disk efficiency**: Shared dependency storage across all projects
- **Workspace support**: First-class monorepo with `pnpm -r` commands
- **Faster installs**: Symlinks instead of copying
- **Strict by default**: Avoids phantom dependencies

**Alternatives Considered**:
- **npm workspaces**: Built-in but slower
- **yarn (classic)**: Deprecated
- **yarn (v2+)**: PnP mode is controversial, ecosystem compatibility issues

**Trade-offs**:
- ✅ Best-in-class monorepo experience
- ✅ Fast CI builds
- ❌ One more tool to learn
- ❌ Some packages still have pnpm compatibility issues

**Status**: Already configured in root `package.json`

---

## 11. Real HPLC Trace Integration in Dashboard

**Decision**: Build loader utility to transform Python-generated JSON traces into dashboard format

**Rationale**:
- **Rapid demo**: Can show real chromatogram data without deploying contracts first
- **Separation of concerns**: Python generates, TypeScript displays, no language lock-in
- **Progressive enhancement**: Start with local files, later fetch from Synapse via CID
- **Non-breaking**: Existing mock data still works, real data is opt-in

**Implementation**:
- `lib/hplc-loader.ts`: Transforms `{time, signal}` → `{time, experimental, theoretical}`
- `scripts/copy-traces.sh`: Copies traces from `data/traces/` to `public/traces/`
- Duplicates signal to both experimental/theoretical for single-trace display

**Alternatives Considered**:
- **Fetch from Synapse**: Blocked on contract deployment and CID storage
- **Modify chart component**: More elegant but breaks existing mock setup
- **Use different chart**: Recharts is already integrated and working

**Trade-offs**:
- ✅ Immediate value: Real data without blockchain
- ✅ Backwards compatible: Mock data still works
- ✅ Demo-ready: Can show judges actual HPLC traces
- ❌ Data duplication: Same signal mapped to two fields
- ❌ Manual copy step: Run script before each deploy

**Migration Path**:
1. **Now**: Load from `public/traces/` (local files)
2. **After Synapse integration**: Fetch via CID from `fetchHplcFromCID(cid)`
3. **Production**: Dashboard queries subgraph for CIDs, fetches traces dynamically

**Status**: Implemented, documented in `HPLC_TRACES.md` and `INTEGRATION_SUMMARY.md`

---

## Summary: Philosophy Underlying Decisions

### 1. **Progressive Decentralization**
Start centralized (owner resolution), document trust assumptions, migrate to trustlessness over time. Premature decentralization kills projects.

### 2. **Story Over Purity**
"Filecoin full-stack" narrative > "technically optimal multi-chain bridge". Judges remember stories, not architecture diagrams.

### 3. **Ship Working Code**
Mock data + centralized resolution = demo-able. Perfect decentralization + no UI = vaporware.

### 4. **LLM-First Design**
Every architectural choice asks: "Can an AI agent understand this?" The Graph schema, structured metadata, GraphQL queries all optimize for machine readability.

### 5. **Scientist UX Over Developer Purity**
Python for data generation (chemists know it) even though TypeScript monorepo would be "cleaner". Users > aesthetics.

---

**These decisions are not immutable.** As we learn more (from hackathon feedback, user testing, production usage), we'll revisit and update.

*Fortis est Veritas.*
