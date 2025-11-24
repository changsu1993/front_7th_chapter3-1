import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Checkbox } from "./checkbox"
import { Label } from "./label"
import { cn } from "@/lib/utils"

export interface FormCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  name: string
  label?: string
  helperText?: string
  error?: string
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  FormCheckboxProps
>(
  (
    { name, label, helperText, error, disabled, required, className, ...props },
    ref
  ) => {
    const helperTextId = `${name}-helper`
    const errorId = `${name}-error`
    const describedBy = error ? errorId : helperText ? helperTextId : undefined

    return (
      <div className={cn("space-y-2", disabled && "opacity-50")}>
        <div className="flex items-center space-x-2">
          <Checkbox
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
          {label && (
            <Label
              htmlFor={name}
              className="cursor-pointer leading-none peer-disabled:cursor-not-allowed"
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
        </div>
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
FormCheckbox.displayName = "FormCheckbox"

export { FormCheckbox }
