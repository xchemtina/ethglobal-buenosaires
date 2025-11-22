# PoX Dashboard — LabNodes Interface

Real-time visualization dashboard for the PoX (Proof-of-X) decentralized science reputation system. Displays blockchain transactions, HPLC chromatograms, and VOC sensor data in a unified interface.

## Features

- **Blockchain Monitor**: Live transaction feed from Filecoin Cloud/Arbitrum
- **HPLC Analyzer**: Chromatogram visualization with peak analysis
- **VOC Analyzer**: Air quality sensor data display
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real Data Support**: Load actual HPLC traces from JSON files

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript 5
- **Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Package Manager**: pnpm

## Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

```bash
# Clone repository (if not already done)
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Install dependencies
pnpm install

# Copy HPLC traces to public directory
./scripts/copy-traces.sh

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
blockchain-status-plotter/
├── app/                      # Next.js 16 App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles
│
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── blockchain-monitor.tsx   # Transaction feed
│   │   ├── hplc-analyzer.tsx        # Chromatogram chart
│   │   └── voc-analyzer.tsx         # VOC sensor chart
│   ├── dashboard-layout.tsx # Main layout with tabs
│   ├── theme-provider.tsx   # Dark/light mode
│   └── ui/                  # Reusable UI components (shadcn)
│
├── lib/
│   ├── data-service.ts      # Data fetching layer
│   ├── hplc-loader.ts       # HPLC trace transformation
│   ├── types.ts             # TypeScript interfaces
│   ├── mock-data.ts         # Mock data for development
│   └── utils.ts             # Utility functions
│
├── public/
│   └── traces/              # HPLC JSON files (copied via script)
│
├── scripts/
│   └── copy-traces.sh       # Utility to copy traces from data/
│
├── HPLC_TRACES.md           # Guide for real data integration
├── INTEGRATION_SUMMARY.md   # Technical architecture docs
└── DEPLOYMENT.md            # Deployment instructions
```

## Loading Real HPLC Traces

The dashboard can display actual chromatogram data from the PoX experiment generator.

### Step 1: Copy Traces

```bash
./scripts/copy-traces.sh
```

This copies JSON files from `../data/traces/` to `./public/traces/`.

### Step 2: Enable Real Data

Edit `lib/data-service.ts`:

```typescript
export async function fetchHplcData(): Promise<HplcData> {
  // Uncomment these lines:
  const { fetchHplcTraceFile } = await import("./hplc-loader")
  return fetchHplcTraceFile("trace-001.json")
  
  // Comment out the mock data return
}
```

### Step 3: Restart Server

```bash
# Stop dev server (Ctrl+C)
pnpm dev
```

The HPLC panel will now display real trace data.

**For detailed integration guide**, see [`HPLC_TRACES.md`](./HPLC_TRACES.md).

## Available Scripts

```bash
# Development
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Run production build
pnpm lint         # Run ESLint

# Utilities
./scripts/copy-traces.sh   # Copy HPLC traces to public/
```

## Configuration

### Environment Variables

Create `.env.local` for custom configuration:

```bash
# Blockchain RPC (future integration)
NEXT_PUBLIC_RPC_URL=https://sepolia.arbitrum.io/rpc
NEXT_PUBLIC_CHAIN_ID=421614

# Contract addresses (after deployment)
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_REPUTATION_ADDRESS=0x...

# The Graph subgraph
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/...

# Trace data source
NEXT_PUBLIC_TRACE_URL=/traces
```

### Customizing Theme

The dashboard uses Tailwind CSS with CSS variables for theming. Edit `app/globals.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}
```

Dark mode is automatically supported via `next-themes`.

## Development

### Adding New Components

```bash
# Add shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add dialog
# etc.
```

Components are added to `components/ui/`.

### Data Flow

```
Mock Data (lib/mock-data.ts)
  ↓
Data Service (lib/data-service.ts)
  ↓
Dashboard Layout (components/dashboard-layout.tsx)
  ↓
Specific Analyzers (components/dashboard/*.tsx)
```

**Future**: Replace mock data with:
- Web3 calls to PoXRegistry contract
- GraphQL queries to The Graph subgraph
- Synapse SDK calls to fetch HPLC traces by CID

### Type Safety

All components use TypeScript. Key types defined in `lib/types.ts`:

- `Transaction`: Blockchain transaction data
- `HplcData`: Chromatogram data and metrics
- `VocData`: VOC sensor readings
- `BlockchainStats`: Network statistics

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full deployment guide.

### Quick Deploy to Vercel

```bash
pnpm add -g vercel
vercel --prod
```

### Important: Traces in Production

Traces in `public/traces/` are git-ignored. For deployment:

**Option A**: Commit traces to git
```bash
git add -f public/traces/*.json
git commit -m "Add traces for demo"
git push
```

**Option B**: Add prebuild script (recommended)
```json
{
  "scripts": {
    "prebuild": "./scripts/copy-traces.sh || true",
    "build": "next build"
  }
}
```

Vercel will run `prebuild` automatically before building.

## Troubleshooting

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
```

### Port 3000 Already in Use

```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev --port 3001
```

### Traces Not Loading

1. Check traces exist: `ls public/traces/`
2. Run copy script: `./scripts/copy-traces.sh`
3. Check browser console for 404 errors
4. Verify JSON structure matches `HPLCJsonFile` interface

### Build Errors

```bash
# Type check
pnpm tsc --noEmit

# Lint
pnpm lint --fix

# Clear Next.js cache
rm -rf .next
```

## Roadmap

### Short-term (ETH Global Demo)
- [x] Mock data visualization
- [x] Real HPLC trace integration
- [ ] Deploy to Vercel
- [ ] Add wallet connection
- [ ] Query contracts for experiments

### Medium-term (Post-hackathon)
- [ ] The Graph subgraph integration
- [ ] Synapse CID-based trace fetching
- [ ] Trace selection UI (browse all experiments)
- [ ] Real-time updates via WebSocket
- [ ] Mobile-optimized layout

### Long-term (Production)
- [ ] Multi-trace comparison view
- [ ] Peak annotation overlay
- [ ] Export/share chromatograms
- [ ] Integration with Causality Network devices
- [ ] LLM chat interface for querying experiments

## Contributing

This dashboard is part of the PoX hackathon project. For the main repository and architecture docs, see [`../README.md`](../README.md).

Key files to understand:
- **Architecture**: [`../THOUGHTS.md`](../THOUGHTS.md)
- **Design decisions**: [`../DECISIONS.md`](../DECISIONS.md)
- **Integration guide**: [`./HPLC_TRACES.md`](./HPLC_TRACES.md)

## License

MIT (see root LICENSE file)

## Links

- [PoX Main Repo](../)
- [ETH Global Buenos Aires](https://ethglobal.com/events/buenosaires)
- [Filecoin Cloud](https://filecoin-cloud.io/)
- [Synapse (FilOzone)](https://filoz.io/)

---

*Fortis est Veritas*
