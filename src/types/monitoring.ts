/**
 * ペンギンの状態
 */
export type PenguinAnimation = 'happy' | 'worried' | 'crying';

/**
 * システム状態レベル
 */
export type HealthState = 'healthy' | 'warning' | 'danger';

/**
 * メトリクスデータ
 */
export interface MetricData {
  cpuUsage: number; // 0-100
  latency: number; // ms
  errorRate: number; // 0-100 (%)
  timestamp: string;
}

/**
 * 異常兆候スコア
 */
export interface AnomalyScore {
  healthScore: number; // 0-100
  healthState: HealthState;
  penguinAnimation: PenguinAnimation;
  coachMessage: string;
}

/**
 * モニタリングレスポンス
 */
export interface MonitoringResponse {
  sessionId: string;
  metrics: MetricData;
  anomaly: AnomalyScore;
  alerts: Alert[];
}

/**
 * アラートデータ
 */
export interface Alert {
  id: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

/**
 * シミュレーションリクエスト
 */
export interface SimulationRequest {
  sessionId: string;
  scenario: 'cpu_spike' | 'high_latency' | 'error_burst' | 'normal';
  duration?: number; // seconds
}
