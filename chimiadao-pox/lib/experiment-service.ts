/**
 * Unified Experiment Data Service
 * Handles both HPLC and Air Quality experiments from Filecoin
 */

import { fetchAllExperiments, OnChainExperiment } from './web3-service';
import { downloadFromFilecoin } from './filecoin-storage';
import type { AirQualityData, HplcData } from './types';

export type UnifiedExperiment = {
  id: number;
  type: 'HPLC' | 'AIR_QUALITY' | 'NMR';
  sampleId: string;
  cid: string;
  difficulty: number;
  submitter: string;
  submittedAt: number;
  data?: AirQualityData | HplcData | null;
  loading?: boolean;
};

/**
 * Detect experiment type from difficulty score pattern
 * NMR experiments: difficulty 25-70 (peak complexity based)
 * Air quality experiments: difficulty 15-25 (AQI-based)
 * HPLC experiments: difficulty 7-14 (peak-based)
 */
function detectExperimentType(difficulty: number, id: number): 'HPLC' | 'AIR_QUALITY' | 'NMR' {
  // NMR experiments have highest difficulty (25-70)
  if (difficulty >= 25) {
    return 'NMR';
  }
  // Air quality: difficulty 15-24
  if (difficulty >= 15) {
    return 'AIR_QUALITY';
  }
  // HPLC: difficulty < 15
  return 'HPLC';
}

/**
 * Fetch all experiments from chain and enrich with IPFS data
 */
export async function fetchUnifiedExperiments(includeData: boolean = false): Promise<UnifiedExperiment[]> {
  try {
    // Get all on-chain experiments
    const onChainExperiments = await fetchAllExperiments();
    
    // Enrich with type detection and sample ID
    const enriched = await Promise.all(onChainExperiments.map(async (exp) => {
      const type = detectExperimentType(exp.difficulty, exp.id);
      
      let sampleId;
      if (type === 'AIR_QUALITY') {
        sampleId = `AIR-${exp.submittedAt}`;
      } else if (type === 'NMR') {
        sampleId = `NMR-${String(exp.id + 1).padStart(6, '0')}`;
      } else {
        sampleId = `HPLC-${String(exp.id + 1).padStart(4, '0')}`;
      }
      
      // Optionally fetch full data from Filecoin
      let data = null;
      if (includeData && exp.cid) {
        try {
          data = await downloadFromFilecoin(exp.cid);
        } catch (error) {
          console.warn(`Failed to fetch data for experiment ${exp.id}:`, error);
          data = null;
        }
      }
      
      return {
        id: exp.id,
        type,
        sampleId,
        cid: exp.cid,
        difficulty: exp.difficulty,
        submitter: exp.submitter,
        submittedAt: exp.submittedAt,
        data,
      };
    }));
    
    return enriched;
  } catch (error) {
    console.error('Failed to fetch unified experiments:', error);
    return [];
  }
}

/**
 * Fetch just air quality experiments
 */
export async function fetchAirQualityExperiments(): Promise<UnifiedExperiment[]> {
  const all = await fetchUnifiedExperiments();
  return all.filter(exp => exp.type === 'AIR_QUALITY');
}

/**
 * Fetch just HPLC experiments
 */
export async function fetchHplcExperiments(): Promise<UnifiedExperiment[]> {
  const all = await fetchUnifiedExperiments();
  return all.filter(exp => exp.type === 'HPLC');
}

/**
 * Get the latest experiment of any type
 */
export async function fetchLatestExperiment(): Promise<UnifiedExperiment | null> {
  const all = await fetchUnifiedExperiments();
  if (all.length === 0) return null;
  
  // Sort by ID descending (most recent first)
  all.sort((a, b) => b.id - a.id);
  return all[0];
}

/**
 * Format air quality data for dashboard display
 */
export function formatAirQualityForDisplay(data: AirQualityData) {
  const aqiColor = getAQIColor(data.metrics.air_quality_index);
  const aqiLabel = data.scenario.replace('_', ' ').toUpperCase();
  
  return {
    title: `Air Quality - ${data.sampleId}`,
    subtitle: `${data.location} • ${data.device}`,
    primaryMetric: {
      label: 'AQI',
      value: data.metrics.air_quality_index.toFixed(1),
      color: aqiColor,
      status: aqiLabel,
    },
    sensors: data.sensors,
    metrics: [
      {
        label: 'Formaldehyde',
        value: `${data.metrics.avg_formaldehyde_ppb.toFixed(1)} ppb`,
        max: `${data.metrics.max_formaldehyde_ppb.toFixed(1)} ppb`,
      },
      {
        label: 'PM2.5',
        value: `${data.metrics.avg_pm2_5_ugm3.toFixed(1)} μg/m³`,
        max: `${data.metrics.max_pm2_5_ugm3.toFixed(1)} μg/m³`,
      },
      {
        label: 'Temperature',
        value: `${data.metrics.temperature_c.toFixed(1)}°C`,
      },
      {
        label: 'Humidity',
        value: `${data.metrics.humidity_rh.toFixed(1)}%`,
      },
    ],
    chartData: data.dataPoints.map(point => ({
      time: point.time,
      formaldehyde: point.formaldehyde,
      pm2_5: point.pm2_5,
      light: point.light,
    })),
  };
}

function getAQIColor(aqi: number): string {
  if (aqi < 50) return 'green';
  if (aqi < 100) return 'yellow';
  if (aqi < 150) return 'orange';
  if (aqi < 200) return 'red';
  return 'purple';
}

/**
 * Get real-time stats for dashboard header
 */
export async function fetchDashboardStats() {
  try {
    const experiments = await fetchUnifiedExperiments();
    
    const hplcCount = experiments.filter(e => e.type === 'HPLC').length;
    const airQualityCount = experiments.filter(e => e.type === 'AIR_QUALITY').length;
    const nmrCount = experiments.filter(e => e.type === 'NMR').length;
    
    // Get most recent upload
    experiments.sort((a, b) => b.submittedAt - a.submittedAt);
    const lastSync = experiments.length > 0 
      ? new Date(experiments[0].submittedAt * 1000).toLocaleTimeString()
      : 'Never';
    
    return {
      totalExperiments: experiments.length,
      hplcCount,
      airQualityCount,
      nmrCount,
      lastSync,
      isLive: true,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      totalExperiments: 0,
      hplcCount: 0,
      airQualityCount: 0,
      nmrCount: 0,
      lastSync: 'Error',
      isLive: false,
    };
  }
}
