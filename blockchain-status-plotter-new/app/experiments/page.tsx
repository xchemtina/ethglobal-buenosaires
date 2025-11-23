import { fetchUnifiedExperiments, fetchDashboardStats } from '@/lib/experiment-service';
import { PoXExperiments } from '@/components/dashboard/pox-experiments';
import { Monitor } from 'lucide-react';

export const revalidate = 10; // Revalidate every 10 seconds

export default async function ExperimentsPage() {
  const [experiments, stats] = await Promise.all([
    fetchUnifiedExperiments(),
    fetchDashboardStats(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  PoX Network
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                  Proof-of-Experiment • Filecoin Cloud • Live
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm font-mono">
              <div>
                <div className="text-xs text-muted-foreground">Total Experiments</div>
                <div className="text-2xl font-bold">{stats.totalExperiments}</div>
              </div>
              
              <div className="text-orange-600 dark:text-orange-400">
                <div className="text-xs">HPLC</div>
                <div className="text-2xl font-bold">{stats.hplcCount}</div>
              </div>
              
              <div className="text-green-600 dark:text-green-400">
                <div className="text-xs">Air Quality</div>
                <div className="text-2xl font-bold">{stats.airQualityCount}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="h-[calc(100vh-180px)]">
          <PoXExperiments 
            initialExperiments={experiments} 
            initialStats={stats} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div>
              ETH Global Buenos Aires • {new Date().getFullYear()}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM ONLINE
              </span>
              
              <span className="opacity-50">|</span>
              
              <span>
                Auto-refresh: 30s
              </span>
              
              <span className="opacity-50">|</span>
              
              <a 
                href="https://calibration.filscan.io/address/0xA6Fa61924F06DB9A84B92182B69F5C08F3176554"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                View on Explorer ↗
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
