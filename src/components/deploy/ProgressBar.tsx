import styled, { keyframes, css } from 'styled-components';
import type { DeployState } from '../../types/deploy';

interface ProgressBarProps {
  progress: number;
  state: DeployState;
  currentStage: string;
}

export const ProgressBar = ({
  progress,
  state,
  currentStage,
}: ProgressBarProps) => {
  const stages = [
    { key: 'INIT', label: '初期化' },
    { key: 'PLANNING', label: '計画' },
    { key: 'APPLYING', label: 'リソース作成' },
    { key: 'COMPLETE', label: '完了' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === state);

  return (
    <Container>
      <StagesContainer>
        {stages.map((stage, index) => {
          const isActive = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          return (
            <Stage key={stage.key}>
              <StageCircle $isActive={isActive} $isCurrent={isCurrent}>
                {isActive && state !== 'FAILED' ? '✓' : index + 1}
              </StageCircle>
              <StageLabel $isActive={isActive}>{stage.label}</StageLabel>
              {index < stages.length - 1 && (
                <StageLine $isActive={index < currentStageIndex} />
              )}
            </Stage>
          );
        })}
      </StagesContainer>

      <ProgressBarContainer>
        <ProgressBarFill $progress={progress} $state={state} />
      </ProgressBarContainer>

      <ProgressInfo>
        <ProgressText>{currentStage || '待機中...'}</ProgressText>
        <ProgressPercent>{progress}%</ProgressPercent>
      </ProgressInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  position: relative;
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const StageCircle = styled.div<{ $isActive: boolean; $isCurrent: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.color.primary : theme.color.baseColor8};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.white : theme.color.baseColor5};
  border: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.color.primary : theme.color.baseColor7};

  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}
`;

const StageLabel = styled.span<{ $isActive: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.baseColor2 : theme.color.baseColor5};
  text-align: center;
`;

const StageLine = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.color.primary : theme.color.baseColor7};
  transition: all 0.3s ease;
  z-index: -1;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.color.baseColor8};
  border-radius: 6px;
  overflow: hidden;
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const ProgressBarFill = styled.div<{
  $progress: number;
  $state: DeployState;
}>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ $state, theme }) => {
    if ($state === 'FAILED') {
      return theme.color.danger;
    }
    if ($state === 'COMPLETE') {
      return theme.color.healthy;
    }
    return `linear-gradient(
      90deg,
      ${theme.color.primary},
      ${theme.color.primaryLight},
      ${theme.color.primary}
    )`;
  }};
  background-size: 200% 100%;
  animation: ${({ $state }) =>
    $state !== 'COMPLETE' && $state !== 'FAILED'
      ? css`
          ${shimmer} 2s linear infinite
        `
      : 'none'};
  transition: width 0.5s ease;
  border-radius: 6px;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.baseColor4};
`;

const ProgressPercent = styled.p`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary};
`;
