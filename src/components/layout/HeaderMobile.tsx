import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { MenuDropdown } from './MenuDropdown'

// Componente Logo (reutilizado da Sidebar)
const Logo = () => {
  return (
    <svg width="76" height="30" viewBox="0 0 76 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6">
      <path d="M0 1.16923C0 0.523483 0.523482 0 1.16923 0H28.0615C28.7073 0 29.2308 0.519745 29.2308 1.16549C29.2308 3.24462 29.2308 7.64469 29.2308 10.5245C29.2308 11.1702 28.7079 11.6923 28.0621 11.6923C26.833 11.6923 25.2992 11.6923 24.2613 11.6923C23.6155 11.6923 23.0923 12.2157 23.0923 12.8614C23.0923 13.679 23.0923 14.6154 23.0923 14.6154C23.0923 14.6154 23.0923 15.5547 23.0923 16.3695C23.0923 17.0152 23.6144 17.5385 24.2601 17.5385C25.3518 17.5385 26.9713 17.5385 28.0629 17.5385C28.7087 17.5385 29.2308 18.0612 29.2308 18.707C29.2308 21.6403 29.2308 26.0002 29.2308 28.0653C29.2308 28.711 28.7073 29.2308 28.0615 29.2308H1.16923C0.523483 29.2308 0 28.7073 0 28.0615V1.16923Z" fill="#1E1E1E"/>
      <path d="M62.9912 0C63.7177 0 64.3066 0.588963 64.3066 1.31543V27.915C64.3066 28.6415 63.7177 29.2305 62.9912 29.2305H36.3916C35.6651 29.2305 35.0762 28.6415 35.0762 27.915V1.31543C35.0762 0.588963 35.6651 0 36.3916 0H62.9912ZM47.9365 11.6924C47.291 11.6925 46.7677 12.2158 46.7676 12.8613V16.3691C46.7676 17.0148 47.2909 17.5379 47.9365 17.5381H51.4443C52.0901 17.5381 52.6133 17.0149 52.6133 16.3691V12.8613C52.6131 12.2157 52.09 11.6924 51.4443 11.6924H47.9365Z" fill="#1E1E1E"/>
      <rect x="70.1543" y="23.3848" width="5.84615" height="5.84615" rx="1.16923" fill="#1E1E1E"/>
    </svg>
  )
}

// Ícone de perfil para avatar
const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

export function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAvatarClick = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        data-mobile-header
        className="
          fixed top-0 left-0 right-0
          h-16
          bg-neutral-0 border-b border-neutral-300
          flex items-center justify-between
          px-4
          z-50
          shadow-sm
        "
      >
        {/* Logo à esquerda */}
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center hover:opacity-80 transition-opacity duration-200"
        >
          <Logo />
        </Link>

        {/* Avatar à direita (clicável) */}
        <button
          onClick={handleAvatarClick}
          className="
            w-10 h-10 rounded-full
            bg-neutral-200 border-2 border-neutral-300
            flex items-center justify-center
            overflow-hidden
            hover:bg-neutral-300
            active:scale-95
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2
          "
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <ProfileIcon />
        </button>
      </header>

      {/* Menu Dropdown */}
      <MenuDropdown isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  )
}
