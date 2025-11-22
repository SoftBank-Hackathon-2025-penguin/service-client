import { useEffect } from 'react';
import { celebrateSuccess } from '../../utils/confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

/**
 * Confetti効果コンポーネント
 * triggerがtrueになると自動的に実行
 */
export const ConfettiEffect = ({
  trigger,
  onComplete,
}: ConfettiEffectProps) => {
  useEffect(() => {
    if (trigger) {
      celebrateSuccess();
      // 効果終了後のコールバック実行
      if (onComplete) {
        setTimeout(onComplete, 2000); // 2秒後に実行
      }
    }
  }, [trigger, onComplete]);

  return null; // レンダリングしない
};

