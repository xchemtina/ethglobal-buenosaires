import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const FILECOIN_RPC = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY not found in environment');
  process.exit(1);
}

// Load compiled contracts
function loadContract(name) {
  const artifactPath = path.join(__dirname, '..', 'out', name, `${name.split('.')[0]}.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
  return {
    abi: artifact.abi,
    bytecode: artifact.bytecode.object
  };
}

async function main() {
  console.log('🚀 Starting contract deployment to Filecoin Calibration...\n');
  
  // Connect to Filecoin
  const provider = new ethers.JsonRpcProvider(FILECOIN_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  console.log(`Deployer: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`Balance: ${ethers.formatEther(balance)} tFIL\n`);
  
  // Load contracts
  const Reputation = loadContract('Reputation.sol');
  const PoXRegistry = loadContract('PoXRegistry.sol');
  const ChallengeManager = loadContract('ChallengeManager.sol');
  
  // 1. Deploy Reputation
  console.log('📝 Deploying Reputation...');
  const ReputationFactory = new ethers.ContractFactory(
    Reputation.abi,
    Reputation.bytecode,
    wallet
  );
  
  const reputation = await ReputationFactory.deploy();
  await reputation.waitForDeployment();
  const reputationAddress = await reputation.getAddress();
  console.log(`✅ Reputation deployed at: ${reputationAddress}\n`);
  
  // 2. Deploy PoXRegistry
  console.log('📝 Deploying PoXRegistry...');
  const RegistryFactory = new ethers.ContractFactory(
    PoXRegistry.abi,
    PoXRegistry.bytecode,
    wallet
  );
  
  const registry = await RegistryFactory.deploy(reputationAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log(`✅ PoXRegistry deployed at: ${registryAddress}\n`);
  
  // 3. Deploy ChallengeManager
  console.log('📝 Deploying ChallengeManager...');
  const ChallengeFactory = new ethers.ContractFactory(
    ChallengeManager.abi,
    ChallengeManager.bytecode,
    wallet
  );
  
  const challengeManager = await ChallengeFactory.deploy(
    registryAddress,
    reputationAddress
  );
  await challengeManager.waitForDeployment();
  const challengeManagerAddress = await challengeManager.getAddress();
  console.log(`✅ ChallengeManager deployed at: ${challengeManagerAddress}\n`);
  
  // 4. Authorize contracts
  console.log('🔐 Authorizing contracts...');
  const tx = await reputation.setAuthorized(registryAddress, challengeManagerAddress);
  await tx.wait();
  console.log('✅ Contracts authorized!\n');
  
  // Verify deployment
  console.log('🔍 Verifying deployment...');
  const totalExperiments = await registry.totalExperiments();
  console.log(`Total experiments: ${totalExperiments}`);
  
  const reputationScore = await reputation.reputation(wallet.address);
  console.log(`Deployer reputation: ${reputationScore}\n`);
  
  // Save addresses
  const addresses = {
    REPUTATION_ADDRESS: reputationAddress,
    REGISTRY_ADDRESS: registryAddress,
    CHALLENGE_MANAGER_ADDRESS: challengeManagerAddress,
    DEPLOYER: wallet.address,
    NETWORK: 'Filecoin Calibration',
    CHAIN_ID: 314159,
    DEPLOYED_AT: new Date().toISOString()
  };
  
  const envContent = Object.entries(addresses)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync(path.join(__dirname, '..', '.env.deployed'), envContent);
  console.log('💾 Addresses saved to .env.deployed\n');
  
  console.log('=== DEPLOYMENT COMPLETE ===');
  console.log(`Reputation:       ${reputationAddress}`);
  console.log(`PoXRegistry:      ${registryAddress}`);
  console.log(`ChallengeManager: ${challengeManagerAddress}`);
  console.log(`\nExplorer: https://calibration.filscan.io/address/${registryAddress}`);
  
  console.log('\n📋 Next steps:');
  console.log('1. Add these addresses to your .env file');
  console.log('2. Run: python HPLC_traces/GenerateTraces.py');
  console.log('3. Run: node scripts/upload-experiments.mjs');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
