import styled, { keyframes } from 'styled-components';
import { LottieLoader } from './LottieLoader';

interface LoadingSpinnerProps {
  message?: string;
  tips?: string[];
  useLottie?: boolean; // Lottie使用フラグ（デフォルト: true）
}

const wittyTips = [
  'ペンギンが氷の上を滑るように、デプロイも順調に進んでいます 🐧',
  'AWSリソースが一つずつ目を覚ましています ☁️',
  'Terraformが頑張って作業中... もう少しお待ちください！',
  'インフラが完成したら、ペンギンが踊ります 💃',
  'クラウドの上でペンギンがお家を建てています 🏗️',
  'もうすぐ完成です！ペンギンも楽しみにしています ⏰',
];

export const LoadingSpinner = ({ message, tips = wittyTips, useLottie = false }: LoadingSpinnerProps) => {
  // Lottie使用時はLottieLoaderコンポーネントを使用
  if (useLottie) {
    const lottieProps = {
      ...(message && { message }),
      tips,
    };
    return <LottieLoader {...lottieProps} />;
  }

  // Lottie未使用時は既存のスピナー
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Container>
      <Spinner />
      {message && <Message>{message}</Message>}
      <Tip>{randomTip}</Tip>
    </Container>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.color.baseColor8};
  border-top-color: ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Message = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0;
`;

const Tip = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
  text-align: center;
  max-width: 400px;
`;
