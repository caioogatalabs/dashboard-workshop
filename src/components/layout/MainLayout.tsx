import { ReactNode } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { HeaderMobile } from './HeaderMobile'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-neutral-100" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {/* Header Mobile - só renderiza em mobile/tablet (<1024px) */}
        <HeaderMobile />

        {/* Sidebar - só renderiza no desktop (lg: ≥1280px) */}
        <AppSidebar />

        {/* Main Content - ajusta margin-left conforme sidebar expande/colapsa */}
        <SidebarInset className="flex-1 transition-all duration-300 ease-in-out">
          {/* Spacer para header mobile */}
          <div className="lg:hidden h-16" />
          
          {/* Conteúdo com padding padrão de 32px */}
          <div 
            className="
              w-full min-h-screen
              transition-all duration-300 ease-in-out
            "
            style={{
              padding: 'var(--space-32, 32px)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              width: '100%',
              maxWidth: '100%',
            } as React.CSSProperties}
          >
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
