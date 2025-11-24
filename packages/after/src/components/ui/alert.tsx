import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-[3px] border px-3 py-2.5 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-alert-default-bg)] border-[var(--color-alert-default-border)] text-[var(--color-alert-default-text)] [&>svg]:text-[var(--color-alert-default-text)]",
        info: "bg-[var(--color-alert-info-bg)] border-[var(--color-alert-info-border)] text-[var(--color-alert-info-text)] [&>svg]:text-[var(--color-alert-info-text)]",
        success: "bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)] [&>svg]:text-[var(--color-alert-success-text)]",
        warning: "bg-[var(--color-alert-warning-bg)] border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)] [&>svg]:text-[var(--color-alert-warning-text)]",
        destructive: "bg-[var(--color-alert-destructive-bg)] border-[var(--color-alert-destructive-border)] text-[var(--color-alert-destructive-text)] [&>svg]:text-[var(--color-alert-destructive-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, onClose, ...props }, ref) => {
    const Icon = {
      default: Info,
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      destructive: AlertCircle,
    }[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), "pr-10", className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
