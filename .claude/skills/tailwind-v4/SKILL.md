---
name: tailwind-v4
description: TailwindCSS v4 전문 스킬. Tailwind 클래스 사용, @theme directive 설정, CVA 패턴 적용, 컴포넌트 스타일링이 필요할 때 자동 활성화됨. v3과 v4 문법 차이를 구분하여 올바른 문법만 사용.
---

# Tailwind CSS v4 Expert

## 개요

이 스킬은 TailwindCSS v4의 새로운 문법과 패턴을 사용하여 스타일링을 지원합니다.
**중요**: v3 문법(tailwind.config.js, @tailwind directives)을 사용하지 않고 v4 문법만 사용합니다.

## Tailwind v4 vs v3 핵심 차이점

### 1. 설정 방식
```css
/* v4 (올바름) - CSS 파일에서 직접 설정 */
@import "tailwindcss";

@theme {
  --color-primary: #1976d2;
  --color-secondary: #f5f5f5;
}

/* v3 (사용 금지) - JavaScript 설정 파일 */
/* tailwind.config.js는 v4에서 사용하지 않음 */
```

### 2. CSS 변수 참조
```css
/* v4 (올바름) */
.element {
  @apply bg-primary text-primary-foreground;
}

/* v3 (사용 금지) */
.element {
  @apply bg-[var(--color-primary)]; /* 불필요 */
}
```

### 3. Import 방식
```css
/* v4 (올바름) */
@import "tailwindcss";

/* v3 (사용 금지) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 이 프로젝트의 디자인 토큰

프로젝트의 `packages/after/src/styles/index.css`에 정의된 토큰을 사용하세요:

### 색상 토큰
| 토큰 | 용도 | Tailwind 클래스 |
|------|------|-----------------|
| `--color-primary` | 주요 액션 버튼 | `bg-primary`, `text-primary` |
| `--color-secondary` | 보조 버튼 | `bg-secondary`, `text-secondary` |
| `--color-destructive` | 삭제/위험 액션 | `bg-destructive`, `text-destructive` |
| `--color-success` | 성공 상태 | `bg-success`, `text-success` |
| `--color-warning` | 경고 상태 | `bg-warning`, `text-warning` |
| `--color-info` | 정보 표시 | `bg-info`, `text-info` |

### Alert 색상 토큰
| 토큰 | Tailwind 클래스 |
|------|-----------------|
| `--color-alert-info-bg` | `bg-alert-info-bg` |
| `--color-alert-info-border` | `border-alert-info-border` |
| `--color-alert-info-text` | `text-alert-info-text` |

### 반경 토큰
| 토큰 | 값 | 클래스 |
|------|-----|--------|
| `--radius-sm` | 0.1875rem (3px) | `rounded-sm` |
| `--radius-md` | 0.1875rem (3px) | `rounded-md` |
| `--radius-lg` | 0.25rem (4px) | `rounded-lg` |

## CVA 패턴 (권장)

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // 기본 스타일
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

## 자주 하는 실수 방지

### 1. 하드코딩된 색상 사용 금지
```typescript
// 잘못됨
className="bg-[#1976d2] text-white"

// 올바름
className="bg-primary text-primary-foreground"
```

### 2. 인라인 스타일 대신 Tailwind 사용
```typescript
// 잘못됨
style={{ padding: '10px 15px', borderRadius: '4px' }}

// 올바름
className="px-4 py-2.5 rounded-md"
```

### 3. CSS 모듈 대신 Tailwind 사용
```typescript
// 잘못됨
import styles from './Button.module.css';
<button className={styles.button}>

// 올바름
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
```

### 4. v3 설정 파일 생성 금지
```
// tailwind.config.js 파일을 생성하지 마세요
// postcss.config.js에 tailwindcss 플러그인만 필요합니다
```

## 다크모드 지원

이 프로젝트는 `.dark` 클래스 기반 다크모드를 사용합니다:

```typescript
// 자동으로 다크모드 지원 (CSS 변수가 .dark에서 재정의됨)
className="bg-background text-foreground"

// 명시적 다크모드 스타일이 필요한 경우
className="bg-white dark:bg-gray-900"
```

## 반응형 디자인

```typescript
// 모바일 우선 접근
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="px-4 md:px-6 lg:px-8"
```

## 체크리스트

스타일 작성 시 확인사항:
- [ ] 하드코딩된 색상값 대신 디자인 토큰 사용
- [ ] `@theme`에 정의된 CSS 변수 활용
- [ ] CVA로 variant 관리
- [ ] `cn()` 유틸리티로 조건부 클래스 병합
- [ ] 접근성을 위한 focus 스타일 포함
- [ ] 다크모드 지원 확인
