#!/usr/bin/env node
/**
 * PoX Conversational Interface
 * 
 * Natural language queries over decentralized scientific data
 * 
 * Examples:
 * - "Show me all experiments with more than 5 peaks"
 * - "What was the average difficulty score last week?"
 * - "Which scientists have the highest reputation?"
 * - "Explain experiment #42 in detail"
 * - "Are there any suspicious experiments with mismatched hashes?"
 */

import { ethers } from 'ethers';
import fetch from 'node-fetch';
import fs from 'fs';
import readline from 'readline';

// Configuration
const SUBGRAPH_URL = process.env.SUBGRAPH_URL || 'http://localhost:8000/subgraphs/name/pox';
const FILECOIN_GATEWAY = process.env.FILECOIN_GATEWAY || 'https://api.calibration.node.glif.io/ipfs';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JOURNAL_PATH = './journal';

// System prompt for the AI
const SYSTEM_PROMPT = `You are a scientific data assistant for the PoX (Proof-of-X) decentralized lab journal system.

You have access to:
1. A GraphQL API (The Graph) with experiment metadata
2. Raw HPLC chromatography data stored on Filecoin
3. Analyzed journal entries with peak detection, noise analysis, and fraud verification

Your role is to:
- Answer questions about experiments
- Explain scientific results in accessible language
- Identify trends and patterns
- Flag suspicious data
- Suggest experimental improvements

Available data fields:
- Experiment: id, submitter, cid, dataHash, metricsHash, difficulty, initialRV, submittedAt
- Analysis: peakCount, peaks[], baselineNoise, difficulty, metadata
- Verification: dataMatch, metricsMatch (fraud detection)

Be precise, cite data, and explain scientific concepts clearly.`;

/**
 * Query The Graph with GraphQL
 */
async function queryGraph(graphqlQuery, variables = {}) {
  const response = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: graphqlQuery,
      variables
    })
  });
  
  const result = await response.json();
  if (result.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
  }
  
  return result.data;
}

/**
 * Load journal entry for detailed analysis
 */
function loadJournalEntry(experimentId) {
  const path = `${JOURNAL_PATH}/experiment-${experimentId}.json`;
  
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  
  return null;
}

/**
 * Fetch raw data from Filecoin
 */
async function fetchFromFilecoin(cid) {
  const url = `${FILECOIN_GATEWAY}/${cid}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${cid}`);
  }
  
  return await response.json();
}

/**
 * Function calling tools for the LLM
 */
const TOOLS = [
  {
    type: "function",
    function: {
      name: "query_all_experiments",
      description: "Get a list of all experiments with basic metadata",
      parameters: {
        type: "object",
        properties: {
          first: {
            type: "number",
            description: "Number of experiments to retrieve (default 10)"
          },
          orderBy: {
            type: "string",
            description: "Field to order by: id, difficulty, submittedAt"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_experiment_details",
      description: "Get detailed information about a specific experiment including full analysis",
      parameters: {
        type: "object",
        properties: {
          experimentId: {
            type: "string",
            description: "The experiment ID to retrieve"
          }
        },
        required: ["experimentId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "query_experiments_by_criteria",
      description: "Find experiments matching specific criteria",
      parameters: {
        type: "object",
        properties: {
          minDifficulty: {
            type: "number",
            description: "Minimum difficulty score"
          },
          submitter: {
            type: "string",
            description: "Filter by submitter address"
          },
          afterTimestamp: {
            type: "number",
            description: "Unix timestamp - only return experiments after this time"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_reputation",
      description: "Get reputation statistics for scientists",
      parameters: {
        type: "object",
        properties: {
          address: {
            type: "string",
            description: "Optional: specific scientist address to analyze"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "detect_fraud",
      description: "Find experiments with hash mismatches (potential fraud)",
      parameters: {
        type: "object",
        properties: {}
      }
    }
  }
];

/**
 * Tool implementations
 */
async function query_all_experiments({ first = 10, orderBy = "id" }) {
  const query = `
    query GetExperiments($first: Int!, $orderBy: String!) {
      experiments(first: $first, orderBy: $orderBy, orderDirection: desc) {
        id
        submitter
        cid
        difficulty
        initialRV
        submittedAt
      }
    }
  `;
  
  const data = await queryGraph(query, { first, orderBy });
  return data.experiments;
}

async function get_experiment_details({ experimentId }) {
  // Get from subgraph
  const query = `
    query GetExperiment($id: ID!) {
      experiment(id: $id) {
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
  
  const data = await queryGraph(query, { id: experimentId });
  const experiment = data.experiment;
  
  if (!experiment) {
    return { error: "Experiment not found" };
  }
  
  // Load detailed analysis from journal
  const journal = loadJournalEntry(experimentId);
  
  if (journal) {
    return {
      ...experiment,
      analysis: journal.analysis,
      verification: journal.verification
    };
  }
  
  return experiment;
}

async function query_experiments_by_criteria({ minDifficulty, submitter, afterTimestamp }) {
  let whereClause = [];
  
  if (minDifficulty) {
    whereClause.push(`difficulty_gte: "${minDifficulty}"`);
  }
  if (submitter) {
    whereClause.push(`submitter: "${submitter}"`);
  }
  if (afterTimestamp) {
    whereClause.push(`submittedAt_gte: "${afterTimestamp}"`);
  }
  
  const whereString = whereClause.length > 0 ? `where: { ${whereClause.join(', ')} }` : '';
  
  const query = `
    query FilteredExperiments {
      experiments(${whereString}, orderBy: submittedAt, orderDirection: desc) {
        id
        submitter
        cid
        difficulty
        initialRV
        submittedAt
      }
    }
  `;
  
  const data = await queryGraph(query);
  return data.experiments;
}

async function analyze_reputation({ address }) {
  const query = address ? `
    query GetScientistExperiments($submitter: String!) {
      experiments(where: { submitter: $submitter }) {
        id
        difficulty
        initialRV
        submittedAt
      }
    }
  ` : `
    query AllExperiments {
      experiments {
        submitter
        difficulty
        initialRV
      }
    }
  `;
  
  const variables = address ? { submitter: address } : {};
  const data = await queryGraph(query, variables);
  
  if (address) {
    const experiments = data.experiments;
    const totalRV = experiments.reduce((sum, e) => sum + parseInt(e.initialRV), 0);
    const avgDifficulty = experiments.reduce((sum, e) => sum + parseInt(e.difficulty), 0) / experiments.length;
    
    return {
      address,
      experimentCount: experiments.length,
      totalReputation: totalRV,
      averageDifficulty: avgDifficulty
    };
  } else {
    // Group by submitter
    const bySubmitter = {};
    data.experiments.forEach(exp => {
      if (!bySubmitter[exp.submitter]) {
        bySubmitter[exp.submitter] = { count: 0, totalRV: 0, totalDifficulty: 0 };
      }
      bySubmitter[exp.submitter].count++;
      bySubmitter[exp.submitter].totalRV += parseInt(exp.initialRV);
      bySubmitter[exp.submitter].totalDifficulty += parseInt(exp.difficulty);
    });
    
    return Object.entries(bySubmitter).map(([address, stats]) => ({
      address,
      experimentCount: stats.count,
      totalReputation: stats.totalRV,
      averageDifficulty: stats.totalDifficulty / stats.count
    })).sort((a, b) => b.totalReputation - a.totalReputation);
  }
}

async function detect_fraud() {
  // Load all journal entries and check for hash mismatches
  if (!fs.existsSync(JOURNAL_PATH)) {
    return { error: "No journal entries found" };
  }
  
  const files = fs.readdirSync(JOURNAL_PATH).filter(f => f.endsWith('.json'));
  const suspicious = [];
  
  for (const file of files) {
    const entry = JSON.parse(fs.readFileSync(`${JOURNAL_PATH}/${file}`, 'utf8'));
    
    if (entry.verification && (!entry.verification.dataMatch || !entry.verification.metricsMatch)) {
      suspicious.push({
        experimentId: entry.experimentId,
        submitter: entry.submitter,
        dataMatch: entry.verification.dataMatch,
        metricsMatch: entry.verification.metricsMatch,
        cid: entry.cid
      });
    }
  }
  
  return { suspiciousCount: suspicious.length, experiments: suspicious };
}

/**
 * Execute tool call
 */
async function executeTool(toolName, args) {
  const tools = {
    query_all_experiments,
    get_experiment_details,
    query_experiments_by_criteria,
    analyze_reputation,
    detect_fraud
  };
  
  if (!tools[toolName]) {
    throw new Error(`Unknown tool: ${toolName}`);
  }
  
  return await tools[toolName](args);
}

/**
 * Chat with OpenAI (function calling)
 */
async function chat(userMessage, conversationHistory = []) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set. Set it with: export OPENAI_API_KEY=sk-...');
  }
  
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ];
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages,
      tools: TOOLS,
      tool_choice: 'auto'
    })
  });
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(`OpenAI Error: ${result.error.message}`);
  }
  
  const assistantMessage = result.choices[0].message;
  
  // If the model wants to call tools
  if (assistantMessage.tool_calls) {
    const toolResults = [];
    
    for (const toolCall of assistantMessage.tool_calls) {
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);
      
      console.log(`\n🔧 Calling tool: ${toolName}(${JSON.stringify(toolArgs)})`);
      
      const result = await executeTool(toolName, toolArgs);
      
      toolResults.push({
        tool_call_id: toolCall.id,
        role: "tool",
        name: toolName,
        content: JSON.stringify(result)
      });
    }
    
    // Send tool results back to model
    const finalMessages = [
      ...messages,
      assistantMessage,
      ...toolResults
    ];
    
    const finalResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: finalMessages
      })
    });
    
    const finalResult = await finalResponse.json();
    return finalResult.choices[0].message.content;
  }
  
  return assistantMessage.content;
}

/**
 * Interactive chat loop
 */
async function startChat() {
  console.log('🔬 PoX Conversational Interface\n');
  console.log('Ask me anything about experiments in the decentralized lab journal!\n');
  console.log('Examples:');
  console.log('  - "Show me all experiments"');
  console.log('  - "What\'s the average difficulty score?"');
  console.log('  - "Explain experiment #0 in detail"');
  console.log('  - "Are there any fraudulent experiments?"');
  console.log('  - "Who has the highest reputation?"\n');
  console.log('Type "exit" to quit.\n');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const conversationHistory = [];
  
  const prompt = () => {
    rl.question('You: ', async (input) => {
      const message = input.trim();
      
      if (message.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!');
        rl.close();
        process.exit(0);
      }
      
      if (!message) {
        prompt();
        return;
      }
      
      try {
        conversationHistory.push({ role: "user", content: message });
        
        const response = await chat(message, conversationHistory);
        
        conversationHistory.push({ role: "assistant", content: response });
        
        console.log(`\n🤖 Assistant: ${response}\n`);
      } catch (error) {
        console.error(`\n❌ Error: ${error.message}\n`);
      }
      
      prompt();
    });
  };
  
  prompt();
}

// Start the chat interface
startChat();
