import { ethers } from 'ethers';
import RegistryABI from './abis/PoXRegistrySecure.json';
import ChallengeManagerABI from './abis/ChallengeManagerSecure.json';
import ReputationABI from './abis/ReputationSecure.json';

// Contract addresses from deployment
export const ADDRESSES = {
  registry: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS!,
  challengeManager: process.env.NEXT_PUBLIC_CHALLENGE_MANAGER_ADDRESS!,
  reputation: process.env.NEXT_PUBLIC_REPUTATION_ADDRESS!,
} as const;

export const CHAIN_ID = 314159; // Filecoin Calibration

// Get provider
export function getProvider() {
  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL || 
    'https://api.calibration.node.glif.io/rpc/v1'
  );
}

// Get signer (MetaMask)
export async function getSigner() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask not found');
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
}

// Contract instances
export function getRegistry(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    ADDRESSES.registry,
    RegistryABI.abi,
    signerOrProvider
  );
}

export function getChallengeManager(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    ADDRESSES.challengeManager,
    ChallengeManagerABI.abi,
    signerOrProvider
  );
}

export function getReputation(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(
    ADDRESSES.reputation,
    ReputationABI.abi,
    signerOrProvider
  );
}

// Helper: Check if on correct network
export async function checkNetwork() {
  const provider = getProvider();
  const network = await provider.getNetwork();
  return Number(network.chainId) === CHAIN_ID;
}
