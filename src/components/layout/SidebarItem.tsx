import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

interface SidebarItemProps {
  icon: ReactNode
  label: string
  to: string
  isExpanded: boolean
}

export function SidebarItem({ icon, label, to, isExpanded }: SidebarItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <div className="group relative">
      <Link
        to={to}
        className={`
          flex items-center gap-3 rounded-lg px-3 py-2.5
          transition-all duration-300 ease-in-out
          ${isActive 
            ? 'bg-neutral-1000 text-neutral-0 shadow-sm' 
            : 'text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200'
          }
          ${!isExpanded ? 'justify-center w-full' : ''}
        `}
      >
        <span className={`
          flex-shrink-0 w-5 h-5 flex items-center justify-center
          ${isActive ? 'text-brand-600' : 'text-neutral-600'}
          transition-colors duration-300
        `}>
          {icon}
        </span>
        {isExpanded && (
          <span className={`
            font-medium whitespace-nowrap
            ${isActive ? 'text-neutral-0' : 'text-neutral-600'}
            transition-colors duration-300
          `}>
            {label}
          </span>
        )}
      </Link>
      {!isExpanded && (
        <div className="
          absolute left-full ml-3 px-3 py-2
          bg-neutral-1000 text-neutral-0 text-sm font-medium rounded-lg
          opacity-0 pointer-events-none
          group-hover:opacity-100
          transition-opacity duration-200 delay-300
          whitespace-nowrap z-50
          shadow-lg
          before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2
          before:border-4 before:border-transparent before:border-r-neutral-1000
        ">
          {label}
        </div>
      )}
    </div>
  )
}
