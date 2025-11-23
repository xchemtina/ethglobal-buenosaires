# PoX API Bridge

REST API bridge that exposes The Graph subgraph data for OpenAI function calling.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## Endpoints

### REST Endpoints

- `GET /health` - Health check
- `GET /experiments?submitter=<address>&limit=<n>` - List experiments
- `GET /experiment/:id` - Get specific experiment
- `GET /reputation/:address` - Get reputation stats for address
- `POST /graphql` - Custom GraphQL queries

### OpenAI Integration

- `GET /openai-schema` - Function definitions for OpenAI

## OpenAI Function Calling Integration

### Step 1: Deploy this API

```bash
npm install
npm start
```

For production, deploy to a public URL (Railway, Render, Fly.io, etc.)

### Step 2: Configure OpenAI Functions

Use the schema from `/openai-schema` endpoint. Example with OpenAI SDK:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const tools = [
  {
    type: "function",
    function: {
      name: "get_experiments",
      description: "Retrieve HPLC experiment data from the PoX registry",
      parameters: {
        type: "object",
        properties: {
          submitter: {
            type: "string",
            description: "Ethereum address of submitter (optional)"
          },
          limit: {
            type: "integer",
            description: "Max results (default: 10)"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_reputation",
      description: "Get reputation stats for an Ethereum address",
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

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "user", content: "What experiments has address 0x1234... submitted?" }
  ],
  tools: tools
});
```

### Step 3: Handle Function Calls

When OpenAI calls a function, make the corresponding HTTP request:

```javascript
if (response.choices[0].message.tool_calls) {
  for (const toolCall of response.choices[0].message.tool_calls) {
    const functionName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);
    
    let result;
    if (functionName === 'get_experiments') {
      const params = new URLSearchParams({
        submitter: args.submitter || '',
        limit: args.limit || 10
      });
      const res = await fetch(`http://localhost:3000/experiments?${params}`);
      result = await res.json();
    } else if (functionName === 'get_reputation') {
      const res = await fetch(`http://localhost:3000/reputation/${args.address}`);
      result = await res.json();
    }
    
    // Send result back to OpenAI
    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(result)
    });
  }
}
```

## Example Queries

### Get all experiments
```bash
curl http://localhost:3000/experiments
```

### Get experiments by submitter
```bash
curl http://localhost:3000/experiments?submitter=0xYourAddress
```

### Get reputation for address
```bash
curl http://localhost:3000/reputation/0xYourAddress
```

### Custom GraphQL query
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ experiments(first: 5) { id experimentId difficulty } }"
  }'
```

## OpenAI Use Cases

The LLM can now answer questions like:

- "How many experiments has address 0x123... submitted?"
- "What's the average difficulty of experiments from this address?"
- "Show me the most recent HPLC experiments"
- "What's the highest difficulty experiment ever submitted?"
- "Compare the reputation of these two addresses"

## Environment Variables

- `PORT` - Server port (default: 3000)
- `SUBGRAPH_URL` - Override subgraph endpoint (optional)

## Architecture

```
OpenAI GPT
    ↓ (function call)
API Bridge (Express)
    ↓ (GraphQL query)
The Graph Subgraph
    ↓ (indexed data)
Arbitrum One (blockchain)
```

## Production Deployment

### Railway
```bash
railway login
railway init
railway up
```

### Render
```bash
# Connect GitHub repo to Render
# Set build command: npm install
# Set start command: npm start
```

### Fly.io
```bash
fly launch
fly deploy
```

Once deployed, update the OpenAI integration to use your public URL.
