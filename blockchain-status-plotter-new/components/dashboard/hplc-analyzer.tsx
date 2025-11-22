"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { HplcData, AnalysisType, HplcDataPoint, IntegratedPeak } from "@/lib/types"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, ReferenceArea } from "recharts"
import {
  FlaskConical,
  CloudUpload,
  CheckCircle2,
  Loader2,
  FileDigit,
  Database,
  Lock,
  Unlock,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface HplcAnalyzerProps {
  data: HplcData
  onUpload?: (visibility: "public" | "private") => void
  onRunAnalysis?: (type: AnalysisType) => Promise<void>
  isAnalyzing?: boolean
}

export function HplcAnalyzer({ data, onUpload, onRunAnalysis, isAnalyzing = false }: HplcAnalyzerProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType>("Peak Integration")
  const [visibility, setVisibility] = useState<"public" | "private">("private")
  const [visualData, setVisualData] = useState<HplcDataPoint[] | null>(null)
  const [peaks, setPeaks] = useState<IntegratedPeak[] | null>(null)

  const handleRunAnalysis = async () => {
    if (!onRunAnalysis) return
    setVisualData(null)
    setPeaks(null)
    onRunAnalysis(selectedAnalysis)
  }

  const latestResult = data.metrics.analysisResults?.[0]

  useEffect(() => {
    setVisualData(null)
    setPeaks(null)
  }, [data.sampleId])

  useEffect(() => {
    if (latestResult && !isAnalyzing) {
      if (latestResult.type === "Baseline Correction" && latestResult.processedData) {
        setVisualData(latestResult.processedData)
        setPeaks(null)
      } else if (latestResult.type === "Peak Integration" && latestResult.detectedPeaks) {
        setPeaks(latestResult.detectedPeaks)
        setVisualData(null)
      } else {
        setVisualData(null)
        setPeaks(null)
      }
    }
  }, [latestResult, isAnalyzing])

  const chartData = visualData || data.dataPoints

  const clearAnalysisView = () => {
    setVisualData(null)
    setPeaks(null)
  }

  return (
    <Card className="h-full border-border bg-card flex flex-col relative overflow-hidden">
      <CardHeader className="pb-0 px-3 pt-0.5 flex flex-row items-start justify-between space-y-0 shrink-0 min-h-0">
        <div className="space-y-0">
          <CardTitle className="text-sm font-mono tracking-tight flex items-center gap-1.5">
            <FlaskConical className="h-3 w-3 text-muted-foreground" />
            CHROMATOGRAM ANALYZER
          </CardTitle>
          <CardDescription className="text-[9px] font-mono leading-none">
            Sample ID: {data.sampleId} • Method: {data.method}
          </CardDescription>
        </div>
        <div className="flex items-center gap-1.5">
          {data.metrics.uploadStatus === "IDLE" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVisibility(visibility === "public" ? "private" : "public")}
              className="h-6 text-[9px] font-mono gap-1 text-muted-foreground hover:text-foreground px-1.5"
            >
              {visibility === "public" ? (
                <>
                  <Unlock className="h-2.5 w-2.5" /> PUBLIC
                </>
              ) : (
                <>
                  <Lock className="h-2.5 w-2.5" /> PRIVATE
                </>
              )}
            </Button>
          )}
          {data.metrics.uploadStatus === "IDLE" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpload?.(visibility)}
              className="h-6 text-[9px] font-mono gap-1 bg-transparent px-1.5"
            >
              <CloudUpload className="h-2.5 w-2.5" />
              SYNC TO CHAIN
            </Button>
          )}
          {data.metrics.uploadStatus === "UPLOADING" && (
            <Button disabled variant="secondary" size="sm" className="h-6 text-[9px] font-mono gap-1.5 px-2">
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
              UPLOADING...
            </Button>
          )}
          {data.metrics.uploadStatus === "ON_CHAIN" && (
            <div className="flex flex-col items-end leading-none">
              <div className="flex items-center text-green-500 text-[9px] font-mono gap-1">
                <CheckCircle2 className="h-2.5 w-2.5" />
                ON-CHAIN ({visibility === "private" ? "ENC" : "PUB"})
              </div>
              <div className="text-[8px] text-muted-foreground font-mono max-w-[80px] truncate mt-0.5">
                CID: {data.metrics.cid}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-[200px] px-3 pb-2 pt-0">
        <div className="flex items-center gap-1.5 mb-0.5 p-1 bg-muted/20 rounded-md border border-border/50 shrink-0">
          <Select value={selectedAnalysis} onValueChange={(v) => setSelectedAnalysis(v as AnalysisType)}>
            <SelectTrigger className="h-6 w-[130px] text-[9px] font-mono border-border/50 bg-background/50 px-2">
              <SelectValue placeholder="Select Analysis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Peak Integration" className="text-[10px]">
                Peak Integration
              </SelectItem>
              <SelectItem value="Purity Check" className="text-[10px]">
                Purity Check
              </SelectItem>
              <SelectItem value="Baseline Correction" className="text-[10px]">
                Baseline Correction
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 text-[9px] font-mono px-2"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing || data.metrics.uploadStatus !== "IDLE"}
          >
            {isAnalyzing ? (
              <Loader2 className="h-2.5 w-2.5 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-2.5 w-2.5 mr-1" />
            )}
            RUN ANALYSIS
          </Button>
          {(visualData || peaks) && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 ml-0.5"
              onClick={clearAnalysisView}
              title="Reset View"
            >
              <RotateCcw className="h-2.5 w-2.5 text-muted-foreground" />
            </Button>
          )}
          {data.metrics.analysisResults && data.metrics.analysisResults.length > 0 && (
            <div className="ml-auto flex items-center gap-1.5 animate-in fade-in slide-in-from-left-5 duration-300">
              <Badge
                variant="outline"
                className="font-mono text-[9px] h-5 px-1.5 bg-background/50 text-muted-foreground"
              >
                {data.metrics.analysisResults[0].type}
              </Badge>
              <span className="text-[10px] font-mono font-bold text-primary">
                {data.metrics.analysisResults[0].value}
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-0.5 shrink-0">
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Peak Purity</div>
            <div className="text-sm font-mono font-bold text-primary mt-0.5 leading-none">
              {data.metrics.peakPurity}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Retention Shift</div>
            <div
              className="text-sm font-mono font-bold text-yellow-500 mt-0.5 truncate leading-none"
              title={data.metrics.retentionShift}
            >
              {data.metrics.retentionShift}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Area %</div>
            <div className="text-sm font-mono font-bold text-primary mt-0.5 leading-none">
              {data.metrics.areaPercent}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Data Source</div>
            <div className="flex items-center gap-1 mt-0.5">
              {data.metrics.uploadStatus === "ON_CHAIN" ? (
                <Database className="h-3 w-3 text-blue-500" />
              ) : (
                <FileDigit className="h-3 w-3 text-muted-foreground" />
              )}
              <span className="text-[10px] font-mono font-bold leading-none">
                {data.metrics.uploadStatus === "ON_CHAIN" ? "FILECOIN" : "LOCAL"}
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            experimental: {
              label: visualData ? "Corrected Data" : "Experimental",
              color: "hsl(var(--chart-1))",
            },
            theoretical: {
              label: "Theoretical",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="flex-1 w-full min-h-0"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillExperimental" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-experimental)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-experimental)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillTheoretical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-theoretical)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-theoretical)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}m`}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" className="font-mono" />}
                cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                dataKey="theoretical"
                type="monotone"
                fill="url(#fillTheoretical)"
                fillOpacity={0.4}
                stroke="var(--color-theoretical)"
                strokeWidth={2}
                stackId="1"
              />
              <Area
                dataKey="experimental"
                type="monotone"
                fill="url(#fillExperimental)"
                fillOpacity={0.4}
                stroke="var(--color-experimental)"
                strokeWidth={2}
                stackId="2"
              />
              {peaks &&
                peaks.map((peak, i) => (
                  <ReferenceArea
                    key={i}
                    x1={peak.startTime}
                    x2={peak.endTime}
                    strokeOpacity={0.3}
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                ))}
              <Legend
                verticalAlign="top"
                height={24}
                iconType="circle"
                wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "10px", paddingTop: "0px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
