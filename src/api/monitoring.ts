import client from './_client';
import type { MonitoringResponse } from '../types/monitoring';

/**
 * 統合モニタリングメトリクスの照会
 */
export const getMonitoring = async (): Promise<MonitoringResponse> => {
  const response = await client.get<MonitoringResponse>('/monitoring');
  return response.data;
};
