# script-tag — Synapse SDK Browser Demo

Minimal HTML example demonstrating Synapse SDK integration via ES modules (ESM) for client-side decentralized storage interaction.

## Purpose

This is a **proof-of-concept** showing:
- Browser-based Synapse SDK usage (no build step)
- MetaMask wallet integration for authentication
- Direct CDN imports via `esm.sh` (no npm/webpack)
- RPC endpoint discovery for Synapse network

Serves as reference implementation for integrating Synapse into web apps.

## What is Synapse?

[Synapse](https://github.com/FilOzone/synapse-sdk) by FilOzone is a decentralized data availability layer built on Filecoin. Key features:
- **Content-addressed storage**: CID-based retrieval (similar to IPFS)
- **Programmable storage**: Smart contract integration for data lifecycle
- **EVM compatibility**: Ethereum provider interface for seamless wallet integration

In the PoX system, Synapse stores:
- Full HPLC chromatogram data (raw points)
- Experiment metadata
- Analysis results

Contracts store only hashes; Synapse provides the actual data.

## File Structure

```
script-tag/
├── index.html       # Main demo page
├── package.json     # Metadata + dev scripts
└── biome.json       # Linter config (unused in static HTML)
```

### index.html Breakdown

```html
<script type="module">
  import { RPC_URLS, Synapse } from 'https://esm.sh/@filoz/synapse-sdk'
  import { ethers } from 'https://esm.sh/ethers'
  
  const provider = new ethers.BrowserProvider(window.ethereum)
  await Synapse.create({ provider })
</script>
```

**What's happening**:
1. **ESM imports**: Modern ES6 module syntax, supported by browsers natively
2. **esm.sh CDN**: Converts npm packages to browser-compatible ESM on-the-fly
3. **BrowserProvider**: Ethers.js wrapper for MetaMask/injected wallet
4. **Synapse.create()**: Initializes SDK with wallet provider

### Error Handling

```javascript
try {
  await Synapse.create({ provider })
} catch (error) {
  document.getElementById('error').value = error.message
}
```

Captures initialization errors (e.g., wallet not connected, wrong network) and displays them in textarea.

### RPC URL Display

```javascript
const rpcUrl = document.getElementById('rpc')
rpcUrl.value = JSON.stringify(RPC_URLS, null, 2)
```

Shows available Synapse RPC endpoints. Example format:
```json
{
  "mainnet": "https://synapse.filoz.one/rpc",
  "testnet": "https://testnet.synapse.filoz.one/rpc"
}
```

## Usage

### Local Development

```bash
npm install  # Installs `servor` dev server
npm run dev  # Starts local server with auto-reload
```

Runs on `http://localhost:8080` (or next available port).

### Requirements

- **Modern browser**: Chrome/Firefox/Edge with ES6 module support
- **MetaMask** (or compatible wallet): Injected `window.ethereum` provider
- **Network**: Connected to network with Synapse deployment

### Testing the Demo

1. Open `index.html` in browser
2. Check console for Synapse initialization logs
3. Inspect RPC URLs in textarea
4. Check error textarea for any issues

## Integration with PoX System

### Experiment Upload Flow

```javascript
// 1. Generate experiment (off-chain)
const experiment = generatePoXExperiment({ seed, nPoints, ... })

// 2. Upload to Synapse
const synapse = await Synapse.create({ provider })
const cid = await synapse.upload(experiment)  // Returns pieceCid

// 3. Register on-chain (PoXRegistry.sol)
const tx = await registry.registerExperiment(
  cid,                    // Synapse CID
  experiment.dataHash,    // keccak256 hash
  experiment.metricsHash, // keccak256 hash
  experiment.difficulty,
  experiment.rvInitial
)
```

### Verification Flow

```javascript
// 1. Retrieve experiment from registry
const exp = await registry.getExperiment(experimentId)

// 2. Download data from Synapse
const synapse = await Synapse.create({ provider })
const data = await synapse.download(exp.cid)

// 3. Re-compute analysis
const analysis = analyzeExperiment(data)
const computedHash = hashJson(analysis)

// 4. Compare hashes
if (computedHash !== exp.metricsHash) {
  // Open challenge!
  await challengeManager.openChallenge(experimentId, computedHash)
}
```

## Why ESM + CDN Instead of Bundler?

### Pros of ESM Approach
- **Zero build step**: Edit HTML, refresh browser, done
- **Instant updates**: esm.sh serves latest package versions
- **Transparent**: See exactly what's imported (no webpack magic)
- **Portable**: Works without Node.js environment

### Cons
- **No tree-shaking**: Imports entire ethers.js (~1 MB)
- **Network latency**: First load slower than bundled assets
- **Version pinning**: esm.sh may serve different versions over time
- **Limited IE support**: Requires modern browser

For production apps, use Vite/Webpack. For demos/prototypes, ESM is faster.

## Biome Configuration

```json
{
  "linter": { "enabled": true },
  "formatter": { "enabled": true }
}
```

Biome is a Rust-based linter/formatter (Prettier + ESLint replacement). Included for consistency but **not used** in static HTML demo.

If project expands to TypeScript/React, Biome config is ready.

## Security Considerations

### Browser Wallet Access

```javascript
const provider = new ethers.BrowserProvider(window.ethereum)
```

This requests wallet access via MetaMask. User must:
1. Approve connection
2. Sign transactions/messages when prompted

**Never log private keys or seed phrases**. Ethers.js abstracts signing — private keys never touch JavaScript context.

### CDN Trust

Using `esm.sh` means trusting third-party CDN:
- **Upside**: Convenient, fast, auto-updates
- **Downside**: CDN compromise could inject malicious code

Mitigation:
- Pin versions: `https://esm.sh/ethers@6.9.0`
- Use subresource integrity (SRI) hashes
- Self-host for production

### CORS and Synapse RPC

Synapse RPC must allow CORS from browser origin:
```
Access-Control-Allow-Origin: *
```

If RPC blocks browser requests, use backend proxy:
```javascript
// Frontend
fetch('/api/synapse-proxy', { body: rpcPayload })

// Backend
router.post('/api/synapse-proxy', async (req, res) => {
  const result = await fetch(SYNAPSE_RPC_URL, { body: req.body })
  res.json(result)
})
```

## Comparison to Other Patterns

### vs. React + Vite
- **script-tag**: Single HTML file, instant load
- **React**: Component tree, routing, state management
- **Use case**: script-tag for demos, React for apps

### vs. Server-Side Rendering (SSR)
- **script-tag**: Pure client-side (static HTML)
- **SSR**: Pre-rendered HTML, hydrated on client
- **Use case**: script-tag for wallet interactions (must be client-side)

### vs. Hardhat Console
- **script-tag**: Browser UI for users
- **Hardhat**: CLI scripting for developers
- **Use case**: Both needed (developer tools + user interface)

## Troubleshooting

### Error: "Cannot find window.ethereum"
- **Cause**: MetaMask not installed or disabled
- **Fix**: Install MetaMask extension, refresh page

### Error: "Network mismatch"
- **Cause**: Wallet connected to wrong chain
- **Fix**: Switch to Arbitrum Sepolia in MetaMask

### Error: "Module not found"
- **Cause**: esm.sh CDN down or package name typo
- **Fix**: Check package name, try alternative CDN (skypack.dev, unpkg.com)

### Page blank after loading
- **Cause**: JavaScript error in console
- **Fix**: Open DevTools (F12), check Console tab for errors

## Next Steps

### Extend Demo
1. Add file upload UI (select chromatogram CSV)
2. Compute hashes client-side (ethers.utils.keccak256)
3. Upload to Synapse via button click
4. Display transaction receipt after registration

### Production Integration
1. Replace ESM with Vite build
2. Add TypeScript for type safety
3. Implement error boundaries
4. Add loading states + progress indicators
5. Store CID in localStorage for persistence

## Related Resources

- [Synapse SDK Docs](https://github.com/FilOzone/synapse-sdk)
- [Ethers.js v6 Docs](https://docs.ethers.org/v6/)
- [ESM.sh Documentation](https://esm.sh/)
- [MetaMask Developer Docs](https://docs.metamask.io/)

## Why This Matters

Web3 apps struggle with **data availability** — storing large files on-chain is prohibitively expensive. Traditional solutions:
- **IPFS**: Decentralized but no guaranteed retrieval (DHT unreliable)
- **Arweave**: Permanent storage but expensive upfront
- **Centralized cloud**: Cheap, reliable, but defeats censorship resistance

Synapse bridges this gap:
- **Filecoin backing**: Storage deals ensure data persistence
- **EVM integration**: Smart contracts can verify storage proofs
- **Developer UX**: Familiar wallet-based auth, no new paradigms

This demo shows Synapse is **usable today** — no exotic tooling, just standard Web3 stack. That's critical for DeSci adoption: if scientists can't deploy apps easily, decentralization remains theoretical.
