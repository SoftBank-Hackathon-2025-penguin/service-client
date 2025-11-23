import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MetricData, AnomalyScore, Alert } from '../types/monitoring';

type AnomalyScoreWithMessage = AnomalyScore & {
  coachMessage: string;
};

interface MonitoringStore {
  // State
  metrics: MetricData | null;
  anomaly: AnomalyScoreWithMessage | null;
  alerts: Alert[];
  isSimulating: boolean;

  // Actions
  setMetrics: (metrics: MetricData) => void;
  setAnomaly: (anomaly: AnomalyScore) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  setSimulating: (isSimulating: boolean) => void;
  reset: () => void;
}

const initialState = {
  metrics: null,
  anomaly: null,
  alerts: [],
  isSimulating: false,
};

/**
 * メトリクスベースの異常兆候計算 (ハードコーディングしきい値)
 */
function getAnomalyCoachMessage(anomaly: AnomalyScore): AnomalyScoreWithMessage {
  let coachMessage = '';

  switch (anomaly.healthState) {
    case 'healthy':
      coachMessage = '👍 非常に安定しています！';
      break;
    case 'warning':
      coachMessage = '⚠️ 少し不安定です';
      break;
    case 'danger': {
      const cause = anomaly.causes.sort((a, b) => b.contribution - a.contribution)[0]?.metric;

      switch (cause) {
        case 'CPU':
          coachMessage = '🚨 CPUが過熱しています！';
          break;
        case 'Latency':
          coachMessage = '🚨 応答時間が非常に遅いです！';
          break;
        case 'ErrorRate':
          coachMessage = '🚨 エラーが多発しています！';
          break;
        default:
          coachMessage = '🚨 システムが不安定です！';
          break;
      }
      break;
    }
  }

  return {
    ...anomaly,
    coachMessage,
  };
}

export const useMonitoringStore = create<MonitoringStore>()(
  immer((set) => ({
    ...initialState,

    setMetrics: (metrics) =>
      set((state) => {
        state.metrics = metrics;
      }),

    setAnomaly: (anomaly) =>
      set((state) => {
        state.anomaly = getAnomalyCoachMessage(anomaly);
      }),

    setAlerts: (alerts) =>
      set((state) => {
        state.alerts = alerts;
      }),

    addAlert: (alert) =>
      set((state) => {
        state.alerts.unshift(alert);
      }),

    acknowledgeAlert: (alertId) =>
      set((state) => {
        const alert = state.alerts.find((a) => a.id === alertId);
        if (alert) {
          alert.acknowledged = true;
        }
      }),

    setSimulating: (isSimulating) =>
      set((state) => {
        state.isSimulating = isSimulating;
      }),

    reset: () =>
      set(() => ({
        ...initialState,
      })),
  }))
);
