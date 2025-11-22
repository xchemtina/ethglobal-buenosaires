"use client"
import { BlockchainMonitor } from "@/components/dashboard/blockchain-monitor"
import { HplcAnalyzer } from "@/components/dashboard/hplc-analyzer"
import { VocAnalyzer } from "@/components/dashboard/voc-analyzer"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Monitor, FlaskConical, Wind } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  fetchBlockchainTransactions,
  fetchBlockchainStats,
  fetchHplcData,
  fetchVocData,
  uploadHplcDataToChain,
  runHplcAnalysis,
} from "@/lib/data-service"
import type { Transaction, BlockchainStats, HplcData, VocData, AnalysisType } from "@/lib/types"

export function DashboardLayout() {
  const [activeAnalyzer, setActiveAnalyzer] = useState<"hplc" | "voc">("hplc")

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [chainStats, setChainStats] = useState<BlockchainStats | null>(null)
  const [hplcData, setHplcData] = useState<HplcData | null>(null)
  const [vocData, setVocData] = useState<VocData | null>(null)
  const [isLive, setIsLive] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [txData, statsData, hData, vData] = await Promise.all([
        fetchBlockchainTransactions(),
        fetchBlockchainStats(),
        fetchHplcData(),
        fetchVocData(),
      ])

      setTransactions(txData)
      setChainStats(statsData)
      setHplcData(hData)
      setVocData(vData)
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(async () => {
      // Simulate new transaction arrival
      // In a real app, this would be a WebSocket subscription
      const newTx = (await fetchBlockchainTransactions())[0]
      setTransactions((prev) => [newTx, ...prev.slice(0, 19)])
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const handleUpload = async (visibility: "public" | "private") => {
    if (!hplcData) return

    // Update state to UPLOADING and store visibility
    setHplcData((prev) =>
      prev
        ? {
            ...prev,
            metrics: { ...prev.metrics, uploadStatus: "UPLOADING", visibility },
          }
        : null,
    )

    // Perform upload with visibility
    const result = await uploadHplcDataToChain(hplcData.sampleId, visibility)

    // Update state to ON_CHAIN with CID
    setHplcData((prev) =>
      prev
        ? {
            ...prev,
            metrics: {
              ...prev.metrics,
              uploadStatus: "ON_CHAIN",
              cid: result.cid,
            },
          }
        : null,
    )
  }

  const handleRunAnalysis = async (type: AnalysisType) => {
    if (!hplcData) return

    setIsAnalyzing(true)

    try {
      const result = await runHplcAnalysis(type, hplcData)

      setHplcData((prev) => {
        if (!prev) return null
        // Prepend new analysis result
        const newResults = [result, ...(prev.metrics.analysisResults || [])]
        return {
          ...prev,
          metrics: {
            ...prev.metrics,
            analysisResults: newResults,
          },
        }
      })
    } catch (error) {
      console.error("Analysis failed", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!chainStats || !hplcData || !vocData) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground font-mono">
        INITIALIZING SYSTEM...
      </div>
    )
  }

  return (
    <div className="p-2 md:p-4 h-screen flex flex-col gap-3 max-w-[1800px] mx-auto">
      <header className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-primary rounded-sm flex items-center justify-center text-primary-foreground">
            <Monitor className="h-3.5 w-3.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">LabNodes Interface</h1>
            <p className="text-[10px] text-muted-foreground font-mono">Decentralized Compute • Chemical Analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={activeAnalyzer} onValueChange={(v) => setActiveAnalyzer(v as "hplc" | "voc")} className="h-8">
            <TabsList className="h-8">
              <TabsTrigger value="hplc" className="text-xs font-mono px-3 h-6">
                <FlaskConical className="w-3 h-3 mr-2" />
                HPLC
              </TabsTrigger>
              <TabsTrigger value="voc" className="text-xs font-mono px-3 h-6">
                <Wind className="w-3 h-3 mr-2" />
                VOC
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-muted-foreground pl-4 border-l border-border">
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
              ></span>
              {isLive ? "SYSTEM ONLINE" : "FEED PAUSED"}
            </span>
            <span className="opacity-50">|</span>
            <span>v2.4.0-beta</span>
          </div>
        </div>
      </header>

      {/* Mobile View: Carousel for swiping */}
      <div className="md:hidden flex-1 min-h-0">
        <Carousel className="w-full h-full" opts={{ align: "start" }}>
          <CarouselContent className="h-full -ml-4">
            <CarouselItem className="pl-4 h-full">
              <BlockchainMonitor
                transactions={transactions}
                stats={chainStats}
                isLive={isLive}
                onToggleLive={() => setIsLive(!isLive)}
              />
            </CarouselItem>
            <CarouselItem className="pl-4 h-full">
              {activeAnalyzer === "hplc" ? (
                <HplcAnalyzer
                  data={hplcData}
                  onUpload={handleUpload}
                  onRunAnalysis={handleRunAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              ) : (
                <VocAnalyzer data={vocData} />
              )}
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <div className="text-xs text-muted-foreground font-mono">
              Swipe to view panels • Switch analytics via top menu
            </div>
          </div>
        </Carousel>
      </div>

      {/* Desktop View: Grid Layout */}
      <div className="hidden md:grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="h-full min-h-0">
          <BlockchainMonitor
            transactions={transactions}
            stats={chainStats}
            isLive={isLive}
            onToggleLive={() => setIsLive(!isLive)}
          />
        </div>
        <div className="h-full min-h-0">
          {activeAnalyzer === "hplc" ? (
            <HplcAnalyzer
              data={hplcData}
              onUpload={handleUpload}
              onRunAnalysis={handleRunAnalysis}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <VocAnalyzer data={vocData} />
          )}
        </div>
      </div>
    </div>
  )
}
