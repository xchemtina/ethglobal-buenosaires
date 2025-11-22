# PoX Subgraph

Indexes `ExperimentRegistered` events from the PoXRegistry contract on Filecoin Calibration testnet.

## Contract Addresses (Filecoin Calibration - chainId 314159)

- **PoXRegistry**: `0xa6fa61924f06db9a84b92182b69f5c08f3176554`
- **Reputation**: `0xfbf4854d38c77bd4b74fb0c65d9c249fd7bdefa1`
- **ChallengeManager**: `0x6e80a987049965127f1eb69cc49fb4460aeb5e8b`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Subgraph

```bash
npx @graphprotocol/graph-cli@0.80.0 codegen
npx @graphprotocol/graph-cli@0.80.0 build
```

### 3. Deploy to The Graph Studio

First, authenticate with your deploy key:

```bash
npx @graphprotocol/graph-cli@0.80.0 auth --studio <YOUR_DEPLOY_KEY>
```

Then deploy:

```bash
npx @graphprotocol/graph-cli@0.80.0 deploy --studio pox
```

### 4. Get Your Deploy Key

1. Go to https://thegraph.com/studio/
2. Sign in with your wallet
3. Create a new subgraph or select existing "pox"
4. Copy the deploy key from the dashboard

## Schema

The subgraph tracks:

- **Experiment entities** with:
  - `id`: Unique experiment ID
  - `submitter`: Address of the scientist
  - `cid`: Synapse/Filecoin CID for off-chain data
  - `dataHash`: Keccak256 hash of raw experiment data
  - `metricsHash`: Keccak256 hash of analysis results
  - `difficulty`: Computed difficulty score
  - `initialRV`: Initial reputation value (scaled by 1e6)
  - `submittedAt`: Unix timestamp

## Example Query

```graphql
{
  experiments(first: 10, orderBy: submittedAt, orderDirection: desc) {
    id
    submitter
    cid
    difficulty
    initialRV
    submittedAt
  }
}
```

## Network Info

- **Network**: `calibration` (Filecoin Calibration testnet)
- **Chain ID**: 314159
- **Start Block**: 3847000 (adjust if needed)

## Development

To test locally with a Graph Node:

```bash
# Start graph node (separate terminal)
# See: https://github.com/graphprotocol/graph-node

# Create subgraph locally
npx @graphprotocol/graph-cli@0.80.0 create --node http://localhost:8020/ pox

# Deploy locally
npx @graphprotocol/graph-cli@0.80.0 deploy --node http://localhost:8020/ --ipfs http://localhost:5001 pox
```

## Troubleshooting

### Node Version Error

If you get "Node.js version >=20.18.1 is required", use the older CLI version:

```bash
npx @graphprotocol/graph-cli@0.80.0 <command>
```

### Wrong Network

Make sure `subgraph.yaml` has:
- `network: calibration`
- Correct contract address
- Recent `startBlock`

### Build Fails

1. Run `npm install` to ensure dependencies are present
2. Verify ABI exists: `subgraph/abis/PoXRegistry.json`
3. Check contract address matches deployed address
4. Ensure event signature matches exactly
