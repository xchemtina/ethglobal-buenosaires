/**
 * Filecoin Storage Integration
 * Downloads experiment data from Filecoin using Synapse SDK
 * 
 * Security features:
 * - CID validation before download
 * - Timeout protection (30s primary, 10s fallback)
 * - Retry logic with exponential backoff
 * - In-memory caching with size limits
 * - Error logging and user-friendly messages
 */

import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';
import { CID } from 'multiformats/cid';
import { validateAndSanitizeCID } from './validation';

// Cache to avoid re-downloading (with size limit)
const MAX_CACHE_SIZE = 100; // Max 100 experiments cached
const dataCache = new Map<string, any>();

// Download configuration
const DOWNLOAD_TIMEOUT_MS = 30000; // 30 seconds
const FALLBACK_TIMEOUT_MS = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // Start with 1s, then exponential backoff

/**
 * Retry helper with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY_MS
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    console.log(`[Filecoin] Retry in ${delay}ms... (${retries} attempts remaining)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
  }
}

/**
 * Enforce cache size limit (LRU-style)
 */
function enforceCacheLimit() {
  if (dataCache.size > MAX_CACHE_SIZE) {
    const firstKey = dataCache.keys().next().value;
    if (firstKey) {
      dataCache.delete(firstKey);
      console.log(`[Filecoin] Cache limit reached, evicted oldest entry`);
    }
  }
}

/**
 * Download experiment data from Filecoin using piece CID
 * Uses Synapse SDK for reliable retrieval with retry logic
 * 
 * @param pieceCid - Filecoin piece CID (bafk... format)
 * @returns Parsed experiment data
 * @throws Error if download fails after retries
 */
export async function downloadFromFilecoin(pieceCid: string): Promise<any> {
  // Validate and sanitize CID
  let validatedCid: string;
  try {
    validatedCid = validateAndSanitizeCID(pieceCid);
  } catch (error: any) {
    console.error(`[Filecoin] Invalid CID:`, error.message);
    throw new Error(`Invalid CID format: ${error.message}`);
  }

  // Check cache first
  if (dataCache.has(validatedCid)) {
    console.log(`[Filecoin] Cache hit for ${validatedCid.slice(0, 20)}...`);
    return dataCache.get(validatedCid);
  }

  // Primary download attempt with retry logic
  try {
    console.log(`[Filecoin] Downloading ${validatedCid.slice(0, 20)}...`);

    const data = await retryWithBackoff(async () => {
      // Read-only mode - no private key needed for downloads
      const rpcUrl = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      // For server-side downloads, we can use a dummy signer
      // Synapse downloads are public and don't require signatures
      const dummyWallet = ethers.Wallet.createRandom().connect(provider);

      const synapse = await Synapse.create({ 
        signer: dummyWallet,
        timeout: DOWNLOAD_TIMEOUT_MS,
      });

      // Download data using piece CID
      const dataBytes = await synapse.storage.download(validatedCid);

      // Validate downloaded data is not empty
      if (!dataBytes || dataBytes.length === 0) {
        throw new Error('Downloaded data is empty');
      }

      // Convert bytes to JSON with error handling
      try {
        const dataStr = new TextDecoder().decode(dataBytes);
        const parsed = JSON.parse(dataStr);
        
        console.log(`[Filecoin] Successfully downloaded ${validatedCid.slice(0, 20)}... (${dataBytes.length} bytes)`);
        return parsed;
      } catch (parseError: any) {
        throw new Error(`Failed to parse downloaded data: ${parseError.message}`);
      }
    });

    // Cache successful download
    dataCache.set(validatedCid, data);
    enforceCacheLimit();
    
    return data;

  } catch (error: any) {
    console.error(`[Filecoin] Download failed after retries:`, error.message);
    
    // Fallback: Try IPFS gateways (may not work for fresh uploads)
    try {
      console.log(`[Filecoin] Attempting IPFS gateway fallback...`);
      
      const response = await fetch(`https://ipfs.io/ipfs/${validatedCid}`, {
        signal: AbortSignal.timeout(FALLBACK_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`Gateway returned ${response.status}`);
      }

      const data = await response.json();
      
      // Cache fallback result
      dataCache.set(validatedCid, data);
      enforceCacheLimit();
      
      console.log(`[Filecoin] Gateway fallback successful`);
      return data;

    } catch (fallbackError: any) {
      console.error(`[Filecoin] Gateway fallback also failed:`, fallbackError.message);
      
      // Provide user-friendly error message
      throw new Error(
        `Unable to retrieve experiment data. The data may not be available yet on Filecoin network. ` +
        `Original error: ${error.message}`
      );
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
