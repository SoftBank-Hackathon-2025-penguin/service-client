import Lottie from 'lottie-react';
import styled from 'styled-components';
import loadingPenguinData from '../../assets/lottie/loading-penguin.json';

interface LottieLoaderProps {
  message?: string;
  tips?: string[];
}

const wittyTips = [
  'ペンギンが氷の上を滑るように、デプロイも順調に進んでいます 🐧',
  'AWSリソースが一つずつ目を覚ましています ☁️',
  'Terraformが頑張って作業中... もう少しお待ちください！',
  'インフラが完成したら、ペンギンが踊ります 💃',
  'クラウドの上でペンギンがお家を建てています 🏗️',
  'もうすぐ完成です！ペンギンも楽しみにしています ⏰',
];

/**
 * Lottieベースのローディングアニメーション
 */
export const LottieLoader = ({ message, tips = wittyTips }: LottieLoaderProps) => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Container>
      <LottieWrapper>
        <Lottie animationData={loadingPenguinData} loop={true} autoplay={true} />
      </LottieWrapper>
      {message && <Message>{message}</Message>}
      <Tip>{randomTip}</Tip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const LottieWrapper = styled.div`
  width: 120px;
  height: 120px;
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
