import client from './_client';
import type {
  MonitoringResponse,
  SimulationRequest,
} from '../types/monitoring';

/**
 * モニタリングメトリクスの照会
 */
export const getMonitoring = async (
  sessionId: string
): Promise<MonitoringResponse> => {
  const response = await client.get<MonitoringResponse>(
    `/monitoring/${sessionId}`
  );
  return response.data;
};

/**
 * シミュレーション開始
 */
export const startSimulation = async (
  request: SimulationRequest
): Promise<void> => {
  await client.post('/monitoring/simulate/start', request);
};

/**
 * シミュレーション終了
 */
export const stopSimulation = async (sessionId: string): Promise<void> => {
  await client.post('/monitoring/simulate/stop', { sessionId });
};

