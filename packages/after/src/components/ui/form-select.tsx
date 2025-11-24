import * as React from "react"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Label } from "./label"
import { cn } from "@/lib/utils"

export interface FormSelectProps {
  name: string
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
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
      onValueChange,
      className,
      children,
    },
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
        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
          name={name}
        >
          <SelectTrigger
            ref={ref}
            id={name}
            className={cn(error && "border-destructive", className)}
            aria-describedby={describedBy}
            aria-invalid={!!error}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
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
