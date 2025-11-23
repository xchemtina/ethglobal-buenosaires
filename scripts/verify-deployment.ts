import { ethers } from 'ethers';

const REGISTRY = "0x7274813828322CFC254a3E4720d09959638E78bE";
const CHALLENGE_MANAGER = "0x5ed5BCcEb5e5BEbF455734a5d4FD8dadFb5E1083";
const REPUTATION = "0x389Bc238275e37Be753d69E3B0c352667Ac80b83";
const RPC = "https://api.calibration.node.glif.io/rpc/v1";

async function verifyDeployment() {
  console.log('🔍 Verifying PoX Secure Deployment on Filecoin Calibration...\n');
  
  const provider = new ethers.JsonRpcProvider(RPC);
  
  // Check Registry exists
  const registryCode = await provider.getCode(REGISTRY);
  if (registryCode === '0x') {
    console.error('❌ Registry not deployed at', REGISTRY);
    return;
  }
  console.log('✅ Registry deployed at', REGISTRY);
  
  // Check ChallengeManager exists
  const challengeCode = await provider.getCode(CHALLENGE_MANAGER);
  if (challengeCode === '0x') {
    console.error('❌ ChallengeManager not deployed at', CHALLENGE_MANAGER);
    return;
  }
  console.log('✅ ChallengeManager deployed at', CHALLENGE_MANAGER);
  
  // Check Reputation exists
  const reputationCode = await provider.getCode(REPUTATION);
  if (reputationCode === '0x') {
    console.error('❌ Reputation not deployed at', REPUTATION);
    return;
  }
  console.log('✅ Reputation deployed at', REPUTATION);
  
  console.log('\n📊 Reading on-chain state...\n');
  
  // Check total experiments
  const registry = new ethers.Contract(
    REGISTRY,
    ['function totalExperiments() view returns (uint256)'],
    provider
  );
  
  const total = await registry.totalExperiments();
  console.log(`✅ Total experiments: ${total}`);
  
  // Try reading experiment 0 (if exists)
  if (total > 0n) {
    try {
      const getExpABI = ['function getExperiment(uint256) view returns (address submitter, string cid, bytes32 dataHash, bytes32 metricsHash, uint256 difficulty, int256 initialRV, uint256 timestamp, bool challenged)'];
      const registryWithGet = new ethers.Contract(REGISTRY, getExpABI, provider);
      const exp = await registryWithGet.getExperiment(0);
      console.log('✅ Can read experiment 0:', {
        submitter: exp[0],
        cid: exp[1],
        difficulty: exp[4].toString(),
        timestamp: new Date(Number(exp[6]) * 1000).toISOString(),
      });
    } catch (e: any) {
      console.log('⚠️  Cannot read experiment 0:', e.message);
    }
  } else {
    console.log('ℹ️  No experiments yet (expected for new deployment)');
  }
  
  // Check owner
  try {
    const ownerABI = ['function owner() view returns (address)'];
    const registryWithOwner = new ethers.Contract(REGISTRY, ownerABI, provider);
    const owner = await registryWithOwner.owner();
    console.log('✅ Owner address:', owner);
  } catch (e: any) {
    console.log('ℹ️  Cannot read owner:', e.message);
  }
  
  console.log('\n🎉 All contracts verified successfully!');
  console.log('\n📝 Contract Addresses:');
  console.log('Registry:        ', REGISTRY);
  console.log('ChallengeManager:', CHALLENGE_MANAGER);
  console.log('Reputation:      ', REPUTATION);
  console.log('\n🔗 Explorer: https://calibration.filfox.info/en/address/' + REGISTRY);
}

verifyDeployment().catch(console.error);
