# HPLC Trace Integration Guide

## Overview

The blockchain-status-plotter can display real HPLC chromatogram data from JSON files. This guide explains how to load your traces.

## JSON File Structure

Your HPLC traces must follow this structure:

```json
{
  "sampleId": "HPLC-0001",
  "experimentType": "HPLC",
  "method": "Reverse Phase C18",
  "points": [
    {"time": 0.0, "signal": 0.019},
    {"time": 0.004, "signal": 0.016},
    ...
  ],
  "metrics": {
    "peakCount": 4,
    "peakPurity": 0.984,
    "areaPercent": 0.991,
    "retentionShift": 0.05
  }
}
```

**Required fields:**
- `sampleId`: String identifier
- `method`: Analytical method description
- `points`: Array of `{time, signal}` objects

**Optional fields:**
- `metrics`: Object with peak purity, area %, etc.

## Quick Start

### 1. Copy traces to public directory

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
./scripts/copy-traces.sh
```

This copies all JSON files from `../data/traces/` to `./public/traces/`.

### 2. Enable real data loading

Edit `lib/data-service.ts`:

```typescript
export async function fetchHplcData(): Promise<HplcData> {
  // Uncomment these lines:
  const { fetchHplcTraceFile } = await import("./hplc-loader")
  return fetchHplcTraceFile("trace-001.json")
  
  // Comment out or remove the mock data fallback
}
```

### 3. Run the dev server

```bash
pnpm dev
```

Navigate to http://localhost:3000 and view the HPLC panel.

## Advanced Usage

### Loading multiple traces

To cycle through traces or allow user selection:

```typescript
// In dashboard-layout.tsx
const [traceIndex, setTraceIndex] = useState(0)
const traceFiles = ["trace-001.json", "trace-002.json", "trace-003.json"]

useEffect(() => {
  async function loadTrace() {
    const { fetchHplcTraceFile } = await import("@/lib/hplc-loader")
    const data = await fetchHplcTraceFile(traceFiles[traceIndex])
    setHplcData(data)
  }
  loadTrace()
}, [traceIndex])
```

### Loading from index.json

The traces directory includes an `index.json` with metadata:

```json
{
  "traces": [
    {
      "sampleId": "HPLC-0001",
      "file": "trace-001.json",
      "scenario": "clean",
      "peakCount": 3
    },
    ...
  ],
  "total": 10
}
```

Use this for trace selection UI:

```typescript
const response = await fetch("/traces/index.json")
const index = await response.json()
// Display trace list from index.traces
```

## Data Transformation

The `hplc-loader.ts` utility transforms your JSON structure:

- `points[].time` → `dataPoints[].time`
- `points[].signal` → `dataPoints[].experimental` and `dataPoints[].theoretical`
- `metrics.peakPurity` → formatted percentage string

For single-trace data (no theoretical comparison), both experimental and theoretical are set to the same signal value. This allows the chart to display a single line.

## File Locations

- **Source traces**: `../data/traces/*.json`
- **Public traces**: `./public/traces/*.json` (served via HTTP)
- **Loader utility**: `./lib/hplc-loader.ts`
- **Data service**: `./lib/data-service.ts`
- **Copy script**: `./scripts/copy-traces.sh`

## Troubleshooting

### Traces not loading

1. Verify files exist: `ls public/traces/`
2. Check browser console for fetch errors
3. Ensure JSON structure matches expected format

### Chart displays incorrectly

- Check `time` values are numeric (not strings)
- Ensure `signal` values are positive
- Verify array length (charts work best with 100-2000 points)

### Performance with large traces

If traces have >5000 points, consider downsampling:

```typescript
function downsample(points: HPLCJsonPoint[], targetSize: number) {
  const step = Math.ceil(points.length / targetSize)
  return points.filter((_, i) => i % step === 0)
}
```

## Next Steps

- **Live data**: Replace `fetch("/traces/...")` with WebSocket or API endpoint
- **Upload UI**: Add file upload component for user-provided traces
- **Synapse integration**: Fetch traces from IPFS/Filecoin using CID
- **Analysis overlay**: Display peak markers from `metrics.peaks`

## Related Files

- `packages/experiments/src/types.ts`: TypeScript types for PoX experiment format
- `data/GenerateTracesForUpload.py`: Python script that generates these JSON files
- `components/dashboard/hplc-analyzer.tsx`: React component that renders the chart

---

*Fortis est Veritas*
