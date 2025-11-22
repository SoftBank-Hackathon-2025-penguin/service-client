import styled from 'styled-components';
import { Button } from '../common/Button';
import type { Alert } from '../../types/monitoring';

interface AlertListProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

export const AlertList = ({
  alerts,
  onAcknowledge,
}: AlertListProps) => {
  return (
    <Container>
      <Title>🚨 アラート</Title>
      <List>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} $level={alert.level}>
            <AlertContent>
              <AlertIcon>
                {alert.level === 'critical' ? '🔥' : '⚠️'}
              </AlertIcon>
              <MessageContainer>
                <AlertMessage>{alert.message}</AlertMessage>
                <AlertTimestamp>
                  {new Date(alert.timestamp).toLocaleString('ja-JP')}
                </AlertTimestamp>
              </MessageContainer>
            </AlertContent>
            {!alert.acknowledged && (
              <Button size="small" onClick={() => onAcknowledge(alert.id)}>
                確認
              </Button>
            )}
          </AlertItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AlertItem = styled.div<{ $level: 'critical' | 'warning' | 'info' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid
    ${({ theme, $level }) => {
      if ($level === 'critical') return theme.color.danger;
      if ($level === 'warning') return theme.color.warning;
      return theme.color.baseColor6;
    }};
  background: ${({ theme, $level }) => {
    if ($level === 'critical') return theme.color.dangerLight;
    if ($level === 'warning') return theme.color.warningLight;
    return theme.color.baseColor9;
  }};
`;

const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AlertIcon = styled.div`
  font-size: 1.5rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlertMessage = styled.p`
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const AlertTimestamp = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.baseColor5};
`;

