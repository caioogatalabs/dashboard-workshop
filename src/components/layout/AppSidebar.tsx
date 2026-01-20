import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

// Ícones relacionados com os títulos - 16px x 16px
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
)

const TransactionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
  </svg>
)

const CardsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
  </svg>
)

const GoalsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const ProfileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

// Componente Logo
const Logo = ({ isExpanded }: { isExpanded: boolean }) => {
  if (isExpanded) {
    return (
      <svg width="76" height="30" viewBox="0 0 76 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1.16923C0 0.523483 0.523482 0 1.16923 0H28.0615C28.7073 0 29.2308 0.519745 29.2308 1.16549C29.2308 3.24462 29.2308 7.64469 29.2308 10.5245C29.2308 11.1702 28.7079 11.6923 28.0621 11.6923C26.833 11.6923 25.2992 11.6923 24.2613 11.6923C23.6155 11.6923 23.0923 12.2157 23.0923 12.8614C23.0923 13.679 23.0923 14.6154 23.0923 14.6154C23.0923 14.6154 23.0923 15.5547 23.0923 16.3695C23.0923 17.0152 23.6144 17.5385 24.2601 17.5385C25.3518 17.5385 26.9713 17.5385 28.0629 17.5385C28.7087 17.5385 29.2308 18.0612 29.2308 18.707C29.2308 21.6403 29.2308 26.0002 29.2308 28.0653C29.2308 28.711 28.7073 29.2308 28.0615 29.2308H1.16923C0.523483 29.2308 0 28.7073 0 28.0615V1.16923Z" fill="#1E1E1E"/>
        <path d="M62.9912 0C63.7177 0 64.3066 0.588963 64.3066 1.31543V27.915C64.3066 28.6415 63.7177 29.2305 62.9912 29.2305H36.3916C35.6651 29.2305 35.0762 28.6415 35.0762 27.915V1.31543C35.0762 0.588963 35.6651 0 36.3916 0H62.9912ZM47.9365 11.6924C47.291 11.6925 46.7677 12.2158 46.7676 12.8613V16.3691C46.7676 17.0148 47.2909 17.5379 47.9365 17.5381H51.4443C52.0901 17.5381 52.6133 17.0149 52.6133 16.3691V12.8613C52.6131 12.2157 52.09 11.6924 51.4443 11.6924H47.9365Z" fill="#1E1E1E"/>
        <rect x="70.1543" y="23.3848" width="5.84615" height="5.84615" rx="1.16923" fill="#1E1E1E"/>
      </svg>
    )
  }
  
  // Logo colapsado - apenas "CO." (primeira parte do logo)
  return (
    <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M0 1.16923C0 0.523483 0.523482 0 1.16923 0H28.0615C28.7073 0 29.2308 0.519745 29.2308 1.16549C29.2308 3.24462 29.2308 7.64469 29.2308 10.5245C29.2308 11.1702 28.7079 11.6923 28.0621 11.6923C26.833 11.6923 25.2992 11.6923 24.2613 11.6923C23.6155 11.6923 23.0923 12.2157 23.0923 12.8614C23.0923 13.679 23.0923 14.6154 23.0923 14.6154C23.0923 14.6154 23.0923 15.5547 23.0923 16.3695C23.0923 17.0152 23.6144 17.5385 24.2601 17.5385C25.3518 17.5385 26.9713 17.5385 28.0629 17.5385C28.7087 17.5385 29.2308 18.0612 29.2308 18.707C29.2308 21.6403 29.2308 26.0002 29.2308 28.0653C29.2308 28.711 28.7073 29.2308 28.0615 29.2308H1.16923C0.523483 29.2308 0 28.7073 0 28.0615V1.16923Z" fill="#1E1E1E"/>
    </svg>
  )
}

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    title: "Transações",
    url: ROUTES.TRANSACTIONS,
    icon: TransactionsIcon,
  },
  {
    title: "Cartões",
    url: ROUTES.CARDS,
    icon: CardsIcon,
  },
  {
    title: "Objetivos",
    url: ROUTES.GOALS,
    icon: GoalsIcon,
  },
  {
    title: "Perfil",
    url: ROUTES.PROFILE,
    icon: ProfileIcon,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const isExpanded = state === 'expanded'

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="hidden lg:flex">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <Logo isExpanded={isExpanded} />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url
                const buttonContent = (
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 rounded-lg h-8 px-3 transition-all duration-300 ease-in-out",
                      "flex items-center", // Garante alinhamento vertical
                      isActive && "bg-neutral-1000 text-neutral-0 shadow-sm hover:bg-neutral-900 [&_svg]:text-brand-600",
                      !isActive && "text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200",
                      !isExpanded && "justify-center px-2"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-2 w-full h-full">
                      <item.icon />
                      {isExpanded && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </Button>
                )

                return (
                  <SidebarMenuItem key={item.title}>
                    {!isExpanded ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {buttonContent}
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      buttonContent
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center overflow-hidden">
              <ProfileIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-1000 truncate">
                Caio Ogata
              </p>
              <p className="text-xs text-neutral-600 truncate">
                caio.ogata@gmail.com
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
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
