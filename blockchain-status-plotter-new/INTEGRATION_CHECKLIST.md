# Integration Checklist — Connecting Dashboard to Blockchain

This checklist coordinates work across three parallel tracks: **Dashboard**, **The Graph**, and **Contracts**.

## Prerequisites (From Other Instances)

### From Contracts Instance 📝
Once contracts are deployed, you need:

- [ ] `REGISTRY_ADDRESS` (PoXRegistry.sol)
- [ ] `REPUTATION_ADDRESS` (Reputation.sol)
- [ ] `CHALLENGE_MANAGER_ADDRESS` (ChallengeManager.sol)
- [ ] Deployed network (Arbitrum Sepolia / Filecoin Calibration)
- [ ] RPC URL for that network

### From The Graph Instance 📝
Once subgraph is deployed, you need:

- [ ] `SUBGRAPH_URL` (from Graph Studio)
- [ ] Confirmation that subgraph is syncing
- [ ] Example query result to verify schema

---

## Phase 1: Local Testing (When Contracts Are Ready)

### Step 1: Configure Environment

Create `.env.local` in `blockchain-status-plotter-new/`:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with real values
NEXT_PUBLIC_RPC_URL=<from contracts instance>
NEXT_PUBLIC_CHAIN_ID=<421614 or 314159>
NEXT_PUBLIC_REGISTRY_ADDRESS=<from contracts instance>
NEXT_PUBLIC_REPUTATION_ADDRESS=<from contracts instance>
NEXT_PUBLIC_SUBGRAPH_URL=<from graph instance>
```

### Step 2: Install Dependencies

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
pnpm install
```

This will install the new dependencies:
- `@apollo/client` (for GraphQL)
- `graphql` (peer dependency)
- `ethers` (already installed)

### Step 3: Test GraphQL Connection

```bash
# Test subgraph query
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ experiments(first: 1) { id experimentId submitter } }"}' \
  $NEXT_PUBLIC_SUBGRAPH_URL
```

Should return experiments data or empty array `[]`.

### Step 4: Test Contract Connection

Add test page at `app/test-web3/page.tsx`:

```typescript
import { isWeb3Configured, fetchWeb3DashboardData } from '@/lib/web3-integration'

export default async function TestWeb3() {
  const isConfigured = isWeb3Configured()
  let data = null
  
  if (isConfigured) {
    data = await fetchWeb3DashboardData()
  }
  
  return (
    <div className="p-8">
      <h1>Web3 Integration Test</h1>
      <p>Configured: {isConfigured ? 'YES' : 'NO'}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

Run dev server:
```bash
pnpm dev
# Visit http://localhost:3000/test-web3
```

---

## Phase 2: Update Data Service

### Current State
`lib/data-service.ts` uses mock data.

### Updated Implementation

Edit `lib/data-service.ts`:

```typescript
import { isWeb3Configured, fetchWeb3DashboardData, fetchExperimentsFromSubgraph } from './web3-integration'
import { generateTransactions, generateHplcData, generateVocData } from './mock-data'

export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  // Try to fetch real data first
  if (isWeb3Configured()) {
    const { transactions } = await fetchWeb3DashboardData()
    if (transactions.length > 0) {
      return transactions
    }
  }
  
  // Fallback to mock data
  return generateTransactions(15)
}

export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  // TODO: Calculate from real data
  return {
    avgGas: "0.0042",
    pending: 142,
    blockHeight: "#892,120",
  }
}

export async function fetchHplcData(): Promise<HplcData> {
  // Try to fetch real experiment
  if (isWeb3Configured()) {
    const experiments = await fetchExperimentsFromSubgraph(1)
    if (experiments.length > 0) {
      const exp = experiments[0]
      // TODO: Fetch actual trace from Synapse using exp.cid
      // For now, return metadata with mock trace
      return {
        sampleId: exp.sampleId,
        method: exp.method,
        dataPoints: generateHplcData(150), // Mock until Synapse works
        metrics: {
          peakPurity: exp.peakPurity ? `${exp.peakPurity * 100}%` : "N/A",
          retentionShift: "N/A",
          areaPercent: "N/A",
          status: "ON-CHAIN"
        }
      }
    }
  }
  
  // Fallback to mock data
  return {
    sampleId: "#HPLC-8892-X",
    method: "Reverse Phase C18",
    dataPoints: generateHplcData(150),
    metrics: {
      peakPurity: "98.4%",
      retentionShift: "+0.05m",
      areaPercent: "99.1%",
      status: "PASS",
    },
  }
}
```

---

## Phase 3: Deploy to Vercel

### Option A: Deploy Without Real Data (Mock Mode)

If contracts/subgraph aren't ready yet:

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
vercel --prod
```

Dashboard will use mock data, but infrastructure is ready for real data.

### Option B: Deploy With Real Data

Once contracts and subgraph are live:

1. **Add environment variables to Vercel:**
   ```bash
   vercel env add NEXT_PUBLIC_RPC_URL production
   vercel env add NEXT_PUBLIC_REGISTRY_ADDRESS production
   vercel env add NEXT_PUBLIC_REPUTATION_ADDRESS production
   vercel env add NEXT_PUBLIC_SUBGRAPH_URL production
   ```

2. **Or via Vercel Dashboard:**
   - Go to project → Settings → Environment Variables
   - Add all variables from `.env.local`

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

   Or push to GitHub (auto-deploys if linked).

---

## Phase 4: Verify Integration

### Checklist

Visit deployed dashboard and verify:

- [ ] Page loads without errors
- [ ] Console shows "Web3 Configured: true" (check F12)
- [ ] Transaction feed shows real experiment submissions
- [ ] HPLC panel shows data from on-chain experiments
- [ ] Sample IDs match registered experiments
- [ ] Blockchain stats reflect real network

### Debug Mode

Add to dashboard header:

```typescript
{isWeb3Configured() ? (
  <span className="text-green-500">● WEB3 LIVE</span>
) : (
  <span className="text-yellow-500">● MOCK DATA</span>
)}
```

---

## Phase 5: Synapse Integration (Future)

When Synapse SDK is ready:

1. Install Synapse SDK:
   ```bash
   pnpm add @filoz/synapse-sdk
   ```

2. Update `web3-integration.ts`:
   ```typescript
   import { Synapse } from '@filoz/synapse-sdk'
   
   export async function fetchTraceFromSynapse(cid: string) {
     const synapse = await Synapse.create({ provider: getProvider() })
     const data = await synapse.download(cid)
     return data
   }
   ```

3. Use in data service:
   ```typescript
   const traceData = await fetchTraceFromSynapse(exp.cid)
   const dataPoints = loadHplcTrace(traceData).dataPoints
   ```

---

## Coordination Protocol

### When Contracts Are Deployed

Contracts instance should provide:
```json
{
  "network": "arbitrum-sepolia",
  "chainId": 421614,
  "rpcUrl": "https://sepolia.arbitrum.io/rpc",
  "contracts": {
    "PoXRegistry": "0x...",
    "Reputation": "0x...",
    "ChallengeManager": "0x..."
  },
  "blockExplorer": "https://sepolia.arbiscan.io"
}
```

### When Subgraph Is Deployed

Graph instance should provide:
```json
{
  "subgraphUrl": "https://api.studio.thegraph.com/query/...",
  "status": "synced",
  "currentBlock": 12345678,
  "exampleQuery": "{ experiments(first: 1) { id } }"
}
```

### Dashboard Updates

Once received:
1. Update `.env.local` with values
2. Test locally: `pnpm dev`
3. If working: `git commit && git push`
4. Vercel auto-deploys (or run `vercel --prod`)

---

## Success Criteria

Dashboard is fully integrated when:

1. ✅ `isWeb3Configured()` returns `true`
2. ✅ Transaction feed shows real experiments from subgraph
3. ✅ HPLC data shows metadata from on-chain experiments
4. ✅ No console errors related to Web3/GraphQL
5. ✅ Can query user reputation (future: with wallet connection)

---

## Troubleshooting

### "GraphQL Error: Failed to fetch"

- Check `NEXT_PUBLIC_SUBGRAPH_URL` is correct
- Verify subgraph is deployed and syncing
- Test query with curl (see Step 3)

### "Contract call failed"

- Check `NEXT_PUBLIC_REGISTRY_ADDRESS` is correct
- Verify contract is deployed on that network
- Check RPC URL is accessible

### "No experiments found"

- Check subgraph has indexed experiments
- Verify contract has experiments registered
- Look at Graph Studio dashboard for sync status

---

## Quick Reference

```bash
# Check if configured
pnpm dev
# Visit /test-web3 page

# Update env vars
vercel env add NEXT_PUBLIC_SUBGRAPH_URL production

# Redeploy
vercel --prod

# Test GraphQL
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ experiments(first: 1) { id } }"}' \
  $NEXT_PUBLIC_SUBGRAPH_URL
```

---

**Status**: Dashboard is READY to receive contract addresses and subgraph URL. Waiting on other instances! 🎯
