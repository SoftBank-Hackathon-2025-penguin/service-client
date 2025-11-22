// カラーパレット
const color = {
  baseColor1: '#151619',
  // baseColor2 = 基本テキスト色
  baseColor2: '#252B39',
  baseColor3: '#353C4D',
  baseColor4: '#495264',
  baseColor5: '#7F8799',
  baseColor6: '#B2B7C4',
  baseColor7: '#CDD1DD',
  baseColor8: '#EBEDF2',
  baseColor9: '#F7F8FA',

  white: '#FFFFFF',
  black: '#000000',

  greenDeep: '#437376',
  green1: '#86C3BB',
  green2: '#B5E9E2',
  greenLight: '#D5F7F2',

  // Penguin-Land 状態別カラー
  healthy: '#22C55E', // 安定（緑）
  healthyLight: '#DCFCE7',
  warning: '#F59E0B', // 注意（黄）
  warningLight: '#FEF3C7',
  danger: '#EF4444', // 危険（赤）
  dangerLight: '#FEE2E2',

  primary: '#3B82F6', // ブルー（CTAボタン）
  primaryLight: '#DBEAFE',
} as const;

export type ColorKeyType = keyof typeof color;

export default { color };
