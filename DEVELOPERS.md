# PoX Developer Documentation
**Technical Architecture & Implementation Guide**

*For developers who want to understand, fork, or contribute to PoX*

---

## 🏗️ System Architecture

### High-Level Data Flow

```
┌─────────────┐
│  Experiment │  (Python/TypeScript generator)
│  Generator  │
└──────┬──────┘
       │ JSON
       ▼
┌─────────────┐
│   Synapse   │  (Filecoin upload via SDK)
│     SDK     │
└──────┬──────┘
       │ Piece CID
       ▼
┌─────────────┐
│   ethers.js │  (Sign transaction)
│   + Wallet  │
└──────┬──────┘
       │ registerExperiment(cid, dataHash, metricsHash, difficulty, RV)
       ▼
┌──────────────────────────────────────┐
│      PoXRegistry (Filecoin EVM)      │
│  - Stores: CID, hashes, difficulty   │
│  - Emits: ExperimentRegistered       │
└────────┬────────────────┬────────────┘
         │                │
         │                │ credits reputation
         ▼                ▼
┌─────────────┐    ┌──────────────┐
│  Reputation │    │  Challenge   │
│   Contract  │◄───│   Manager    │
└─────────────┘    └──────────────┘
         │                 │
         │                 │ disputes
         ▼                 ▼
┌─────────────────────────────────────┐
│         Off-Chain Verifier          │
│  1. Download CID from Filecoin      │
│  2. Re-run analysis (deterministic) │
│  3. Compare hashes                  │
│  4. Open challenge if mismatch      │
└─────────────────────────────────────┘
```

### Directory Structure

```
PoX/
├── contracts/                    # Solidity smart contracts
│   ├── src/
│   │   ├── PoXRegistry.sol      # Main experiment registry
│   │   ├── Reputation.sol       # Unified reputation ledger
│   │   └── ChallengeManager.sol # Fraud proof system
│   └── script/
│       └── DeployPoX.s.sol      # Deployment script
│
├── packages/
│   ├── experiments/             # HPLC experiment generator
│   │   └── src/
│   │       ├── simulate.ts      # Gaussian peak generation
│   │       ├── analyze.ts       # Peak detection, noise estimation
│   │       └── scoring.ts       # Difficulty calculation
│   │
│   └── nmr-experiments/         # NMR spectrum simulator
│       └── src/
│           ├── simulate-nmr.ts  # Chemical shift generation
│           ├── cli.ts           # Single experiment CLI
│           └── batch-generate.ts # Batch generator
│
├── rpi5/                        # Raspberry Pi integration
│   ├── read_sensors.py          # Python sensor reader (I²C)
│   ├── upload-air-quality.mjs   # Air quality uploader
│   └── upload-nmr.mjs           # NMR uploader
│
├── blockchain-status-plotter-new/  # Next.js dashboard
│   ├── app/
│   │   └── experiments/page.tsx    # Main dashboard page
│   ├── components/
│   │   └── dashboard/
│   │       └── pox-experiments.tsx # Live experiment feed
│   └── lib/
│       ├── web3-service.ts      # On-chain data fetching
│       ├── experiment-service.ts # Unified experiment handling
│       └── filecoin-storage.ts  # Synapse SDK download
│
└── docs/
    ├── JUDGES.md                # Non-technical overview
    ├── DEVELOPERS.md            # This file
    └── OPERATIONS.md            # Monday-morning ops guide
```

---

## 🔐 Smart Contract Architecture

### Contract Interactions

```
User                PoXRegistry          Reputation        ChallengeManager
  │                      │                    │                   │
  ├─registerExperiment──►│                    │                   │
  │                      ├─creditReputation──►│                   │
  │                      │                    │                   │
  │                      ◄─────────────────────┘                   │
  │                      │                                         │
  │                      │  ◄──────────openChallenge───────────────┤
  │                      │                                         │
  │                      ├──────────────resolveChallenge──────────►│
  │                      │                                         │
  │                      │                    ◄─adjustReputation───┤
  │                      │                                         │
```

### PoXRegistry.sol

**Purpose**: Immutable experiment registry with CID storage

**Key Functions**:

```solidity
function registerExperiment(
    string calldata cid,
    bytes32 dataHash,
    bytes32 metricsHash,
    uint256 difficulty,
    int256 initialRV
) external returns (uint256 experimentId)
```

**Storage**:
```solidity
struct Experiment {
    uint256 id;
    address submitter;
    string cid;           // Filecoin piece CID
    bytes32 dataHash;     // keccak256(metadata + points)
    bytes32 metricsHash;  // keccak256(metrics)
    uint256 difficulty;   // Computed from experiment complexity
    int256 initialRV;     // Initial reputation value (scaled by 10^6)
    uint64 submittedAt;   // Block timestamp
}
```

**Access Control**: Public (anyone can register)

**Gas Cost**: ~150k gas per registration

### Reputation.sol

**Purpose**: Unified reputation ledger with access control

**Key Functions**:

```solidity
function creditReputation(address user, int256 amount) external onlyAuthorized
function debitReputation(address user, int256 amount) external onlyAuthorized
function getReputation(address user) external view returns (int256)
```

**Access Control**: Only authorized contracts (Registry + ChallengeManager)

**Storage**: `mapping(address => int256) reputations`

**Reputation Math**:
```
Initial: RV = ln(1 + D) * 10^6
After decay: RV_t = RV_0 - (λ * Δt * 10^6)
where λ = 0.01/day
```

### ChallengeManager.sol

**Purpose**: Fraud proof coordination

**Key Functions**:

```solidity
function openChallenge(uint256 experimentId, bytes32 computedDataHash) external
function resolveChallenge(uint256 challengeId, bool experimentValid) external onlyOwner
```

**Challenge Flow**:
1. User calls `openChallenge(id, theirHash)`
2. Owner (future: DAO) verifies off-chain
3. Owner calls `resolveChallenge(id, isValid)`
4. If invalid → submitter loses `-D` reputation, challenger gets `+D`
5. If valid → submitter gets `+D`, challenger gets `+D/10` (compensation for verification work)

**Current Trust Model**: Owner-resolved (centralized)

**Roadmap**: DAO governance → Bisection game → ZK proofs

---

## 🧪 Experiment Generators

### HPLC Simulator (`packages/experiments/`)

**Physics Model**: Gaussian peaks with baseline noise

```typescript
// Peak generation (Gaussian)
function generatePeak(center: number, height: number, width: number, points: number[]): number[] {
  const sigma = width / 2.355; // FWHM to sigma
  return points.map(t => 
    height * Math.exp(-((t - center) ** 2) / (2 * sigma ** 2))
  );
}

// Baseline noise (log-normal)
function addNoise(signal: number[], noiseLevel: number, seed: number): number[] {
  const rand = seededRandom(seed);
  return signal.map(y => y + Math.exp(rand() * noiseLevel));
}
```

**Difficulty Formula**:
```
D = 1 + α·nPeaks + β·baselineNoise + γ·ln(nPoints)
where α = 1.0, β = 8.0, γ = 0.5
```

**Key Insight**: Baseline noise is the **dominant factor** (β=8.0) because it reflects real analytical difficulty. More noise = harder to integrate peaks accurately.

**Determinism**: Same seed always produces same experiment → Same hash

### NMR Simulator (`packages/nmr-experiments/`)

**Physics Model**: Lorentzian lineshapes + spin-spin coupling

```typescript
// Lorentzian peak (realistic NMR lineshape)
function lorentzian(x: number, center: number, width: number): number {
  const gamma = width / 2;
  return (gamma ** 2) / ((x - center) ** 2 + gamma ** 2);
}

// Multiplet generation (J-coupling)
function generateMultiplet(
  center: number,
  multiplicity: 'singlet' | 'doublet' | 'triplet' | 'quartet',
  couplingConstant: number // Hz
): NMRPeak[]
```

**Chemical Shift Regions** (realistic ¹H NMR):
- Alkanes: 0.5-2.0 ppm
- Aromatics: 6.5-8.5 ppm
- Aldehydes: 9.0-10.0 ppm
- Ethers: 3.0-4.5 ppm

**Difficulty Formula**:
```
D = 8 + 0.8·nPeaks + 2.0·complexPeaks
where complexPeaks = count(triplets, quartets, multiplets)
```

**Data Scale**: 8,192 points per spectrum (realistic FID size)

### Air Quality Reader (`rpi5/read_sensors.py`)

**Hardware**:
- **SFA30** (Formaldehyde sensor, I²C addr 0x5D)
- **HM3301** (PM2.5 laser sensor, I²C addr 0x40)
- **Grove Light** (via ADC)

**Demo Mode**: Falls back to simulated data if hardware unavailable

**Data Format**:
```json
{
  "sampleId": "AIR-1763852580",
  "experimentType": "AirQuality",
  "sensors": ["SFA30", "HM3301", "Grove_Light"],
  "location": "Buenos Aires",
  "device": "Raspberry Pi 5",
  "dataPoints": [
    {"time": 0, "formaldehyde": 12.3, "pm2_5": 35.2, "light": 450, ...},
    ...60 points
  ],
  "metrics": {
    "air_quality_index": 63.6,
    "avg_formaldehyde_ppb": 11.8,
    "max_pm2_5_ugm3": 42.1,
    ...
  }
}
```

**AQI Calculation** (US EPA standard):
```python
def calculate_aqi(pm2_5):
    # Breakpoints for PM2.5 (μg/m³)
    if pm2_5 <= 12.0: return linear_scale(pm2_5, 0, 12.0, 0, 50)
    elif pm2_5 <= 35.4: return linear_scale(pm2_5, 12.1, 35.4, 51, 100)
    # ... more breakpoints
```

---

## 🔗 Filecoin Integration

### Upload Flow (Synapse SDK)

```typescript
import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import { CID } from 'multiformats/cid';

// 1. Create Synapse instance (needs signer)
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const synapse = await Synapse.create({ signer: wallet });

// 2. Upload data (returns piece CID)
const experimentBytes = new TextEncoder().encode(JSON.stringify(experiment));
const uploadResult = await synapse.storage.upload(experimentBytes);

// 3. Decode piece CID (important!)
const cidBytes = uploadResult.pieceCid['/'];  // IPLD format
const cidObj = CID.decode(cidBytes);
const cid = cidObj.toString();  // "bafkzcib..."

// 4. Store CID on-chain
await registry.registerExperiment(cid, dataHash, metricsHash, difficulty, initialRV);
```

**Key Gotcha**: `uploadResult.pieceCid` is NOT a string - it's an IPLD CID object with bytes at `pieceCid['/']`. Must decode using `multiformats/cid`.

### Download Flow (NEW!)

```typescript
import { downloadFromFilecoin } from '@/lib/filecoin-storage';

// Server-side only (needs ethers provider)
const experiment = await downloadFromFilecoin(cid);

// Cached automatically (Map<cid, data>)
// Fallback to IPFS gateways if Synapse fails
```

**Implementation Notes**:
- Uses dummy wallet for downloads (no private key needed)
- 30-second timeout to prevent hanging
- Caches results to avoid re-downloading
- Batch download support for efficiency

---

## 🎨 Dashboard Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **State**: React hooks (useState, useEffect)
- **Data**: ethers.js v6 + JSON-RPC
- **Deployment**: Vercel-ready

### Data Flow

```
Server (RSC)                Client (Browser)
     │                            │
     ├─fetchUnifiedExperiments────►│
     │  (on-chain data)            │
     │                            │
     ├─────JSON props─────────────►│
     │                            │
     │                       ┌────▼────┐
     │                       │  React  │
     │                       │Component│
     │                       └────┬────┘
     │                            │
     │                       setInterval(30s)
     │                            │
     │◄────/api/experiments───────┤
     │  (auto-refresh)            │
     │                            │
     └───JSON response────────────►│
                              Update UI
```

### Type Detection Logic

```typescript
function detectExperimentType(difficulty: number, id: number): 'HPLC' | 'AIR_QUALITY' | 'NMR' {
  if (difficulty >= 25) return 'NMR';       // 25-70
  if (difficulty >= 15) return 'AIR_QUALITY';  // 15-24
  return 'HPLC';                            // 0-14
}
```

**Why difficulty-based?** Experiment type isn't stored on-chain (saves gas). We infer type from difficulty score pattern.

### Color Scheme

- **HPLC**: Orange (#f97316) - Chemistry/organic compounds
- **Air Quality**: Green (#22c55e) - Environmental/fresh air
- **NMR**: Blue (#3b82f6) - Spectroscopy/quantum mechanics
- **Addresses**: Purple (#a855f7) - Blockchain/crypto

---

## 🔨 Build & Deploy

### Prerequisites

```bash
# Install Foundry (smart contracts)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Node.js 20+ (dashboard)
nvm install 20
nvm use 20

# Install pnpm (package manager)
npm install -g pnpm
```

### Smart Contract Deployment

```bash
cd contracts

# Build contracts
forge build

# Run tests
forge test -vvv

# Deploy to Filecoin Calibration
forge script script/DeployPoX.s.sol \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --broadcast \
  --private-key $PRIVATE_KEY

# Verify contracts (if supported)
forge verify-contract <ADDRESS> PoXRegistry \
  --chain-id 314159 \
  --etherscan-api-key $FILSCAN_API_KEY
```

### Dashboard Deployment

```bash
cd blockchain-status-plotter-new

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with contract addresses

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### NMR Experiment Generation

```bash
cd packages/nmr-experiments

# Install dependencies
npm install

# Generate single experiment
npm run generate 1000 moderate

# Batch generate 10 experiments
npm run batch 10

# Upload to Filecoin
cd ../../rpi5
node upload-nmr.mjs ../packages/nmr-experiments/output/NMR-001000.json
```

---

## 🧪 Testing Guide

### Contract Tests

```solidity
// test/PoXRegistry.t.sol
function testRegisterExperiment() public {
    string memory cid = "bafkzcib...";
    bytes32 dataHash = keccak256("test");
    bytes32 metricsHash = keccak256("metrics");
    uint256 difficulty = 10;
    int256 initialRV = 2302585; // ln(11) * 10^6
    
    uint256 id = registry.registerExperiment(
        cid, dataHash, metricsHash, difficulty, initialRV
    );
    
    assertEq(id, 0); // First experiment
    assertEq(registry.totalExperiments(), 1);
}
```

### Integration Tests

```bash
# 1. Generate experiment
cd packages/experiments
npx tsx src/pox.ts

# 2. Upload to testnet
cd ../../rpi5
node upload-air-quality.mjs < ../packages/experiments/output/experiment.json

# 3. Verify on dashboard
open http://localhost:3000/experiments

# 4. Check transaction on explorer
open https://calibration.filscan.io/tx/<TX_HASH>
```

### Determinism Tests

```typescript
// Verify same seed produces same hash
test('deterministic experiment generation', () => {
  const exp1 = generateHPLCExperiment(seed: 42);
  const exp2 = generateHPLCExperiment(seed: 42);
  
  const hash1 = hashJson(exp1);
  const hash2 = hashJson(exp2);
  
  expect(hash1).toBe(hash2); // Must be identical
});
```

---

## 🐛 Common Issues & Solutions

### Issue: "No matching version for @filoz/synapse-sdk"

**Solution**: Use `latest` instead of specific version
```json
"@filoz/synapse-sdk": "latest"
```

### Issue: "CID is not a string"

**Problem**: `uploadResult.pieceCid` is IPLD format, not string

**Solution**:
```typescript
import { CID } from 'multiformats/cid';

const cidBytes = uploadResult.pieceCid['/'];
const cidObj = CID.decode(cidBytes);
const cid = cidObj.toString();
```

### Issue: "Cannot find module 'multiformats/cid'"

**Solution**: Install missing dependency
```bash
npm install multiformats
```

### Issue: Synapse download times out

**Solution**: Increase timeout and add retry logic
```typescript
const synapse = await Synapse.create({ 
  signer: wallet,
  timeout: 60000, // 60s instead of 30s
});
```

### Issue: Dashboard shows wrong experiment type

**Problem**: Difficulty thresholds misconfigured

**Solution**: Check `detectExperimentType()` in `experiment-service.ts`:
```typescript
if (difficulty >= 25) return 'NMR';
if (difficulty >= 15) return 'AIR_QUALITY';
return 'HPLC';
```

---

## 📈 Performance Optimization

### Gas Optimization

**Current costs** (Filecoin Calibration):
- registerExperiment: ~150k gas
- creditReputation: ~45k gas
- openChallenge: ~70k gas

**Optimization strategies**:
1. Store hashes instead of full data (already implemented)
2. Batch experiment registration (future)
3. Use events for off-chain indexing (implemented)

### Dashboard Optimization

**Caching strategy**:
```typescript
// Server-side caching (Next.js)
export const revalidate = 10; // Revalidate every 10s

// Client-side caching (Filecoin downloads)
const dataCache = new Map<string, any>();
```

**Batch fetching**:
```typescript
// Fetch all experiments in parallel
const promises = experimentIds.map(id => fetchExperiment(id));
const results = await Promise.all(promises);
```

### Synapse SDK Optimization

**Batch uploads** (future):
```typescript
const experiments = [exp1, exp2, exp3];
const uploads = await Promise.all(
  experiments.map(exp => synapse.storage.upload(exp))
);
```

---

## 🔐 Security Considerations

### Smart Contract Security

**Reentrancy**: Not vulnerable (no external calls before state updates)

**Access Control**: 
- Registry: Public registration (anyone can submit)
- Reputation: Only authorized contracts
- ChallengeManager: Owner-gated resolution (roadmap: DAO)

**Hash Collisions**: Use keccak256 (2^256 collision resistance)

**Integer Overflow**: Solidity 0.8+ has built-in overflow checks

### Off-Chain Security

**Private Key Management**:
- **NEVER** commit `.env` to git
- Use hardware wallets for mainnet
- Rotate keys regularly

**Data Integrity**:
- Deterministic hashing (sorted JSON keys)
- CID verification on download
- Hash comparison for fraud proofs

**API Rate Limiting**:
- Dashboard API: 100 requests/minute
- Filecoin RPC: Respect provider limits
- Synapse SDK: Built-in rate limiting

---

## 🚀 Deployment Checklist

### Testnet Deployment

- [ ] Deploy contracts to Filecoin Calibration
- [ ] Verify contract source code
- [ ] Fund deployer wallet with test tFIL
- [ ] Test registration flow end-to-end
- [ ] Deploy dashboard to Vercel staging
- [ ] Test auto-refresh functionality
- [ ] Upload 10+ test experiments
- [ ] Verify fraud proof flow (manual)

### Mainnet Deployment (Future)

- [ ] Security audit (3rd party)
- [ ] Upgrade to DAO governance
- [ ] Deploy with multi-sig wallet
- [ ] Set up monitoring (Tenderly)
- [ ] Configure alerts (PagerDuty)
- [ ] Stress test with 1000+ experiments
- [ ] Launch beta with 5 partner labs
- [ ] Public mainnet launch

---

## 🤝 Contributing

### Code Style

**Solidity**:
- Use latest stable (0.8.21+)
- Follow OpenZeppelin patterns
- Comment complex logic
- Write tests for all functions

**TypeScript**:
- Strict mode enabled
- No `any` types (use `unknown`)
- Prefer `const` over `let`
- Use async/await (not callbacks)

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-gcms-support

# Make changes
git add .
git commit -m "feat: add GC-MS experiment type"

# Push and create PR
git push origin feature/add-gcms-support
```

### PR Requirements

- [ ] Tests pass (`forge test`, `npm test`)
- [ ] Linter passes (`forge fmt`, `npm run lint`)
- [ ] Documentation updated
- [ ] No breaking changes (or flagged)

---

## 📚 Further Reading

- **Filecoin Docs**: https://docs.filecoin.io
- **Synapse SDK**: https://github.com/filoz (check for official docs)
- **ethers.js v6**: https://docs.ethers.org/v6/
- **Next.js App Router**: https://nextjs.org/docs
- **Solidity Best Practices**: https://consensys.github.io/smart-contract-best-practices/

---

## 💬 Support

**Issues**: Open GitHub issue with:
- Environment (OS, Node version, Foundry version)
- Reproduction steps
- Error logs
- Expected vs. actual behavior

**Questions**: Tag maintainers in Discord/Telegram

**Feature Requests**: Use GitHub Discussions

---

**Fortis est Veritas** ⚡

*Built for hackers, by hackers.*
