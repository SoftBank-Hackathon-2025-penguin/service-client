import { useCallback, useRef } from 'react';
import { useMonitoringStore } from '../stores/monitoringStore';
import { startSimulation, stopSimulation } from '../api/monitoring';
import type { SimulationRequest } from '../types/monitoring';

type TimeoutId = ReturnType<typeof setTimeout>;

/**
 * 統合シミュレーションフック
 */
export const useSimulation = () => {
  const { setSimulating, setAnomaly, setMetrics } = useMonitoringStore();
  const timeoutRef = useRef<TimeoutId | null>(null);

  /**
   * シミュレーション開始
   */
  const simulate = useCallback(
    async (scenario: SimulationRequest['scenario'], duration = 30) => {
      try {
        console.log('[Simulation] 🎮 Starting simulation:', scenario, 'for', duration, 'seconds');
        setSimulating(true);

        // オプティミスティックUI更新（即時に危険状態を表示）
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

        // バックエンド呼び出し
        await startSimulation(scenario, duration);

        // 指定時間後に自動終了
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          console.log('[Simulation] ⏰ Auto-stopping after', duration, 'seconds');
          await stopSimulationHandler();
        }, duration * 1000);
      } catch (error) {
        console.error('Simulation start error:', error);
        setSimulating(false);
      }
    },
    [setSimulating, setAnomaly, setMetrics]
  );

  /**
   * シミュレーション終了
   */
  const stopSimulationHandler = useCallback(async () => {
    console.log('[Simulation] 🛑 Stopping simulation');

    try {
      await stopSimulation();
      console.log('[Simulation] ✅ Simulation stopped successfully');

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

      console.log('[Simulation] 📝 Setting isSimulating to false');
      setSimulating(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } catch (error) {
      console.error('Simulation stop error:', error);
      setSimulating(false);
    }
  }, [setSimulating, setAnomaly, setMetrics]);

  return {
    simulate,
    stopSimulation: stopSimulationHandler,
  };
};
