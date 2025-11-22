"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { HplcData } from "@/lib/types"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { FlaskConical } from "lucide-react"

interface HplcAnalyzerProps {
  data: HplcData
}

export function HplcAnalyzer({ data }: HplcAnalyzerProps) {
  return (
    <Card className="h-full border-border bg-card flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-mono tracking-tight flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          CHROMATOGRAM ANALYZER
        </CardTitle>
        <CardDescription className="text-xs font-mono">
          Sample ID: {data.sampleId} • Method: {data.method}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-[300px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
          <div className="p-3 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[10px] text-muted-foreground font-mono uppercase truncate">Peak Purity</div>
            <div className="text-lg font-mono font-bold text-primary mt-1">{data.metrics.peakPurity}</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[10px] text-muted-foreground font-mono uppercase truncate">Retention Shift</div>
            <div className="text-lg font-mono font-bold text-yellow-500 mt-1">{data.metrics.retentionShift}</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[10px] text-muted-foreground font-mono uppercase truncate">Area %</div>
            <div className="text-lg font-mono font-bold text-primary mt-1">{data.metrics.areaPercent}</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[10px] text-muted-foreground font-mono uppercase truncate">Status</div>
            <div className="text-lg font-mono font-bold text-green-500 mt-1">{data.metrics.status}</div>
          </div>
        </div>

        <ChartContainer
          config={{
            experimental: {
              label: "Experimental",
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
            <AreaChart data={data.dataPoints} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "12px", paddingTop: "0px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
