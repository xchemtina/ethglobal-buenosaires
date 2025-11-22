# Dashboard Deployment Guide

## Quick Start: Run Locally

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# 1. Install dependencies
pnpm install

# 2. Copy HPLC traces to public directory
./scripts/copy-traces.sh

# 3. (Optional) Enable real HPLC data
# Edit lib/data-service.ts:
# - Uncomment lines 26-27 to load real traces
# - Comment out mock data fallback

# 4. Run dev server
pnpm dev

# 5. Open browser
open http://localhost:3000
```

## Deploy to Vercel (Recommended)

Vercel provides zero-config deployment with automatic SSL and global CDN.

### Prerequisites

- GitHub account with this repo pushed
- Vercel account (free tier sufficient)

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
vercel --prod

# Follow prompts:
# - Link to existing project? N (first time)
# - Project name: pox-dashboard
# - Framework: Next.js (auto-detected)
# - Build settings: default (auto)

# Output: https://pox-dashboard.vercel.app
```

### Method 2: Vercel Dashboard (Easier)

1. Go to https://vercel.com/new
2. Import GitHub repository
3. Select `blockchain-status-plotter` as root directory
4. Click "Deploy" (zero configuration needed)
5. Get URL: `https://your-project.vercel.app`

### Important: Traces in Deployment

**Problem**: `public/traces/` is git-ignored, so traces won't be in deployed version.

**Solutions**:

#### Option A: Commit traces to git (Quick)
```bash
# Remove from .gitignore
echo "!public/traces/*.json" >> .gitignore

# Add traces
git add public/traces/*.json
git commit -m "Add HPLC traces for demo"
git push

# Vercel will auto-deploy
```

#### Option B: Build-time copy (Better)
```bash
# Edit package.json scripts:
{
  "scripts": {
    "prebuild": "./scripts/copy-traces.sh || echo 'No traces to copy'",
    "build": "next build",
    ...
  }
}

# Vercel runs prebuild automatically
```

#### Option C: Environment variable paths (Production)
```bash
# Store traces on CDN/S3 instead of local
# Update hplc-loader.ts:
const TRACE_BASE_URL = process.env.NEXT_PUBLIC_TRACE_URL || '/traces'
const response = await fetch(`${TRACE_BASE_URL}/${filename}`)
```

## Deploy to Netlify

Alternative to Vercel with similar features.

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Deploy
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
netlify deploy --prod

# Follow prompts
# Output: https://pox-dashboard.netlify.app
```

### Netlify Build Settings

In `netlify.toml`:
```toml
[build]
  command = "pnpm run prebuild && pnpm build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Deploy to GitHub Pages (Static)

Free hosting but no server-side features.

### Configure Next.js for Static Export

Edit `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/pox-dashboard' : '',
}

export default nextConfig
```

### Deploy Script

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Build static site
pnpm build

# Deploy to gh-pages branch
pnpm add -D gh-pages
npx gh-pages -d out -b gh-pages

# Access at: https://yourusername.github.io/pox-dashboard
```

**Limitations**:
- No API routes
- No SSR/ISR
- Manual redeploy needed

## Deploy to Custom Server (VPS)

For full control, deploy to your own server.

### Requirements

- Ubuntu 22.04+ server
- Node.js 18+ installed
- Domain name (optional)

### Deployment Steps

```bash
# On server
git clone https://github.com/yourusername/ETHGlobalBuenosAires.git
cd ETHGlobalBuenosAires/blockchain-status-plotter

# Install dependencies
pnpm install

# Copy traces
./scripts/copy-traces.sh

# Build production bundle
pnpm build

# Run with PM2 (process manager)
pnpm add -g pm2
pm2 start pnpm --name "pox-dashboard" -- start

# Set to start on boot
pm2 startup
pm2 save
```

### Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/pox-dashboard
server {
    listen 80;
    server_name pox.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/pox-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d pox.yourdomain.com
```

## Environment Variables

If you add Web3 integration or API keys:

Create `.env.local`:
```bash
# Blockchain RPC
NEXT_PUBLIC_RPC_URL=https://sepolia.arbitrum.io/rpc
NEXT_PUBLIC_CHAIN_ID=421614

# Contract addresses (after deployment)
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_REPUTATION_ADDRESS=0x...

# The Graph subgraph URL (after deployment)
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/...

# Synapse/Filecoin
NEXT_PUBLIC_SYNAPSE_GATEWAY=https://gateway.synapse.filoz.io
```

**Note**: `NEXT_PUBLIC_*` prefix exposes variables to browser (safe for public endpoints only).

### Add to Vercel

```bash
# Via CLI
vercel env add NEXT_PUBLIC_RPC_URL production
# Paste value when prompted

# Or via dashboard: Settings → Environment Variables
```

## Performance Optimization

### For Production Deployment

1. **Trace downsampling**: Large traces (>2000 points) slow rendering
   ```typescript
   // In hplc-loader.ts
   function downsample(points, targetSize = 1000) {
     const step = Math.ceil(points.length / targetSize)
     return points.filter((_, i) => i % step === 0)
   }
   ```

2. **Lazy loading**: Load traces on-demand, not all at mount
   ```typescript
   // In dashboard-layout.tsx
   const [hplcData, setHplcData] = useState<HplcData | null>(null)
   const loadTrace = async (filename: string) => {
     const data = await fetchHplcTraceFile(filename)
     setHplcData(data)
   }
   ```

3. **CDN for traces**: Store traces on Cloudflare R2/AWS S3 instead of bundling
   ```typescript
   const TRACE_CDN = 'https://traces.pox-demo.com'
   fetch(`${TRACE_CDN}/${filename}`)
   ```

## Monitoring

### Vercel Analytics (Built-in)

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking with Sentry

```bash
pnpm add @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

## Troubleshooting

### Build Fails: "Module not found"

```bash
# Clear cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Traces Not Loading in Production

1. Check `public/traces/` exists and has JSON files
2. Verify build logs show traces were copied
3. Check browser console for 404 errors
4. Try absolute URLs: `fetch('https://yourdomain.com/traces/trace-001.json')`

### Chart Not Rendering

1. Ensure `recharts` is installed: `pnpm list recharts`
2. Check data format matches `HplcDataPoint` type
3. Verify no console errors in browser devtools

### Slow Performance

1. Downsample large traces (>5000 points)
2. Use `React.memo()` on chart components
3. Implement virtualization for trace selection list

## Demo Checklist

Before showing to judges:

- [ ] Dashboard runs locally without errors
- [ ] Real HPLC trace displays correctly
- [ ] Chart is responsive (try mobile view)
- [ ] All links/buttons work
- [ ] Console has no errors
- [ ] Deploy to Vercel and get live URL
- [ ] Test deployed version (traces load from CDN)
- [ ] Screenshot for pitch deck
- [ ] Record 30-second demo video

## Next Steps: Blockchain Integration

Once contracts are deployed:

1. Add ethers.js provider
2. Replace `fetchHplcData()` with contract queries
3. Fetch CID from registry, download from Synapse
4. Add wallet connection (RainbowKit/ConnectKit)
5. Display real reputation scores

See `HPLC_TRACES.md` for Synapse integration patterns.

---

*For judges: Live demo available at [insert deployed URL]*
