import client from './_client';
import type { MonitoringResponse, SimulationRequest } from '../types/monitoring';

/**
 * 統合モニタリングメトリクスの照会
 */
export const getMonitoring = async (): Promise<MonitoringResponse> => {
  const response = await client.get<MonitoringResponse>('/monitoring');
  return response.data;
};

/**
 * シミュレーション開始
 */
export const startSimulation = async (scenario: SimulationRequest['scenario'], duration?: number): Promise<void> => {
  await client.post('/monitoring/simulate/start', { scenario, duration });
};

/**
 * シミュレーション終了
 */
export const stopSimulation = async (): Promise<void> => {
  await client.post('/monitoring/simulate/stop');
};
