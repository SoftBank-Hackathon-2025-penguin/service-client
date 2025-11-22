import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { PenguinAnimation, HealthState } from '../../types/monitoring';

import penguinHappyData from '../../assets/penguin-happy.png';
import penguinWorriedData from '../../assets/penguin-worried.png';
import penguinCryingData from '../../assets/penguin-crying.png';

interface PenguinCoachProps {
  mood: PenguinAnimation;
  status: HealthState;
  message: string;
}

// 이미지 preload
const preloadImages = () => {
  [penguinHappyData, penguinWorriedData, penguinCryingData].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export const PenguinCoach = ({ mood, status, message }: PenguinCoachProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMood, setCurrentMood] = useState(mood);

  // 컴포넌트 마운트 시 모든 이미지 preload
  useEffect(() => {
    preloadImages();
  }, []);

  // mood 변경 시 fade 효과
  useEffect(() => {
    if (mood !== currentMood) {
      setIsLoaded(false);
      const timer = setTimeout(() => {
        setCurrentMood(mood);
        setIsLoaded(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [mood, currentMood]);

  const penguinImage = {
    happy: penguinHappyData,
    worried: penguinWorriedData,
    crying: penguinCryingData,
  }[currentMood];

  return (
    <Container $status={status}>
      <PenguinDisplay>
        <PenguinImageContainer>
          <PenguinImg
            src={penguinImage}
            alt={`Penguin ${currentMood}`}
            $isLoaded={isLoaded}
            onLoad={() => setIsLoaded(true)}
          />
        </PenguinImageContainer>
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

const PenguinImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.05);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const PenguinImg = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
  transition:
    filter 0.3s ease,
    opacity 0.3s ease;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  animation: ${({ $isLoaded }) => ($isLoaded ? fadeIn : 'none')} 0.4s ease-out;

  ${PenguinImageContainer}:hover & {
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25));
  }
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
