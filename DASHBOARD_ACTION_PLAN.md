# Dashboard Action Plan — Run Locally & Deploy Online

**Goal**: Get PoX dashboard running locally, then deploy online for demo.

**Time Estimate**: 30-60 minutes

---

## Phase 1: Run Locally (15-20 minutes)

### Step 1: Install Dependencies

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Install pnpm if not already installed
which pnpm || npm install -g pnpm

# Install project dependencies
pnpm install
```

**Expected output**: 
```
Packages: +XXX
Progress: resolving XXX, reused XXX, downloaded XXX, added XXX
Done in XXs
```

**If errors occur**:
```bash
# Clear cache and retry
rm -rf node_modules pnpm-lock.yaml .next
pnpm install
```

### Step 2: Copy HPLC Traces

```bash
# Still in blockchain-status-plotter/
./scripts/copy-traces.sh
```

**Expected output**:
```
📋 Copying HPLC traces to public directory...
'../data/traces/index.json' -> './public/traces/index.json'
'../data/traces/trace-001.json' -> './public/traces/trace-001.json'
...
✅ Traces copied successfully!
```

**Verify traces copied**:
```bash
ls -lh public/traces/
# Should show JSON files
```

### Step 3: Run Dev Server

```bash
pnpm dev
```

**Expected output**:
```
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

### Step 4: Test in Browser

1. Open http://localhost:3000
2. You should see:
   - **Left panel**: Blockchain transaction feed (mock data)
   - **Right panel**: HPLC analyzer with chromatogram (mock data)
   - **Top tabs**: Switch between HPLC and VOC analyzers

3. **Check console** (Cmd+Option+J on Mac):
   - Should be no red errors
   - Yellow warnings are OK

**If page doesn't load**:
- Check terminal for error messages
- Try port 3001: `pnpm dev --port 3001`
- Clear browser cache (Cmd+Shift+R)

### Step 5: (Optional) Enable Real HPLC Data

Edit `lib/data-service.ts`:

```typescript
export async function fetchHplcData(): Promise<HplcData> {
  // Uncomment these 2 lines:
  const { fetchHplcTraceFile } = await import("./hplc-loader")
  return fetchHplcTraceFile("trace-001.json")
  
  // Comment out the mock data return below (lines 30-40)
}
```

Stop server (Ctrl+C), restart (`pnpm dev`). HPLC panel should now show real trace.

---

## Phase 2: Deploy Online (15-30 minutes)

### Option A: Vercel (Recommended — Easiest)

**Prerequisites**: GitHub repo must be pushed

#### Step 1: Push to GitHub (if not done)

```bash
cd ~/ETHGlobalBuenosAires

# Add all files
git add .

# Commit
git commit -m "Add PoX dashboard with HPLC integration"

# Push to GitHub
git push origin main
```

#### Step 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click "Import Project"
4. Select your GitHub repository
5. **Important**: Set root directory to `blockchain-status-plotter`
6. Leave all other settings as default
7. Click "Deploy"

**Wait 2-3 minutes for build...**

#### Step 3: Add Traces to Deployment

Traces in `public/traces/` are git-ignored. Two options:

**Quick Fix (for demo)**:
```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Force-add traces to git
git add -f public/traces/*.json

# Commit
git commit -m "Add HPLC traces for demo"

# Push (Vercel auto-deploys)
git push
```

**Better Fix (permanent)**:

Edit `package.json`:
```json
{
  "scripts": {
    "prebuild": "./scripts/copy-traces.sh || echo 'No traces'",
    "build": "next build",
    ...
  }
}
```

Commit and push. Vercel will run `prebuild` before every build.

#### Step 4: Get Live URL

After deployment completes:
- Vercel shows: `https://pox-dashboard-xxxxx.vercel.app`
- Visit URL to verify dashboard works
- Share this URL with judges!

### Option B: Netlify (Alternative)

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Install Netlify CLI
npm install -g netlify-cli

# Login (opens browser)
netlify login

# Deploy
netlify deploy --prod

# Follow prompts:
# - Create new site? Y
# - Publish directory: .next
```

Get URL: `https://pox-dashboard-xxxxx.netlify.app`

### Option C: Quick Test Deploy (No Setup)

```bash
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter

# Install Vercel CLI
npm install -g vercel

# Deploy (no GitHub needed)
vercel --prod

# Follow prompts, get instant URL
```

---

## Phase 3: Verify Deployment (5 minutes)

### Checklist

Visit your deployed URL and verify:

- [ ] Page loads without errors
- [ ] Dashboard shows blockchain feed
- [ ] HPLC chart renders correctly
- [ ] Can switch between HPLC/VOC tabs
- [ ] Responsive on mobile (test on phone or Chrome DevTools)
- [ ] No console errors (F12 → Console tab)

### If Traces Don't Load in Production

1. Check build logs on Vercel/Netlify
2. Look for "Copying traces..." message
3. If missing, traces weren't included in build

**Fix**:
```bash
# Force-add traces to git
git add -f public/traces/*.json
git commit -m "Add traces to deployment"
git push
```

Vercel/Netlify will auto-rebuild.

---

## Phase 4: Prepare for Demo (10 minutes)

### Take Screenshots

```bash
# On Mac
Cmd+Shift+4  # Select area to screenshot

# Or use browser devtools
# Right-click → Inspect → Toggle device toolbar
# Take screenshots at different screen sizes
```

Save screenshots to `~/ETHGlobalBuenosAires/demo/screenshots/`

### Record Quick Video

Use Loom (https://loom.com) or QuickTime:

**Script** (30-60 seconds):
1. "This is PoX dashboard showing live scientific data"
2. Point to blockchain feed: "Real-time experiment submissions"
3. Point to HPLC chart: "Actual chromatogram from our generator"
4. Switch tabs: "Multiple analytical techniques supported"
5. "Fully decentralized stack: Filecoin + Arbitrum + The Graph"

### Update README with Live URL

Edit `~/ETHGlobalBuenosAires/README.md`:

```markdown
## Live Demo

**Dashboard**: https://pox-dashboard.vercel.app
**Video Demo**: [Loom link]
```

Commit and push.

---

## Troubleshooting

### Build Fails on Vercel

**Error**: "Module not found"

**Fix**:
```bash
# Locally, clear and rebuild
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build

# If successful locally, push:
git add pnpm-lock.yaml
git commit -m "Fix dependencies"
git push
```

### Dashboard is Slow

**Cause**: Large trace files (>5000 points)

**Fix**: Downsample traces in `hplc-loader.ts`:
```typescript
function downsample(points, target = 1000) {
  const step = Math.ceil(points.length / target)
  return points.filter((_, i) => i % step === 0)
}

// In loadHplcTrace()
const dataPoints = downsample(jsonData.points.map(...))
```

### Port 3000 Already in Use

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev --port 3001
```

---

## Success Criteria

You're ready for demo when:

1. ✅ Dashboard runs locally (`pnpm dev` works)
2. ✅ Real HPLC trace displays correctly
3. ✅ Deployed to Vercel/Netlify with live URL
4. ✅ Screenshot saved for pitch deck
5. ✅ Can explain: "This shows real chromatogram data that will be stored on Filecoin"

---

## Next Steps (Post-Demo)

After ETH Global submission:

1. **Add Web3 Integration**
   - Connect ethers.js provider
   - Query PoXRegistry contract
   - Display real on-chain experiments

2. **Deploy Subgraph**
   - Index contract events
   - Replace mock data with GraphQL queries

3. **Synapse Integration**
   - Fetch traces by CID
   - Show decentralized data retrieval

4. **Wallet Connection**
   - Add RainbowKit/ConnectKit
   - Let users submit experiments

See `blockchain-status-plotter/DEPLOYMENT.md` for detailed instructions.

---

## Quick Reference

```bash
# Run locally
cd ~/ETHGlobalBuenosAires/blockchain-status-plotter
pnpm install
./scripts/copy-traces.sh
pnpm dev

# Deploy to Vercel
vercel --prod

# Force-add traces for deployment
git add -f public/traces/*.json
git commit -m "Add traces"
git push
```

**Live URLs to Share**:
- Vercel: `https://pox-dashboard-xxxxx.vercel.app`
- Netlify: `https://pox-dashboard-xxxxx.netlify.app`

---

**Questions? Check**:
- `blockchain-status-plotter/README.md` — Dashboard overview
- `blockchain-status-plotter/DEPLOYMENT.md` — Full deployment guide
- `blockchain-status-plotter/HPLC_TRACES.md` — Real data integration
- `NEXT_STEPS.md` — Overall project roadmap

*Let's ship this! Fortis est Veritas.*
