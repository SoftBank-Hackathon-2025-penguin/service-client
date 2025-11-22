/**
 * Confettiヘルパー関数
 * canvas-confettiパッケージのラッパー
 */

import confetti from 'canvas-confetti';

/**
 * 基本的なお祝いのconfetti（より華やかに、より大きく！）
 */
export const celebrateSuccess = () => {
  const count = 400; // 200 → 400 (2倍!)
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 最初の爆発（中央）
  fire(0.25, {
    spread: 40, // 26 → 40
    startVelocity: 70, // 55 → 70
    scalar: 1.5, // サイズ1.5倍
  });

  // 2番目の爆発
  fire(0.2, {
    spread: 80, // 60 → 80
    scalar: 1.3,
  });

  // 3番目の爆発（広範囲）
  fire(0.35, {
    spread: 140, // 100 → 140
    decay: 0.91,
    scalar: 1.2, // 0.8 → 1.2
  });

  // 4番目の爆発（ゆっくりと大きな破片）
  fire(0.1, {
    spread: 150, // 120 → 150
    startVelocity: 35, // 25 → 35
    decay: 0.92,
    scalar: 1.8, // 1.2 → 1.8 (さらに大きく!)
  });

  // 5番目の爆発（速く）
  fire(0.1, {
    spread: 160, // 120 → 160
    startVelocity: 60, // 45 → 60
    scalar: 1.5,
  });
};

/**
 * シンプルなconfetti
 */
export const simpleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

/**
 * 全画面confetti（花火ショー！）
 */
export const fullScreenConfetti = () => {
  const duration = 5 * 1000; // 3秒 → 5秒
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 40, // 30 → 40
    spread: 360, 
    ticks: 80, // 60 → 80 (より長く滞空)
    zIndex: 9999,
    scalar: 1.5, // サイズ1.5倍
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 80 * (timeLeft / duration); // 50 → 80 (より多く!)
    
    // 左から
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    
    // 右から
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
    
    // 中央からも！
    confetti({
      ...defaults,
      particleCount: particleCount * 1.5,
      origin: { x: 0.5, y: 0.5 },
      spread: 180,
      scalar: 2, // 中央はさらに大きく！
    });
  }, 200); // 250ms → 200ms (より速く!)
};

/**
 * ペンギンスペシャルセレブレーション！ 🐧🎉
 * デプロイ完了時に使用
 */
export const penguinCelebration = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  // 最初の爆発: 強力な中央爆発
  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 80,
    origin: { y: 0.6 },
    scalar: 2,
    colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#FFF'], // 青色系
  });

  // 2番目の爆発: 左右同時爆発
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 },
      scalar: 1.5,
      colors: ['#3B82F6', '#60A5FA', '#FFF'],
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 },
      scalar: 1.5,
      colors: ['#3B82F6', '#60A5FA', '#FFF'],
    });
  }, 200);

  // 連続爆発効果
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 30;
    confetti({
      particleCount,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 100),
      origin: { 
        x: randomInRange(0.2, 0.8), 
        y: randomInRange(0.4, 0.7) 
      },
      scalar: randomInRange(1.2, 2),
      colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FFF', '#FDE047'], // 青色 + 黄色
    });
  }, 150);

  setTimeout(() => clearInterval(interval), duration);
};
