"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { VocData } from "@/lib/types"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Wind } from "lucide-react"

interface VocAnalyzerProps {
  data: VocData
}

export function VocAnalyzer({ data }: VocAnalyzerProps) {
  return (
    <Card className="h-full border-border bg-card flex flex-col">
      <CardHeader className="pb-0 px-3 pt-0.5 shrink-0">
        <CardTitle className="text-sm font-mono tracking-tight flex items-center gap-1.5">
          <Wind className="h-3 w-3 text-muted-foreground" />
          AIR QUALITY MONITOR
        </CardTitle>
        <CardDescription className="text-[9px] font-mono leading-none mt-0">
          {data.labZone} • Sensor Array {data.sensorId}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-[200px] px-3 pb-2 pt-0">
        <div className="grid grid-cols-4 gap-1.5 mb-0.5 shrink-0">
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Avg VOC</div>
            <div className="text-sm font-mono font-bold text-[hsl(var(--chart-3))] mt-0.5 leading-none">
              {data.metrics.avgVoc}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">PM2.5 Level</div>
            <div className="text-sm font-mono font-bold text-[hsl(var(--chart-1))] mt-0.5 leading-none">
              {data.metrics.pm25Level}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Ventilation</div>
            <div className="text-sm font-mono font-bold text-primary mt-0.5 leading-none">
              {data.metrics.ventilation}
            </div>
          </div>
          <div className="p-1.5 bg-muted/30 rounded-md border border-border flex flex-col justify-between h-full">
            <div className="text-[8px] text-muted-foreground font-mono uppercase truncate">Status</div>
            <div className="text-sm font-mono font-bold text-green-500 mt-0.5 leading-none">{data.metrics.status}</div>
          </div>
        </div>

        <ChartContainer
          config={{
            voc: {
              label: "VOCs (ppb)",
              color: "hsl(var(--chart-1))",
            },
            particulates: {
              label: "Particulates",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="flex-1 w-full min-h-0"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dataPoints} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                minTickGap={30}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="var(--color-voc)"
                fontSize={12}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="var(--color-particulates)"
                fontSize={12}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" className="font-mono" />}
                cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Line
                yAxisId="left"
                dataKey="voc"
                type="monotone"
                stroke="var(--color-voc)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                dataKey="particulates"
                type="monotone"
                stroke="var(--color-particulates)"
                strokeWidth={2}
                dot={false}
              />
              <Legend
                verticalAlign="top"
                height={24}
                iconType="circle"
                wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "10px", paddingTop: "0px" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
