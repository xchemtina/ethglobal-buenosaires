"use client"

import { useEffect, useState } from 'react'
import { fetchAllExperiments, fetchTotalExperiments, type OnChainExperiment } from '@/lib/web3-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestWeb3Page() {
  const [experiments, setExperiments] = useState<OnChainExperiment[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [exps, totalCount] = await Promise.all([
          fetchAllExperiments(),
          fetchTotalExperiments(),
        ])
        setExperiments(exps)
        setTotal(totalCount)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading Experiments...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Web3 Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-bold">Total Experiments:</span> {total}
            </p>
            <p className="text-sm">
              <span className="font-bold">Fetched Experiments:</span> {experiments.length}
            </p>
            <p className="text-sm">
              <span className="font-bold">Registry Contract:</span> 0xA6Fa61924F06DB9A84B92182B69F5C08F3176554
            </p>
            <p className="text-sm">
              <span className="font-bold">Network:</span> Filecoin Calibration
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Registered Experiments</h2>
        {experiments.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <CardTitle className="text-lg font-mono">
                Experiment #{exp.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-bold">Submitter:</span>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {exp.submitter}
                  </p>
                </div>
                <div>
                  <span className="font-bold">Submitted:</span>
                  <p className="text-muted-foreground">
                    {new Date(exp.submittedAt * 1000).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-bold">CID:</span>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {exp.cid}
                  </p>
                </div>
                <div>
                  <span className="font-bold">Difficulty:</span>
                  <p className="text-muted-foreground">{exp.difficulty}</p>
                </div>
                <div>
                  <span className="font-bold">Initial RV:</span>
                  <p className="text-muted-foreground">
                    {exp.initialRV.toLocaleString()} (scaled)
                  </p>
                </div>
                <div>
                  <span className="font-bold">Data Hash:</span>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {exp.dataHash.slice(0, 20)}...
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={exp.blockExplorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View on Filscan Explorer →
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
