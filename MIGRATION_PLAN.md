# Migration Plan: Web3 Integration → New Dashboard

## Overview

Merge our working Web3 integration from `blockchain-status-plotter` into the improved `blockchain-status-plotter-new` version.

## What We're Preserving

From the **old version** (`blockchain-status-plotter`):
1. ✅ **Web3 Service** (`lib/web3-service.ts`) - ethers.js integration
2. ✅ **Test Page** (`app/test-web3/page.tsx`) - Experiment detail view
3. ✅ **Updated Data Service** - Real blockchain data fetching
4. ✅ **ethers.js dependency** - Added to package.json

## What's New in `blockchain-status-plotter-new`

Enhanced features we're gaining:
1. 🎨 **Better HPLC UI** - Upload buttons, analysis tools, visual feedback
2. 📊 **Analysis Functions** - Peak Integration, Purity Check, Baseline Correction
3. 🔒 **Visibility Controls** - Public/private experiment toggle
4. 📤 **Upload Workflow** - `uploadHplcDataToChain()` function
5. 🎯 **Enhanced Types** - `ExperimentStatus`, `AnalysisType`, `AnalysisResult`

## Migration Steps

### Step 1: Install Dependencies ✅
```bash
cd blockchain-status-plotter-new
npm install ethers
```

### Step 2: Copy Web3 Service ✅
Copy `web3-service.ts` to new version:
```bash
cp ../blockchain-status-plotter/lib/web3-service.ts lib/
```

### Step 3: Update Data Service ⚙️
Merge our Web3 integration into the new `data-service.ts`:
- Keep new functions: `uploadHplcDataToChain()`, `runHplcAnalysis()`
- Replace blockchain functions with our real implementations
- Preserve all new types and interfaces

### Step 4: Copy Test Page ✅
```bash
mkdir -p app/test-web3
cp ../blockchain-status-plotter/app/test-web3/page.tsx app/test-web3/
```

### Step 5: Enhanced Upload Function 🎯
Update `uploadHplcDataToChain()` to:
- Actually call Synapse SDK (or use mock CID for now)
- Register on PoXRegistry contract with real transaction
- Return actual CID and transaction hash

### Step 6: Test & Verify ✅
- Start dev server
- Verify blockchain monitor shows real experiments
- Test upload workflow
- Verify analysis tools still work

## File-by-File Changes

### `lib/data-service.ts`

**Changes Needed**:
```typescript
// REPLACE lines 16-28 with our implementation:
import { fetchLatestExperiments, fetchTotalExperiments } from "./web3-service"

export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  try {
    const experiments = await fetchLatestExperiments(15)
    if (experiments.length === 0) {
      return generateTransactions(15)
    }
    return experiments.map((exp) => ({
      id: `0x${exp.dataHash.slice(2, 10)}`,
      network: "Filecoin Cloud" as const,
      type: "Contract Call" as const,
      status: "Confirmed" as const,
      confirmations: 6,
      nodeId: exp.cid.slice(0, 16),
      timestamp: new Date(exp.submittedAt * 1000).toLocaleTimeString(),
      gasFee: "0.0001",
    }))
  } catch (error) {
    console.error('Failed to fetch blockchain transactions:', error)
    return generateTransactions(15)
  }
}

export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  try {
    const totalExperiments = await fetchTotalExperiments()
    return {
      avgGas: "0.0001",
      pending: 0,
      blockHeight: `#${totalExperiments}`,
    }
  } catch (error) {
    console.error('Failed to fetch blockchain stats:', error)
    return {
      avgGas: "0.0042",
      pending: 142,
      blockHeight: "#0",
    }
  }
}

// ENHANCE uploadHplcDataToChain (lines 48-64):
export async function uploadHplcDataToChain(
  sampleId: string,
  visibility: "public" | "private" = "private",
): Promise<{ cid: string; hash: string }> {
  // TODO: Real Synapse upload
  // const { cid } = await synapseClient.upload(hplcData)
  
  // For now, use mock CID
  const mockCID = "bafyreihsk3vwo5ydsvxw7nz7dgwo4l4k5j9xjfhvlvfqhukpzh5ozcgfsy"
  
  // TODO: Get actual HPLC data, compute hashes, register on PoXRegistry
  // This would call the registration script logic
  
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  return {
    cid: mockCID,
    hash: "0x7f9b...3a12",
  }
}

// KEEP all analysis functions (runHplcAnalysis) unchanged
```

### `lib/web3-service.ts`
**Action**: Copy as-is (already done in old version)

### `app/test-web3/page.tsx`
**Action**: Copy as-is (already done in old version)

### `package.json`
**Action**: Add ethers.js:
```json
"dependencies": {
  "ethers": "^6.13.0",
  // ... existing deps
}
```

## Testing Checklist

After migration:

- [ ] `npm run dev` starts successfully
- [ ] Main dashboard (`/`) shows 8 registered experiments from blockchain
- [ ] Block height shows `#8`
- [ ] Test page (`/test-web3`) displays all experiments with metadata
- [ ] Upload button visible on HPLC analyzer
- [ ] Analysis tools (Peak Integration, etc.) work
- [ ] No console errors

## Commands

```bash
# Navigate to new version
cd /Users/crischimiadao/ETHGlobalBuenosAires/blockchain-status-plotter-new

# Install dependencies
npm install ethers

# Copy Web3 files
cp ../blockchain-status-plotter/lib/web3-service.ts lib/
mkdir -p app/test-web3
cp ../blockchain-status-plotter/app/test-web3/page.tsx app/test-web3/

# Test
npm run dev
```

## Migration Script

I'll create an automated migration script that:
1. Copies Web3 service
2. Copies test page
3. Updates data-service.ts with our blockchain integration
4. Installs ethers.js
5. Verifies all files are in place

## Rollback Plan

If migration fails:
1. Keep `blockchain-status-plotter` (old working version)
2. Keep `blockchain-status-plotter-new` (new version)
3. Both directories remain independent
4. Can manually cherry-pick changes

## Success Criteria

✅ All Web3 integration works in new dashboard  
✅ Enhanced UI features (upload, analysis) preserved  
✅ 8 test experiments display correctly  
✅ Test page accessible at `/test-web3`  
✅ No regression in existing functionality  

## Next Step

Execute automated migration → Test → Verify → Deploy
