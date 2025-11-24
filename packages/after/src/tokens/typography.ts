/**
 * Design Tokens - Typography
 * 폰트 사이즈, 두께, 라인 높이 정의
 */

export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Tailwind 클래스 매핑
export const typographyClasses = {
  heading1: 'text-4xl font-bold leading-tight',
  heading2: 'text-3xl font-bold leading-tight',
  heading3: 'text-2xl font-semibold leading-snug',
  heading4: 'text-xl font-semibold leading-snug',
  body: 'text-base font-normal leading-normal',
  bodySmall: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-normal leading-normal',
  label: 'text-sm font-medium leading-none',
} as const;

export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;
export type LineHeightKey = keyof typeof lineHeight;
export type TypographyClassKey = keyof typeof typographyClasses;
