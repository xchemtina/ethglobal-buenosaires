# Parallel Development Tracks — Status Update

**Last Updated**: Nov 22, 2025 23:50 UTC

## 🎯 Three-Track Approach

We're building PoX in parallel across three instances:

1. **Dashboard** (THIS INSTANCE) ← YOU ARE HERE
2. **Contracts** (Other Instance)
3. **The Graph** (Other Instance)

---

## ✅ Dashboard Track — COMPLETE & READY

### What's Done

**Infrastructure** ✨
- Apollo Client + GraphQL setup
- Ethers.js contract integration  
- Web3 connection layer (`web3-integration.ts`)
- Subgraph queries (`graphql-client.ts`)
- Environment variable template (`.env.example`)

**Smart Features** 🧠
- `isWeb3Configured()` - checks if contracts/subgraph are live
- Graceful fallback to mock data when not configured
- Transaction feed can pull from subgraph OR mocks
- HPLC data can pull from experiments OR mocks

**Documentation** 📝
- `INTEGRATION_CHECKLIST.md` - coordination guide
- `.env.example` - template for deployment
- Code comments explain what's needed from other instances

**Status** 🚀
- ✅ Code pushed to GitHub
- ✅ Ready to deploy (with mock data)
- ⏳ Waiting for contract addresses + subgraph URL

---

## 📋 What Dashboard Needs From Other Tracks

### From Contracts Instance

When contracts are deployed, provide:

```json
{
  "network": "arbitrum-sepolia",
  "chainId": 421614,
  "rpcUrl": "https://sepolia.arbitrum.io/rpc",
  "contracts": {
    "PoXRegistry": "0x123...",
    "Reputation": "0x456...",
    "ChallengeManager": "0x789..."
  },
  "blockExplorer": "https://sepolia.arbiscan.io"
}
```

**Update**: Create `.env.local` in `blockchain-status-plotter-new/`:
```bash
NEXT_PUBLIC_RPC_URL=https://sepolia.arbitrum.io/rpc
NEXT_PUBLIC_CHAIN_ID=421614
NEXT_PUBLIC_REGISTRY_ADDRESS=0x123...
NEXT_PUBLIC_REPUTATION_ADDRESS=0x456...
```

### From The Graph Instance

When subgraph is deployed, provide:

```json
{
  "subgraphUrl": "https://api.studio.thegraph.com/query/12345/pox-filecoin/v0.0.1",
  "status": "synced",
  "exampleQuery": "{ experiments(first: 1) { id experimentId submitter } }"
}
```

**Update**: Add to `.env.local`:
```bash
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/query/...
```

---

## 🚀 Deployment Options

### Option 1: Deploy NOW (Mock Mode)

Dashboard works standalone with mock data:

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new

# Install dependencies
pnpm install

# Test locally
pnpm dev
# Visit http://localhost:3000

# Deploy to Vercel
vercel --prod
```

**Result**: Live dashboard URL for demo, shows mock data until contracts are ready.

### Option 2: Deploy LATER (After Integration)

Wait for contracts + subgraph, then:

1. Update `.env.local` with real addresses
2. Test locally: `pnpm dev`
3. Deploy: `vercel --prod` (or push to GitHub for auto-deploy)

**Result**: Fully integrated dashboard from day 1.

---

## 📊 Integration Status Matrix

| Component | Status | Blocker |
|-----------|--------|---------|
| Dashboard UI | ✅ Complete | None |
| Mock Data | ✅ Working | None |
| GraphQL Client | ✅ Ready | Needs subgraph URL |
| Contract Integration | ✅ Ready | Needs contract addresses |
| Synapse/CID Fetching | ⏳ Prepared | Needs Synapse SDK |
| Local Testing | ✅ Works | None |
| Vercel Deployment | ✅ Ready | None |

---

## 🔄 Integration Flow (When Ready)

```
User visits dashboard
        ↓
Check isWeb3Configured()
        ↓
    [YES]             [NO]
        ↓               ↓
Query subgraph    Show mock data
        ↓
Get experiments
        ↓
Display in UI
```

**Fallback Strategy**: If any query fails, fall back to mock data (no crashes!).

---

## ⚡ Quick Actions

### When Contracts Are Deployed

```bash
# 1. Update environment
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
cat > .env.local << 'EOF'
NEXT_PUBLIC_RPC_URL=<from contracts instance>
NEXT_PUBLIC_REGISTRY_ADDRESS=<from contracts instance>
NEXT_PUBLIC_REPUTATION_ADDRESS=<from contracts instance>
EOF

# 2. Test
pnpm dev
# Visit http://localhost:3000/test-web3
# Should show "Configured: YES"

# 3. Deploy
vercel --prod
```

### When Subgraph Is Deployed

```bash
# 1. Add to .env.local
echo "NEXT_PUBLIC_SUBGRAPH_URL=<from graph instance>" >> .env.local

# 2. Test GraphQL
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ experiments(first: 1) { id } }"}' \
  $NEXT_PUBLIC_SUBGRAPH_URL

# 3. Restart & deploy
pnpm dev
vercel --prod
```

---

## 🎯 Success Criteria

Dashboard is fully integrated when:

1. ✅ `isWeb3Configured()` returns `true`
2. ✅ Transaction feed shows real experiments
3. ✅ HPLC data shows metadata from on-chain experiments  
4. ✅ No console errors related to Web3/GraphQL
5. ✅ Dashboard displays "WEB3 LIVE" badge (vs "MOCK DATA")

---

## 📁 Key Files

**Integration Layer**:
- `lib/web3-integration.ts` - Main integration logic
- `lib/graphql-client.ts` - Subgraph queries
- `lib/data-service.ts` - Data fetching (mock OR real)

**Configuration**:
- `.env.example` - Template
- `.env.local` - Your actual values (not in git)

**Testing**:
- `app/test-web3/page.tsx` - Web3 connection test page

**Documentation**:
- `INTEGRATION_CHECKLIST.md` - Step-by-step guide
- `PARALLEL_TRACKS_STATUS.md` - This file

---

## 🤝 Coordination Protocol

### Contracts Instance → Dashboard

1. Deploy contracts
2. Share JSON with addresses
3. Dashboard updates `.env.local`
4. Dashboard redeploys

### The Graph Instance → Dashboard

1. Deploy subgraph
2. Share subgraph URL
3. Dashboard updates `.env.local`
4. Dashboard redeploys

### Dashboard → Other Instances

Dashboard can:
- Deploy immediately (mock mode)
- Provide live URL for demos
- Update instantly when contracts/subgraph are ready (2-minute redeploy)

---

## 📞 Current Status

**Dashboard**: ✅ READY — Waiting for:
- Contract addresses from contracts instance
- Subgraph URL from graph instance

**Can Deploy Now**: YES (with mock data)  
**Can Integrate Later**: YES (just update env vars)  
**Blocks Other Work**: NO (fully independent)

---

## 🚀 Recommended Next Step

**Deploy dashboard NOW in mock mode**:

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter-new
pnpm install
pnpm dev  # Test locally first
vercel --prod  # Deploy
```

Get live URL → put in submission → integrate real data later.

**Benefit**: Something live to show judges ASAP, no dependency on other tracks.

---

**GitHub**: https://github.com/xchemtina/ethglobal-buenosaires  
**Branch**: `main` (latest commit: 404b8c4)

*Ready to ship! 🎉*
