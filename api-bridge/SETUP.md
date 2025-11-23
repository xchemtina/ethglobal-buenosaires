# OpenAI Integration Setup

## Quick Start

### 1. Add your API keys

Open `.env` and paste both keys:

```bash
# api-bridge/.env
OPENAI_API_KEY=sk-proj-your-openai-key-here
THE_GRAPH_API_KEY=your-graph-api-key-here
PORT=3001
```

**Where to get these keys:**
- **OpenAI API Key**: https://platform.openai.com/api-keys
- **The Graph API Key**: Your deploy key from The Graph Studio (the one you used with `graph auth`)

### 2. Start the API bridge

In one terminal:
```bash
npm start
```

You should see:
```
PoX API Bridge running on http://localhost:3001
Connected to subgraph: https://api.studio.thegraph.com/query/1716277/chimia-dao-po-x/v0.0.1
```

### 3. Test the OpenAI integration

In another terminal:
```bash
npm run test-openai
```

This will:
- Connect to OpenAI using your API key
- Query your subgraph for experiment data
- Return natural language answers

## Example Conversation

```
🤔 User: How many experiments have been submitted in total?

🔧 Calling: get_experiments({"limit":10})
📊 Result: {"data":{"experiments":[...]}}

💬 Assistant: Based on the data, there are currently X experiments 
registered in the PoX system on Arbitrum One...
```

## Architecture

```
┌─────────────┐
│ Your Query  │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│   OpenAI    │─────▶│  API Bridge  │
│  (GPT-4)    │      │  (port 3001) │
└─────────────┘      └──────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  The Graph    │
                    │   Subgraph    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Arbitrum One  │
                    │  (Blockchain) │
                    └───────────────┘
```

## What Questions Can You Ask?

Examples:
- "How many experiments have been submitted?"
- "What's the average difficulty of experiments?"
- "Show me the most recent experiments"
- "What experiments has address 0x... submitted?"
- "What's the reputation score for address 0x...?"
- "Which experiment has the highest difficulty?"

## Customizing

Edit `openai-client.js` to:
- Add more example queries
- Change the GPT model (gpt-4, gpt-3.5-turbo, etc.)
- Modify the system prompt
- Add more function tools

## Production Deployment

Once tested locally:

1. Deploy API bridge to production (Railway/Render/Fly.io)
2. Update `.env`:
   ```bash
   API_BASE=https://your-production-url.com
   ```
3. Use the OpenAI client from any application

## Troubleshooting

**Error: OPENAI_API_KEY not set**
- Make sure `.env` file exists
- Check that your API key is valid

**Error: ECONNREFUSED**
- Start the API bridge: `npm start`

**No experiments returned**
- Check if your contracts have any registered experiments
- Verify the subgraph is syncing: https://thegraph.com/studio/subgraph/chimia-dao-po-x
