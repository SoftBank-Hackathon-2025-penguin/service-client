import client from './_client';
import type {
  CreateDeployRequest,
  CreateDeployResponse,
  DeployStatusResponse,
  ResourceResponse,
} from '../types/deploy';

/**
 * デプロイ作成
 */
export const createDeploy = async (
  data: CreateDeployRequest
): Promise<CreateDeployResponse> => {
  const response = await client.post<CreateDeployResponse>('/deploy', data);
  return response.data;
};

/**
 * デプロイ状態の照会（ポーリング用）
 */
export const getDeployStatus = async (
  sessionId: string
): Promise<DeployStatusResponse> => {
  const response = await client.get<DeployStatusResponse>(
    `/deploy/status/${sessionId}`
  );
  return response.data;
};

/**
 * リソース情報の照会
 */
export const getResources = async (
  sessionId: string
): Promise<ResourceResponse> => {
  const response = await client.get<ResourceResponse>(
    `/deploy/resources/${sessionId}`
  );
  return response.data;
};

/**
 * デプロイの削除（Destroy）
 */
export const destroyDeploy = async (sessionId: string): Promise<void> => {
  await client.delete(`/deploy/${sessionId}`);
};

