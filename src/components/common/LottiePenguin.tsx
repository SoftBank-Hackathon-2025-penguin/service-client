import Lottie from 'lottie-react';
import type { PenguinAnimation } from '../../types/monitoring';

// Lottie JSON imports
// 実際のプロダクションではLottieFiles.comからダウンロードしたJSONを使用してください
// ここではプレースホルダーとして簡単な絵文字を使用します
import penguinHappyData from '../../assets/lottie/penguin-happy.json';
import penguinWorriedData from '../../assets/lottie/penguin-worried.json';
import penguinCryingData from '../../assets/lottie/penguin-crying.json';

interface LottiePenguinProps {
  mood: PenguinAnimation;
  size?: number;
}

/**
 * Lottieベースのペンギンアニメーションコンポーネント
 *
 * @example
 * <LottiePenguin mood="happy" size={200} />
 */
export const LottiePenguin = ({ mood, size = 150 }: LottiePenguinProps) => {
  const animationData = {
    happy: penguinHappyData,
    worried: penguinWorriedData,
    crying: penguinCryingData,
  }[mood];

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
