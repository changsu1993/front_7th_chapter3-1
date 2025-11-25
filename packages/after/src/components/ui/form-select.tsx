import * as React from "react"
import { NativeSelect } from "./native-select"
import { Label } from "./label"
import { cn } from "@/lib/utils"

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  onValueChange?: (value: string) => void
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      label,
      helperText,
      error,
      disabled,
      required,
      placeholder,
      value,
      defaultValue,
      onChange,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const helperTextId = `${name}-helper`
    const errorId = `${name}-error`
    const describedBy = error ? errorId : helperText ? helperTextId : undefined

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <div className={cn("space-y-2", disabled && "opacity-50")}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <NativeSelect
          ref={ref}
          id={name}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={cn(error && "border-destructive", className)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          variant={error ? "error" : "default"}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </NativeSelect>
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
FormSelect.displayName = "FormSelect"

export { FormSelect }
