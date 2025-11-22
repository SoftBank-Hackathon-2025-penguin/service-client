import { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { PenguinCoach } from '../dashboard/PenguinCoach';
import { MetricCard } from '../dashboard/MetricCard';
import { AlertList } from '../dashboard/AlertList';
import { SimulationPanel } from '../dashboard/SimulationPanel';
import { useMonitoringStore } from '../../stores/monitoringStore';
import { useMonitoringPolling } from '../../hooks/useMonitoringPolling';
import { useSimulation } from '../../hooks/useSimulation';
import type { SimulationRequest } from '../../types/monitoring';

export const Dashboard = () => {
  const { metrics, anomaly, alerts, isSimulating, acknowledgeAlert } = useMonitoringStore();

  useMonitoringPolling();

  const { simulate, stopSimulation } = useSimulation();

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
          <Title>📊 統合モニタリングダッシュボード</Title>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setShowSimulation(!showSimulation)}>
              {showSimulation ? 'シミュレーションを閉じる' : '🎮 シミュレーション'}
            </Button>
          </ButtonGroup>
        </Header>

        {/* ペンギンコーチ */}
        <PenguinCoach mood={anomaly.penguinAnimation} status={anomaly.healthState} message={anomaly.coachMessage} />

        {/* シミュレーションパネル */}
        {showSimulation && (
          <SimulationPanel isSimulating={isSimulating} onSimulate={handleSimulate} onStop={stopSimulation} />
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
        {alerts.length > 0 && <AlertList alerts={alerts} onAcknowledge={acknowledgeAlert} />}
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0;
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
