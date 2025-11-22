/**
 * デプロイ状態タイプ
 */
export type DeployState =
  | 'INIT'
  | 'PLANNING'
  | 'APPLYING'
  | 'COMPLETE'
  | 'FAILED'
  | 'DESTROYING';

/**
 * デプロイ状態のレスポンス
 */
export interface DeployStatusResponse {
  sessionId: string;
  state: DeployState;
  progress: number; // 0-100
  currentStage: string;
  logs: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * リソース情報
 */
export interface ResourceInfo {
  ec2InstanceId?: string;
  ec2PublicIp?: string;
  vpcId?: string;
  dynamoDbTableName?: string;
  s3BucketName?: string;
  lambdaFunctionName?: string;
  snsTopicArn?: string;
}

/**
 * デプロイ作成リクエスト
 */
export interface CreateDeployRequest {
  projectName?: string;
}

/**
 * デプロイ作成レスポンス
 */
export interface CreateDeployResponse {
  sessionId: string;
  message: string;
}

/**
 * リソース照会レスポンス
 */
export interface ResourceResponse {
  resources: ResourceInfo;
  graph?: string; // terraform graph JSON
}
