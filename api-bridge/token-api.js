import 'dotenv/config';
import fetch from 'node-fetch';

const TOKEN_API_BASE = 'https://api.thegraph.market/token-api';
const JWT_TOKEN = process.env.THE_GRAPH_TOKEN_API_JWT;

// Get token balance for an address
export async function getTokenBalance(chain, address, tokenAddress) {
  const url = `${TOKEN_API_BASE}/${chain}/tokens/${tokenAddress}/balances/${address}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`
    }
  });
  
  return await response.json();
}

// Get token price
export async function getTokenPrice(chain, tokenAddress) {
  const url = `${TOKEN_API_BASE}/${chain}/tokens/${tokenAddress}/price`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`
    }
  });
  
  return await response.json();
}

// Get token metadata
export async function getTokenMetadata(chain, tokenAddress) {
  const url = `${TOKEN_API_BASE}/${chain}/tokens/${tokenAddress}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`
    }
  });
  
  return await response.json();
}

// Get NFT metadata
export async function getNFTMetadata(chain, contractAddress, tokenId) {
  const url = `${TOKEN_API_BASE}/${chain}/nfts/${contractAddress}/${tokenId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`
    }
  });
  
  return await response.json();
}

// Get token holders
export async function getTokenHolders(chain, tokenAddress, limit = 10) {
  const url = `${TOKEN_API_BASE}/${chain}/tokens/${tokenAddress}/holders?limit=${limit}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`
    }
  });
  
  return await response.json();
}
