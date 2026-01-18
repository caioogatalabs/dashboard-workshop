import { ReactNode } from 'react'
import { useSidebar } from '../../hooks/useSidebar'
import { Sidebar } from './Sidebar'
import { HeaderMobile } from './HeaderMobile'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isExpanded, toggleSidebar } = useSidebar()
  
  // Largura da sidebar: expanded = 256px, collapsed = 80px
  const sidebarWidth = isExpanded ? '256px' : '80px'

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Header Mobile - só renderiza em mobile/tablet (<1024px) */}
      <HeaderMobile />

      {/* Sidebar - só renderiza no desktop (lg: ≥1280px) */}
      <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar} />

      {/* Main Content - ajusta margin-left conforme sidebar expande/colapsa */}
      <main
        className="
          flex-1 w-full
          transition-all duration-300 ease-in-out
        "
        style={{
          marginLeft: 0, // No mobile/tablet, sem margin
        }}
      >
        {/* Spacer para header mobile */}
        <div className="lg:hidden h-16" />
        
        {/* Conteúdo com padding padrão de 32px */}
        <div 
          className="
            w-full min-h-screen
            transition-all duration-300 ease-in-out
            main-content-wrapper
          "
          style={{
            ['--sidebar-width' as string]: sidebarWidth,
            padding: 'var(--space-32, 32px)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          } as React.CSSProperties}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
