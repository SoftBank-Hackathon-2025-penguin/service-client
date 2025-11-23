import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '../constants/api';
import type { CreateDeployResponse, DeployStatusResponse, ResourceResponse } from '../types/deploy';
import type { MonitoringResponse } from '../types/monitoring';

/**
 * MSW ハンドラー - バックエンドAPIをモックします
 */

// セッションごとのデプロイ状態を保存
const deployStates = new Map<string, DeployStatusResponse>();

// 統合モニタリングデータ
let monitoringData: MonitoringResponse = {
  anomaly: {
    causes: [],
    healthScore: 0,
    healthState: 'healthy',
    penguinAnimation: 'happy',
  },
  metrics: {
    cpuUsage: 20,
    latency: 120,
    errorRate: 0.5,
    timestamp: new Date().toISOString(),
  },
  alerts: [],
};

/**
 * デプロイ作成
 */
export const createDeployHandler = http.post(`${BASE_URL}/api/v1/deploy`, async () => {
  console.log('[MSW] 📦 POST /api/v1/deploy - Creating deployment');
  await delay(500); // ネットワーク遅延のシミュレーション

  const sessionId = `session-${Date.now()}`;
  console.log('[MSW] ✅ Created session:', sessionId);

  // 初期状態の作成
  deployStates.set(sessionId, {
    sessionId,
    state: 'INIT',
    progress: 0,
    currentStage: 'デプロイ準備中...',
    logs: ['🐧 Penguin-Landのデプロイを開始します...'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // 5秒後に自動でPLANNING状態に変更
  setTimeout(() => {
    const state = deployStates.get(sessionId);
    if (state) {
      console.log('[MSW] 📋 Updating to PLANNING state');
      state.state = 'PLANNING';
      state.progress = 10;
      state.currentStage = 'Terraform Planを実行中...';
      state.logs.push('[PLAN] Terraformの計画を策定しています...');
      state.updatedAt = new Date().toISOString();
    }
  }, 5000);

  // 15秒後にAPPLYING状態に変更
  setTimeout(() => {
    const state = deployStates.get(sessionId);
    if (state) {
      state.state = 'APPLYING';
      state.progress = 30;
      state.currentStage = 'AWSリソースを作成中...';
      state.logs.push('[APPLY] VPCを作成中...', '[APPLY] EC2インスタンスを起動中...');
      state.updatedAt = new Date().toISOString();
    }
  }, 15000);

  // 30秒後に進捗を更新
  setTimeout(() => {
    const state = deployStates.get(sessionId);
    if (state && state.state === 'APPLYING') {
      state.progress = 60;
      state.logs.push('[APPLY] DynamoDBテーブルの作成完了', '[APPLY] S3バケットの作成完了');
      state.updatedAt = new Date().toISOString();
    }
  }, 30000);

  // 45秒後にCOMPLETE状態に変更
  setTimeout(() => {
    const state = deployStates.get(sessionId);
    if (state) {
      state.state = 'COMPLETE';
      state.progress = 100;
      state.currentStage = 'デプロイ完了！';
      state.logs.push(
        '[APPLY] Lambda関数のデプロイ完了',
        '[APPLY] CloudWatchアラームの設定完了',
        '[APPLY] SNSトピックの作成完了',
        '🎉 すべてのリソースが正常に作成されました！'
      );
      state.updatedAt = new Date().toISOString();
    }

    // デプロイ完了時のモニタリングデータは不要（統合Dashboardが独立して管理）
  }, 45000);

  const response: CreateDeployResponse = {
    sessionId,
    message: 'デプロイが開始されました。',
  };

  return HttpResponse.json(response, { status: 201 });
});

/**
 * デプロイ状態の照会
 */
export const getDeployStatusHandler = http.get(`${BASE_URL}/api/v1/deploy/status/:sessionId`, async ({ params }) => {
  await delay(300);

  const { sessionId } = params as { sessionId: string };
  console.log('[MSW] 🔍 GET /api/v1/deploy/status/' + sessionId);
  const state = deployStates.get(sessionId);

  if (!state) {
    console.log('[MSW] ❌ Session not found:', sessionId);
    return HttpResponse.json({ error: 'セッションが見つかりません。' }, { status: 404 });
  }

  console.log('[MSW] ✅ Returning state:', state.state, state.progress + '%');
  return HttpResponse.json(state);
});

/**
 * リソース情報の照会
 */
export const getResourcesHandler = http.get(`${BASE_URL}/api/v1/deploy/resources/:sessionId`, async ({ params }) => {
  await delay(300);

  const { sessionId } = params as { sessionId: string };
  const state = deployStates.get(sessionId);

  if (!state || state.state !== 'COMPLETE') {
    return HttpResponse.json({ error: 'リソースはまだ作成されていません。' }, { status: 404 });
  }

  const response: ResourceResponse = {
    resources: {
      ec2InstanceId: 'i-1234567890abcdef0',
      ec2PublicIp: '54.123.45.67',
      vpcId: 'vpc-0bb1c79de3EXAMPLE',
      dynamoDbTableName: 'penguin-land-table',
      s3BucketName: 'penguin-land-bucket-12345',
      lambdaFunctionName: 'penguin-land-monitor',
      snsTopicArn: 'arn:aws:sns:us-east-1:123456789012:penguin-alerts',
    },
  };

  return HttpResponse.json(response);
});

/**
 * デプロイの削除
 */
export const destroyDeployHandler = http.delete(`${BASE_URL}/api/v1/deploy/:sessionId`, async ({ params }) => {
  await delay(500);

  const { sessionId } = params as { sessionId: string };
  const state = deployStates.get(sessionId);

  if (!state) {
    return HttpResponse.json({ error: 'セッションが見つかりません。' }, { status: 404 });
  }

  // DESTROYING状態に変更
  state.state = 'DESTROYING';
  state.progress = 50;
  state.currentStage = 'リソースを削除中...';
  state.logs.push('[DESTROY] すべてのリソースを削除しています...');

  // 10秒後に削除完了
  setTimeout(() => {
    deployStates.delete(sessionId);
  }, 10000);

  return HttpResponse.json({ message: '削除が開始されました。' });
});

/**
 * 統合モニタリングデータの取得
 */
export const getMonitoringHandler = http.get(`${BASE_URL}/api/v1/monitoring`, async () => {
  await delay(200);

  // 毎回少しずつ変化するメトリクスを作成
  monitoringData.metrics.cpuUsage += (Math.random() - 0.5) * 5;
  monitoringData.metrics.cpuUsage = Math.max(10, Math.min(50, monitoringData.metrics.cpuUsage));

  monitoringData.metrics.latency += (Math.random() - 0.5) * 30;
  monitoringData.metrics.latency = Math.max(100, Math.min(300, monitoringData.metrics.latency));

  monitoringData.metrics.errorRate += (Math.random() - 0.5) * 0.5;
  monitoringData.metrics.errorRate = Math.max(0, Math.min(2, monitoringData.metrics.errorRate));

  monitoringData.metrics.timestamp = new Date().toISOString();

  return HttpResponse.json(monitoringData);
});

/**
 * すべてのハンドラーをエクスポート
 */
export const handlers = [
  createDeployHandler,
  getDeployStatusHandler,
  getResourcesHandler,
  destroyDeployHandler,
  getMonitoringHandler,
];
