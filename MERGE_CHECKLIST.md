# Merge Checklist: blockchain-status-plotter-new → blockchain-status-plotter-current

**Status**: ✅ All files inventoried, ready to merge  
**Date**: 2025-11-23  
**Merge Risk**: LOW

---

## 📋 Complete File Manifest

### Files to Copy (NEW - No conflicts expected)
These files don't exist in current dashboard and can be copied directly:

```bash
# Core Services
lib/experiment-service.ts          # 211 lines - Unified experiment fetching
lib/filecoin-storage.ts            # 138 lines - Synapse SDK integration
lib/web3-service.ts                # 135 lines - Contract interaction (REPLACES old)

# Experiments Feature
app/experiments/page.tsx           # 100 lines - Experiments page route
components/dashboard/pox-experiments.tsx    # 235 lines - Main experiments component
components/dashboard/challenge-dialog.tsx   # 139 lines - Challenge modal
app/api/experiments/route.ts       # 27 lines - API endpoint for auto-refresh
```

### Files to Merge (MODIFY existing)
These files exist in both versions and need careful merging:

```bash
lib/types.ts                       # ADD: AirQualityDataPoint, AirQualityMetrics, AirQualityData, UnifiedExperiment
lib/data-service.ts                # UPDATE: fetchBlockchainTransactions(), fetchBlockchainStats()
package.json                       # ADD: @filoz/synapse-sdk, multiformats
```

---

## 📦 Dependency Changes

### New Dependencies (Add to package.json)
```json
{
  "@filoz/synapse-sdk": "^0.36.0",
  "multiformats": "^13.4.1",
  "@apollo/client": "^3.11.8",
  "graphql": "^16.9.0"
}
```

**Note**: `ethers@^6.15.0` should already exist in current dashboard.

---

## 🔧 Step-by-Step Merge Instructions

### Phase 1: Prepare Environment

1. **Verify current dashboard exists**:
   ```bash
   cd /Users/crischimiadao/ETHGlobalBuenosAires
   ls -la blockchain-status-plotter-current
   ```

2. **Backup current state** (safety first):
   ```bash
   cp -r blockchain-status-plotter-current blockchain-status-plotter-backup
   ```

3. **Check git status**:
   ```bash
   cd blockchain-status-plotter-current
   git status
   ```

---

### Phase 2: Copy New Files

Copy files that won't conflict:

```bash
cd /Users/crischimiadao/ETHGlobalBuenosAires

# Core services
cp blockchain-status-plotter-new/lib/experiment-service.ts \
   blockchain-status-plotter-current/lib/

cp blockchain-status-plotter-new/lib/filecoin-storage.ts \
   blockchain-status-plotter-current/lib/

cp blockchain-status-plotter-new/lib/web3-service.ts \
   blockchain-status-plotter-current/lib/

# Experiments feature
mkdir -p blockchain-status-plotter-current/app/experiments
cp blockchain-status-plotter-new/app/experiments/page.tsx \
   blockchain-status-plotter-current/app/experiments/

cp blockchain-status-plotter-new/components/dashboard/pox-experiments.tsx \
   blockchain-status-plotter-current/components/dashboard/

cp blockchain-status-plotter-new/components/dashboard/challenge-dialog.tsx \
   blockchain-status-plotter-current/components/dashboard/

# API route
mkdir -p blockchain-status-plotter-current/app/api/experiments
cp blockchain-status-plotter-new/app/api/experiments/route.ts \
   blockchain-status-plotter-current/app/api/experiments/
```

---

### Phase 3: Merge Modified Files

#### 3.1: Merge `lib/types.ts`

**Action**: Add new types to existing file

**New types to add** (insert at end of file):
```typescript
// --- Air Quality Data Types (RPi5 Integration) ---
export type AirQualityDataPoint = {
  time: number // seconds
  formaldehyde: number // ppb
  pm2_5: number // μg/m³
  light: number // ADC value
}

export type AirQualityMetrics = {
  avg_formaldehyde_ppb: number
  max_formaldehyde_ppb: number
  avg_pm2_5_ugm3: number
  max_pm2_5_ugm3: number
  humidity_rh: number
  temperature_c: number
  light_level: number
  air_quality_index: number
  status: string
}

export type AirQualityData = {
  sampleId: string
  experimentType: "AIR_QUALITY" | "HPLC"
  method: string
  sensors: string[]
  location: string
  device: string
  timestamp: string
  dataPoints: AirQualityDataPoint[]
  metrics: AirQualityMetrics
  scenario: "good" | "moderate" | "unhealthy_sensitive" | "unhealthy" | "hazardous"
  cid?: string
  onChainId?: number
}
```

#### 3.2: Merge `lib/data-service.ts`

**Action**: Replace implementations of these two functions

**Find and replace**:

```typescript
// OLD fetchBlockchainTransactions()
export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  // ... existing mock implementation
}

// NEW fetchBlockchainTransactions()
export async function fetchBlockchainTransactions(): Promise<Transaction[]> {
  try {
    // Fetch real experiments from deployed PoX contracts
    const experiments = await fetchLatestExperiments(15)
    
    if (experiments.length === 0) {
      // Fallback to mock data if no experiments exist
      return generateTransactions(15)
    }

    // Convert on-chain experiments to Transaction format for display
    return experiments.map((exp) => ({
      id: `0x${exp.dataHash.slice(2, 10)}`, // First 8 chars of dataHash as TX ID
      network: "Filecoin Cloud" as const,
      type: "Contract Call" as const,
      status: "Confirmed" as const,
      confirmations: 6,
      nodeId: exp.cid.slice(0, 16), // First 16 chars of CID
      timestamp: new Date(exp.submittedAt * 1000).toLocaleTimeString(),
      gasFee: "0.0001",
    }))
  } catch (error) {
    console.error('Failed to fetch blockchain transactions:', error)
    // Fallback to mock data on error
    return generateTransactions(15)
  }
}
```

**Also update**:

```typescript
// OLD fetchBlockchainStats()
export async function fetchBlockchainStats(): Promise<BlockchainStats> {
  // ... existing mock implementation
}

// NEW fetchBlockchainStats()
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
```

**Add import at top**:
```typescript
import { fetchLatestExperiments, fetchTotalExperiments } from "./web3-service"
```

#### 3.3: Merge `package.json`

**Action**: Add new dependencies to `dependencies` section

```bash
cd blockchain-status-plotter-current
```

Then manually edit `package.json` to add:
```json
"@filoz/synapse-sdk": "^0.36.0",
"multiformats": "^13.4.1",
"@apollo/client": "^3.11.8",
"graphql": "^16.9.0"
```

**Or use this command**:
```bash
pnpm add @filoz/synapse-sdk@^0.36.0 multiformats@^13.4.1 @apollo/client@^3.11.8 graphql@^16.9.0
```

---

### Phase 4: Install Dependencies

```bash
cd blockchain-status-plotter-current
pnpm install
```

**Expected output**: Should install 4 new packages without conflicts.

---

### Phase 5: Verification

#### 5.1: TypeScript Check
```bash
cd blockchain-status-plotter-current
pnpm run build
```

**Expected**: No TypeScript errors. If errors occur, likely import path issues.

#### 5.2: Test Experiments Page
```bash
pnpm run dev
```

Then visit: `http://localhost:3000/experiments`

**Expected**:
- Page loads without errors
- Header shows experiment counts (may be 0 if no on-chain data)
- Empty state message if no experiments
- OR experiment cards if data exists

#### 5.3: Test Auto-Refresh
Wait 30 seconds on experiments page.

**Expected**: Refresh icon spins, data re-fetches from API.

#### 5.4: Test Challenge Dialog
Click "Challenge" button on any experiment card.

**Expected**: Modal opens with hash input and instructions.

---

## 🚨 Troubleshooting

### Error: "Module not found: @filoz/synapse-sdk"
**Solution**: Run `pnpm install` again. Check that package.json has the dependency.

### Error: "Cannot find module '@/lib/experiment-service'"
**Solution**: Verify `experiment-service.ts` was copied to `lib/` directory.

### Error: TypeScript type mismatches
**Solution**: Make sure `lib/types.ts` has all new types added.

### Challenge dialog doesn't open
**Solution**: Check if `challenge-dialog.tsx` was copied. Verify shadcn/ui components are installed.

### API route returns 500 error
**Solution**: Check console for errors. Likely RPC connection issue - verify Filecoin Calibration RPC is accessible.

---

## ✅ Success Criteria

Merge is complete when:

- [ ] All files copied without errors
- [ ] `pnpm install` succeeds
- [ ] `pnpm run build` succeeds (TypeScript passes)
- [ ] Dev server starts: `pnpm run dev`
- [ ] `/experiments` page loads
- [ ] No console errors in browser
- [ ] Experiment cards display (if data exists) or empty state shows
- [ ] Challenge dialog opens and closes
- [ ] Auto-refresh works after 30s

---

## 🎯 Performance Notes

### Current Performance
- ✅ In-memory caching for Filecoin downloads (fast re-access)
- ✅ Server-side rendering with 10s revalidation
- ✅ Parallel contract calls (fast blockchain reads)
- ⚠️ Auto-refresh every 30s (polling, not WebSocket)
- ⚠️ No pagination (loads all experiments)

### Pre-Demo Optimizations (Optional)
If dashboard feels slow:
1. Add React.memo to ExperimentCard component
2. Implement pagination (20 experiments per page)
3. Add loading skeletons during refresh
4. Increase server-side cache TTL to 30s

---

## 📁 Final Directory Structure

After merge, `blockchain-status-plotter-current` should have:

```
blockchain-status-plotter-current/
├── app/
│   ├── experiments/
│   │   └── page.tsx                    # ← NEW
│   └── api/
│       └── experiments/
│           └── route.ts                # ← NEW
├── components/
│   └── dashboard/
│       ├── pox-experiments.tsx         # ← NEW
│       └── challenge-dialog.tsx        # ← NEW
├── lib/
│   ├── experiment-service.ts           # ← NEW
│   ├── filecoin-storage.ts             # ← NEW
│   ├── web3-service.ts                 # ← REPLACED
│   ├── types.ts                        # ← MERGED
│   └── data-service.ts                 # ← MERGED
└── package.json                        # ← MERGED
```

---

## 🚀 Next Steps After Merge

1. **Test locally**: Verify experiments page works end-to-end
2. **Deploy to Vercel**: 
   ```bash
   git add .
   git commit -m "feat: Add experiments page with Filecoin integration"
   git push
   ```
3. **Update navigation**: Add link to `/experiments` in main nav
4. **Demo preparation**: 
   - Ensure at least 3-5 experiments exist on-chain
   - Test challenge flow with mock hash
   - Verify Filecoin download works (or shows graceful error)

---

## 📞 Need Help?

If merge fails at any step:
1. Check error messages carefully
2. Verify all files were copied
3. Run `pnpm install` again
4. Compare file contents between `-new` and `-current`
5. Ask for help! I'm standing by.

---

**Merge prepared by**: Akara Nyx (Warp Agent)  
**Date**: 2025-11-23  
**Estimated merge time**: 10-15 minutes  
**Risk level**: LOW ✅

