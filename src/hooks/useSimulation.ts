import { useCallback, useRef } from 'react';
import { useMonitoringStore } from '../stores/monitoringStore';
import { startSimulation, stopSimulation } from '../api/monitoring';
import type { SimulationRequest } from '../types/monitoring';

type TimeoutId = ReturnType<typeof setTimeout>;

/**
 * 統合シミュレーションフック
 */
export const useSimulation = () => {
  const { setSimulating, calculateAnomalyFromMetrics } = useMonitoringStore();
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
          calculateAnomalyFromMetrics({
            cpuUsage: 85,
            latency: 250,
            errorRate: 1,
            timestamp: new Date().toISOString(),
          });
        } else if (scenario === 'high_latency') {
          calculateAnomalyFromMetrics({
            cpuUsage: 45,
            latency: 850,
            errorRate: 2,
            timestamp: new Date().toISOString(),
          });
        } else if (scenario === 'error_burst') {
          calculateAnomalyFromMetrics({
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
    [setSimulating, calculateAnomalyFromMetrics]
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
      calculateAnomalyFromMetrics({
        cpuUsage: 25,
        latency: 150,
        errorRate: 0.5,
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
  }, [setSimulating, calculateAnomalyFromMetrics]);

  return {
    simulate,
    stopSimulation: stopSimulationHandler,
  };
};
