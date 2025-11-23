/**
 * Chat Storage Service
 * Persists messages and queries to localStorage with analytics
 */

export type StoredMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  tokens?: number; // OpenAI token usage
};

export type QueryLog = {
  id: string;
  query: string;
  response: string;
  timestamp: number;
  duration: number; // ms
  graphContext?: any;
  error?: string;
};

const MESSAGES_KEY = 'pox_chat_messages';
const QUERIES_KEY = 'pox_query_logs';
const MAX_MESSAGES = 100; // Keep last 100 messages
const MAX_QUERIES = 500; // Keep last 500 queries

/**
 * Save messages to localStorage
 */
export function saveMessages(messages: StoredMessage[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Keep only last MAX_MESSAGES
    const trimmed = messages.slice(-MAX_MESSAGES);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.warn('[Storage] Failed to save messages:', error);
  }
}

/**
 * Load messages from localStorage
 */
export function loadMessages(): StoredMessage[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (!stored) return [];
    
    const messages = JSON.parse(stored);
    
    // Validate structure
    if (!Array.isArray(messages)) {
      console.warn('[Storage] Invalid messages format, resetting');
      return [];
    }
    
    return messages;
  } catch (error) {
    console.warn('[Storage] Failed to load messages:', error);
    return [];
  }
}

/**
 * Clear all messages
 */
export function clearMessages(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(MESSAGES_KEY);
  } catch (error) {
    console.warn('[Storage] Failed to clear messages:', error);
  }
}

/**
 * Log a query for analytics
 */
export function logQuery(log: QueryLog): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(QUERIES_KEY);
    const logs: QueryLog[] = stored ? JSON.parse(stored) : [];
    
    logs.push(log);
    
    // Keep only last MAX_QUERIES
    const trimmed = logs.slice(-MAX_QUERIES);
    localStorage.setItem(QUERIES_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.warn('[Storage] Failed to log query:', error);
  }
}

/**
 * Get query logs for analytics
 */
export function getQueryLogs(limit?: number): QueryLog[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(QUERIES_KEY);
    if (!stored) return [];
    
    const logs = JSON.parse(stored);
    
    if (!Array.isArray(logs)) {
      console.warn('[Storage] Invalid query logs format');
      return [];
    }
    
    return limit ? logs.slice(-limit) : logs;
  } catch (error) {
    console.warn('[Storage] Failed to load query logs:', error);
    return [];
  }
}

/**
 * Get analytics summary
 */
export function getAnalytics() {
  const logs = getQueryLogs();
  
  if (logs.length === 0) {
    return {
      totalQueries: 0,
      avgDuration: 0,
      errorRate: 0,
      popularQueries: [],
    };
  }
  
  const totalQueries = logs.length;
  const avgDuration = logs.reduce((sum, log) => sum + log.duration, 0) / totalQueries;
  const errors = logs.filter(log => log.error).length;
  const errorRate = errors / totalQueries;
  
  // Count query frequency (lowercased, trimmed)
  const queryCount = new Map<string, number>();
  logs.forEach(log => {
    const normalized = log.query.toLowerCase().trim();
    queryCount.set(normalized, (queryCount.get(normalized) || 0) + 1);
  });
  
  // Sort by frequency
  const popularQueries = Array.from(queryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));
  
  return {
    totalQueries,
    avgDuration: Math.round(avgDuration),
    errorRate: (errorRate * 100).toFixed(1) + '%',
    popularQueries,
  };
}

/**
 * Clear query logs
 */
export function clearQueryLogs(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(QUERIES_KEY);
  } catch (error) {
    console.warn('[Storage] Failed to clear query logs:', error);
  }
}

/**
 * Export all data as JSON (for backup/analysis)
 */
export function exportData(): string {
  return JSON.stringify({
    messages: loadMessages(),
    queries: getQueryLogs(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

/**
 * Import data from JSON
 */
export function importData(jsonData: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const data = JSON.parse(jsonData);
    
    if (data.messages && Array.isArray(data.messages)) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(data.messages));
    }
    
    if (data.queries && Array.isArray(data.queries)) {
      localStorage.setItem(QUERIES_KEY, JSON.stringify(data.queries));
    }
    
    return true;
  } catch (error) {
    console.error('[Storage] Failed to import data:', error);
    return false;
  }
}

/**
 * Generate unique ID for messages/logs
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
