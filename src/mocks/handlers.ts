import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '../constants/api';
import type {
  CreateDeployResponse,
  DeployStatusResponse,
  ResourceResponse,
} from '../types/deploy';
import type { MonitoringResponse } from '../types/monitoring';

/**
 * MSW ハンドラー - バックエンドAPIをモックします
 */

// セッションごとのデプロイ状態を保存
const deployStates = new Map<string, DeployStatusResponse>();
const monitoringData = new Map<string, MonitoringResponse>();

/**
 * デプロイ作成
 */
export const createDeployHandler = http.post(
  `${BASE_URL}/api/v1/deploy`,
  async () => {
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
        state.logs.push(
          '[APPLY] VPCを作成中...',
          '[APPLY] EC2インスタンスを起動中...'
        );
        state.updatedAt = new Date().toISOString();
      }
    }, 15000);

    // 30秒後に進捗を更新
    setTimeout(() => {
      const state = deployStates.get(sessionId);
      if (state && state.state === 'APPLYING') {
        state.progress = 60;
        state.logs.push(
          '[APPLY] DynamoDBテーブルの作成完了',
          '[APPLY] S3バケットの作成完了'
        );
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

      // モニタリングデータの初期化
      monitoringData.set(sessionId, {
        sessionId,
        metrics: {
          cpuUsage: Math.random() * 40 + 10, // 10-50%
          latency: Math.random() * 200 + 100, // 100-300ms
          errorRate: Math.random() * 2, // 0-2%
          timestamp: new Date().toISOString(),
        },
        anomaly: {
          healthScore: 10,
          healthState: 'healthy',
          penguinAnimation: 'happy',
          coachMessage: '👍 非常に安定しています！',
        },
        alerts: [],
      });
    }, 45000);

    const response: CreateDeployResponse = {
      sessionId,
      message: 'デプロイが開始されました。',
    };

    return HttpResponse.json(response, { status: 201 });
  }
);

/**
 * デプロイ状態の照会
 */
export const getDeployStatusHandler = http.get(
  `${BASE_URL}/api/v1/deploy/status/:sessionId`,
  async ({ params }) => {
    await delay(300);

    const { sessionId } = params as { sessionId: string };
    console.log('[MSW] 🔍 GET /api/v1/deploy/status/' + sessionId);
    const state = deployStates.get(sessionId);

    if (!state) {
      console.log('[MSW] ❌ Session not found:', sessionId);
      return HttpResponse.json(
        { error: 'セッションが見つかりません。' },
        { status: 404 }
      );
    }

    console.log('[MSW] ✅ Returning state:', state.state, state.progress + '%');
    return HttpResponse.json(state);
  }
);

/**
 * リソース情報の照会
 */
export const getResourcesHandler = http.get(
  `${BASE_URL}/api/v1/deploy/resources/:sessionId`,
  async ({ params }) => {
    await delay(300);

    const { sessionId } = params as { sessionId: string };
    const state = deployStates.get(sessionId);

    if (!state || state.state !== 'COMPLETE') {
      return HttpResponse.json(
        { error: 'リソースはまだ作成されていません。' },
        { status: 404 }
      );
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
  }
);

/**
 * デプロイの削除
 */
export const destroyDeployHandler = http.delete(
  `${BASE_URL}/api/v1/deploy/:sessionId`,
  async ({ params }) => {
    await delay(500);

    const { sessionId } = params as { sessionId: string };
    const state = deployStates.get(sessionId);

    if (!state) {
      return HttpResponse.json(
        { error: 'セッションが見つかりません。' },
        { status: 404 }
      );
    }

    // DESTROYING状態に変更
    state.state = 'DESTROYING';
    state.progress = 50;
    state.currentStage = 'リソースを削除中...';
    state.logs.push('[DESTROY] すべてのリソースを削除しています...');

    // 10秒後に削除完了
    setTimeout(() => {
      deployStates.delete(sessionId);
      monitoringData.delete(sessionId);
    }, 10000);

    return HttpResponse.json({ message: '削除が開始されました。' });
  }
);

/**
 * モニタリングデータの照会
 */
export const getMonitoringHandler = http.get(
  `${BASE_URL}/api/v1/monitoring/:sessionId`,
  async ({ params }) => {
    await delay(200);

    const { sessionId } = params as { sessionId: string };
    let data = monitoringData.get(sessionId);

    if (!data) {
      // 初期データの作成
      data = {
        sessionId,
        metrics: {
          cpuUsage: Math.random() * 40 + 10, // 10-50%
          latency: Math.random() * 200 + 100, // 100-300ms
          errorRate: Math.random() * 2, // 0-2%
          timestamp: new Date().toISOString(),
        },
        anomaly: {
          healthScore: 15,
          healthState: 'healthy',
          penguinAnimation: 'happy',
          coachMessage: '👍 非常に安定しています！',
        },
        alerts: [],
      };
      monitoringData.set(sessionId, data);
    }

    // 毎回少しずつ変化するメトリクスを作成
    data.metrics.cpuUsage += (Math.random() - 0.5) * 5;
    data.metrics.cpuUsage = Math.max(10, Math.min(50, data.metrics.cpuUsage));

    data.metrics.latency += (Math.random() - 0.5) * 30;
    data.metrics.latency = Math.max(100, Math.min(300, data.metrics.latency));

    data.metrics.errorRate += (Math.random() - 0.5) * 0.5;
    data.metrics.errorRate = Math.max(0, Math.min(2, data.metrics.errorRate));

    data.metrics.timestamp = new Date().toISOString();

    return HttpResponse.json(data);
  }
);

/**
 * シミュレーションの開始
 */
export const startSimulationHandler = http.post(
  `${BASE_URL}/api/v1/monitoring/simulate/start`,
  async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as {
      sessionId: string;
      scenario: string;
    };
    const { sessionId, scenario } = body;

    const data = monitoringData.get(sessionId);
    if (!data) {
      return HttpResponse.json(
        { error: 'セッションが見つかりません。' },
        { status: 404 }
      );
    }

    // シナリオ別の危険状態設定
    switch (scenario) {
      case 'cpu_spike':
        data.metrics.cpuUsage = 85;
        data.metrics.latency = 250;
        data.metrics.errorRate = 1;
        data.anomaly.healthScore = 50;
        data.anomaly.healthState = 'danger';
        data.anomaly.penguinAnimation = 'crying';
        data.anomaly.coachMessage = '🚨 CPUが過熱しています！';
        data.alerts.push({
          id: `alert-${Date.now()}`,
          level: 'critical',
          message: 'CPU使用率が85%を超えました！',
          timestamp: new Date().toISOString(),
          acknowledged: false,
        });
        break;

      case 'high_latency':
        data.metrics.cpuUsage = 45;
        data.metrics.latency = 850;
        data.metrics.errorRate = 2;
        data.anomaly.healthScore = 60;
        data.anomaly.healthState = 'danger';
        data.anomaly.penguinAnimation = 'crying';
        data.anomaly.coachMessage = '🚨 応答時間が非常に遅いです！';
        data.alerts.push({
          id: `alert-${Date.now()}`,
          level: 'critical',
          message: '平均応答時間が850msを超えました！',
          timestamp: new Date().toISOString(),
          acknowledged: false,
        });
        break;

      case 'error_burst':
        data.metrics.cpuUsage = 50;
        data.metrics.latency = 300;
        data.metrics.errorRate = 8;
        data.anomaly.healthScore = 80;
        data.anomaly.healthState = 'danger';
        data.anomaly.penguinAnimation = 'crying';
        data.anomaly.coachMessage = '🚨 エラーが多発しています！';
        data.alerts.push({
          id: `alert-${Date.now()}`,
          level: 'critical',
          message: 'エラー率が8%を超えました！',
          timestamp: new Date().toISOString(),
          acknowledged: false,
        });
        break;
    }

    return HttpResponse.json({ message: 'シミュレーションが開始されました。' });
  }
);

/**
 * シミュレーションの終了
 */
export const stopSimulationHandler = http.post(
  `${BASE_URL}/api/v1/monitoring/simulate/stop`,
  async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as { sessionId: string };
    const { sessionId } = body;

    const data = monitoringData.get(sessionId);
    if (!data) {
      return HttpResponse.json(
        { error: 'セッションが見つかりません。' },
        { status: 404 }
      );
    }

    // 正常状態に復旧
    data.metrics.cpuUsage = 25;
    data.metrics.latency = 150;
    data.metrics.errorRate = 0.5;
    data.anomaly.healthScore = 10;
    data.anomaly.healthState = 'healthy';
    data.anomaly.penguinAnimation = 'happy';
    data.anomaly.coachMessage = '👍 非常に安定しています！';

    return HttpResponse.json({ message: 'シミュレーションが終了しました。' });
  }
);

/**
 * すべてのハンドラーをエクスポート
 */
export const handlers = [
  createDeployHandler,
  getDeployStatusHandler,
  getResourcesHandler,
  destroyDeployHandler,
  getMonitoringHandler,
  startSimulationHandler,
  stopSimulationHandler,
];
