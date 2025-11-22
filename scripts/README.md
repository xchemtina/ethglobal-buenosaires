# Scripts — Deployment & Automation (Placeholder)

This directory is currently empty but reserved for:

## Intended Contents

### Deployment Scripts
```bash
scripts/
├── deploy.ts           # Main deployment orchestrator
├── deploy-registry.ts  # PoXRegistry deployment
├── deploy-reputation.ts # Reputation contract deployment
├── deploy-challenges.ts # ChallengeManager deployment
└── verify.ts           # Etherscan/Arbiscan verification
```

### Utility Scripts
```bash
scripts/
├── generate-types.ts   # Generate TypeScript types from contracts
├── export-abis.ts      # Export ABIs for frontend
├── seed-testdata.ts    # Populate testnet with sample experiments
└── migrate.ts          # Migration scripts for contract upgrades
```

### Task Automation
```bash
scripts/
├── crawl-experiments.ts  # Fetch experiments from registry
├── verify-hashes.ts      # Batch verification of submitted data
├── compute-stats.ts      # Network statistics (difficulty distribution)
└── backup-state.ts       # Archive on-chain state to IPFS
```

## Current Status

**Empty** — Deployment is currently manual (Remix, Hardhat console, or Foundry CLI).

## Why This Directory Exists

Pre-allocated for future automation. In hackathon context:
- Manual deployment is faster for iteration
- Scripting adds overhead without immediate benefit
- Can always add scripts before mainnet

## Migration Path

### Phase 1: Manual Deployment (Current)
```bash
# Deploy via Foundry
forge create --rpc-url $RPC --private-key $PK contracts/Reputation.sol:Reputation
forge create --rpc-url $RPC --private-key $PK contracts/PoXRegistry.sol:PoXRegistry --constructor-args $REPUTATION_ADDR
```

### Phase 2: Scripted Deployment
```typescript
// deploy.ts
import { ethers } from 'hardhat';

async function main() {
  const Reputation = await ethers.getContractFactory('Reputation');
  const reputation = await Reputation.deploy();
  await reputation.deployed();
  
  const Registry = await ethers.getContractFactory('PoXRegistry');
  const registry = await Registry.deploy(reputation.address);
  await registry.deployed();
  
  await reputation.setAuthorized(registry.address, challenges.address);
}

main().catch(console.error);
```

### Phase 3: Full Automation
```bash
npm run deploy:testnet   # Arbitrum Sepolia
npm run deploy:mainnet   # Arbitrum One
npm run verify:all       # Verify all contracts
```

## Best Practices (When Implemented)

### Idempotency
Scripts should be re-runnable without side effects:
```typescript
// Check if already deployed
const existingDeployment = await getDeployment('PoXRegistry');
if (existingDeployment) {
  console.log(`Already deployed at ${existingDeployment.address}`);
  return existingDeployment;
}
```

### State Persistence
Save deployment addresses to JSON:
```json
{
  "arbitrum-sepolia": {
    "Reputation": "0x...",
    "PoXRegistry": "0x...",
    "ChallengeManager": "0x..."
  }
}
```

### Verification
Auto-verify on Arbiscan:
```typescript
await hre.run('verify:verify', {
  address: contract.address,
  constructorArguments: [arg1, arg2],
});
```

### Gas Estimation
Log gas costs before deploying:
```typescript
const estimatedGas = await contract.deploy().estimateGas();
console.log(`Estimated gas: ${estimatedGas.toString()}`);
```

## Related Directories

- `/contracts` — Solidity source files
- `/packages/experiments` — Off-chain experiment generation
- `/apps/cli` — Command-line interface for scripting
- `/apps/dashboard` — Web UI for monitoring

## Priority Order for Implementation

1. **deploy.ts** — Basic deployment script (unblocks testing)
2. **verify.ts** — Contract verification (unblocks audit)
3. **export-abis.ts** — ABI generation (unblocks frontend)
4. **seed-testdata.ts** — Test data population (unblocks demo)
5. **Everything else** — As needed

## Temporary Workaround

Until scripts exist, use Foundry directly:
```bash
# Deploy all contracts
source .env
forge script script/Deploy.s.sol:DeployScript --rpc-url $ARBITRUM_SEPOLIA_RPC --broadcast --verify
```

Or Hardhat:
```bash
npx hardhat run scripts/deploy.ts --network arbitrum-sepolia
```

This README will be replaced with actual implementation documentation once scripts are added.
