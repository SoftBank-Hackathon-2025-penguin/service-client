/**
 * 検証ユーティリティ関数群
 */

/**
 * セッションIDの検証
 */
export const isValidSessionId = (id: string): boolean => {
  if (!id) {
    return false;
  }
  // UUIDまたは英数字の組み合わせ（最低8文字）
  const regex =
    /^[a-zA-Z0-9-]{8,}$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(id);
};

/**
 * URLの検証
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * メトリクス値の範囲検証
 */
export const isMetricInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

/**
 * リソース名の検証
 */
export const isValidResourceName = (name: string): boolean => {
  // AWSリソース名の規則: 英数字、ハイフン、アンダースコア
  const regex = /^[a-zA-Z0-9-_]+$/;
  return regex.test(name);
};

