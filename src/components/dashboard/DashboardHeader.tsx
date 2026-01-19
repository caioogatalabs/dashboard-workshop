import { useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { SearchIcon } from './icons/SearchIcon'
import { FilterIcon } from './icons/FilterIcon'
import { PlusIcon } from './icons/PlusIcon'
import { FilterPopover } from './FilterPopover'
import { DatePicker } from './DatePicker'
import { FamilyMembersWidget } from './FamilyMembersWidget'
import { NewTransactionModal } from '../modals/NewTransactionModal'
import { FiltersMobileModal } from '../modals/FiltersMobileModal'

export function DashboardHeader() {
  const { searchText, setSearchText } = useFinance()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [isFiltersMobileOpen, setIsFiltersMobileOpen] = useState(false)

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
        boxSizing: 'border-box',
        maxWidth: '100%',
        minHeight: '80px',
        height: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Lado esquerdo: Busca e Filtros */}
      <div className="flex items-center gap-2 flex-1 min-w-0 h-full">
        {/* Campo de busca */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute top-1/2 -translate-y-1/2 text-neutral-500" style={{ left: 'var(--space-16, 16px)', pointerEvents: 'none' }}>
            <SearchIcon style={{ width: '16px', height: '16px' }} />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchText}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-neutral-900 bg-neutral-1100 text-neutral-0 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
            style={{
              paddingLeft: 'calc(var(--space-16, 16px) + 16px + var(--space-8, 8px))',
              paddingRight: 'var(--space-16, 16px)',
              paddingTop: 'var(--space-12, 12px)',
              paddingBottom: 'var(--space-12, 12px)',
              borderRadius: 'var(--shape-100, 100px)',
              background: 'var(--color-neutral-1100, #060B14)',
              fontSize: '14px',
              lineHeight: '20px',
              minHeight: '48px',
            }}
          />
        </div>

        {/* Botão de filtros */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => {
              // No mobile, abre modal fullscreen; no desktop, abre popover
              if (window.innerWidth < 1024) {
                setIsFiltersMobileOpen(true)
              } else {
                setIsFilterOpen(!isFilterOpen)
              }
            }}
            className="flex items-center justify-center text-neutral-500 hover:text-neutral-0 transition-colors"
            style={{
              display: 'flex',
              padding: 'var(--space-12, 12px) var(--space-16, 16px)',
              alignItems: 'center',
              gap: 'var(--space-8, 8px)',
              borderRadius: 'var(--shape-100, 100px)',
              background: 'var(--color-neutral-1100, #060B14)',
              border: '1px solid var(--color-neutral-900, #1F2937)',
              minHeight: '48px',
              minWidth: '48px',
            }}
            aria-label="Filtros"
          >
            <FilterIcon style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Popover de filtros (desktop) */}
          <div className="hidden lg:block">
            <FilterPopover isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
          </div>
        </div>

        {/* Seletor de período */}
        <div className="relative flex-shrink-0">
          <DatePicker isOpen={isDatePickerOpen} onToggle={() => setIsDatePickerOpen(!isDatePickerOpen)} />
        </div>
      </div>

      {/* Centro: Widget de membros da família */}
      <div className="hidden md:flex items-center gap-2 mx-2 h-full flex-shrink-0">
        <FamilyMembersWidget />
      </div>

      {/* Lado direito: Botão Nova Transação */}
      <button
        onClick={() => setIsNewTransactionOpen(true)}
        className="flex items-center gap-2 text-neutral-0 font-medium hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
        style={{
          display: 'flex',
          padding: 'var(--space-12, 12px) var(--space-16, 16px)',
          alignItems: 'center',
          gap: 'var(--space-8, 8px)',
          borderRadius: 'var(--shape-100, 100px)',
          background: 'var(--color-neutral-1100, #060B14)',
          border: '1px solid var(--color-neutral-900, #1F2937)',
          fontSize: '14px',
          lineHeight: '20px',
          minHeight: '48px',
        }}
      >
        <PlusIcon style={{ width: '16px', height: '16px' }} />
        <span>Nova transação</span>
      </button>
      
      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        onClose={() => setIsNewTransactionOpen(false)}
      />
      
      {/* Modal de filtros mobile */}
      <FiltersMobileModal
        isOpen={isFiltersMobileOpen}
        onClose={() => setIsFiltersMobileOpen(false)}
      />
    </div>
  )
}
