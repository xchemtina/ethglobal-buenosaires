import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import fs from 'fs';
import * as tokenAPI from './token-api.js';

// Load local experiments as fallback
const localExperiments = JSON.parse(fs.readFileSync('./experiments.json', 'utf8'));

const app = express();
const PORT = process.env.PORT || 3000;

// Your subgraph endpoint
const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/1716277/chimia-dao-po-x/v0.0.1';
const GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'PoX API Bridge' });
});

// Query experiments - natural language friendly
app.get('/experiments', async (req, res) => {
  const { submitter, limit = 10, orderBy = 'submittedAt', orderDirection = 'desc' } = req.query;
  
  let whereClause = '';
  if (submitter) {
    whereClause = `where: { submitter: "${submitter.toLowerCase()}" }`;
  }

  const query = `
    query GetExperiments {
      experiments(
        first: ${limit}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
        ${whereClause}
      ) {
        id
        submitter
        cid
        dataHash
        metricsHash
        difficulty
        initialRV
        submittedAt
      }
    }
  `;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (GRAPH_API_KEY) {
      headers['Authorization'] = `Bearer ${GRAPH_API_KEY}`;
    }
    
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    
    // Fallback to local experiments if subgraph is empty
    if (data.data?.experiments && data.data.experiments.length === 0) {
      const filtered = submitter 
        ? localExperiments.filter(e => e.submitter.toLowerCase() === submitter.toLowerCase())
        : localExperiments;
      
      res.json({
        data: {
          experiments: filtered.slice(0, limit).map(e => ({
            id: e.id,
            submitter: e.submitter,
            cid: e.cid,
            dataHash: e.dataHash,
            metricsHash: e.metricsHash,
            difficulty: e.difficulty,
            initialRV: e.initialRV,
            submittedAt: Math.floor(new Date(e.submittedAt).getTime() / 1000).toString()
          }))
        },
        _source: 'local-fallback'
      });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific experiment by ID
app.get('/experiment/:id', async (req, res) => {
  const { id } = req.params;

  const query = `
    query GetExperiment {
      experiment(id: "${id}") {
        id
        submitter
        cid
        dataHash
        metricsHash
        difficulty
        initialRV
        submittedAt
      }
    }
  `;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (GRAPH_API_KEY) {
      headers['Authorization'] = `Bearer ${GRAPH_API_KEY}`;
    }
    
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reputation stats for an address
app.get('/reputation/:address', async (req, res) => {
  const { address } = req.params;

  const query = `
    query GetReputation {
      experiments(
        where: { submitter: "${address.toLowerCase()}" }
        orderBy: submittedAt
        orderDirection: desc
      ) {
        id
        difficulty
        initialRV
        submittedAt
      }
    }
  `;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (GRAPH_API_KEY) {
      headers['Authorization'] = `Bearer ${GRAPH_API_KEY}`;
    }
    
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    
    if (data.data?.experiments) {
      const experiments = data.data.experiments;
      const totalExperiments = experiments.length;
      const totalDifficulty = experiments.reduce((sum, exp) => sum + parseInt(exp.difficulty), 0);
      const avgDifficulty = totalExperiments > 0 ? totalDifficulty / totalExperiments : 0;

      res.json({
        address,
        totalExperiments,
        totalDifficulty,
        avgDifficulty: avgDifficulty.toFixed(2),
        experiments: experiments.slice(0, 5) // Last 5 experiments
      });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generic GraphQL endpoint for custom queries
app.post('/graphql', async (req, res) => {
  const { query, variables } = req.body;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (GRAPH_API_KEY) {
      headers['Authorization'] = `Bearer ${GRAPH_API_KEY}`;
    }
    
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OpenAI function calling schema endpoint
app.get('/openai-schema', (req, res) => {
  res.json({
    functions: [
      {
        name: 'get_experiments',
        description: 'Retrieve HPLC experiment data from the PoX registry. Can filter by submitter address and control ordering.',
        parameters: {
          type: 'object',
          properties: {
            submitter: {
              type: 'string',
              description: 'Ethereum address of the experiment submitter (optional)'
            },
            limit: {
              type: 'integer',
              description: 'Maximum number of results to return (default: 10)',
              default: 10
            },
            orderBy: {
              type: 'string',
              enum: ['timestamp', 'difficulty', 'initialRV'],
              description: 'Field to order results by',
              default: 'timestamp'
            }
          }
        }
      },
      {
        name: 'get_experiment_by_id',
        description: 'Get detailed information about a specific experiment by its ID',
        parameters: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The experiment ID (composite key: experimentId-submitter)'
            }
          },
          required: ['id']
        }
      },
      {
        name: 'get_reputation',
        description: 'Get reputation statistics and experiment history for a given Ethereum address',
        parameters: {
          type: 'object',
          properties: {
            address: {
              type: 'string',
              description: 'Ethereum address to query'
            }
          },
          required: ['address']
        }
      }
    ]
  });
});

// === The Graph Token API endpoints ===

// Get token balance
app.get('/token/:chain/:tokenAddress/balance/:address', async (req, res) => {
  try {
    const { chain, tokenAddress, address } = req.params;
    const data = await tokenAPI.getTokenBalance(chain, address, tokenAddress);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get token price
app.get('/token/:chain/:tokenAddress/price', async (req, res) => {
  try {
    const { chain, tokenAddress } = req.params;
    const data = await tokenAPI.getTokenPrice(chain, tokenAddress);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get token metadata
app.get('/token/:chain/:tokenAddress', async (req, res) => {
  try {
    const { chain, tokenAddress } = req.params;
    const data = await tokenAPI.getTokenMetadata(chain, tokenAddress);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get NFT metadata
app.get('/nft/:chain/:contractAddress/:tokenId', async (req, res) => {
  try {
    const { chain, contractAddress, tokenId } = req.params;
    const data = await tokenAPI.getNFTMetadata(chain, contractAddress, tokenId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get token holders
app.get('/token/:chain/:tokenAddress/holders', async (req, res) => {
  try {
    const { chain, tokenAddress } = req.params;
    const { limit = 10 } = req.query;
    const data = await tokenAPI.getTokenHolders(chain, tokenAddress, limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`PoX API Bridge running on http://localhost:${PORT}`);
  console.log(`Connected to subgraph: ${SUBGRAPH_URL}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /health`);
  console.log(`  GET  /experiments?submitter=<address>&limit=<n>`);
  console.log(`  GET  /experiment/:id`);
  console.log(`  GET  /reputation/:address`);
  console.log(`  POST /graphql (custom queries)`);
  console.log(`  GET  /openai-schema (function definitions for OpenAI)`);
});
