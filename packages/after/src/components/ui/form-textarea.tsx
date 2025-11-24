import * as React from "react"
import { Textarea, type TextareaProps } from "./textarea"
import { Label } from "./label"
import { cn } from "@/lib/utils"

export interface FormTextareaProps extends TextareaProps {
  name: string
  label?: string
  helperText?: string
  error?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { name, label, helperText, error, disabled, required, className, ...props },
    ref
  ) => {
    const helperTextId = `${name}-helper`
    const errorId = `${name}-error`
    const describedBy = error ? errorId : helperText ? helperTextId : undefined

    return (
      <div className={cn("space-y-2", disabled && "opacity-50")}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Textarea
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          required={required}
          className={cn(error && "border-destructive", className)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          {...props}
        />
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
FormTextarea.displayName = "FormTextarea"

export { FormTextarea }
