import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API Bridge URL (change to production URL when deployed)
const API_BASE = process.env.API_BASE || 'http://localhost:3001';

// Function definitions for OpenAI
const tools = [
  {
    type: "function",
    function: {
      name: "get_experiments",
      description: "Retrieve HPLC experiment data from the PoX registry. Can filter by submitter address and control ordering.",
      parameters: {
        type: "object",
        properties: {
          submitter: {
            type: "string",
            description: "Ethereum address of the experiment submitter (optional)"
          },
          limit: {
            type: "integer",
            description: "Maximum number of results to return (default: 10)",
            default: 10
          },
          orderBy: {
            type: "string",
            enum: ["submittedAt", "difficulty", "initialRV"],
            description: "Field to order results by",
            default: "submittedAt"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_experiment_by_id",
      description: "Get detailed information about a specific experiment by its ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The experiment ID (composite key: experimentId-submitter)"
          }
        },
        required: ["id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_reputation",
      description: "Get reputation statistics and experiment history for a given Ethereum address",
      parameters: {
        type: "object",
        properties: {
          address: {
            type: "string",
            description: "Ethereum address to query"
          }
        },
        required: ["address"]
      }
    }
  }
];

// Function to call the API bridge
async function callFunction(functionName, args) {
  let url;
  
  switch (functionName) {
    case 'get_experiments':
      const params = new URLSearchParams();
      if (args.submitter) params.append('submitter', args.submitter);
      if (args.limit) params.append('limit', args.limit);
      if (args.orderBy) params.append('orderBy', args.orderBy);
      url = `${API_BASE}/experiments?${params}`;
      break;
      
    case 'get_experiment_by_id':
      url = `${API_BASE}/experiment/${args.id}`;
      break;
      
    case 'get_reputation':
      url = `${API_BASE}/reputation/${args.address}`;
      break;
      
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
  
  const response = await fetch(url);
  return await response.json();
}

// Main chat function
async function chat(userMessage) {
  console.log(`\n🤔 User: ${userMessage}\n`);
  
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant that answers questions about HPLC experiments registered in the PoX (Proof-of-X) system on Arbitrum One. Use the provided functions to query the blockchain data indexed by The Graph."
    },
    {
      role: "user",
      content: userMessage
    }
  ];
  
  let response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    tools: tools,
    tool_choice: "auto"
  });
  
  // Handle function calls
  while (response.choices[0].message.tool_calls) {
    const message = response.choices[0].message;
    messages.push(message);
    
    // Execute each function call
    for (const toolCall of message.tool_calls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 Calling: ${functionName}(${JSON.stringify(args)})`);
      
      const result = await callFunction(functionName, args);
      
      console.log(`📊 Result: ${JSON.stringify(result, null, 2).substring(0, 200)}...`);
      
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result)
      });
    }
    
    // Get final response with function results
    response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      tools: tools,
      tool_choice: "auto"
    });
  }
  
  const finalMessage = response.choices[0].message.content;
  console.log(`\n💬 Assistant: ${finalMessage}\n`);
  
  return finalMessage;
}

// Example usage
async function main() {
  try {
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY not set in .env file');
      process.exit(1);
    }
    
    // Example queries
    const queries = [
      "Show me the first 10 experiments",
      // "What's the average difficulty of all experiments?",
      // "Show me the most recent 5 experiments"
    ];
    
    // Run first query
    await chat(queries[0]);
    
    // Uncomment to run all queries
    // for (const query of queries) {
    //   await chat(query);
    // }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure the API bridge is running: npm start');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { chat, tools };
