import * as React from "react"
import { Label } from "./label"
import { cn } from "@/lib/utils"

export interface FormFieldProps {
  name: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
  children: React.ReactNode
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { name, label, helperText, error, disabled, required, className, children },
    ref
  ) => {
    const helperTextId = `${name}-helper`
    const errorId = `${name}-error`

    return (
      <div
        ref={ref}
        className={cn("space-y-2", disabled && "opacity-50", className)}
      >
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
