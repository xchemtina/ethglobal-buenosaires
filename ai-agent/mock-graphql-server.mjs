#!/usr/bin/env node
/**
 * Mock GraphQL Server
 * 
 * Simulates The Graph subgraph for testing the AI agent and chat interface.
 * Returns synthetic data for the first 10 experiments from experiments.json
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8000;

// Load experiments from the query script output
function loadExperiments() {
  const experimentsPath = path.join(__dirname, '..', 'scripts', 'experiments.json');
  
  if (!fs.existsSync(experimentsPath)) {
    console.log('⚠️  experiments.json not found. Run: cd scripts && node query-experiments.mjs');
    return [];
  }
  
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  
  // Convert to GraphQL-compatible format
  return data.slice(0, 10).map(exp => ({
    id: exp.id,
    submitter: exp.submitter.toLowerCase(),
    cid: exp.cid,
    dataHash: exp.dataHash,
    metricsHash: exp.metricsHash,
    difficulty: exp.difficulty.toString(),
    initialRV: exp.initialRV.toString(),
    submittedAt: exp.submittedAt.toString()
  }));
}

/**
 * Simple GraphQL query parser (handles The Graph query structure)
 */
function executeQuery(query, variables) {
  const experiments = loadExperiments();
  
  // Handle different query types
  if (query.includes('experiments(')) {
    // Parse filters from query
    let filtered = [...experiments];
    
    // Handle where clause
    if (query.includes('where:')) {
      const whereMatch = query.match(/where:\s*\{([^}]+)\}/);
      if (whereMatch) {
        const whereClause = whereMatch[1];
        
        // id_gt filter
        if (whereClause.includes('id_gt')) {
          const idGt = variables?.lastId || '0';
          filtered = filtered.filter(e => parseInt(e.id) > parseInt(idGt));
        }
        
        // difficulty_gte filter
        if (whereClause.includes('difficulty_gte')) {
          const match = whereClause.match(/difficulty_gte:\s*"(\d+)"/);
          if (match) {
            const minDiff = parseInt(match[1]);
            filtered = filtered.filter(e => parseInt(e.difficulty) >= minDiff);
          }
        }
        
        // submitter filter
        if (whereClause.includes('submitter:')) {
          const match = whereClause.match(/submitter:\s*"(0x[a-fA-F0-9]+)"/);
          if (match) {
            const submitter = match[1].toLowerCase();
            filtered = filtered.filter(e => e.submitter === submitter);
          }
        }
        
        // submittedAt_gte filter
        if (whereClause.includes('submittedAt_gte')) {
          const match = whereClause.match(/submittedAt_gte:\s*"(\d+)"/);
          if (match) {
            const minTime = parseInt(match[1]);
            filtered = filtered.filter(e => parseInt(e.submittedAt) >= minTime);
          }
        }
      }
    }
    
    // Handle first parameter
    const firstMatch = query.match(/first:\s*(\d+|\$first)/);
    if (firstMatch) {
      let limit = 10;
      if (firstMatch[1] === '$first' && variables?.first) {
        limit = parseInt(variables.first);
      } else if (firstMatch[1] !== '$first') {
        limit = parseInt(firstMatch[1]);
      }
      filtered = filtered.slice(0, limit);
    }
    
    // Handle orderBy and orderDirection
    if (query.includes('orderBy:')) {
      const orderByMatch = query.match(/orderBy:\s*(\w+)/);
      const orderDirMatch = query.match(/orderDirection:\s*(\w+)/);
      
      if (orderByMatch) {
        const field = orderByMatch[1];
        const direction = orderDirMatch ? orderDirMatch[1] : 'asc';
        
        filtered.sort((a, b) => {
          const aVal = field === 'id' || field === 'difficulty' || field === 'submittedAt' 
            ? parseInt(a[field]) 
            : a[field];
          const bVal = field === 'id' || field === 'difficulty' || field === 'submittedAt'
            ? parseInt(b[field])
            : b[field];
          
          if (direction === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }
    }
    
    return { data: { experiments: filtered } };
  }
  
  // Handle single experiment query
  if (query.includes('experiment(id:')) {
    const idMatch = query.match(/experiment\(id:\s*\$id\)/);
    if (idMatch && variables?.id) {
      const experiment = experiments.find(e => e.id === variables.id);
      return { data: { experiment: experiment || null } };
    }
  }
  
  // Default: return all experiments
  return { data: { experiments } };
}

/**
 * HTTP server
 */
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.method === 'POST' && req.url === '/subgraphs/name/pox') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { query, variables } = JSON.parse(body);
        
        console.log('📥 Query received:');
        console.log(query.split('\n').slice(0, 5).join('\n') + '...');
        if (variables) {
          console.log('Variables:', JSON.stringify(variables));
        }
        
        const result = executeQuery(query, variables);
        
        console.log(`✅ Returning ${result.data.experiments?.length || 0} experiment(s)\n`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        
      } catch (error) {
        console.error('❌ Error:', error.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors: [{ message: error.message }] }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log('🎭 Mock GraphQL Server Started\n');
  console.log(`📡 Listening on: http://localhost:${PORT}/subgraphs/name/pox`);
  console.log(`📊 Serving ${loadExperiments().length} experiments\n`);
  console.log('💡 Usage:');
  console.log('   1. Keep this running in one terminal');
  console.log('   2. Run watcher.mjs or chat-interface.mjs in another terminal');
  console.log('   3. They will use this instead of The Graph Studio\n');
  console.log('Press Ctrl+C to stop\n');
});
