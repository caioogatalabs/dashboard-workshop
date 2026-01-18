import { ReactNode } from 'react'
import { useSidebar } from '../../hooks/useSidebar'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isExpanded, toggleSidebar } = useSidebar()
  
  // Largura da sidebar: expanded = 256px, collapsed = 80px
  const sidebarWidth = isExpanded ? '256px' : '80px'

  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Sidebar - só renderiza no desktop (lg: ≥1280px) */}
      <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar} />

      {/* Main Content - empurrado pela sidebar fixa no desktop */}
      <main
        className="
          w-full flex-1
          transition-all duration-300 ease-in-out
        "
        style={{
          marginLeft: 0, // No mobile/tablet, sem margin
        }}
      >
        {/* Spacer para sidebar no desktop */}
        <div 
          className="hidden lg:block transition-all duration-300 ease-in-out"
          style={{ width: sidebarWidth, height: '1px' }}
        />
        
        {/* Conteúdo com padding responsivo */}
        <div className="
          w-full min-h-screen
          px-4 md:px-6 lg:px-8
          py-4 md:py-6
        ">
          {children}
        </div>
      </main>
    </div>
  )
}
