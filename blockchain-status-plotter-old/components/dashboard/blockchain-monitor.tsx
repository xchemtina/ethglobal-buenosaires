"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Transaction, BlockchainStats } from "@/lib/types"
import { StatusBadge } from "./status-badge"
import { Activity, Box } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlockchainMonitorProps {
  transactions: Transaction[]
  stats: BlockchainStats
  onToggleLive?: () => void
  isLive?: boolean
}

export function BlockchainMonitor({ transactions, stats, onToggleLive, isLive = true }: BlockchainMonitorProps) {
  return (
    <Card className="h-full border-border bg-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-mono tracking-tight flex items-center gap-2">
            <Box className="h-4 w-4 text-muted-foreground" />
            MEMPOOL MONITOR
          </CardTitle>
          <CardDescription className="text-xs font-mono">
            Live transaction stream • Filecoin Cloud / Solana
          </CardDescription>
        </div>
        {onToggleLive && (
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={onToggleLive}>
            <Activity className={`h-4 w-4 ${isLive ? "text-green-500" : "text-muted-foreground"}`} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 mb-6 shrink-0">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono">AVG GAS</span>
            <div className="text-xl font-mono font-bold">{stats.avgGas}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono">PENDING</span>
            <div className="text-xl font-mono font-bold text-yellow-500">{stats.pending}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono">HEIGHT</span>
            <div className="text-xl font-mono font-bold text-blue-500">{stats.blockHeight}</div>
          </div>
        </div>

        <div className="rounded-md border border-border flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 border-b border-border text-xs font-mono text-muted-foreground shrink-0">
            <div className="col-span-2">TX HASH</div>
            <div className="col-span-3">NETWORK</div>
            <div className="col-span-4">NODE</div>
            <div className="col-span-3 text-right">STATUS</div>
          </div>
          <ScrollArea className="flex-1 h-full">
            <div className="divide-y divide-border">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="grid grid-cols-12 gap-2 p-3 text-xs font-mono items-center hover:bg-muted/30 transition-colors"
                >
                  <div className="col-span-2 truncate text-primary font-medium">{tx.id}</div>
                  <div className="col-span-3 flex items-center gap-1">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${tx.network === "Solana" ? "bg-purple-500" : "bg-blue-500"}`}
                    />
                    <span className="truncate text-muted-foreground">{tx.network}</span>
                  </div>
                  <div className="col-span-4 truncate text-muted-foreground">{tx.nodeId}</div>
                  <div className="col-span-3 flex justify-end">
                    <StatusBadge status={tx.status} />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
