import { fetchUnifiedExperiments, fetchDashboardStats } from '@/lib/experiment-service';

export default async function TestExperiments() {
  const experiments = await fetchUnifiedExperiments();
  const stats = await fetchDashboardStats();
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">PoX Experiments Test</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Experiments</div>
          <div className="text-2xl font-bold">{stats.totalExperiments}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">HPLC</div>
          <div className="text-2xl font-bold">{stats.hplcCount}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Air Quality</div>
          <div className="text-2xl font-bold">{stats.airQualityCount}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Last Sync</div>
          <div className="text-lg font-bold">{stats.lastSync}</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{exp.sampleId}</h3>
                <p className="text-sm text-gray-500">
                  {exp.type} • Experiment #{exp.id}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">Difficulty</div>
                <div className="text-lg font-bold">{exp.difficulty}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">CID:</span>{' '}
                <code className="text-xs">{exp.cid.slice(0, 24)}...</code>
              </div>
              
              <div>
                <span className="text-gray-500">Submitted:</span>{' '}
                {new Date(exp.submittedAt * 1000).toLocaleString()}
              </div>
            </div>
            
            {exp.data && exp.type === 'AIR_QUALITY' && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">AQI</div>
                    <div className="text-lg font-bold">
                      {(exp.data as any).metrics.air_quality_index.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {(exp.data as any).scenario}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Formaldehyde</div>
                    <div className="text-lg font-bold">
                      {(exp.data as any).metrics.avg_formaldehyde_ppb.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">ppb</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">PM2.5</div>
                    <div className="text-lg font-bold">
                      {(exp.data as any).metrics.avg_pm2_5_ugm3.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">μg/m³</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Data Points</div>
                    <div className="text-lg font-bold">
                      {(exp.data as any).dataPoints?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {exp.data && exp.type === 'HPLC' && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-500">HPLC Trace Data Available</div>
              </div>
            )}
            
            {!exp.data && (
              <div className="mt-4 pt-4 border-t text-sm text-orange-500">
                ⚠️ Data not yet available from IPFS
              </div>
            )}
          </div>
        ))}
        
        {experiments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No experiments found on-chain
          </div>
        )}
      </div>
    </div>
  );
}
