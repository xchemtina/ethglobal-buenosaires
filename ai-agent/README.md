# AI MCP Agent - Decentralized Lab Journal

This is the **automated analysis engine** that creates a decentralized, trustless scientific journal from raw experimental data.

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                   DECENTRALIZED LAB JOURNAL SYSTEM                    │
└──────────────────────────────────────────────────────────────────────┘

1. Scientist submits experiment
   │
   ├─> Raw HPLC data (JSON)
   │   └─> Synapse/Filecoin (CID: QmXxxx...)
   │
   └─> Contract call: PoXRegistry.registerExperiment(cid, hashes, ...)
       └─> Event: ExperimentRegistered(id, submitter, cid, ...)

2. The Graph indexes events
   │
   └─> Subgraph stores: { id, submitter, cid, dataHash, metricsHash }
       └─> GraphQL API: experiments { id cid submitter ... }

3. AI MCP Agent watches subgraph
   │
   ├─> Queries: "Give me experiments I haven't processed"
   │
   ├─> Fetches raw data from Filecoin via CID
   │
   ├─> Runs deterministic analysis:
   │   • Peak detection
   │   • Noise estimation  
   │   • Difficulty scoring
   │
   ├─> Verifies fraud proofs:
   │   • Recomputes dataHash from raw data
   │   • Recomputes metricsHash from analysis
   │   • Compares with on-chain hashes
   │   • Flags mismatches (fraud detection!)
   │
   └─> Publishes enriched journal entry:
       • Local storage: journal/experiment-{id}.json
       • (Future): IPFS/Filecoin for permanent archive
       • (Future): On-chain verification results
```

## Why This Is Powerful

### 1. **Fully Decentralized**
- Data: Filecoin (immutable, permanent)
- Index: The Graph (decentralized indexing)
- Analysis: Anyone can run this agent (deterministic = reproducible)
- Verification: Fraud proofs (trustless validation)

### 2. **Automatic Journal Generation**
- Scientist submits → Journal entry appears automatically
- No manual curation needed
- No central authority
- Results are cryptographically verifiable

### 3. **Trustless Peer Review**
Anyone can:
- Fetch the raw data (CID is public)
- Re-run the analysis (code is deterministic)
- Verify the hashes match
- Challenge fraudulent experiments

### 4. **AI-Augmented**
The agent can be extended to:
- Classify compound types (ML model)
- Suggest experimental improvements
- Cross-reference with literature (RAG)
- Detect anomalies/outliers
- Generate natural language summaries

**Key constraint**: Analysis must be deterministic for fraud proofs to work. Non-deterministic AI (like GPT summaries) can be added as "enrichment" but not used for reputation scoring.

## Setup

```bash
cd ai-agent
npm install ethers node-fetch
```

## Usage

### Option 1: With The Graph Studio

Once your subgraph is deployed:

```bash
export SUBGRAPH_URL="https://api.studio.thegraph.com/query/<your-id>/pox/v0.0.1"
node watcher.mjs
```

### Option 2: Without The Graph (Demo Mode)

The agent can also watch the blockchain directly:

```bash
# Uses blockchain events instead of subgraph
export SKIP_GRAPH=true
node watcher.mjs
```

## What It Does

1. **Watches for new experiments** every 10 seconds
2. **Fetches raw data** from Filecoin using the CID
3. **Runs HPLC analysis**:
   - Detects peaks (retention times, heights, areas)
   - Calculates baseline noise
   - Computes difficulty score
4. **Verifies fraud proofs**:
   - Recomputes dataHash and metricsHash
   - Compares with on-chain values
   - Flags discrepancies
5. **Saves enriched journal entry** with full analysis + verification

## Output Format

Each processed experiment creates a journal entry:

```json
{
  "experimentId": "0",
  "submitter": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "cid": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  "submittedAt": "1700000000",
  "analysis": {
    "peakCount": 3,
    "peaks": [
      {
        "retentionTime": 2.5,
        "area": 150000,
        "height": 0.8
      },
      ...
    ],
    "baselineNoise": 0.02,
    "difficulty": 10.5,
    "metadata": {
      "method": "reversed-phase",
      "solvent": "acetonitrile/water",
      "flowRate": 1.0
    }
  },
  "verification": {
    "dataMatch": true,
    "metricsMatch": true,
    "computedDataHash": "0xabcd...",
    "computedMetricsHash": "0xef01..."
  },
  "processedAt": "2025-11-23T00:00:00.000Z"
}
```

## Extending with Real AI

### Adding ML-Based Compound Classification

```javascript
import * as tf from '@tensorflow/tfjs';
import { loadModel } from './models/compound-classifier';

async function enrichWithAI(analysis, rawData) {
  // Load pre-trained model
  const model = await loadModel();
  
  // Extract features from peaks
  const features = analysis.peaks.map(p => [
    p.retentionTime,
    p.area,
    p.height
  ]);
  
  // Classify compound type (non-deterministic, so not used for scoring)
  const prediction = await model.predict(features);
  
  return {
    ...analysis,
    aiEnrichment: {
      predictedCompounds: prediction.classes,
      confidence: prediction.confidence,
      model: 'compound-classifier-v1',
      note: 'AI prediction - not used for reputation scoring'
    }
  };
}
```

### Adding RAG (Retrieval-Augmented Generation)

```javascript
import { OpenAI } from 'openai';

async function generateSummary(analysis, rawData) {
  const openai = new OpenAI();
  
  const prompt = `
    Analyze this HPLC experiment and provide a scientific summary:
    
    - Peaks detected: ${analysis.peakCount}
    - Retention times: ${analysis.peaks.map(p => p.retentionTime).join(', ')}
    - Baseline noise: ${analysis.baselineNoise}
    - Method: ${analysis.metadata.method}
    
    Provide:
    1. Likely compound identities
    2. Method assessment
    3. Suggested improvements
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });
  
  return {
    ...analysis,
    aiSummary: completion.choices[0].message.content
  };
}
```

## Future: Decentralized Agent Network

Instead of one agent, anyone can run this:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Agent A    │     │   Agent B    │     │   Agent C    │
│  (You)       │     │ (University) │     │  (Company)   │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                             │
                    The Graph Subgraph
                             │
                    Filecoin Raw Data
```

- Multiple independent agents verify the same data
- Consensus = high confidence
- Disagreement = fraud investigation
- Reputation based on verification accuracy

## Conversational Interface

**NEW**: Natural language queries over the decentralized lab journal!

```bash
export OPENAI_API_KEY=sk-...
node chat-interface.mjs
```

### Example Queries

```
You: Show me all experiments
🤖: I found 5 experiments in the system. Here are the details...

You: What's the average difficulty score?
🤖: The average difficulty across all experiments is 8.3...

You: Explain experiment #2 in detail
🤖: Experiment #2 was submitted by 0xABC... It detected 4 peaks at retention times...

You: Are there any fraudulent experiments?
🤖: No fraudulent experiments detected. All hashes match!

You: Who has the highest reputation?
🤖: The scientist at 0xDEF... has the highest reputation with 15000 points...
```

### How It Works

1. GPT-4 with function calling - LLM decides which tools to use
2. GraphQL queries - Fetches data from The Graph
3. Journal analysis - Loads detailed local analysis
4. Natural language responses - Explains scientific data clearly

### Available Tools

- query_all_experiments - List all experiments
- get_experiment_details - Deep dive into specific experiment
- query_experiments_by_criteria - Filter by difficulty, submitter, time
- analyze_reputation - Scientist reputation statistics
- detect_fraud - Find hash mismatches

### Web Interface (TODO)

For the demo, wrap this in a simple web UI:

```html
<!-- Simple chat widget -->
<div id="chat">
  <div id="messages"></div>
  <input id="prompt" placeholder="Ask about experiments..." />
</div>

<script>
  // Call chat-interface.mjs via API endpoint
  fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userInput })
  });
</script>
```

## Demo Narrative

**"We built a decentralized, automated scientific journal where:**
1. Scientists submit raw HPLC data to Filecoin
2. Smart contracts emit events on-chain
3. The Graph indexes experiment metadata
4. AI agents watch for new experiments
5. Agents fetch data, analyze it, verify hashes
6. Enriched journal entries are automatically published
7. Anyone can re-verify and challenge results

**No central authority. No manual curation. Fully trustless."**

This is `n×(AI+Scientist) >>> "AI-Scientist"` in action.
