/**
 * Design Tokens - Spacing
 * 패딩, 마진, 간격 정의
 */

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

export const radius = {
  none: '0',
  sm: 'var(--radius-sm)',     // 0.25rem
  md: 'var(--radius-md)',     // 0.375rem
  lg: 'var(--radius-lg)',     // 0.5rem
  xl: 'var(--radius-xl)',     // 0.75rem
  '2xl': 'var(--radius-2xl)', // 1rem
  full: 'var(--radius-full)', // 9999px
} as const;

// 공통 간격 패턴
export const spacingPatterns = {
  // 카드 내부 패딩
  cardPadding: 'p-4',
  cardPaddingLg: 'p-6',

  // 섹션 간격
  sectionGap: 'space-y-4',
  sectionGapLg: 'space-y-6',

  // 인라인 아이템 간격
  inlineGap: 'gap-2',
  inlineGapLg: 'gap-4',

  // 폼 필드 간격
  formGap: 'space-y-4',

  // 버튼 그룹 간격
  buttonGroup: 'gap-2',
} as const;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
export type SpacingPatternKey = keyof typeof spacingPatterns;
