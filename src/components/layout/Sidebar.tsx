import { Link } from 'react-router-dom'
import { SidebarItem } from './SidebarItem'
import { ROUTES } from '../../constants'

// Ícones simples (serão substituídos por biblioteca de ícones no futuro)
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
)

const TransactionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
  </svg>
)

const CardsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
  </svg>
)

const GoalsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
)

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clipRule="evenodd" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd" />
  </svg>
)

interface SidebarProps {
  isExpanded: boolean
  onToggle: () => void
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  // Larguras baseadas em tokens: expanded = 256px (16*16), collapsed = 80px (16*5)
  const sidebarWidth = isExpanded ? '256px' : '80px'

  return (
    <aside
      className={`
        hidden lg:flex
        fixed left-0 top-0 h-screen
        bg-neutral-0 border-r border-neutral-300
        flex-col
        z-40
        transition-all duration-300 ease-in-out
        shadow-sm
      `}
      style={{ width: sidebarWidth }}
    >
      {/* Header com Logo */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-300">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
        >
          {isExpanded ? (
            <span className="text-xl font-bold text-neutral-1000 tracking-tight">
              logo-co
            </span>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm">
              <span className="text-neutral-0 text-sm font-bold">L</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-thin">
        <SidebarItem
          icon={<DashboardIcon />}
          label="Dashboard"
          to={ROUTES.DASHBOARD}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<TransactionsIcon />}
          label="Transações"
          to={ROUTES.TRANSACTIONS}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<CardsIcon />}
          label="Cartões"
          to={ROUTES.CARDS}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<GoalsIcon />}
          label="Objetivos"
          to={ROUTES.GOALS}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<ProfileIcon />}
          label="Perfil"
          to={ROUTES.PROFILE}
          isExpanded={isExpanded}
        />
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-neutral-300">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center overflow-hidden">
              <ProfileIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-1000 truncate">
                Usuário
              </p>
              <p className="text-xs text-neutral-600 truncate">
                usuario@email.com
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center overflow-hidden">
              <ProfileIcon />
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="
          absolute -right-3 top-1/2 -translate-y-1/2
          w-6 h-6 rounded-full
          bg-neutral-1000 border-2 border-neutral-0
          flex items-center justify-center
          text-neutral-0
          hover:bg-neutral-900
          active:scale-95
          transition-all duration-200 ease-in-out
          shadow-md
          cursor-pointer
        "
        aria-label={isExpanded ? 'Recolher sidebar' : 'Expandir sidebar'}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </aside>
  )
}
