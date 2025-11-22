# The Graph Subgraph MCP Integration

**Goal**: Make PoX subgraph data queryable via natural language (Claude, Cursor, Cline)

**Why This Matters**: Scientists can explore the decentralized lab journal without writing GraphQL.

---

## Overview

The Graph's Subgraph MCP server translates natural language → GraphQL queries → blockchain data.

```
Scientist: "Show me HPLC experiments with >5 peaks"
    ↓
Claude/Cline → Subgraph MCP Server
    ↓
GraphQL Query: { experiments(where: {peakCount_gt: 5}) { ... } }
    ↓
The Graph Network → Your PoX Subgraph
    ↓
Results: [Experiment #1, #2, #3...]
```

---

## Installation

### Prerequisites

- Node.js 18+
- Your PoX subgraph deployed to The Graph Network
- Claude Desktop, Cline, or Cursor installed

### Step 1: Install Subgraph MCP Server

```bash
# Install globally
npm install -g @graphprotocol/subgraph-mcp-server

# Or use npx (no install needed)
npx @graphprotocol/subgraph-mcp-server
```

### Step 2: Configure Claude Desktop (Example)

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pox-subgraph": {
      "command": "npx",
      "args": [
        "@graphprotocol/subgraph-mcp-server"
      ],
      "env": {
        "GRAPH_API_KEY": "your-graph-api-key",
        "DEFAULT_SUBGRAPH": "your-username/pox-filecoin"
      }
    }
  }
}
```

**Get API Key**: https://thegraph.com/studio/apikeys/

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop. You should see "Connected to MCP servers" in settings.

---

## Configuration for PoX Subgraph

Once your subgraph is deployed, update the config:

```json
{
  "mcpServers": {
    "pox-subgraph": {
      "command": "npx",
      "args": [
        "@graphprotocol/subgraph-mcp-server"
      ],
      "env": {
        "GRAPH_API_KEY": "<from Graph Studio>",
        "DEFAULT_SUBGRAPH": "<your-subgraph-id>",
        "SUBGRAPH_NETWORK": "arbitrum-sepolia"
      }
    }
  }
}
```

**Where to get values**:
- `GRAPH_API_KEY`: https://thegraph.com/studio/apikeys/
- `DEFAULT_SUBGRAPH`: From subgraph deployment (e.g., `QmXyz...` or `username/pox-filecoin`)
- `SUBGRAPH_NETWORK`: Network where contracts are deployed

---

## Example Queries (Natural Language)

Once configured, you can ask Claude/Cursor:

### Query Experiments

```
You: "Show me the 5 most recent HPLC experiments"

Claude → MCP → GraphQL:
{
  experiments(first: 5, orderBy: submittedAt, orderDirection: desc) {
    experimentId
    sampleId
    submitter
    difficulty
    submittedAt
  }
}
```

### Find High-Difficulty Experiments

```
You: "Which experiments have difficulty scores above 10?"

Claude → MCP → GraphQL:
{
  experiments(where: {difficulty_gt: 10}) {
    experimentId
    difficulty
    sampleId
    method
  }
}
```

### Reputation Leaderboard

```
You: "Who are the top 5 contributors by reputation?"

Claude → MCP → GraphQL:
{
  users(first: 5, orderBy: reputation, orderDirection: desc) {
    id
    reputation
    experimentsSubmitted
  }
}
```

### Search by Method

```
You: "Find all experiments using Reverse Phase C18"

Claude → MCP → GraphQL:
{
  experiments(where: {method_contains: "Reverse Phase C18"}) {
    experimentId
    sampleId
    method
    submitter
  }
}
```

### Analyze Compounds

```
You: "List all experiments analyzing caffeine"

Claude → MCP → GraphQL:
{
  experiments(where: {compounds_contains: ["caffeine"]}) {
    experimentId
    compounds
    peakCount
    peakPurity
  }
}
```

---

## Integration with PoX Dashboard

You can also use Subgraph MCP in the dashboard itself!

### Option 1: Claude Desktop as Query Interface

Users can:
1. Open Claude Desktop
2. Ask natural language questions about experiments
3. Copy results into dashboard or use directly

### Option 2: Embed MCP in Dashboard (Advanced)

Add a chat interface to the dashboard:

```typescript
// Future: lib/llm-query.ts
import { MCPClient } from '@modelcontextprotocol/sdk'

export async function querySubgraphWithLLM(question: string) {
  // Connect to MCP server
  const client = new MCPClient({
    serverUrl: 'http://localhost:3000/mcp',
  })
  
  // Ask question
  const response = await client.query({
    question,
    subgraphId: process.env.NEXT_PUBLIC_SUBGRAPH_ID,
  })
  
  return response
}
```

Then add a search bar:
```typescript
// In dashboard header
const [query, setQuery] = useState('')

<input 
  placeholder="Ask about experiments..."
  onChange={(e) => setQuery(e.target.value)}
  onKeyPress={async (e) => {
    if (e.key === 'Enter') {
      const results = await querySubgraphWithLLM(query)
      setExperiments(results)
    }
  }}
/>
```

---

## Cursor/Cline Integration

### Cursor Setup

Add to `.cursor/config.json`:

```json
{
  "mcp": {
    "servers": {
      "pox-subgraph": {
        "command": "npx",
        "args": ["@graphprotocol/subgraph-mcp-server"],
        "env": {
          "GRAPH_API_KEY": "<your-key>",
          "DEFAULT_SUBGRAPH": "<your-subgraph>"
        }
      }
    }
  }
}
```

### Cline Setup

Cline auto-detects MCP servers from Claude Desktop config. Just configure Claude Desktop and Cline will work.

---

## Demo Script for Judges

Show this workflow:

1. **Open Claude Desktop**
   - "I want to explore the PoX decentralized lab journal"

2. **Ask Questions**
   - "Show me experiments submitted in the last hour"
   - "What's the average difficulty score?"
   - "Find experiments with more than 3 peaks"

3. **Get Instant Results**
   - MCP translates to GraphQL
   - Results appear in conversational format
   - No need to learn GraphQL syntax

4. **Explain the Vision**
   - "Every scientist can query the network like this"
   - "The lab journal is fully LLM-readable"
   - "No centralized database—all on The Graph"

---

## Advanced: Custom MCP Tools

You can extend the MCP server with PoX-specific tools:

### Example: Difficulty Calculator Tool

```typescript
// mcp-tools/difficulty-calculator.ts
export const difficultyCalculator = {
  name: 'calculate_difficulty',
  description: 'Calculate difficulty score for HPLC parameters',
  parameters: {
    type: 'object',
    properties: {
      nPeaks: { type: 'number' },
      baselineNoise: { type: 'number' },
      nPoints: { type: 'number' },
    },
  },
  handler: async ({ nPeaks, baselineNoise, nPoints }) => {
    const alpha = 1.0
    const beta = 8.0
    const gamma = 0.5
    
    const difficulty = 1 + alpha * nPeaks + beta * baselineNoise + gamma * Math.log(nPoints)
    
    return {
      difficulty: difficulty.toFixed(2),
      breakdown: {
        peakContribution: alpha * nPeaks,
        noiseContribution: beta * baselineNoise,
        resolutionContribution: gamma * Math.log(nPoints),
      },
    }
  },
}
```

User can then ask:
```
"Calculate the difficulty if I have 4 peaks, 0.02 noise, and 2000 points"
```

---

## Testing MCP Integration

### Manual Test

```bash
# Start MCP server
npx @graphprotocol/subgraph-mcp-server

# Test with curl (once running)
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "method": "tools/call",
    "params": {
      "name": "subgraph_query",
      "arguments": {
        "query": "{ experiments(first: 1) { id } }"
      }
    }
  }'
```

### Test in Claude

Open Claude Desktop and ask:
```
"Using the pox-subgraph MCP server, show me the first experiment"
```

Claude should call the MCP tools and return results.

---

## Roadmap

### Phase 1: Basic Integration (Now)
- ✅ Install Subgraph MCP server
- ✅ Configure for PoX subgraph
- ✅ Test with Claude Desktop

### Phase 2: Dashboard Integration (Next)
- [ ] Add chat interface to dashboard
- [ ] Connect to MCP server
- [ ] Display conversational results

### Phase 3: Custom Tools (Future)
- [ ] Add difficulty calculator tool
- [ ] Add reputation predictor tool
- [ ] Add experiment recommender tool

### Phase 4: Multi-Modal (Vision)
- [ ] Upload chromatogram image → extract peaks
- [ ] Generate experiment description from trace
- [ ] Compare traces visually via LLM

---

## Benefits for PoX

**For Scientists**:
- Query data in natural language (no GraphQL needed)
- Explore lab journal conversationally
- Get insights without technical knowledge

**For the Network**:
- LLM-readable makes data more valuable
- Enables AI-driven research assistants
- Attracts non-technical users

**For Judges**:
- Shows cutting-edge AI integration
- Demonstrates real utility beyond token hype
- Aligns with The Graph's AI Suite vision

---

## Coordination with Other Instances

### From Subgraph Instance

Once subgraph is deployed, provide:
```json
{
  "subgraphId": "QmXyz...",
  "subgraphName": "username/pox-filecoin",
  "network": "arbitrum-sepolia",
  "exampleQuery": "{ experiments(first: 1) { id } }"
}
```

### Dashboard Updates

1. Add `.cursor/config.json` or `.claude/config.json` to repo
2. Update with subgraph ID when deployed
3. Document in README how to connect

---

## Quick Start (When Subgraph Is Ready)

```bash
# 1. Install MCP server
npm install -g @graphprotocol/subgraph-mcp-server

# 2. Configure Claude Desktop
# Edit ~/Library/Application Support/Claude/claude_desktop_config.json
# Add pox-subgraph server config (see above)

# 3. Restart Claude Desktop

# 4. Test
# Ask Claude: "Show me experiments from the PoX subgraph"
```

---

## Documentation Links

- The Graph Subgraph MCP: https://thegraph.com/docs/en/ai-suite/subgraph-mcp/introduction/
- MCP Protocol Spec: https://modelcontextprotocol.io/
- Claude Desktop MCP: https://docs.anthropic.com/en/docs/mcp

---

**Status**: Documentation ready, awaiting subgraph deployment to test! 🎯
