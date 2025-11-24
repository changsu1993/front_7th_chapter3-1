/**
 * Design Tokens - Colors
 * CSS 변수 기반 색상 정의
 * 다크모드 자동 지원 (CSS 변수가 .dark 클래스에서 변경됨)
 */

export const colors = {
  // Semantic colors (CSS 변수 참조)
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',

  card: 'var(--color-card)',
  cardForeground: 'var(--color-card-foreground)',

  popover: 'var(--color-popover)',
  popoverForeground: 'var(--color-popover-foreground)',

  primary: 'var(--color-primary)',
  primaryForeground: 'var(--color-primary-foreground)',

  secondary: 'var(--color-secondary)',
  secondaryForeground: 'var(--color-secondary-foreground)',

  muted: 'var(--color-muted)',
  mutedForeground: 'var(--color-muted-foreground)',

  accent: 'var(--color-accent)',
  accentForeground: 'var(--color-accent-foreground)',

  destructive: 'var(--color-destructive)',
  destructiveForeground: 'var(--color-destructive-foreground)',

  success: 'var(--color-success)',
  successForeground: 'var(--color-success-foreground)',

  warning: 'var(--color-warning)',
  warningForeground: 'var(--color-warning-foreground)',

  info: 'var(--color-info)',
  infoForeground: 'var(--color-info-foreground)',

  border: 'var(--color-border)',
  input: 'var(--color-input)',
  ring: 'var(--color-ring)',
} as const;

// Tailwind 클래스 매핑
export const colorClasses = {
  background: 'bg-background',
  foreground: 'text-foreground',
  mutedForeground: 'text-muted-foreground',
  border: 'border-border',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-info text-info-foreground',
} as const;

export type ColorKey = keyof typeof colors;
export type ColorClassKey = keyof typeof colorClasses;
