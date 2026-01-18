import { useState, useRef, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { SearchIcon } from './icons/SearchIcon'
import { FilterIcon } from './icons/FilterIcon'
import { PlusIcon } from './icons/PlusIcon'
import { FilterPopover } from './FilterPopover'
import { DatePicker } from './DatePicker'
import { FamilyMembersWidget } from './FamilyMembersWidget'

export function DashboardHeader() {
  const { searchText, setSearchText } = useFinance()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const filterPopoverRef = useRef<HTMLDivElement>(null)

  // Fechar popover ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        filterButtonRef.current &&
        filterPopoverRef.current &&
        !filterButtonRef.current.contains(event.target as Node) &&
        !filterPopoverRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isFilterOpen])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div
      className="w-full rounded-lg"
      style={{
        display: 'flex',
        padding: 'var(--space-16, 16px)',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: '8px',
        background: 'var(--color-brand-700, #AFEA00)',
      }}
    >
      {/* Lado esquerdo: Busca e Filtros */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Campo de busca */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
            }}
          />
        </div>

        {/* Botão de filtros */}
        <div className="relative">
          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-10 h-10 rounded-lg border border-neutral-300 bg-neutral-0 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Filtros"
          >
            <FilterIcon />
          </button>

          {/* Popover de filtros (desktop) */}
          {isFilterOpen && (
            <div className="hidden lg:block">
              <FilterPopover ref={filterPopoverRef} onClose={() => setIsFilterOpen(false)} />
            </div>
          )}
        </div>

        {/* Seletor de período */}
        <div className="relative">
          <DatePicker isOpen={isDatePickerOpen} onToggle={() => setIsDatePickerOpen(!isDatePickerOpen)} />
        </div>
      </div>

      {/* Centro: Widget de membros da família */}
      <div className="hidden md:flex items-center gap-3 mx-4">
        <FamilyMembersWidget />
      </div>

      {/* Lado direito: Botão Nova Transação */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors whitespace-nowrap md:w-auto w-full justify-center md:justify-start"
        style={{
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        <PlusIcon />
        <span>Nova Transação</span>
      </button>
    </div>
  )
}
