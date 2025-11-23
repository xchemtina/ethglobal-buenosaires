"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"

type ChallengeDialogProps = {
  experimentId: number
  sampleId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChallengeDialog({ experimentId, sampleId, open, onOpenChange }: ChallengeDialogProps) {
  const [computedHash, setComputedHash] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to open challenge")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Challenge Experiment</DialogTitle>
          <DialogDescription>
            Open a fraud proof dispute for <span className="font-mono text-foreground">{sampleId}</span> (ID: {experimentId})
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold">Challenge Opened!</p>
            <p className="text-sm text-muted-foreground mt-2">Transaction confirmed on-chain</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
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
                  Download experiment from Filecoin, re-run analysis, and paste the computed hash here
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
                  <strong>How fraud proofs work:</strong>
                  <ol className="list-decimal ml-4 mt-2 space-y-1">
                    <li>Download experiment data using CID from Filecoin</li>
                    <li>Re-run analysis deterministically off-chain</li>
                    <li>Compare your computed hash to on-chain hash</li>
                    <li>If mismatch: open challenge (this dialog)</li>
                    <li>Owner verifies and resolves</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleChallenge} disabled={isSubmitting || !computedHash}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening Challenge...
                  </>
                ) : (
                  "Open Challenge"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
