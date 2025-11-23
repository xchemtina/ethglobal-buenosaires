"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { GraphEvent, BlockchainStats } from "@/lib/types"
import { Activity, Database, Globe, FileBox } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlockchainMonitorProps {
  events: GraphEvent[]
  stats: BlockchainStats
  onToggleLive?: () => void
  isLive?: boolean
}

export function BlockchainMonitor({ events, stats, onToggleLive, isLive = true }: BlockchainMonitorProps) {
  return (
    <Card className="h-full border-border bg-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-0 px-3 pt-0.5 space-y-0 shrink-0">
        <div className="space-y-0">
          <CardTitle className="text-sm font-mono tracking-tight flex items-center gap-1.5">
            <Database className="h-3 w-3 text-[hsl(var(--chart-3))]" />
            THE GRAPH INDEXER
          </CardTitle>
          <CardDescription className="text-[9px] font-mono leading-none">
            Live event stream • Subgraph: ChimiaDAO-PoX
          </CardDescription>
        </div>
        {onToggleLive && (
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-transparent"
            onClick={onToggleLive}
            aria-label={isLive ? "Pause live feed" : "Resume live feed"}
          >
            <Activity className={`h-3 w-3 ${isLive ? "text-green-500" : "text-muted-foreground"}`} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden px-3 pb-2 pt-0">
        <div className="grid grid-cols-3 gap-1.5 mb-1 shrink-0">
          <div className="space-y-0">
            <span className="text-[8px] text-muted-foreground font-mono block mb-0.5">INDEX RATE</span>
            <div className="text-base font-mono font-bold leading-none">{stats.indexRate}</div>
          </div>
          <div className="space-y-0">
            <span className="text-[8px] text-muted-foreground font-mono block mb-0.5">PENDING</span>
            <div className="text-base font-mono font-bold text-[hsl(var(--chart-2))] leading-none">
              {stats.pendingEvents}
            </div>
          </div>
          <div className="space-y-0">
            <span className="text-[8px] text-muted-foreground font-mono block mb-0.5">BLOCK</span>
            <div className="text-base font-mono font-bold text-[hsl(var(--chart-1))] leading-none">
              {stats.latestBlock}
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-1.5 bg-muted/50 border-b border-border text-[9px] font-mono text-muted-foreground shrink-0">
            <div className="col-span-3">EVENT ID</div>
            <div className="col-span-3">SUBGRAPH</div>
            <div className="col-span-4">EVENT TYPE</div>
            <div className="col-span-2 text-right">STATUS</div>
          </div>
          <ScrollArea className="flex-1 h-full">
            <div className="divide-y divide-border">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="grid grid-cols-12 gap-2 p-1.5 text-[10px] font-mono items-center hover:bg-muted/30 transition-colors"
                >
                  <div className="col-span-3 truncate text-primary font-medium">{evt.id}</div>
                  <div className="col-span-3 flex items-center gap-1">
                    <Globe className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="truncate text-muted-foreground">
                      {evt.subgraph.includes("/") ? evt.subgraph.split("/")[1] : evt.subgraph}
                    </span>
                  </div>
                  <div className="col-span-4 flex flex-col justify-center min-h-[20px]">
                    <span className="truncate text-[hsl(var(--chart-3))] leading-none">{evt.eventName}</span>
                    {evt.cid && (
                      <span className="flex items-center gap-1 text-[8px] text-muted-foreground mt-0.5">
                        <FileBox className="h-2 w-2" />
                        CID: {evt.cid}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end items-center">
                    <div
                      className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        evt.status === "Indexed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {evt.status}
                    </div>
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
