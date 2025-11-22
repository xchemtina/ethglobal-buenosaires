# NEXT_STEPS — Immediate Implementation Tasks

**Target**: Working demo for ETH Global Buenos Aires

**Current Time**: Nov 22, 2025 ~9:50 PM  
**Time Available**: Depends on hackathon deadline

---

## Critical Path (Sequential - Must Do First)

### Task 1: Deploy Smart Contracts to Filecoin Cloud ⚡ BLOCKING

**Why First**: Everything else depends on having live contract addresses

**Steps**:
```bash
# 1. Get Filecoin testnet FIL
# Visit: https://faucet.calibration.fildev.network/

# 2. Set environment variables
export FILECOIN_CLOUD_RPC="https://api.calibration.node.glif.io/rpc/v1"
export PRIVATE_KEY="0x..."  # From MetaMask

# 3. Test connection
cast block-number --rpc-url $FILECOIN_CLOUD_RPC

# 4. Deploy Reputation (no dependencies)
forge create contracts/Reputation.sol:Reputation \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY

# Save output: REPUTATION_ADDRESS=0x...

# 5. Deploy Registry (needs Reputation address)
forge create contracts/PoXRegistry.sol:PoXRegistry \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args $REPUTATION_ADDRESS

# Save output: REGISTRY_ADDRESS=0x...

# 6. Deploy ChallengeManager (needs both addresses)
forge create contracts/ChallengeManager.sol:ChallengeManager \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args $REGISTRY_ADDRESS $REPUTATION_ADDRESS

# Save output: CHALLENGE_MANAGER_ADDRESS=0x...

# 7. Authorize contracts to modify reputation
cast send $REPUTATION_ADDRESS \
  "setAuthorized(address,address)" \
  $REGISTRY_ADDRESS $CHALLENGE_MANAGER_ADDRESS \
  --rpc-url $FILECOIN_CLOUD_RPC \
  --private-key $PRIVATE_KEY
```

**Verification**:
```bash
# Check contract is deployed
cast code $REGISTRY_ADDRESS --rpc-url $FILECOIN_CLOUD_RPC

# Query total experiments (should be 0)
cast call $REGISTRY_ADDRESS "totalExperiments()" --rpc-url $FILECOIN_CLOUD_RPC
```

**Save Addresses** to:
- `.env` file in root
- `blockchain-status-plotter/.env.local`
- Update WARP.md with deployed addresses

**Time Estimate**: 30 minutes (if faucet works)

---

### Task 2: Generate HPLC Trace Data 📊

**Why Second**: Need data to test upload flow

**Steps**:
```bash
cd HPLC_traces

# Generate 10-20 traces with different parameters
python GenerateTraces.py

# Output should be JSON files like:
# trace-001.json
# trace-002.json
# ...
# trace-020.json
```

**Modify `GenerateTraces.py` to**:
1. Save output as JSON (not just plot)
2. Include metadata:
   ```python
   output = {
       "sampleId": f"HPLC-{i:03d}",
       "method": "Reverse Phase C18",
       "compounds": ["caffeine", "theobromine"],  # example
       "solvent": "acetonitrile/water 70:30",
       "points": [
           {"time": t[i], "signal": y[i]}
           for i in range(len(t))
       ],
       "metrics": {
           "peakCount": 4,  # count peaks
           "baselineNoise": calculate_noise(y),
           "peakPurity": "98.4%"  # placeholder
       }
   }
   ```

**Time Estimate**: 1 hour (script modification + generation)

---

### Task 3: Build Upload Script to Filecoin 🚀 HIGH PRIORITY

**Why Third**: Need to get CIDs for on-chain registration

**Create**: `scripts/upload-experiments.ts`

```typescript
import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

const FILECOIN_RPC = process.env.FILECOIN_CLOUD_RPC!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS!;

// ABI - just registerExperiment function
const REGISTRY_ABI = [
  "function registerExperiment(string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV) returns (uint256)"
];

async function uploadExperiment(filePath: string) {
  console.log(`\n=== Processing ${filePath} ===`);
  
  // 1. Read trace
  const trace = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`Sample: ${trace.sampleId}`);
  
  // 2. Upload to Synapse
  const provider = new ethers.JsonRpcProvider(FILECOIN_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  try {
    const synapse = await Synapse.create({ provider: wallet });
    const cid = await synapse.upload(trace);
    console.log(`✓ Uploaded to Filecoin: ${cid}`);
    
    // 3. Compute hashes
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(trace.points)));
    const metricsHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(trace.metrics)));
    
    // 4. Register on-chain
    const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, wallet);
    
    const difficulty = trace.metrics.peakCount || 3;  // Use peak count as difficulty
    const rvInitial = Math.floor(Math.log(1 + difficulty) * 1e6);  // Scale RV
    
    const tx = await registry.registerExperiment(
      cid,
      dataHash,
      metricsHash,
      difficulty,
      rvInitial
    );
    
    console.log(`✓ Registered on-chain: tx ${tx.hash}`);
    await tx.wait();
    console.log(`✓ Confirmed!`);
    
    return { cid, txHash: tx.hash };
    
  } catch (error) {
    console.error(`✗ Error:`, error.message);
    return null;
  }
}

async function main() {
  const tracesDir = path.join(__dirname, '../HPLC_traces');
  const files = fs.readdirSync(tracesDir)
    .filter(f => f.endsWith('.json'));
  
  console.log(`Found ${files.length} trace files`);
  
  const results = [];
  for (const file of files) {
    const result = await uploadExperiment(path.join(tracesDir, file));
    if (result) results.push(result);
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Uploaded: ${results.length}/${files.length}`);
  console.log(`CIDs:`, results.map(r => r.cid));
}

main().catch(console.error);
```

**Setup**:
```bash
cd scripts
npm init -y
npm install @filoz/synapse-sdk ethers tsx
```

**Run**:
```bash
npx tsx scripts/upload-experiments.ts
```

**Time Estimate**: 2 hours (script + testing + uploads)

---

## Parallel Tasks (Can Do While Waiting)

### Task 4: Setup Dashboard to Run Locally 🖥️

**Current Status**: Dashboard only on v0.dev, needs to run on `localhost`

**Steps**:
```bash
cd blockchain-status-plotter

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_FILECOIN_RPC=https://api.calibration.node.glif.io/rpc/v1
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...  # From Task 1
NEXT_PUBLIC_REPUTATION_ADDRESS=0x...
EOF

# Test dev server
npm run dev
# Should open http://localhost:3000
```

**Verify**:
- Dashboard loads without errors
- Mock data displays correctly
- UI is responsive

**Time Estimate**: 30 minutes

---

### Task 5: Add Web3 to Dashboard 🌐 HIGH PRIORITY

**Files to Create/Modify**:

#### `blockchain-status-plotter/lib/web3.ts` (NEW)
```typescript
import { ethers } from 'ethers';

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask");
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  
  return { provider, signer, address };
}

export function getReadProvider() {
  const rpc = process.env.NEXT_PUBLIC_FILECOIN_RPC!;
  return new ethers.JsonRpcProvider(rpc);
}
```

#### `blockchain-status-plotter/lib/contracts.ts` (NEW)
```typescript
export const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS!;

export const REGISTRY_ABI = [
  "function totalExperiments() view returns (uint256)",
  "function getExperiment(uint256) view returns (uint256 id, address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)",
  "event ExperimentRegistered(uint256 indexed id, address indexed submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint64 submittedAt)"
];
```

#### Update `blockchain-status-plotter/lib/data-service.ts`
```typescript
import { ethers } from 'ethers';
import { getReadProvider } from './web3';
import { REGISTRY_ADDRESS, REGISTRY_ABI } from './contracts';

export async function fetchBlockchainTransactions() {
  const provider = getReadProvider();
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  
  // Get recent experiments
  const filter = registry.filters.ExperimentRegistered();
  const events = await registry.queryFilter(filter, -100);  // Last 100 blocks
  
  return events.map(e => ({
    id: e.args.id.toString(),
    network: "Filecoin Cloud",
    type: "Experiment Upload",
    status: "Confirmed",
    confirmations: 1,
    nodeId: e.args.submitter.slice(0, 10) + "...",
    timestamp: new Date(Number(e.args.submittedAt) * 1000).toISOString(),
    gasFee: "0.001 FIL"
  }));
}

export async function fetchBlockchainStats() {
  const provider = getReadProvider();
  const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
  
  const total = await registry.totalExperiments();
  const blockNumber = await provider.getBlockNumber();
  
  return {
    avgGas: "0.001",
    pending: 0,
    blockHeight: `#${blockNumber.toLocaleString()}`
  };
}
```

**Install Dependencies**:
```bash
cd blockchain-status-plotter
npm install ethers @filoz/synapse-sdk
```

**Time Estimate**: 2 hours

---

### Task 6: Display Real HPLC Traces from Synapse 📈

**Goal**: When user clicks experiment, download trace from Filecoin and render

**Update** `data-service.ts`:
```typescript
import { Synapse } from '@filoz/synapse-sdk';
import { connectWallet } from './web3';

export async function fetchHplcData(cid: string): Promise<HplcData> {
  try {
    const { provider } = await connectWallet();
    const synapse = await Synapse.create({ provider });
    
    // Download from Filecoin
    const trace = await synapse.download(cid);
    
    return {
      sampleId: trace.sampleId,
      method: trace.method,
      dataPoints: trace.points.map(p => ({
        time: p.time,
        experimental: p.signal,
        theoretical: p.signal * 0.98  // Mock theoretical
      })),
      metrics: trace.metrics
    };
  } catch (error) {
    console.error("Error fetching HPLC data:", error);
    // Fall back to mock data
    return generateHplcData(150);
  }
}
```

**Time Estimate**: 1 hour

---

### Task 7: Deploy The Graph Subgraph 📊 MEDIUM PRIORITY

**Steps**:

1. **Complete `subgraph/schema.graphql`**:
```graphql
type Experiment @entity {
  id: ID!
  experimentId: BigInt!
  submitter: Bytes!
  cid: String!
  dataHash: Bytes!
  metricsHash: Bytes!
  difficulty: BigInt!
  initialRV: BigInt!
  submittedAt: BigInt!
  
  # For LLM
  experimentType: String
  sampleId: String
  method: String
  
  challenges: [Challenge!] @derivedFrom(field: "experiment")
}

type Challenge @entity {
  id: ID!
  challengeId: BigInt!
  experiment: Experiment!
  challenger: Bytes!
  computedMetricsHash: Bytes!
  resolved: Boolean!
  experimentValid: Boolean
}
```

2. **Create `subgraph/src/mapping.ts`**:
```typescript
import { ExperimentRegistered } from '../generated/PoXRegistry/PoXRegistry';
import { Experiment } from '../generated/schema';

export function handleExperimentRegistered(event: ExperimentRegistered): void {
  let experiment = new Experiment(event.params.id.toString());
  
  experiment.experimentId = event.params.id;
  experiment.submitter = event.params.submitter;
  experiment.cid = event.params.cid;
  experiment.dataHash = event.params.dataHash;
  experiment.metricsHash = event.params.metricsHash;
  experiment.difficulty = event.params.difficulty;
  experiment.initialRV = event.params.initialRV;
  experiment.submittedAt = event.params.submittedAt;
  
  // Parse CID to extract metadata (if embedded)
  // experiment.experimentType = "HPLC";  // Default
  
  experiment.save();
}
```

3. **Update `subgraph/subgraph.yaml`**:
```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: PoXRegistry
    network: filecoin-calibration
    source:
      address: "0x..."  # REGISTRY_ADDRESS from Task 1
      abi: PoXRegistry
      startBlock: 12345  # Block number when contract was deployed
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Experiment
      abis:
        - name: PoXRegistry
          file: ../contracts/PoXRegistry.sol
      eventHandlers:
        - event: ExperimentRegistered(indexed uint256,indexed address,string,bytes32,bytes32,uint256,int256,uint64)
          handler: handleExperimentRegistered
      file: ./src/mapping.ts
```

4. **Deploy**:
```bash
cd subgraph
graph codegen
graph build
graph auth --studio <YOUR_DEPLOY_KEY>
graph deploy --studio pox-filecoin
```

**Time Estimate**: 2-3 hours (includes learning Graph docs if needed)

---

## Testing & Verification Checklist

After completing tasks, verify end-to-end:

- [ ] Contracts deployed and verified on Filecoin explorer
- [ ] 10+ HPLC traces generated as JSON
- [ ] All traces uploaded to Filecoin (have CIDs)
- [ ] All traces registered on-chain (have tx hashes)
- [ ] Dashboard runs locally on `localhost:3000`
- [ ] Dashboard connects to MetaMask
- [ ] Dashboard shows real experiments from contract
- [ ] Clicking experiment downloads trace from Filecoin
- [ ] HPLC chart renders actual trace data
- [ ] Subgraph indexes contract events (if deployed)

---

## Demo Flow (What to Show Judges)

1. **Show Dashboard**: Live at `localhost:3000` or deployed on Vercel
2. **Connect Wallet**: MetaMask to Filecoin Calibration network
3. **View Experiments**: List shows real on-chain experiments
4. **Click Experiment**: Trace downloads from Filecoin, renders chart
5. **Show Python Script**: `GenerateTraces.py` that created data
6. **Show Contract on Explorer**: Filecoin block explorer showing experiments
7. **Show Subgraph** (if deployed): GraphQL query in playground
8. **(Bonus) Upload New Experiment**: Run `upload-experiments.ts` live

---

## If Time Runs Out

### Minimum Viable Demo (2-3 hours)

1. Deploy contracts (Task 1) ✅
2. Generate 5 traces (Task 2) ✅
3. Manual upload ONE trace to show concept ✅
4. Dashboard shows that one experiment (Tasks 4 + 5 partial) ✅

### What Can Be Mocked

- **Subgraph**: Dashboard can query contract directly (slower but works)
- **Multiple traces**: 1-2 experiments is enough to demo concept
- **Challenge flow**: Describe verbally, don't implement live
- **Payment incentive**: Describe in pitch, don't modify contract

### What CANNOT Be Mocked

- **Contracts on Filecoin**: Must be deployed, this is the core narrative
- **Synapse upload**: Must show real CID from Filecoin
- **Dashboard displaying trace**: Must render actual data, not mock

---

## Environment Setup Quick Reference

```bash
# Root .env
FILECOIN_CLOUD_RPC=https://api.calibration.node.glif.io/rpc/v1
PRIVATE_KEY=0x...
REGISTRY_ADDRESS=0x...
REPUTATION_ADDRESS=0x...
CHALLENGE_MANAGER_ADDRESS=0x...

# Dashboard .env.local
NEXT_PUBLIC_FILECOIN_RPC=https://api.calibration.node.glif.io/rpc/v1
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_REPUTATION_ADDRESS=0x...
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/query/.../pox-filecoin/v1
```

---

## Getting Help

- **Filecoin RPC issues**: Check https://docs.filecoin.io/networks/calibration
- **Synapse SDK**: https://github.com/FilOzone/synapse-sdk
- **The Graph**: https://thegraph.com/docs/en/
- **Foundry**: https://book.getfoundry.sh/

---

**Start with Task 1.** Everything else builds on having deployed contracts.

*Fortis est Veritas. Let's ship it.*
