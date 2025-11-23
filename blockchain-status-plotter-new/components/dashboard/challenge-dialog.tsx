"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle, LineChart, Download } from "lucide-react"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

type ChallengeDialogProps = {
  experimentId: number
  sampleId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

type BaselineMethod = 'asls' | 'arpls' | 'flatfit';

type BaselineResult = {
  times: number[]
  baseline: number[]
  corrected: number[]
  quality: {
    baseline_rmse: number
    baseline_range: number
    residual_rmse: number
  }
  method: string
  processing_time_ms: number
}

export function ChallengeDialogEnhanced({ experimentId, sampleId, open, onOpenChange }: ChallengeDialogProps) {
  const [computedHash, setComputedHash] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Baseline correction state
  const [showCorrection, setShowCorrection] = useState(false)
  const [baselineMethod, setBaselineMethod] = useState<BaselineMethod>('flatfit')
  const [isApplyingBaseline, setIsApplyingBaseline] = useState(false)
  const [baselineResult, setBaselineResult] = useState<BaselineResult | null>(null)
  const [experimentData, setExperimentData] = useState<{times: number[], signals: number[]} | null>(null)

  // Load experiment data when dialog opens
  useEffect(() => {
    if (open) {
      loadExperimentData()
    }
  }, [open, experimentId])

  const loadExperimentData = async () => {
    try {
      // TODO: Replace with actual API call to fetch experiment data from Filecoin
      // For now, generate synthetic data
      const times = Array.from({length: 100}, (_, i) => i * 0.1)
      const signals = times.map(t => 
        50 + 5*t + // baseline drift
        100 * Math.exp(-Math.pow((t - 3)/0.5, 2)) + // peak 1
        80 * Math.exp(-Math.pow((t - 7)/0.7, 2)) +  // peak 2
        Math.random() * 2 // noise
      )
      
      setExperimentData({ times, signals })
    } catch (err) {
      console.error('Failed to load experiment data:', err)
    }
  }

  const applyBaselineCorrection = async () => {
    if (!experimentData) {
      setError("No experiment data loaded")
      return
    }

    setIsApplyingBaseline(true)
    setError(null)

    try {
      const response = await fetch("/api/baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          times: experimentData.times,
          signals: experimentData.signals,
          method: baselineMethod,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to apply baseline correction")
      }

      const result: BaselineResult = await response.json()
      setBaselineResult(result)
      setShowCorrection(true)
    } catch (err: any) {
      setError(err.message || "Failed to apply baseline correction")
    } finally {
      setIsApplyingBaseline(false)
    }
  }

  const handleChallenge = async () => {
    if (!computedHash || !computedHash.startsWith("0x") || computedHash.length !== 66) {
      setError("Invalid hash format. Must be 0x followed by 64 hex characters")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/challenge/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experimentId,
          computedMetricsHash: computedHash,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to open challenge")
      }

      setSuccess(true)
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
        setComputedHash("")
        setBaselineResult(null)
        setShowCorrection(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to open challenge")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prepare chart data
  const chartData = experimentData && baselineResult 
    ? experimentData.times.map((t, i) => ({
        time: t,
        original: experimentData.signals[i],
        baseline: baselineResult.baseline[i],
        corrected: baselineResult.corrected[i],
      }))
    : experimentData
    ? experimentData.times.map((t, i) => ({
        time: t,
        original: experimentData.signals[i],
      }))
    : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Peer Review</DialogTitle>
          <DialogDescription>
            Submit data verification request for <span className="font-mono text-foreground">{sampleId}</span> (ID: {experimentId})
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold">Review Submitted!</p>
            <p className="text-sm text-muted-foreground mt-2">Verification request recorded on-chain</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visualization Section */}
            {experimentData && (
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">Chromatogram Analysis</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={baselineMethod} 
                      onValueChange={(v) => setBaselineMethod(v as BaselineMethod)}
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flatfit">FlatFit (fast)</SelectItem>
                        <SelectItem value="asls">AsLS</SelectItem>
                        <SelectItem value="arpls">arPLS</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={applyBaselineCorrection}
                      disabled={isApplyingBaseline}
                      className="h-8 text-xs"
                    >
                      {isApplyingBaseline ? (
                        <><Loader2 className="mr-1 h-3 w-3 animate-spin" /> Applying...</>
                      ) : (
                        <>Apply Baseline Correction</>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="time" 
                        label={{ value: 'Time (min)', position: 'insideBottom', offset: -5 }}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis 
                        label={{ value: 'Intensity', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        contentStyle={{ fontSize: 11 }}
                        formatter={(value: number) => value.toFixed(2)}
                      />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line 
                        type="monotone" 
                        dataKey="original" 
                        stroke="#8884d8" 
                        strokeWidth={1.5}
                        dot={false}
                        name="Original"
                      />
                      {baselineResult && (
                        <>
                          <Line 
                            type="monotone" 
                            dataKey="baseline" 
                            stroke="#ff7300" 
                            strokeWidth={2}
                            dot={false}
                            name="Baseline"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="corrected" 
                            stroke="#00C49F" 
                            strokeWidth={1.5}
                            dot={false}
                            name="Corrected"
                          />
                        </>
                      )}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                {/* Quality Metrics */}
                {baselineResult && (
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t text-xs">
                    <div>
                      <div className="text-muted-foreground">Method</div>
                      <div className="font-mono font-semibold">{baselineResult.method.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Baseline RMSE</div>
                      <div className="font-mono">{baselineResult.quality.baseline_rmse.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Residual RMSE</div>
                      <div className="font-mono">{baselineResult.quality.residual_rmse.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time</div>
                      <div className="font-mono">{baselineResult.processing_time_ms.toFixed(1)}ms</div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Hash Input Section */}
            <div className="space-y-2">
              <Label htmlFor="computedHash">Computed Metrics Hash</Label>
              <Input
                id="computedHash"
                placeholder="0x..."
                value={computedHash}
                onChange={(e) => setComputedHash(e.target.value)}
                className="font-mono text-xs"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Paste the hash computed from your re-analysis of the experiment data
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>Baseline Correction Info:</strong>
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li><strong>FlatFit:</strong> Fast median-based method (~5ms)</li>
                  <li><strong>AsLS:</strong> Asymmetric Least Squares (~50ms)</li>
                  <li><strong>arPLS:</strong> Asymmetric Reweighted (~80ms)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {!success && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleChallenge} disabled={isSubmitting || !computedHash}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Review...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
