/**
 * Filecoin Storage Integration
 * Downloads experiment data from Filecoin using Synapse SDK
 */

import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import { CID } from 'multiformats/cid';

// Cache to avoid re-downloading
const dataCache = new Map<string, any>();

/**
 * Download experiment data from Filecoin using piece CID
 * Uses Synapse SDK for reliable retrieval
 */
export async function downloadFromFilecoin(pieceCid: string): Promise<any> {
  // Check cache first
  if (dataCache.has(pieceCid)) {
    console.log(`[Filecoin] Cache hit for ${pieceCid.slice(0, 20)}...`);
    return dataCache.get(pieceCid);
  }

  try {
    console.log(`[Filecoin] Downloading ${pieceCid.slice(0, 20)}...`);

    // Read-only mode - no private key needed for downloads
    // We'll use a public RPC endpoint
    const rpcUrl = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // For server-side downloads, we can use a dummy signer
    // Synapse downloads are public and don't require signatures
    const dummyWallet = ethers.Wallet.createRandom().connect(provider);

    const synapse = await Synapse.create({ 
      signer: dummyWallet,
      // Add timeout to prevent hanging
      timeout: 30000,
    });

    // Download data using piece CID
    const dataBytes = await synapse.storage.download(pieceCid);

    // Convert bytes to JSON
    const dataStr = new TextDecoder().decode(dataBytes);
    const data = JSON.parse(dataStr);

    // Cache for future requests
    dataCache.set(pieceCid, data);

    console.log(`[Filecoin] Successfully downloaded ${pieceCid.slice(0, 20)}... (${dataBytes.length} bytes)`);
    return data;

  } catch (error: any) {
    console.error(`[Filecoin] Download failed for ${pieceCid}:`, error.message);
    
    // Fallback: Try IPFS gateways (may not work for fresh uploads)
    try {
      console.log(`[Filecoin] Attempting IPFS gateway fallback...`);
      const response = await fetch(`https://ipfs.io/ipfs/${pieceCid}`, {
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Gateway returned ${response.status}`);
      }

      const data = await response.json();
      dataCache.set(pieceCid, data);
      console.log(`[Filecoin] Gateway fallback successful`);
      return data;

    } catch (fallbackError: any) {
      console.error(`[Filecoin] Gateway fallback also failed:`, fallbackError.message);
      throw new Error(`Could not retrieve data from Filecoin or IPFS: ${error.message}`);
    }
  }
}

/**
 * Batch download multiple experiments
 * Returns map of CID -> data (null for failures)
 */
export async function batchDownloadFromFilecoin(
  cids: string[]
): Promise<Map<string, any | null>> {
  const results = new Map<string, any | null>();

  // Download in parallel with concurrency limit
  const BATCH_SIZE = 5;
  for (let i = 0; i < cids.length; i += BATCH_SIZE) {
    const batch = cids.slice(i, i + BATCH_SIZE);
    
    const promises = batch.map(async (cid) => {
      try {
        const data = await downloadFromFilecoin(cid);
        return { cid, data };
      } catch (error) {
        console.warn(`[Filecoin] Failed to download ${cid}:`, error);
        return { cid, data: null };
      }
    });

    const batchResults = await Promise.all(promises);
    batchResults.forEach(({ cid, data }) => {
      results.set(cid, data);
    });
  }

  return results;
}

/**
 * Check if data is available in cache
 */
export function isDataCached(cid: string): boolean {
  return dataCache.has(cid);
}

/**
 * Clear cache (useful for testing)
 */
export function clearCache(): void {
  dataCache.clear();
  console.log('[Filecoin] Cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: dataCache.size,
    cids: Array.from(dataCache.keys()).map(cid => cid.slice(0, 20) + '...'),
  };
}
