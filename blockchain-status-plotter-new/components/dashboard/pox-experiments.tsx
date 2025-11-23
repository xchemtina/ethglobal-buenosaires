"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Beaker, Wind, Database, Atom, Shield } from "lucide-react"
import type { UnifiedExperiment } from "@/lib/experiment-service"
import { ChallengeDialog } from "./challenge-dialog"

type PoXExperimentsProps = {
  initialExperiments: UnifiedExperiment[]
  initialStats: {
    totalExperiments: number
    hplcCount: number
    airQualityCount: number
    nmrCount: number
    lastSync: string
  }
}

export function PoXExperiments({ initialExperiments, initialStats }: PoXExperimentsProps) {
  const [experiments, setExperiments] = useState(initialExperiments)
  const [stats, setStats] = useState(initialStats)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  async function refreshData() {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/experiments')
      if (response.ok) {
        const data = await response.json()
        setExperiments(data.experiments)
        setStats(data.stats)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Failed to refresh experiments:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-none pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-mono">
              PoX Experiments Registry
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              On-chain • Filecoin Cloud • Live Feed
            </CardDescription>
          </div>
          
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          <div className="bg-muted/50 rounded p-2">
            <div className="text-[10px] text-muted-foreground font-mono">TOTAL</div>
            <div className="text-lg font-bold font-mono">{stats.totalExperiments}</div>
          </div>
          
          <div className="bg-orange-500/10 rounded p-2">
            <div className="text-[10px] text-orange-600 dark:text-orange-400 font-mono flex items-center gap-1">
              <Beaker className="h-2.5 w-2.5" />
              HPLC
            </div>
            <div className="text-lg font-bold font-mono text-orange-600 dark:text-orange-400">
              {stats.hplcCount}
            </div>
          </div>
          
          <div className="bg-green-500/10 rounded p-2">
            <div className="text-[10px] text-green-600 dark:text-green-400 font-mono flex items-center gap-1">
              <Wind className="h-2.5 w-2.5" />
              AIR
            </div>
            <div className="text-lg font-bold font-mono text-green-600 dark:text-green-400">
              {stats.airQualityCount}
            </div>
          </div>
          
          <div className="bg-blue-500/10 rounded p-2">
            <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono flex items-center gap-1">
              <Atom className="h-2.5 w-2.5" />
              NMR
            </div>
            <div className="text-lg font-bold font-mono text-blue-600 dark:text-blue-400">
              {stats.nmrCount}
            </div>
          </div>
          
          <div className="bg-purple-500/10 rounded p-2">
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">SYNC</div>
            <div className="text-xs font-mono text-purple-600 dark:text-purple-400">
              {lastUpdate.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
        {experiments.map((exp) => (
          <ExperimentCard key={exp.id} experiment={exp} />
        ))}
        
        {experiments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Database className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm font-mono">No experiments on-chain</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ExperimentCard({ experiment }: { experiment: UnifiedExperiment }) {
  const [challengeOpen, setChallengeOpen] = useState(false)
  const isAirQuality = experiment.type === 'AIR_QUALITY'
  const isNMR = experiment.type === 'NMR'
  
  const typeColors = {
    HPLC: { border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400' },
    AIR_QUALITY: { border: 'border-green-500', text: 'text-green-600 dark:text-green-400' },
    NMR: { border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  }
  
  const colors = typeColors[experiment.type]
  
  const typeIcons = {
    HPLC: <Beaker className="h-2.5 w-2.5 mr-1" />,
    AIR_QUALITY: <Wind className="h-2.5 w-2.5 mr-1" />,
    NMR: <Atom className="h-2.5 w-2.5 mr-1" />,
  }
  
  return (
    <div className="border rounded-lg p-3 bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge 
              variant="outline" 
              className={`text-[10px] font-mono px-1.5 py-0 ${colors.border} ${colors.text}`}
            >
              {typeIcons[experiment.type]}
              {experiment.type}
            </Badge>
            
            <span className="text-xs font-mono text-muted-foreground">
              #{experiment.id}
            </span>
          </div>
          
          <div className="text-sm font-bold font-mono truncate">
            {experiment.sampleId}
          </div>
        </div>
        
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-[10px] text-muted-foreground font-mono">DIFFICULTY</div>
          <div className={`text-lg font-bold font-mono ${colors.text}`}>
            {experiment.difficulty}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground">
        <div className="truncate">
          <span className="opacity-70">CID:</span>{' '}
          <code className="text-[9px]">{experiment.cid.slice(0, 12)}...</code>
        </div>
        
        <div className="text-right">
          <span className="opacity-70">
            {new Date(experiment.submittedAt * 1000).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
      
      {/* Submitter address and challenge button */}
      <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
        <div className="text-[9px] font-mono text-muted-foreground">
          <span className="opacity-70">Submitter:</span>{' '}
          <code className="text-purple-600 dark:text-purple-400">
            {experiment.submitter.slice(0, 6)}...{experiment.submitter.slice(-4)}
          </code>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[10px] px-2"
          onClick={() => setChallengeOpen(true)}
        >
          <Shield className="h-3 w-3 mr-1" />
          Review
        </Button>
      </div>
      
      <ChallengeDialog
        experimentId={experiment.id}
        sampleId={experiment.sampleId}
        open={challengeOpen}
        onOpenChange={setChallengeOpen}
      />
    </div>
  )
}
