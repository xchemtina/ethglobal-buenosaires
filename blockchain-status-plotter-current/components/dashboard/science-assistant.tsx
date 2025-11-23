"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Lock, FileText, Download, Copy, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  saveMessages, 
  loadMessages, 
  logQuery, 
  generateId,
  type StoredMessage 
} from "@/lib/chat-storage"

const ChimiaLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 2v7.31l-4.5 8.19a2 2 0 0 0 1.75 2.96h9.5a2 2 0 0 0 1.75-2.96l-4.5-8.19V2" />
    <path d="M8.5 2h7" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
)

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  id?: string
}

export function ScienceAssistant({ context }: { context: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)

  // Load persisted messages on mount
  useEffect(() => {
    const stored = loadMessages()
    if (stored.length > 0) {
      setMessages(stored.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp),
        id: m.id,
      })))
    } else {
      // Initial welcome message
      setMessages([{
        role: "assistant",
        content: "Hello! I am the ChimiaDAO Assistant powered by GPT-4. I can help you query The Graph metadata, analyze experiments, and explain blockchain concepts.",
        timestamp: new Date(),
        id: generateId(),
      }])
    }
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Persist messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const storedMessages: StoredMessage[] = messages.map(m => ({
        id: m.id || generateId(),
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.getTime(),
      }))
      saveMessages(storedMessages)
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { 
      role: "user" as const, 
      content: input, 
      timestamp: new Date(),
      id: generateId(),
    }
    
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)
    setError(null)

    const startTime = Date.now()

    try {
      // Call real LLM API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg.content },
          ],
          includeGraphContext: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Chat API error')
      }

      const assistantMsg = {
        role: "assistant" as const,
        content: data.response,
        timestamp: new Date(),
        id: generateId(),
      }

      setMessages((prev) => [...prev, assistantMsg])

      // Log query for analytics
      logQuery({
        id: generateId(),
        query: userMsg.content,
        response: data.response,
        timestamp: Date.now(),
        duration: Date.now() - startTime,
        graphContext: data.graphContext,
      })

    } catch (error: any) {
      console.error('[Chat] Error:', error)
      
      setError(error.message || 'Failed to get response')
      
      // Log error
      logQuery({
        id: generateId(),
        query: userMsg.content,
        response: '',
        timestamp: Date.now(),
        duration: Date.now() - startTime,
        error: error.message,
      })
      
      // Show error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error.message}. Please try again or check your API key configuration.`,
          timestamp: new Date(),
          id: generateId(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = (content: string, index: number) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chimia-analysis-${index}-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content)
    setCopiedId(index)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Open ChimiaDAO Assistant"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 border-2 border-primary-foreground/20 animate-in fade-in zoom-in duration-300"
      >
        <ChimiaLogo className="h-8 w-8 text-primary-foreground" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 flex flex-col shadow-2xl border-primary/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 transition-all duration-300 animate-in slide-in-from-bottom-10 max-h-[70vh] min-h-[300px] z-50">
      <CardHeader className="px-4 py-3 border-b border-border flex flex-row items-center justify-between space-y-0 shrink-0 bg-muted/50">
        <CardTitle className="text-sm font-mono flex items-center gap-2">
          <ChimiaLogo className="h-5 w-5 text-primary" />
          CHIMIADAO ASSISTANT
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
            aria-label="Close Assistant"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-2">
          {error && (
            <Alert variant="destructive" className="text-xs">
              <AlertCircle className="h-3 w-3" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs font-mono shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground border border-border rounded-bl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.content.includes("Private") && (
                    <span className="flex items-center gap-1 text-[9px] opacity-80 text-yellow-500 font-bold">
                      <Lock className="h-2 w-2" /> SECURE LOCAL
                    </span>
                  )}
                  {msg.content.includes("Graph") && (
                    <span className="flex items-center gap-1 text-[9px] opacity-80 text-[hsl(var(--chart-1))] font-bold">
                      <FileText className="h-2 w-2" /> ON-CHAIN INDEX
                    </span>
                  )}
                </div>
              </div>

              {msg.role === "assistant" && (
                <div className="flex items-center gap-1 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    onClick={() => handleCopy(msg.content, i)}
                    title="Copy to clipboard"
                    aria-label="Copy message"
                  >
                    {copiedId === i ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    onClick={() => handleExport(msg.content, i)}
                    title="Export to file"
                    aria-label="Export message to file"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 text-xs text-muted-foreground animate-pulse flex items-center gap-2">
                <ChimiaLogo className="h-3 w-3 animate-spin" />
                <span>Querying decentralized knowledge graph...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border mt-auto shrink-0 bg-background/50">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query ChimiaDAO metadata..."
            className="h-9 text-xs font-mono bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 shrink-0 transition-transform active:scale-95"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
