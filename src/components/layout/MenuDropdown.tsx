import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ROUTES } from '../../constants'

// Ícones de navegação (reutilizados da Sidebar)
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

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm2 4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M13 12l3-3m0 0l3-3m-3 3H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  to: string
}

const menuItems: MenuItem[] = [
  { icon: <DashboardIcon />, label: 'Dashboard', to: ROUTES.DASHBOARD },
  { icon: <TransactionsIcon />, label: 'Transações', to: ROUTES.TRANSACTIONS },
  { icon: <CardsIcon />, label: 'Cartões', to: ROUTES.CARDS },
  { icon: <GoalsIcon />, label: 'Objetivos', to: ROUTES.GOALS },
  { icon: <ProfileIcon />, label: 'Perfil', to: ROUTES.PROFILE },
]

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // Fechar ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleItemClick = (to: string) => {
    navigate(to)
    onClose()
  }

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log('Logout')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay escuro semi-transparente */}
      <div
        data-mobile-overlay
        className="
          fixed inset-0
          bg-neutral-1000 bg-opacity-50
          z-40
          transition-opacity duration-300 ease-in-out
        "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Dropdown */}
      <div
        data-mobile-menu
        className="
          fixed top-16 left-0 right-0
          bg-neutral-0
          border-b border-neutral-300
          shadow-lg
          z-50
          max-h-[calc(100vh-4rem)]
          overflow-y-auto
          scrollbar-thin
          transform transition-transform duration-300 ease-out
          flex flex-col
        "
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        {/* Header do menu com botão X */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-300">
          <h2 className="text-lg font-semibold text-neutral-1000">Menu</h2>
          <button
            onClick={onClose}
            className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-neutral-600
              hover:bg-neutral-200
              active:scale-95
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2
            "
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Lista de itens de navegação */}
        <nav className="py-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to

            return (
              <button
                key={item.to}
                onClick={() => handleItemClick(item.to)}
                className={`
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  text-left
                  transition-all duration-200 ease-in-out
                  ${isActive
                    ? 'bg-neutral-1000 text-neutral-0'
                    : 'text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200'
                  }
                `}
              >
                <span className={`
                  flex-shrink-0 w-5 h-5 flex items-center justify-center
                  ${isActive ? 'text-brand-600' : 'text-neutral-600'}
                  transition-colors duration-200
                `}>
                  {item.icon}
                </span>
                <span className={`
                  font-medium
                  ${isActive ? 'text-neutral-0' : 'text-neutral-600'}
                  transition-colors duration-200
                `}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Botão Sair */}
        <div className="border-t border-neutral-300 p-4">
          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center justify-center gap-3
              px-4 py-3
              text-neutral-0
              rounded-lg
              font-medium
              active:scale-95
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2
            "
            style={{
              backgroundColor: '#DC2626', // red-600 - cor primitiva para botão de ação destrutiva
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B91C1C' // red-700
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DC2626' // red-600
            }}
          >
            <LogoutIcon />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}
