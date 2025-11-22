import styled from 'styled-components';
import { Card } from '../common/Card';

interface MetricCardProps {
  icon: string;
  label: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'danger';
  threshold?: string;
}

export const MetricCard = ({
  icon,
  label,
  value,
  unit,
  status,
  threshold,
}: MetricCardProps) => {
  return (
    <StyledCard>
      <Header>
        <Icon>{icon}</Icon>
        <Label>{label}</Label>
      </Header>
      <ValueContainer>
        <Value $status={status}>
          {value.toFixed(1)}
          <Unit>{unit}</Unit>
        </Value>
      </ValueContainer>
      {threshold && <Threshold>しきい値: {threshold}</Threshold>}
    </StyledCard>
  );
};

const StyledCard = styled(Card)``;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Label = styled.h4`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor4};
`;

const ValueContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const Value = styled.div<{ $status: 'healthy' | 'warning' | 'danger' }>`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'healthy':
        return theme.color.healthy;
      case 'warning':
        return theme.color.warning;
      case 'danger':
        return theme.color.danger;
    }
  }};
`;

const Unit = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.color.baseColor5};
`;

const Threshold = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.baseColor5};
`;
