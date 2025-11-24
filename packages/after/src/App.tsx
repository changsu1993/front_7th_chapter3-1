import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Header, ThemeToggle } from './components/ui'
import { ManagementPage } from './pages/ManagementPage'

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="design-system-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Header
          logo="L"
          title="Design System Demo"
          user={{
            name: "Demo User",
            email: "demo@example.com"
          }}
          actions={<ThemeToggle />}
        />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
