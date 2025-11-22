/**
 * フォーマットユーティリティ関数群
 */

/**
 * 数値を3桁区切りでフォーマット
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ja-JP').format(num);
};

/**
 * 日付を日本語形式でフォーマット
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
): string => {
  return new Intl.DateTimeFormat('ja-JP', options).format(new Date(date));
};

/**
 * 相対時間をフォーマット（例: "3分前"）
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffSec = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffSec < 60) {
    return 'たった今';
  }
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}分前`;
  }
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour}時間前`;
  }
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) {
    return `${diffDay}日前`;
  }
  return formatDate(date);
};

/**
 * バイトを読みやすい形式に変換
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

/**
 * ミリ秒を読みやすい形式に変換
 */
export const formatMilliseconds = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}時間 ${minutes % 60}分`;
  }
  if (minutes > 0) {
    return `${minutes}分 ${seconds % 60}秒`;
  }
  return `${seconds}秒`;
};

/**
 * パーセントをフォーマット（小数点1桁）
 */
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

