import styled from 'styled-components';
import { Button } from '../common/Button';
import type { SimulationScenarioType } from '../../types/monitoring';

interface SimulationPanelProps {
  isSimulating: boolean;
  onSimulate: (scenario: SimulationScenarioType) => void;
  onStop: () => void;
}

export const SimulationPanel = ({ isSimulating, onSimulate, onStop }: SimulationPanelProps) => {
  const scenarios: { id: SimulationScenarioType; label: string; description: string; icon: string }[] = [
    {
      id: 'cpu_spike',
      label: 'CPUスパイク',
      description: 'CPU使用率を85%に急上昇させます。',
      icon: '💻',
    },
    {
      id: 'high_latency',
      label: '高レイテンシー',
      description: '応答時間を850msに増加させます。',
      icon: '⏱️',
    },
    {
      id: 'error_burst',
      label: 'エラーバースト',
      description: 'エラー率を8%に急上昇させます。',
      icon: '⚠️',
    },
  ];

  return (
    <Container>
      <Header>
        <Title>🎮 シミュレーションモード</Title>
        <Description>デモ用に、強制的に危険な状況をシミュレートできます。</Description>
      </Header>
      <Content>
        {isSimulating ? (
          <SimulatingContainer>
            <SimulatingText>⚠️ シミュレーション実行中...</SimulatingText>
            <Button variant="danger" onClick={onStop}>
              停止
            </Button>
          </SimulatingContainer>
        ) : (
          <ScenarioGrid>
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.id}>
                <ScenarioHeader>
                  <ScenarioIcon>{scenario.icon}</ScenarioIcon>
                  <ScenarioLabel>{scenario.label}</ScenarioLabel>
                </ScenarioHeader>
                <ScenarioDescription>{scenario.description}</ScenarioDescription>
                <Button onClick={() => onSimulate(scenario.id)}>シミュレーション開始</Button>
              </ScenarioCard>
            ))}
          </ScenarioGrid>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.baseColor5};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ScenarioCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.color.baseColor8};
  border-radius: 12px;
  background: ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScenarioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScenarioIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

const ScenarioLabel = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const ScenarioDescription = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.baseColor5};
  text-align: center;
  margin-bottom: 1rem;
`;

const SimulatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: ${({ theme }) => theme.color.warningLight};
  border-radius: 8px;
`;

const SimulatingText = styled.p`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.warning};
`;
