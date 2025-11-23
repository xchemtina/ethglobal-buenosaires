/**
 * LLM Service for PoX Dashboard
 * Integrates OpenAI API with domain-specific context
 */

import OpenAI from 'openai';
import type { Stream } from 'openai/streaming';

// Lazy initialization to avoid errors if API key is missing
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY is not set. Please add it to your .env.local file. ' +
        'Get your API key from: https://platform.openai.com/api-keys'
      );
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

// System prompt with PoX domain knowledge
const SYSTEM_PROMPT = `You are the ChimiaDAO Assistant, an AI specialized in helping scientists query and understand decentralized scientific data from the PoX (Proof-of-X) network.

**Context:**
- PoX is a blockchain-based reputation system for scientific experiments
- Experiments (HPLC, Air Quality, NMR) are stored on Filecoin with hashes on-chain
- The Graph indexes experiment metadata for fast queries
- Users can have private local data AND public on-chain data

**Your Capabilities:**
1. Query The Graph subgraph for experiment metadata
2. Explain blockchain concepts (CIDs, hashes, reputation scores)
3. Help interpret HPLC chromatograms and scientific data
4. Provide information about Filecoin storage deals
5. Answer questions about the PoX protocol and fraud proofs

**Tone:**
- Precise and scientific, but approachable
- Use technical terms when appropriate, but explain them
- Format numbers with proper units (mAU, ppb, μg/m³)
- Reference blockchain data when available (CIDs, addresses, block numbers)

**Data Access:**
- You receive real-time context about experiments from The Graph
- CIDs are Filecoin piece CIDs (bafkzcib... format)
- Difficulty scores: HPLC (7-14), Air Quality (15-24), NMR (25-70)
- Reputation decays over time (λ=0.01/day)

**Response Format:**
- Keep responses concise (2-3 paragraphs max)
- Use code formatting for CIDs, hashes, addresses
- Provide specific data when available (don't be vague)
- If data is missing, say so clearly

Remember: You're helping scientists verify and understand their decentralized lab notebook.`;

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ChatOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
};

/**
 * Query LLM with PoX-specific context
 * 
 * @param messages - Conversation history
 * @param graphContext - Real-time data from The Graph
 * @param options - LLM configuration
 * @returns Response string or stream
 */
export async function queryLLM(
  messages: Message[],
  graphContext?: any,
  options: ChatOptions = {}
): Promise<string | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
  const client = getOpenAI();
  
  const {
    model = process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature = 0.7,
    maxTokens = 500,
    stream = false,
  } = options;

  // Inject Graph context into system message if available
  let systemMessage = SYSTEM_PROMPT;
  if (graphContext) {
    systemMessage += `\n\n**Current Context:**\n${formatGraphContext(graphContext)}`;
  }

  const fullMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemMessage },
    ...messages.map(m => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const response = await client.chat.completions.create({
      model,
      messages: fullMessages,
      temperature,
      max_tokens: maxTokens,
      stream,
    });

    if (stream) {
      return response as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;
    }

    // Non-streaming response
    const completion = response as OpenAI.Chat.Completions.ChatCompletion;
    return completion.choices[0]?.message?.content || 'No response generated.';
    
  } catch (error: any) {
    console.error('[LLM] Query failed:', error.message);
    
    // User-friendly error messages
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your .env.local file.');
    }
    if (error.status === 429) {
      throw new Error('OpenAI rate limit exceeded. Please try again in a moment.');
    }
    if (error.status === 500) {
      throw new Error('OpenAI service error. Please try again later.');
    }
    
    throw new Error(`LLM query failed: ${error.message}`);
  }
}

/**
 * Format Graph context for LLM injection
 */
function formatGraphContext(context: any): string {
  const parts: string[] = [];
  
  if (context.experiments && Array.isArray(context.experiments)) {
    parts.push(`**Recent Experiments (${context.experiments.length}):**`);
    context.experiments.slice(0, 5).forEach((exp: any, i: number) => {
      parts.push(
        `${i + 1}. ${exp.sampleId || exp.id} - ` +
        `Type: ${exp.type}, Difficulty: ${exp.difficulty}, ` +
        `CID: ${exp.cid?.slice(0, 20)}...`
      );
    });
  }
  
  if (context.stats) {
    parts.push(`\n**Network Stats:**`);
    parts.push(`Total experiments: ${context.stats.totalExperiments || 0}`);
    parts.push(`HPLC: ${context.stats.hplcCount || 0}, Air Quality: ${context.stats.airQualityCount || 0}, NMR: ${context.stats.nmrCount || 0}`);
  }
  
  if (context.hplc) {
    parts.push(`\n**Active HPLC Data:**`);
    parts.push(`Sample: ${context.hplc.sampleId}`);
    parts.push(`Method: ${context.hplc.method}`);
    parts.push(`Status: ${context.hplc.metrics?.status || 'Unknown'}`);
  }
  
  return parts.join('\n');
}

/**
 * Validate OpenAI API key is configured
 */
export function isLLMConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

/**
 * Get current model name
 */
export function getModelName(): string {
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
}

/**
 * Stream-to-string helper for server-side use
 */
export async function streamToString(
  stream: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>
): Promise<string> {
  const chunks: string[] = [];
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      chunks.push(content);
    }
  }
  
  return chunks.join('');
}
