import styled from 'styled-components';
import { LottiePenguin } from '../common/LottiePenguin';
import type { PenguinAnimation, HealthState } from '../../types/monitoring';

interface PenguinCoachProps {
  mood: PenguinAnimation;
  status: HealthState;
  message: string;
  useLottie?: boolean; // Lottie使用フラグ（デフォルト: true）
}

export const PenguinCoach = ({
  mood,
  status,
  message,
  useLottie = false,
}: PenguinCoachProps) => {
  // Lottie未使用時は絵文字フォールバック
  const penguinEmoji = {
    happy: '🐧😊',
    worried: '🐧😐',
    crying: '🐧😢',
  }[mood];

  return (
    <Container $status={status}>
      <PenguinDisplay>
        {useLottie ? (
          <LottiePenguin mood={mood} size={200} />
        ) : (
          <EmojiDisplay>{penguinEmoji}</EmojiDisplay>
        )}
      </PenguinDisplay>
      <Message $status={status}>{message}</Message>
      <StatusBadge $status={status}>
        {status === 'healthy' && '✓ 安定'}
        {status === 'warning' && '⚠ 注意'}
        {status === 'danger' && '🚨 危険'}
      </StatusBadge>
    </Container>
  );
};

const Container = styled.div<{ $status: HealthState }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  border-radius: 16px;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'healthy':
        return `linear-gradient(135deg, ${theme.color.healthyLight} 0%, ${theme.color.healthy}20 100%)`;
      case 'warning':
        return `linear-gradient(135deg, ${theme.color.warningLight} 0%, ${theme.color.warning}20 100%)`;
      case 'danger':
        return `linear-gradient(135deg, ${theme.color.dangerLight} 0%, ${theme.color.danger}20 100%)`;
    }
  }};
  border: 2px solid
    ${({ $status, theme }) => {
      switch ($status) {
        case 'healthy':
          return theme.color.healthy;
        case 'warning':
          return theme.color.warning;
        case 'danger':
          return theme.color.danger;
      }
    }};
  transition: all 0.5s ease;
`;

const PenguinDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const EmojiDisplay = styled.div`
  font-size: 6rem;
  line-height: 1;
`;

const Message = styled.p<{ $status: HealthState }>`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 1rem 0;
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

const StatusBadge = styled.div<{ $status: HealthState }>`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9375rem;
  font-weight: 600;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'healthy':
        return theme.color.healthy;
      case 'warning':
        return theme.color.warning;
      case 'danger':
        return theme.color.danger;
    }
  }};
  color: ${({ theme }) => theme.color.white};
`;
