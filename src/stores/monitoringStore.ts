import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  MetricData,
  AnomalyScore,
  Alert,
  HealthState,
  PenguinAnimation,
} from '../types/monitoring';

interface MonitoringStore {
  // State
  metrics: MetricData | null;
  anomaly: AnomalyScore | null;
  alerts: Alert[];
  isSimulating: boolean;

  // Actions
  setMetrics: (metrics: MetricData) => void;
  setAnomaly: (anomaly: AnomalyScore) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  setSimulating: (isSimulating: boolean) => void;
  calculateAnomalyFromMetrics: (metrics: MetricData) => void;
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
function calculateAnomaly(metrics: MetricData): AnomalyScore {
  let healthScore = 0;

  // CPU: 50%以上で注意(+30)、70%以上で危険(+50)
  if (metrics.cpuUsage >= 70) {
    healthScore += 50;
  } else if (metrics.cpuUsage >= 50) {
    healthScore += 30;
  }

  // レイテンシー: 400ms以上で注意(+20)、700ms以上で危険(+40)
  if (metrics.latency >= 700) {
    healthScore += 40;
  } else if (metrics.latency >= 400) {
    healthScore += 20;
  }

  // エラー率: 3%以上で注意(+20)、5%以上で危険(+30)
  if (metrics.errorRate >= 5) {
    healthScore += 30;
  } else if (metrics.errorRate >= 3) {
    healthScore += 20;
  }

  // 状態とメッセージの決定
  let healthState: HealthState;
  let penguinAnimation: PenguinAnimation;
  let coachMessage: string;

  // いずれかが危険しきい値を超えた場合
  const hasDanger =
    metrics.cpuUsage >= 70 || metrics.latency >= 700 || metrics.errorRate >= 5;

  // いずれかが注意しきい値を超えた場合
  const hasWarning =
    metrics.cpuUsage >= 50 || metrics.latency >= 400 || metrics.errorRate >= 3;

  if (hasDanger) {
    healthState = 'danger';
    penguinAnimation = 'crying';

    // 具体的な危険要因のメッセージ
    if (metrics.cpuUsage >= 70) {
      coachMessage = '🚨 CPUが過熱しています！';
    } else if (metrics.latency >= 700) {
      coachMessage = '🚨 応答時間が非常に遅いです！';
    } else if (metrics.errorRate >= 5) {
      coachMessage = '🚨 エラーが多発しています！';
    } else {
      coachMessage = '🚨 システムが不安定です！';
    }
  } else if (hasWarning) {
    healthState = 'warning';
    penguinAnimation = 'worried';
    coachMessage = '⚠️ 少し不安定です';
  } else {
    healthState = 'healthy';
    penguinAnimation = 'happy';
    coachMessage = '👍 非常に安定しています！';
  }

  return {
    healthScore,
    healthState,
    penguinAnimation,
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
        state.anomaly = anomaly;
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

    calculateAnomalyFromMetrics: (metrics) =>
      set((state) => {
        const anomaly = calculateAnomaly(metrics);
        state.metrics = metrics;
        state.anomaly = anomaly;
      }),

    reset: () =>
      set(() => ({
        ...initialState,
      })),
  }))
);
