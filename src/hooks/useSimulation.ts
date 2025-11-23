import { useCallback, useRef } from 'react';
import { useMonitoringStore } from '../stores/monitoringStore';
import type { SimulationScenarioType } from '../types/monitoring';

type TimeoutId = ReturnType<typeof setTimeout>;

/**
 * 統合シミュレーションフック
 * フロントエンドのみでモックデータを使用してシミュレーション
 */
export const useSimulation = () => {
  const { setSimulating, setAnomaly, setMetrics } = useMonitoringStore();
  const timeoutRef = useRef<TimeoutId | null>(null);

  /**
   * シミュレーション開始 (フロントエンドのみ、API呼び出しなし)
   */
  const simulate = useCallback(
    (scenario: SimulationScenarioType, duration = 30) => {
      console.log('[Simulation] 🎮 Starting simulation:', scenario, 'for', duration, 'seconds');
      setSimulating(true);

      // シナリオに応じたモックデータを設定
      if (scenario === 'cpu_spike') {
        setAnomaly({
          causes: [{ metric: 'CPU', severity: 'danger', contribution: 100 }],
          healthState: 'danger',
          penguinAnimation: 'crying',
          healthScore: 85,
        });
        setMetrics({
          cpuUsage: 85,
          latency: 250,
          errorRate: 1,
          timestamp: new Date().toISOString(),
        });
      } else if (scenario === 'high_latency') {
        setAnomaly({
          causes: [{ metric: 'Latency', severity: 'danger', contribution: 100 }],
          healthState: 'danger',
          penguinAnimation: 'crying',
          healthScore: 85,
        });
        setMetrics({
          cpuUsage: 45,
          latency: 850,
          errorRate: 2,
          timestamp: new Date().toISOString(),
        });
      } else if (scenario === 'error_burst') {
        setAnomaly({
          causes: [{ metric: 'ErrorRate', severity: 'danger', contribution: 100 }],
          healthState: 'danger',
          penguinAnimation: 'crying',
          healthScore: 85,
        });
        setMetrics({
          cpuUsage: 50,
          latency: 300,
          errorRate: 8,
          timestamp: new Date().toISOString(),
        });
      }

      // 既存のタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 指定時間後に自動終了
      timeoutRef.current = setTimeout(() => {
        console.log('[Simulation] ⏰ Auto-stopping after', duration, 'seconds');
        stopSimulationHandler();
      }, duration * 1000);
    },
    [setSimulating, setAnomaly, setMetrics]
  );

  /**
   * シミュレーション終了 (フロントエンドのみ、API呼び出しなし)
   */
  const stopSimulationHandler = useCallback(() => {
    console.log('[Simulation] 🛑 Stopping simulation');

    // 正常状態に復旧
    setAnomaly({
      causes: [{ metric: 'CPU', severity: 'normal', contribution: 100 }],
      healthScore: 100,
      healthState: 'healthy',
      penguinAnimation: 'happy',
    });
    setMetrics({
      cpuUsage: 0,
      latency: 0,
      errorRate: 0,
      timestamp: new Date().toISOString(),
    });

    console.log('[Simulation] ✅ Simulation stopped - polling will resume');
    setSimulating(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [setSimulating, setAnomaly, setMetrics]);

  return {
    simulate,
    stopSimulation: stopSimulationHandler,
  };
};
