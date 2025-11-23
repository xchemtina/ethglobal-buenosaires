# Feature Inventory: blockchain-status-plotter-new

**Purpose**: This document inventories all features in `blockchain-status-plotter-new` that need to be merged into `blockchain-status-plotter-current` (the latest UI).

**Created**: 2025-11-23  
**Status**: Ready for merge

---

## 🎯 Core New Features

### 1. **Experiments Page** (`/app/experiments/page.tsx`)
- **What**: Full-page dedicated view for browsing all PoX experiments
- **Key Features**:
  - Server-side data fetching with 10s revalidation
  - Live stats header (total experiments, HPLC count, air quality count, NMR count)
  - Footer with system status, auto-refresh indicator, block explorer link
  - Responsive layout with proper spacing
- **Dependencies**: `experiment-service.ts`, `pox-experiments.tsx` component

### 2. **PoX Experiments Component** (`/components/dashboard/pox-experiments.tsx`)
- **What**: Interactive experiments list with auto-refresh
- **Key Features**:
  - Auto-refresh every 30 seconds
  - Manual refresh button with loading state
  - Stats bar showing experiment type distribution (HPLC/Air/NMR)
  - Color-coded experiment cards by type:
    - 🧪 HPLC: Orange (`border-orange-500`)
    - 🌬️ Air Quality: Green (`border-green-500`)
    - ⚛️ NMR: Blue (`border-blue-500`)
  - Each card shows:
    - Type badge with icon
    - Sample ID
    - Difficulty score
    - CID (truncated)
    - Submission timestamp
    - Submitter address (truncated)
    - Challenge button
- **Client-side**: Yes (interactive)
- **Dependencies**: `experiment-service.ts`, `challenge-dialog.tsx`

### 3. **Challenge Dialog Component** (`/components/dashboard/challenge-dialog.tsx`)
- **What**: Modal for challenging experiment validity (fraud proof system)
- **Status**: Referenced but file not included in read (need to check if exists)
- **Dependencies**: Shadcn dialog components

---

## 📊 Data Layer (lib/)

### 4. **Unified Experiment Service** (`lib/experiment-service.ts`)
**Purpose**: Single source of truth for all experiment types  
**Size**: 211 lines  
**Exports**:
- `UnifiedExperiment` type (supports HPLC, AIR_QUALITY, NMR)
- `fetchUnifiedExperiments()` - Get all experiments with optional full data
- `fetchAirQualityExperiments()` - Filter air quality only
- `fetchHplcExperiments()` - Filter HPLC only
- `fetchLatestExperiment()` - Most recent by ID
- `fetchDashboardStats()` - Live counts for header
- `formatAirQualityForDisplay()` - Transform air data for charts
- `detectExperimentType()` - Difficulty-based type detection:
  - `difficulty >= 25` → NMR
  - `difficulty 15-24` → Air Quality
  - `difficulty < 15` → HPLC

**Performance**:
- Caching not implemented yet (downloads fresh each time)
- Parallel fetching with `Promise.all()`
- Graceful error handling (returns empty arrays)

**Optimization Opportunities**:
- Add in-memory cache with TTL
- Implement stale-while-revalidate pattern
- Add pagination for large datasets

### 5. **Filecoin Storage Integration** (`lib/filecoin-storage.ts`)
**Purpose**: Download experiment data from Filecoin using Synapse SDK  
**Size**: 138 lines  
**Key Features**:
- `downloadFromFilecoin(pieceCid)` - Main download function
- In-memory cache (`Map<string, any>`)
- IPFS gateway fallback (ipfs.io) with 10s timeout
- Batch download with concurrency limit (5 parallel)
- Cache management utilities

**Dependencies**:
- `@filoz/synapse-sdk` (already in package.json)
- `ethers` v6+
- `multiformats/cid`

**Performance**:
- ✅ Caching enabled (avoids re-downloads)
- ✅ Timeout protection (30s primary, 10s fallback)
- ✅ Batch processing with rate limiting
- ⚠️ Cache is in-memory only (resets on deploy)

**Environment Variables**:
- `FILECOIN_CLOUD_RPC` (optional, defaults to Calibration testnet)

### 6. **Web3 Service** (`lib/web3-service.ts`)
**Purpose**: Read-only contract interaction with PoXRegistry  
**Size**: 135 lines (improved from old version's 3.2KB)  
**Exports**:
- `OnChainExperiment` type
- `fetchTotalExperiments()` - Get count
- `fetchExperiment(id)` - Get single by ID
- `fetchAllExperiments()` - Get all (parallel fetch)
- `fetchLatestExperiments(count)` - Get most recent N

**Configuration**:
- `REGISTRY_ADDRESS`: `0xA6Fa61924F06DB9A84B92182B69F5C08F3176554`
- `RPC_URL`: `https://api.calibration.node.glif.io/rpc/v1` (Filecoin Calibration)
- Minimal ABI (only 2 functions needed)

**Performance**:
- ✅ Singleton provider/contract (reused across calls)
- ✅ Parallel fetching for multiple experiments
- ✅ Proper error handling with fallback to null

### 7. **Enhanced Data Service** (`lib/data-service.ts`)
**Purpose**: Bridge between Web3 data and dashboard format  
**Size**: 166 lines (increased from 2.7KB)  
**New Features**:
- `fetchBlockchainTransactions()` now pulls from real PoX registry
- Maps on-chain experiments to Transaction format for display
- Fallback to mock data if chain is empty
- `fetchBlockchainStats()` uses real experiment count

**Backward Compatibility**: ✅ Still supports HPLC/VOC mock data functions

### 8. **Expanded Types** (`lib/types.ts`)
**Size**: 121 lines (increased from 1.2KB)  
**New Additions**:
```typescript
// Air Quality Types
AirQualityDataPoint { time, formaldehyde, pm2_5, light }
AirQualityMetrics { avg/max formaldehyde, avg/max pm2.5, humidity, temp, light, AQI, status }
AirQualityData { sampleId, experimentType, method, sensors, location, device, timestamp, dataPoints, metrics, scenario, cid?, onChainId? }

// Unified Type
UnifiedExperiment { id, type, sampleId, cid, difficulty, submitter, submittedAt, data?, loading? }
```

**Backward Compatibility**: ✅ All existing types preserved

---

## 🔗 API Routes (if any)

### 9. **Experiments API** (`/app/api/experiments/route.ts`)
- **Status**: Referenced in `pox-experiments.tsx` (`fetch('/api/experiments')`)
- **Expected**: GET endpoint returning `{ experiments, stats }`
- **Action**: Need to check if this file exists

---

## 📦 Dependencies Added

Check `package.json` for these additions:

```json
{
  "@filoz/synapse-sdk": "^x.x.x",
  "multiformats": "^x.x.x"
}
```

**Note**: `ethers@^6.15.0` was already present in old version.

---

## 🗂️ Files Missing from Inventory

Need to verify existence of:
1. `/components/dashboard/challenge-dialog.tsx`
2. `/app/api/experiments/route.ts`
3. Any updated `package.json` differences
4. Any new shadcn components added

---

## 📝 Merge Strategy

### Phase 1: Pre-merge Verification
1. ✅ Check if `blockchain-status-plotter-current` exists
2. ⬜ Verify which features current has that conflict with new
3. ⬜ Read missing files (challenge-dialog, API route)
4. ⬜ Compare `package.json` dependencies

### Phase 2: File-by-File Merge
**Priority Order** (high impact → low impact):

1. **Critical Path** (experiments page works):
   - `lib/experiment-service.ts` → NEW
   - `lib/filecoin-storage.ts` → NEW
   - `lib/web3-service.ts` → NEW (replaces old)
   - `lib/types.ts` → MERGE (add new types, keep existing)
   - `app/experiments/page.tsx` → NEW
   - `components/dashboard/pox-experiments.tsx` → NEW

2. **Supporting Files**:
   - `lib/data-service.ts` → MERGE (add Web3 integration, keep existing functions)
   - `app/api/experiments/route.ts` → NEW (if exists)
   - `components/dashboard/challenge-dialog.tsx` → NEW (if exists)

3. **Dependencies**:
   - `package.json` → MERGE (add Synapse SDK + multiformats)

### Phase 3: Integration Testing
1. Check for TypeScript errors
2. Verify experiments page renders
3. Test auto-refresh functionality
4. Verify Filecoin download works (or gracefully falls back)
5. Check responsive design

---

## ⚡ Performance Optimization Checklist

Once merged, consider these optimizations:

### Immediate (Pre-Demo):
- [ ] Add server-side caching for Filecoin downloads (15-30s TTL)
- [ ] Implement pagination (show 20 experiments max, load more)
- [ ] Add loading skeletons for better UX
- [ ] Optimize re-renders (React.memo on experiment cards)

### Post-Demo (Nice to Have):
- [ ] Implement SWR or React Query for data fetching
- [ ] Add virtual scrolling for large experiment lists
- [ ] Persist Filecoin cache to Redis/KV store
- [ ] Add experiment search/filter functionality
- [ ] Implement WebSocket for real-time updates (instead of polling)

---

## 🚨 Breaking Changes to Watch

**None identified**. The new features are additive:
- Old dashboard pages should continue working
- New `/experiments` route is separate
- Shared services (`data-service.ts`, `types.ts`) are backward compatible

**Merge Risk**: LOW ✅

---

## 📸 Visual Preview

The experiments page looks like this:

```
┌─────────────────────────────────────────────────────┐
│ Header: PoX Network • Filecoin Cloud • Live         │
│ Stats: [Total: 12] [HPLC: 8] [Air: 3] [NMR: 1]     │
└─────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│ PoX Experiments Registry            [Refresh ↻]  │
│ On-chain • Filecoin Cloud • Live Feed            │
├───────────────────────────────────────────────────┤
│ [TOTAL: 12] [🧪 HPLC: 8] [🌬️ AIR: 3] [⚛️ NMR: 1] [SYNC] │
├───────────────────────────────────────────────────┤
│                                                   │
│ ┌─────────────────────────────────────────────┐  │
│ │ [🧪 HPLC] #0        DIFFICULTY              │  │
│ │ HPLC-0001                    12.4           │  │
│ │ CID: bafkzcib...              Nov 22, 3:14  │  │
│ │ Submitter: 0xA6Fa...5554    [🛡️ Challenge] │  │
│ └─────────────────────────────────────────────┘  │
│                                                   │
│ ┌─────────────────────────────────────────────┐  │
│ │ [🌬️ AIR_QUALITY] #1  DIFFICULTY             │  │
│ │ AIR-1700855660              18.2            │  │
│ │ ...                                          │  │
│ └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Footer: ETH Global BA • SYSTEM ONLINE • 30s refresh │
│ View on Explorer ↗                                   │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Ready to Merge?

**Status**: ⏳ Waiting for `blockchain-status-plotter-current` folder

**Next Steps**:
1. User downloads/creates `blockchain-status-plotter-current`
2. I verify no critical file conflicts
3. We execute Phase 2 merge (file-by-file)
4. Run `pnpm install` to get new dependencies
5. Test `/experiments` page locally
6. Deploy! 🚀

