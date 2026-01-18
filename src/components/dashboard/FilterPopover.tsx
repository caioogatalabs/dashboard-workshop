import { forwardRef } from 'react'
import { useFinance } from '../../hooks/useFinance'

interface FilterPopoverProps {
  onClose?: () => void
}

export const FilterPopover = forwardRef<HTMLDivElement, FilterPopoverProps>(({ onClose: _onClose }, ref) => {
  const { transactionType, setTransactionType } = useFinance()

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setTransactionType(type)
  }

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-neutral-300 bg-neutral-0 shadow-lg z-50"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 'var(--space-16, 16px)',
      }}
    >
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-1000" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Tipo de Transação
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => handleTypeChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              transactionType === 'all'
                ? 'bg-neutral-1000 text-neutral-0'
                : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
            style={{ fontSize: '14px', lineHeight: '20px' }}
          >
            Todos
          </button>
          <button
            onClick={() => handleTypeChange('income')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              transactionType === 'income'
                ? 'bg-neutral-1000 text-neutral-0'
                : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
            style={{ fontSize: '14px', lineHeight: '20px' }}
          >
            Receitas
          </button>
          <button
            onClick={() => handleTypeChange('expense')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              transactionType === 'expense'
                ? 'bg-neutral-1000 text-neutral-0'
                : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
            }`}
            style={{ fontSize: '14px', lineHeight: '20px' }}
          >
            Despesas
          </button>
        </div>
      </div>
    </div>
  )
})

FilterPopover.displayName = 'FilterPopover'
