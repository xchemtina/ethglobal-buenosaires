# HPLC Trace Integration - Build Summary

## What Was Built

Three files were created to enable loading real HPLC chromatogram data from JSON files into the blockchain-status-plotter frontend:

### 1. `lib/hplc-loader.ts`
**Purpose**: Data transformation layer between Python-generated JSON and React components.

**Key functions:**
- `loadHplcTrace(jsonData)`: Transforms raw JSON to frontend `HplcData` type
- `fetchHplcTraceFile(filename)`: Fetches JSON from public directory and transforms it

**Transformation logic:**
```
Input:  points[{time, signal}]
Output: dataPoints[{time, experimental, theoretical}]
```

For real single-trace data, `experimental` and `theoretical` are set to the same value (the signal). This allows the existing chart component to work without modification.

### 2. `scripts/copy-traces.sh`
**Purpose**: Utility script to copy HPLC JSON files from data directory to Next.js public directory.

**Usage:**
```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
./scripts/copy-traces.sh
```

Copies `../data/traces/*.json` → `./public/traces/`

### 3. `HPLC_TRACES.md`
**Purpose**: Complete integration documentation with examples, troubleshooting, and advanced patterns.

**Sections:**
- JSON structure reference
- Quick start guide
- Advanced usage (multiple traces, index loading)
- Data transformation explanation
- Troubleshooting guide
- Performance optimization tips

## Architecture Overview

```
┌─────────────────────────────────────────┐
│ Python Generator                        │
│ (GenerateTracesForUpload.py)           │
│   ↓ generates                           │
│ ../data/traces/trace-NNN.json          │
└─────────────────────────────────────────┘
           ↓ copy via script
┌─────────────────────────────────────────┐
│ Next.js Public Directory                │
│ ./public/traces/trace-NNN.json         │
└─────────────────────────────────────────┘
           ↓ HTTP fetch
┌─────────────────────────────────────────┐
│ hplc-loader.ts                          │
│ • fetchHplcTraceFile()                  │
│ • Transform {time, signal} to           │
│   {time, experimental, theoretical}     │
└─────────────────────────────────────────┘
           ↓ returns HplcData
┌─────────────────────────────────────────┐
│ data-service.ts                         │
│ • fetchHplcData()                       │
│ • Returns HplcData for dashboard        │
└─────────────────────────────────────────┘
           ↓ provides data
┌─────────────────────────────────────────┐
│ dashboard-layout.tsx                    │
│ • Loads data on mount                   │
│ • Passes to HplcAnalyzer component      │
└─────────────────────────────────────────┘
           ↓ renders
┌─────────────────────────────────────────┐
│ hplc-analyzer.tsx                       │
│ • Recharts AreaChart                    │
│ • Displays time vs intensity            │
└─────────────────────────────────────────┘
```

## Data Structure Mapping

### Input (Python-generated JSON)
```json
{
  "sampleId": "HPLC-0001",
  "method": "Reverse Phase C18",
  "points": [
    {"time": 0.0, "signal": 0.019},
    {"time": 0.004, "signal": 0.016}
  ],
  "metrics": {
    "peakPurity": 0.984,
    "areaPercent": 0.991
  }
}
```

### Output (Frontend HplcData type)
```typescript
{
  sampleId: "HPLC-0001",
  method: "Reverse Phase C18",
  dataPoints: [
    {time: 0.00, experimental: 0.019, theoretical: 0.019},
    {time: 0.00, experimental: 0.016, theoretical: 0.016}
  ],
  metrics: {
    peakPurity: "98.4%",
    areaPercent: "99.1%",
    retentionShift: "N/A",
    status: "LOADED"
  }
}
```

## What You Need To Do

### Minimal Setup (5 minutes)

1. **Copy traces to public directory:**
   ```bash
   cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
   ./scripts/copy-traces.sh
   ```

2. **Enable real data loading in `lib/data-service.ts`:**
   ```typescript
   // Uncomment these lines (around line 26):
   const { fetchHplcTraceFile } = await import("./hplc-loader")
   return fetchHplcTraceFile("trace-001.json")
   
   // Comment out the mock data fallback
   ```

3. **Run dev server:**
   ```bash
   pnpm dev
   ```

4. **View at http://localhost:3000** → HPLC panel shows real trace

### Optional Enhancements

#### Trace Selection UI
Add dropdown to select different traces:

```typescript
// In dashboard-layout.tsx
const [selectedTrace, setSelectedTrace] = useState("trace-001.json")

// Modify fetchHplcData() to accept filename parameter
// Add <select> component to UI
```

#### Load All Traces from Index
Use `index.json` to display trace list with metadata:

```typescript
const response = await fetch("/traces/index.json")
const { traces } = await response.json()
// Map traces to selection menu
```

#### Synapse/IPFS Integration
Replace static file loading with CID-based retrieval:

```typescript
// In hplc-loader.ts
export async function fetchHplcFromCID(cid: string): Promise<HplcData> {
  const response = await fetch(`https://synapse-gateway/${cid}`)
  const jsonData = await response.json()
  return loadHplcTrace(jsonData)
}
```

## Design Decisions

### Why duplicate signal → experimental & theoretical?
The existing `HplcAnalyzer` component expects both lines for comparison. Setting them equal displays a single trace without modifying the component.

**Alternative**: Modify `hplc-analyzer.tsx` to conditionally render single line when `experimental === theoretical`. This is more elegant but requires component changes.

### Why not store traces in git?
HPLC JSON files can be 50-500KB each (2000 points × ~150 bytes/point). With hundreds of traces, this bloats the repository. Better to:
- Generate on-demand
- Store on Synapse/Filecoin
- Reference via CID in smart contracts

### Why transform via loader utility?
Separation of concerns:
- Python generator uses scientific naming (`time`, `signal`)
- Frontend uses experimental/theoretical distinction
- Loader bridges the semantic gap

## Testing Checklist

- [ ] Script copies traces: `ls public/traces/`
- [ ] Dev server runs: `pnpm dev`
- [ ] Trace loads without console errors
- [ ] Chart displays with correct axes (time vs signal)
- [ ] Metrics display correctly formatted
- [ ] Sample ID shows in card header

## Known Limitations

1. **No downsampling**: Large traces (>5000 points) may cause performance issues
2. **No error boundaries**: Failed loads crash the component
3. **No loading states**: Chart appears instantly or not at all
4. **Single trace only**: No UI for trace selection yet

## Next Steps (Roadmap)

### Short-term (ETH Global)
- [ ] Copy traces to public directory
- [ ] Enable real data loading
- [ ] Deploy to Vercel/hosting

### Medium-term (Post-hackathon)
- [ ] Add trace selection UI
- [ ] Implement Synapse CID loading
- [ ] Add peak markers overlay from `metrics.peaks`
- [ ] Performance optimization (downsampling, virtualization)

### Long-term (Production)
- [ ] Real-time data streaming (WebSocket)
- [ ] Multi-trace comparison view
- [ ] Upload UI for user-provided traces
- [ ] Integration with PoX Registry (query by experiment ID)

## File Manifest

**Created files:**
- `lib/hplc-loader.ts` (61 lines)
- `scripts/copy-traces.sh` (20 lines)
- `HPLC_TRACES.md` (177 lines)
- `INTEGRATION_SUMMARY.md` (this file)

**Modified files:**
- `lib/data-service.ts` (added comments for integration)

**No files deleted or moved.**

---

## Quick Reference

**Load single trace:**
```typescript
const { fetchHplcTraceFile } = await import("@/lib/hplc-loader")
const data = await fetchHplcTraceFile("trace-001.json")
```

**Transform raw JSON:**
```typescript
import { loadHplcTrace } from "@/lib/hplc-loader"
const data = loadHplcTrace(rawJsonData)
```

**Copy traces:**
```bash
./scripts/copy-traces.sh
```

---

*Integration complete. Fortis est Veritas.*
