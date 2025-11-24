/**
 * Design Tokens - Component Variants
 * CVA 변수 정의 (Button, Badge 등에서 공유)
 */

// Button variants 정의
export const buttonVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive: 'bg-destructive text-white shadow-sm hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    success: 'bg-success text-success-foreground shadow-sm hover:bg-success/90',
    warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90',
  },
  size: {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  },
} as const;

// Badge variants 정의
export const badgeVariants = {
  variant: {
    default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-white shadow hover:bg-destructive/80',
    outline: 'text-foreground',
    success: 'border-transparent bg-success text-success-foreground shadow hover:bg-success/80',
    warning: 'border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80',
    info: 'border-transparent bg-info text-info-foreground shadow hover:bg-info/80',
  },
} as const;

// Alert variants 정의 (before 패키지 스타일 기준, CSS 변수 사용)
export const alertVariants = {
  variant: {
    default: 'bg-[var(--color-alert-default-bg)] border-[var(--color-alert-default-border)] text-[var(--color-alert-default-text)]',
    info: 'bg-[var(--color-alert-info-bg)] border-[var(--color-alert-info-border)] text-[var(--color-alert-info-text)]',
    success: 'bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)]',
    warning: 'bg-[var(--color-alert-warning-bg)] border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)]',
    destructive: 'bg-[var(--color-alert-destructive-bg)] border-[var(--color-alert-destructive-border)] text-[var(--color-alert-destructive-text)]',
  },
} as const;

// Card variants 정의
export const cardVariants = {
  variant: {
    default: 'bg-card text-card-foreground',
    elevated: 'bg-card text-card-foreground shadow-lg',
    outlined: 'bg-transparent border-2',
  },
} as const;

// Input variants 정의
export const inputVariants = {
  size: {
    default: 'h-9 px-3 py-1',
    sm: 'h-8 px-2 py-1 text-xs',
    lg: 'h-11 px-4 py-2',
  },
  state: {
    default: 'border-input',
    error: 'border-destructive focus-visible:ring-destructive',
    success: 'border-success focus-visible:ring-success',
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants.variant;
export type ButtonSize = keyof typeof buttonVariants.size;
export type BadgeVariant = keyof typeof badgeVariants.variant;
export type AlertVariant = keyof typeof alertVariants.variant;
export type CardVariant = keyof typeof cardVariants.variant;
export type InputSize = keyof typeof inputVariants.size;
export type InputState = keyof typeof inputVariants.state;
