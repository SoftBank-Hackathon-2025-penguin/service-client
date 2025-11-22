import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { PenguinCoach } from '../dashboard/PenguinCoach';
import { MetricCard } from '../dashboard/MetricCard';
import { AlertList } from '../dashboard/AlertList';
import { SimulationPanel } from '../dashboard/SimulationPanel';
import { useDeployStore } from '../../stores/deployStore';
import { useMonitoringStore } from '../../stores/monitoringStore';
import { useMonitoringPolling } from '../../hooks/useMonitoringPolling';
import { useSimulation } from '../../hooks/useSimulation';
import { PATHS } from '../../constants/paths';
import type { SimulationRequest } from '../../types/monitoring';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { sessionId } = useDeployStore();
  const { metrics, anomaly, alerts, isSimulating, acknowledgeAlert } =
    useMonitoringStore();

  // モニタリングポーリング開始
  useMonitoringPolling(sessionId);

  const { simulate, stopSimulation } = useSimulation(sessionId);

  const [showSimulation, setShowSimulation] = useState(false);

  /**
   * シミュレーション実行
   */
  const handleSimulate = (scenario: SimulationRequest['scenario']) => {
    simulate(scenario, 30);
  };

  /**
   * メトリクスベースの状態計算
   */
  const getMetricStatus = (
    value: number,
    warningThreshold: number,
    dangerThreshold: number
  ): 'healthy' | 'warning' | 'danger' => {
    if (value >= dangerThreshold) {
      return 'danger';
    }
    if (value >= warningThreshold) {
      return 'warning';
    }
    return 'healthy';
  };

  // セッションがない場合はデプロイページにリダイレクト
  if (!sessionId) {
    return (
      <Layout>
        <Container>
          <EmptyState>
            <EmptyIcon>🐧</EmptyIcon>
            <EmptyTitle>デプロイされたリソースがありません</EmptyTitle>
            <EmptyDescription>
              まずリソースをデプロイしてから、モニタリングを開始してください。
            </EmptyDescription>
            <Button size="large" onClick={() => navigate(PATHS.DEPLOY)}>
              デプロイページへ移動
            </Button>
          </EmptyState>
        </Container>
      </Layout>
    );
  }

  // 初期ローディング状態
  if (!metrics || !anomaly) {
    return (
      <Layout>
        <Container>
          <LoadingMessage>
            <LoadingIcon>🐧</LoadingIcon>
            <LoadingText>メトリクスを読み込んでいます...</LoadingText>
          </LoadingMessage>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Header>
          <TitleSection>
            <Title>📊 モニタリングダッシュボード</Title>
            <SessionId>Session: {sessionId}</SessionId>
          </TitleSection>
          <ButtonGroup>
            <Button
              variant="secondary"
              onClick={() => setShowSimulation(!showSimulation)}
            >
              {showSimulation
                ? 'シミュレーションを閉じる'
                : '🎮 シミュレーション'}
            </Button>
            <Button onClick={() => navigate(PATHS.DEPLOY)}>
              デプロイコンソール
            </Button>
          </ButtonGroup>
        </Header>

        {/* ペンギンコーチ */}
        <PenguinCoach
          mood={anomaly.penguinAnimation}
          status={anomaly.healthState}
          message={anomaly.coachMessage}
        />

        {/* シミュレーションパネル */}
        {showSimulation && (
          <SimulationPanel
            isSimulating={isSimulating}
            onSimulate={handleSimulate}
            onStop={stopSimulation}
          />
        )}

        {/* メトリクスカード */}
        <MetricsGrid>
          <MetricCard
            icon="💻"
            label="CPU使用率"
            value={metrics.cpuUsage}
            unit="%"
            status={getMetricStatus(metrics.cpuUsage, 50, 70)}
            threshold="注意 50% / 危険 70%"
          />
          <MetricCard
            icon="⏱️"
            label="レイテンシー"
            value={metrics.latency}
            unit="ms"
            status={getMetricStatus(metrics.latency, 400, 700)}
            threshold="注意 400ms / 危険 700ms"
          />
          <MetricCard
            icon="⚠️"
            label="エラー率"
            value={metrics.errorRate}
            unit="%"
            status={getMetricStatus(metrics.errorRate, 3, 5)}
            threshold="注意 3% / 危険 5%"
          />
        </MetricsGrid>

        {/* アラートリスト */}
        {alerts.length > 0 && (
          <AlertList alerts={alerts} onAcknowledge={acknowledgeAlert} />
        )}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0;
`;

const SessionId = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
  font-family: 'Monaco', 'Courier New', monospace;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 0.75rem 0;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0 0 2rem 0;
  text-align: center;
  line-height: 1.6;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
`;

const LoadingIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
`;
