
**Primary Purpose:** Build a system where chemical lab experiments (HPLC/NMR + sensor logs) are (a) stored immutably on Filecoin via Onchain Cloud SDK, (b) indexed and queried via The Graph Subgraph, and (c) exposed to AI workflows for predictions/challenges — thereby delivering a strong “Use of The Graph for AI Use Cases” story.

**Why We Need This Integration:**

- Filecoin Onchain Cloud gives us a durable, verifiable, decentralised data-storage layer for raw experiment traces, metadata and results.
    
- The Graph Subgraph gives us **queryable metadata**, event-streams, and relational indices across experiments, sensor data, NFTs, challenge status.
    
- The AI/agent workflows require **fast, structured access** to experiment history and results (via The Graph) which then feed model inputs (features extracted from Filecoin-stored data).
    
- Together, this sets us up for the submission category we chose: _“Best Use of The Graph for AI Use Cases”_ — because we’ll show how structured subgraph data + raw data enable AI predictions/alerts.

## Implementation Instructions

Below is a step-by-step instruction set (with rationale) for you to implement.

### **1. Setup Repositories & Branches**

- Create a new branch in the chimiadao-ethglobal-subgraph repo called feature/filecoin-integration.
    
- Ensure you have the Filecoin Onchain Cloud SDK installed in your services repo (if not, add it now).
    
- Create a new folder in the repo (or module) called filecoin_storage_service for storing upload + CID tracking logic.
    
### **2. Schema Update (GraphQL)**

In schema.graphql add/update the following entities:

```
type Experiment @entity {
  id: ID!
  lab: String!
  timestamp: BigInt!
  storageCid: String!
  status: String!            # e.g., “Uploaded”, “Verified”, “Challenged”
  featureSummary: String     # JSON-blob of extracted features (optional)
  predictionScore: Float     # for AI model output
  challengeCount: Int
}

type SensorLog @entity {
  id: ID!
  lab: String!
  timestamp: BigInt!
  sensorType: String!         # e.g., “NOx”, “VOC”, “Temperature”
  value: Float!
}

type ModelRun @entity {
  id: ID!
  experiment: Experiment!
  timestamp: BigInt!
  predictionScore: Float!
  contextCids: [String!]      # array of CIDs for context raw data
}

type Challenge @entity {
  id: ID!
  experiment: Experiment!
  challenger: String!         # wallet address or identifier
  timestamp: BigInt!
  verdict: String!            # “Pending”, “Success”, “Failed”
}
```

**Rationale:** We need the core experiment record with storageCid linking to Filecoin, sensor logs for environment context, model runs for AI workflows, and challenge records for verification flows.

### **3. Mappings / Event Handling**

In mappings.ts (stick to typescript) implement handlers for contract events:

- ExperimentUploaded(event)
    
    - Trigger: when a lab uploads experiment raw data & the NFT/contract emits event with experimentId + CID.
        
    - Action: create a new Experiment entity with status = “Uploaded”, lab = event.lab, timestamp = event.timestamp, storageCid = event.cid.
        
    
- SensorLogSubmitted(event)
    
    - Trigger: sensor log submission contract event (lab, sensorType, value, timestamp).
        
    - Action: create a new SensorLog entity.
        
- ModelRunCompleted(event)
    
    - Trigger: when the AI model runs and writes to contract event (experimentId, runId, predictionScore, contextCids).
        
    - Action: link to existing Experiment, create ModelRun entity, and update Experiment.predictionScore and maybe featureSummary.

- ChallengeSubmitted(event) & ChallengeVerdict(event)
    
    - Trigger: when someone challenges an experiment, and when verdict is reached.
        
    - Action: create/update Challenge entity; update Experiment.status accordingly.
### **4. Filecoin Storage Integration**

In filecoin_storage_service module:

- Use Filecoin Onchain Cloud SDK to upload raw data files (e.g., experiment ZIP containing trace, JSON summary, metadata).
    
- After upload, retrieve cid and dealId (if applicable) and record in contract transaction.
    
- Contract should emit ExperimentUploaded(...) with experimentId, lab, timestamp, storageCid.
    
- Ensure metadata format: include experiment summary, pointers to raw trace, perhaps hash of content for integrity.
    
- Keep storage simple for hack: use NFT.Storage (Filecoin-backed) or direct Filecoin sdk.
### **5. AI/Agent Workflow Integration**

- Build a service (could be a serverless function) that periodically queries The Graph subgraph for new Experiment entities where predictionScore is null AND timestamp is older than X minutes.
    
- For each such experiment:
    
    - Fetch storageCid → retrieve raw data from IPFS/Filecoin.
        
    - Extract features (HPLC peak counts, NMR shift patterns, sensor logs around timestamp).
        
    - Run your ML model (could be simple regression/classifier) → produce predictionScore.
        
    - Submit result to contract via ModelRun transaction (which triggers ModelRunCompleted event).
### **6. Submission & Documentation**

- Document in README.md or docs/architecture.md the flow: storage → contract → events → subgraph → AI → results → UI.
    
- Prepare GraphQL query examples for demo.
    
- Prepare environment setup instructions: .env keys for Filecoin SDK, subgraph endpoints, contract addresses.
    
- Link everything with the prize category rationale: show how The Graph enables AI Use Cases (model runs, dataset context) and how Filecoin provides the raw data substrate.
    
- **Deliverables:**
    
    1. Schema updates & mappings in subgraph repo.
        
    2. Storage service module for Filecoin uploads and contract event emission.
        
    3. AI/agent service that consumes subgraph data → raw data → prediction → contract write.
        
    4. UI front-end with upload, list, detail view, challenge functionality, dashboard.
        
    5. Documentation explaining architecture, how to run locally, demo script.
    
- **Why this matters:** This layered architecture directly targets The Graph’s “AI Use Case” prize: we’ll show a dataset indexed via The Graph, feeding AI model context, driving on-chain actions. It also strongly leverages Filecoin for data integrity and storage, aligning with our partner prize strategy.