import { useEffect, useRef, useCallback } from 'react';
import { useMonitoringStore } from '../stores/monitoringStore';
import { getMonitoring } from '../api/monitoring';

type IntervalId = ReturnType<typeof setInterval>;

/**
 * 統合モニタリングポーリングフック
 *
 * 5秒間隔でメトリクスを照会
 */
export const useMonitoringPolling = () => {
  const { calculateAnomalyFromMetrics, setAlerts } = useMonitoringStore();
  const intervalRef = useRef<IntervalId | null>(null);
  const isPollingRef = useRef(false);

  const poll = useCallback(async () => {
    try {
      const data = await getMonitoring();

      // メトリクスベースの異常兆候を計算
      calculateAnomalyFromMetrics(data.metrics);

      // アラートを更新
      if (data.alerts && data.alerts.length > 0) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Monitoring polling error:', error);
    }
  }, [calculateAnomalyFromMetrics, setAlerts]);

  const startPolling = useCallback(() => {
    if (isPollingRef.current) {
      return;
    }

    isPollingRef.current = true;

    // 即時に一度実行
    poll();

    // 5秒間隔でポーリング
    intervalRef.current = setInterval(() => {
      poll();
    }, 5000);
  }, [poll]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPollingRef.current = false;
  }, []);

  useEffect(() => {
    startPolling();

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  return {
    startPolling,
    stopPolling,
    isPolling: isPollingRef.current,
  };
};
