import { useRef } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalOverlay } from '../ui/ModalOverlay'

interface FilterPopoverProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterPopover({ isOpen, onClose }: FilterPopoverProps) {
  const { transactionType, setTransactionType } = useFinance()
  const contentRef = useRef<HTMLDivElement>(null)

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    setTransactionType(type)
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        ref={contentRef}
        className="rounded-[28px] shadow-lg"
        style={{
          display: 'flex',
          width: '360px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: '28px',
          background: 'var(--color-neutral-1100, #060B14)',
          padding: 'var(--space-16, 16px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4 w-full">
          <h3 className="font-semibold text-neutral-0" style={{ fontSize: '14px', lineHeight: '20px' }}>
            Tipo de Transação
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => handleTypeChange('all')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                transactionType === 'all'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
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
                  : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
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
                  : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
              }`}
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Despesas
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  )
}
