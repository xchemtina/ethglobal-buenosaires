# Apps — User-Facing Applications (Placeholder)

Container directory for end-user applications in the PoX ecosystem.

## Structure

```
apps/
├── cli/         # Command-line interface (empty)
├── dashboard/   # Web dashboard (empty)
└── README.md    # This file
```

Both subdirectories are currently **empty** but reserved for future development.

## Planned Applications

### 1. CLI (`apps/cli`)

**Purpose**: Command-line tool for experiment submission, verification, and management.

**Intended Features**:
```bash
# Generate experiment
pox generate --seed=abc123 --peaks=5 --noise=0.03 > experiment.json

# Upload to Synapse
pox upload experiment.json --output=cid.txt

# Register on-chain
pox register --cid=$(cat cid.txt) --private-key=$PK

# Verify experiment
pox verify --experiment-id=42

# Challenge invalid experiment
pox challenge --experiment-id=42 --stake=0.1

# Query reputation
pox reputation --address=0x...
```

**Tech Stack**:
- Node.js (TypeScript)
- Commander.js (CLI framework)
- Ethers.js (blockchain interaction)
- Synapse SDK (storage)

### 2. Dashboard (`apps/dashboard`)

**Purpose**: Web interface for browsing experiments, visualizing chromatograms, and monitoring reputation.

**Intended Features**:
- **Experiment Browser**: Paginated list with filters (date, difficulty, submitter)
- **Chromatogram Viewer**: Interactive plot (peaks, noise, annotations)
- **Reputation Leaderboard**: Top contributors ranked by RV
- **Challenge Monitor**: Active disputes, resolution history
- **Analytics**: Network stats (submissions/day, difficulty distribution)

**Tech Stack**:
- Next.js (React framework)
- Tailwind CSS (styling)
- Recharts/D3.js (data visualization)
- Wagmi/RainbowKit (wallet connection)
- TanStack Query (data fetching)

## Why These Are Empty

### Hackathon Priorities
1. **Core protocol** (contracts, experiments, storage) ✅
2. **Integration proof** (script-tag demo) ✅
3. **User applications** (CLI, dashboard) ❌ ← we are here

Time constraints mean UIs are deferred to post-hackathon.

### Pragmatic Tradeoffs
- **CLI**: Can use Foundry/Hardhat console for now
- **Dashboard**: Can query contracts via Etherscan/Arbiscan
- Both are **nice-to-have**, not **must-have** for protocol validation

## Development Plan

### CLI Implementation Path

**Phase 1: Basic Commands** (Week 1)
```bash
pox generate    # Generate synthetic experiment
pox upload      # Upload to Synapse
pox register    # Register on-chain
```

**Phase 2: Verification** (Week 2)
```bash
pox verify      # Verify experiment integrity
pox challenge   # Open challenge
pox resolve     # Resolve challenge (owner only)
```

**Phase 3: Queries** (Week 3)
```bash
pox list        # List experiments
pox get         # Get experiment details
pox reputation  # Query reputation scores
```

**Phase 4: Advanced** (Week 4+)
```bash
pox watch       # Watch for new experiments
pox stats       # Network statistics
pox export      # Export data (CSV, JSON)
```

### Dashboard Implementation Path

**Phase 1: Static Pages** (Week 1)
- Landing page with protocol description
- Experiment list (hardcoded test data)
- Basic layout + navigation

**Phase 2: Contract Integration** (Week 2)
- Connect wallet (RainbowKit)
- Read experiments from PoXRegistry
- Display reputation scores

**Phase 3: Visualization** (Week 3)
- Plot chromatograms (line charts)
- Show peak annotations
- Interactive zoom/pan

**Phase 4: Write Operations** (Week 4+)
- Register experiments via UI
- Open challenges
- Submit votes (future governance)

## Monorepo Integration

Both apps will use shared packages:

```
packages/
├── experiments/     # Shared experiment logic
├── contracts/       # ABI + typechain types
└── sdk/            # Unified PoX SDK
    ├── client.ts   # Contract wrappers
    ├── synapse.ts  # Storage helpers
    └── utils.ts    # Hash computation, validation
```

This prevents code duplication between CLI and dashboard.

## Environment Configuration

Apps will read from `.env`:
```bash
# Blockchain
ARBITRUM_SEPOLIA_RPC=https://sepolia-rollup.arbitrum.io/rpc
PRIVATE_KEY=0x...

# Contracts
POX_REGISTRY_ADDRESS=0x...
CHALLENGE_MANAGER_ADDRESS=0x...
REPUTATION_ADDRESS=0x...

# Synapse
SYNAPSE_RPC_URL=https://synapse.filoz.one/rpc

# Optional
ETHERSCAN_API_KEY=...
```

## Alternative: Gradual Rollout

Instead of building complete apps, consider:

### CLI: Start with Shell Scripts
```bash
#!/bin/bash
# pox-generate.sh
npx tsx packages/experiments/src/pox.ts --seed=$1 --peaks=$2
```

### Dashboard: Use Existing Tools
- **Dune Analytics**: SQL queries for on-chain data
- **Grafana + The Graph**: Subgraph for indexing
- **Notion/Airtable**: Manual tracking during testnet

Only build custom apps when generic tools become limiting.

## User Stories (When Implemented)

### Researcher Workflow (CLI)
```bash
# 1. Run HPLC experiment (real lab work)
# 2. Export data to CSV
cat hplc_output.csv | pox import --format=csv > experiment.json

# 3. Generate metadata
pox metadata experiment.json --operator="Alice" --instrument="Agilent-1200"

# 4. Upload + register
pox submit experiment.json --wallet=~/.wallets/alice.json

# 5. Monitor status
pox status --experiment-id=123 --watch
```

### Verifier Workflow (Dashboard)
1. Browse new experiments (sorted by recent)
2. Click "Verify" on suspicious entry
3. Download chromatogram from Synapse
4. Re-compute hashes locally
5. Compare to on-chain values
6. If mismatch: click "Challenge" (stakes ETH)
7. Wait for owner resolution
8. Receive reputation reward

### Observer Workflow (Dashboard)
1. View leaderboard (top 10 contributors)
2. Inspect individual profile (experiments, reputation history)
3. Filter experiments by difficulty range
4. Export CSV for external analysis

## Accessibility Considerations

### CLI
- **Tab completion**: Shell completions (bash, zsh, fish)
- **Help text**: Detailed `--help` for every command
- **Error messages**: Actionable (e.g., "Missing wallet file. Run `pox init` first.")
- **Progress bars**: For long operations (upload, verification)

### Dashboard
- **Keyboard navigation**: All functions accessible without mouse
- **Screen reader support**: Semantic HTML, ARIA labels
- **High contrast mode**: Respect system dark mode
- **Responsive design**: Works on mobile (MetaMask mobile wallet)

## Related Work

### Inspiration
- **Foundry CLI**: Fast, ergonomic Ethereum tooling
- **Ceramic CLI**: Decentralized data streams
- **Ocean Protocol**: Data marketplace dashboards
- **Etherscan**: Block explorer UX patterns

### Differentiation
- **PoX CLI**: Domain-specific (HPLC experiments, not generic contracts)
- **PoX Dashboard**: Reputation-first (leaderboards, not just transactions)

## Next Steps

1. **Decide on MVP scope** (which app first? CLI or dashboard?)
2. **Set up monorepo structure** (`packages/sdk` for shared logic)
3. **Create wireframes** (dashboard UI mockups)
4. **Define CLI command spec** (argument parsing, flags)
5. **Implement incrementally** (one command/page at a time)

## Current Workaround

Until apps exist:
- **CLI equivalent**: Use Foundry/Hardhat console + curl scripts
- **Dashboard equivalent**: Arbiscan for contract state, Synapse web UI for data

These are **sufficient for testnet validation**, just not user-friendly.

---

This README serves as placeholder until apps are implemented. When development begins, each subdirectory (`cli/`, `dashboard/`) will get its own detailed README.
