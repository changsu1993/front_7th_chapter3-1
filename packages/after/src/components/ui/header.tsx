import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  title?: string
  user?: {
    name: string
    email?: string
    avatar?: string
  }
  actions?: React.ReactNode
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, logo, title, user, actions, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {logo && (
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                {logo}
              </div>
            )}
            {title && (
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            )}
          </div>

          {children}

          <div className="flex items-center gap-4">
            {actions}
            {user && (
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden flex-col sm:flex">
                  <span className="text-sm font-medium">{user.name}</span>
                  {user.email && (
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
