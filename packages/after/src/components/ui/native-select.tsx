import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof nativeSelectVariants> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <select
        className={cn(nativeSelectVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => {
  return <option className={cn(className)} ref={ref} {...props} />
})
NativeSelectOption.displayName = "NativeSelectOption"

const NativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>
>(({ className, ...props }, ref) => {
  return <optgroup className={cn(className)} ref={ref} {...props} />
})
NativeSelectOptGroup.displayName = "NativeSelectOptGroup"

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup, nativeSelectVariants }
