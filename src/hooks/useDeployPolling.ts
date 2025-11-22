import { useEffect, useRef, useCallback } from 'react';
import { useDeployStore } from '../stores/deployStore';
import { getDeployStatus } from '../api/deploy';

type TimeoutId = ReturnType<typeof setTimeout>;

/**
 * デプロイ状態ポーリングフック
 *
 * ポーリング戦略:
 * - 0-1分: 3秒間隔
 * - 1-3分: 5秒間隔
 * - 3分以降: 10秒間隔
 */
export const useDeployPolling = () => {
  const {
    sessionId,
    deployState,
    isPolling,
    updateStatus,
    setPolling,
    setError,
  } = useDeployStore();
  const intervalRef = useRef<TimeoutId | null>(null);

  /**
   * ポーリング停止
   */
  const stopPolling = useCallback(() => {
    console.log('[Polling] 🛑 Stopping polling');
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setPolling(false);
  }, [setPolling]);

  /**
   * ポーリング実行
   */
  const poll = useCallback(async () => {
    if (!sessionId) {
      console.log('[Polling] No sessionId, skipping poll');
      return;
    }

    console.log('[Polling] 🔄 Fetching status for session:', sessionId);

    try {
      const status = await getDeployStatus(sessionId);
      console.log('[Polling] ✅ Status received:', status);
      updateStatus(status);

      // 終了状態の確認
      if (status.state === 'COMPLETE' || status.state === 'FAILED') {
        console.log('[Polling] 🛑 Stopping poll, final state:', status.state);
        stopPolling();
      }
    } catch (error) {
      console.error('[Polling] ❌ Error:', error);
      setError(error instanceof Error ? error.message : '状態照会に失敗');
    }
  }, [sessionId, updateStatus, setError, stopPolling]);

  /**
   * ポーリング開始
   */
  const startPolling = useCallback(() => {
    if (!sessionId) {
      console.log('[Polling] Cannot start: no sessionId');
      return;
    }

    console.log('[Polling] 🚀 Starting polling for session:', sessionId);
    setPolling(true);

    // 即時に一度実行
    poll();

    // 3秒ごとにポーリング（一旦固定間隔で簡素化）
    const scheduleNextPoll = () => {
      console.log('[Polling] ⏱️ Scheduling next poll in 3000ms');
      intervalRef.current = setTimeout(() => {
        poll();
        scheduleNextPoll(); // 繰り返し
      }, 3000);
    };

    scheduleNextPoll();
  }, [sessionId, poll, setPolling]);

  /**
   * Clean up
   */
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  /**
   * デプロイ状態が進行中の場合に自動ポーリング
   */
  useEffect(() => {
    const inProgressStates = ['INIT', 'PLANNING', 'APPLYING', 'DESTROYING'];
    if (sessionId && inProgressStates.includes(deployState) && !isPolling) {
      startPolling();
    }
  }, [sessionId, deployState, isPolling, startPolling]);

  return {
    startPolling,
    stopPolling,
    isPolling,
  };
};
