# PoX System - Complete Testing Guide

**Status**: All components built, ready for end-to-end testing

## ✅ What's Ready

1. Smart contracts deployed on Filecoin Calibration
2. 16 experiments uploaded and on-chain
3. AI Watcher agent (with Synapse SDK + fixed hashing)
4. Mock GraphQL server (replaces The Graph for testing)
5. Chat interface (GPT-4 powered)

## 🧪 Testing Sequence

### Test 1: Verify Blockchain Data ✅

```bash
cd scripts
node query-experiments.mjs
```

**Expected**: See 16 experiments with CIDs, difficulty scores, etc.  
**Status**: ✅ WORKS

### Test 2: Start Mock GraphQL Server

Terminal 1:
```bash
cd ai-agent
node mock-graphql-server.mjs
```

**Expected**: Server starts on port 8000, shows 10 experiments loaded  
**Status**: 🧪 TO TEST

### Test 3: Test AI Watcher Agent

Terminal 2:
```bash
cd ai-agent
export PRIVATE_KEY=<your_key>
export SUBGRAPH_URL=http://localhost:8000/subgraphs/name/pox
node watcher.mjs
```

**Expected**:
- Connects to mock GraphQL
- Fetches experiments
- Downloads data from Filecoin (via Synapse)
- Analyzes HPLC traces
- Verifies hashes
- Creates journal entries in `journal/experiment-*.json`

**Success Criteria**:
- ✅ Synapse download works
- ✅ Hash verification passes
- ✅ Journal entries created
- ✅ No fraud detected (hashes should match!)

**Status**: 🧪 TO TEST

### Test 4: Test Chat Interface

Terminal 3:
```bash
cd ai-agent
export OPENAI_API_KEY=<your_key>
export SUBGRAPH_URL=http://localhost:8000/subgraphs/name/pox
node chat-interface.mjs
```

**Test queries**:
```
You: Show me all experiments
You: What's the average difficulty score?
You: Explain experiment #8 in detail
You: Are there any fraudulent experiments?
You: Who submitted the most experiments?
```

**Expected**:
- GPT-4 calls appropriate tools
- Queries mock GraphQL server
- Loads journal entries for details
- Returns natural language answers

**Status**: 🧪 TO TEST

## 🐛 Known Issues to Watch For

### Issue 1: Synapse Download Timeout
**Symptom**: `fetchRawData()` times out  
**Fix**: Synapse might be slow - increase timeout or retry logic

### Issue 2: Hash Mismatch
**Symptom**: `dataMatch: false` or `metricsMatch: false`  
**Cause**: Hash computation in watcher doesn't match upload script  
**Fix**: Check trace file structure - might have extra/missing fields

### Issue 3: GPT-4 Rate Limits
**Symptom**: Chat interface errors  
**Fix**: Add retry logic or reduce query frequency

### Issue 4: Mock GraphQL Bugs
**Symptom**: Queries return no results  
**Fix**: Check query parsing logic in mock server

## 📊 Success Metrics

For a successful demo, you need:

1. **At least 3 experiments** fully processed in journal
2. **Hash verification passes** (no fraud detected)
3. **Chat interface** answers at least 3 different query types
4. **Full flow works**: Blockchain → Filecoin → Analysis → Journal → Chat

## 🚀 Next Steps After Testing

### If Everything Works:
1. Deploy actual Graph subgraph (optional - mock works for demo!)
2. Add frontend UI for chat interface
3. Add more AI enrichment (ML models, GPT summaries)

### If Issues Found:
1. Debug step-by-step (don't try to fix everything at once)
2. Test each component in isolation first
3. Check logs for specific error messages

## 🎯 Demo Script

**"Let me show you our decentralized scientific journal system."**

### Part 1: Show Raw Data (30 sec)
```bash
# Terminal: query-experiments.mjs
# Show: 16 experiments on Filecoin
# Point out: CIDs, hashes, difficulty scores
```

### Part 2: Show AI Agent (1 min)
```bash
# Terminal: watcher.mjs running
# Show: Real-time analysis as it processes experiments
# Point out: Hash verification (fraud detection), journal creation
```

### Part 3: Show Chat Interface (2 min)
```bash
# Terminal: chat-interface.mjs
# Ask: "Show me all experiments"
# Ask: "Are there any fraudulent ones?"
# Ask: "Explain experiment #8"
# Point out: Natural language over decentralized data
```

### Part 4: Explain Architecture (1 min)
- Data on Filecoin (immutable)
- Events on blockchain (verifiable)
- AI agents watch and analyze (automated)
- Chat interface queries (accessible)
- Anyone can verify (trustless)

**Key message**: This is `n×(AI+Scientist) >>> "AI-Scientist"` - we multiply human capacity through trustless infrastructure, not replace scientists with AI.

## ⚡ Quick Test Commands

```bash
# Full test sequence (run in separate terminals):

# Terminal 1: Mock Graph
cd ai-agent && node mock-graphql-server.mjs

# Terminal 2: Watcher (wait for 1-2 experiments to process)
cd ai-agent && PRIVATE_KEY=$PRIVATE_KEY node watcher.mjs

# Terminal 3: Chat
cd ai-agent && OPENAI_API_KEY=$OPENAI_API_KEY node chat-interface.mjs

# Terminal 4: Check journal
ls -la ai-agent/journal/
cat ai-agent/journal/experiment-8.json | jq .
```

## 🔍 Debugging Tips

### Check if experiments.json exists:
```bash
cat scripts/experiments.json | jq '. | length'
```

### Test Synapse download manually:
```bash
cd scripts
node -e "
import { Synapse } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.FILECOIN_CLOUD_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const synapse = await Synapse.create({ signer: wallet });
const data = await synapse.download('bafkzcibd5n3qyx5q4uv3hbo67zykupp4dt2arlc4eul7hlvok4y4anxp7j5ezyq4');
console.log('Downloaded:', data.sampleId, 'Peaks:', data.metrics.peakCount);
"
```

### Test mock GraphQL:
```bash
curl -X POST http://localhost:8000/subgraphs/name/pox \
  -H "Content-Type: application/json" \
  -d '{"query": "{ experiments(first: 2) { id cid difficulty } }"}'
```

## 📝 Clarification Questions for You

1. **Do you want me to test these now?** Or do you want to run them yourself?

2. **For the chat interface** - should we create a simple web UI, or is CLI fine for the demo?

3. **Which experiments should we focus on?** All 16 or just the first 10?

4. **Do you have your OpenAI API key ready?** Need it for chat testing.

5. **Time allocation** - we have ~11 hours left. How much time for testing vs building frontend vs preparing demo slides?
