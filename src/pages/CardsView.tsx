import { useState, useMemo } from 'react'
import { useFinance } from '../hooks/useFinance'
import { CreditCard } from '../types/creditCard'
import { formatCurrency } from '../utils/currency'
import { getBankLogo } from '../components/dashboard/icons/BankLogos'
import { PlusIcon } from '../components/dashboard/icons/PlusIcon'
import { CalendarIcon } from '../components/dashboard/icons/CalendarIcon'
import { AddAccountModal } from '../components/modals/AddAccountModal'
import { CardDetailsModal } from '../components/modals/CardDetailsModal'
import { NewTransactionModal } from '../components/modals/NewTransactionModal'

interface CardDetailCardProps {
  card: CreditCard
  onViewDetails: () => void
  onAddExpense: () => void
}

function CardDetailCard({ card, onViewDetails, onAddExpense }: CardDetailCardProps) {
  const displayName = card.bankName || card.name
  const formattedLastDigits = card.lastDigits ? `•••• ${card.lastDigits}` : '•••• ••••'
  const availableLimit = card.limit - card.currentBill
  const usagePercentage = (card.currentBill / card.limit) * 100
  const isNearLimit = usagePercentage >= 80

  // Estilos do tema
  const getThemeStyles = () => {
    switch (card.theme) {
      case 'black':
        return {
          borderColor: 'var(--color-neutral-1000, #111827)',
          borderWidth: '3px',
        }
      case 'lime':
        return {
          borderColor: 'var(--color-brand-600, #D7FE03)',
          borderWidth: '3px',
        }
      case 'white':
        return {
          borderColor: 'var(--color-neutral-300, #E5E7EB)',
          borderWidth: '3px',
        }
      default:
        return {
          borderColor: 'var(--color-neutral-300, #E5E7EB)',
          borderWidth: '1px',
        }
    }
  }

  const themeStyles = getThemeStyles()

  return (
    <div
      onClick={onViewDetails}
      className="flex flex-col bg-neutral-0 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        gap: '20px',
        borderRadius: '16px',
        background: 'var(--color-neutral-0, #FEFEFE)',
        border: `3px solid ${themeStyles.borderColor}`,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Topo: Nome e Logo */}
      <div className="flex items-center gap-3">
        {getBankLogo(card.bankName)}
        <h3
          className="text-xl font-bold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 700,
          }}
        >
          {displayName}
        </h3>
      </div>

      {/* Seção de Valores */}
      <div className="flex flex-col gap-4">
        {/* Limite Total */}
        <div className="flex flex-col gap-1">
          <span
            className="text-xs text-neutral-500"
            style={{
              fontSize: '12px',
              lineHeight: '16px',
            }}
          >
            Limite Total
          </span>
          <p
            className="text-lg font-semibold text-neutral-1000"
            style={{
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 600,
            }}
          >
            {formatCurrency(card.limit)}
          </p>
        </div>

        {/* Fatura Atual */}
        <div className="flex flex-col gap-1">
          <span
            className="text-xs text-neutral-500"
            style={{
              fontSize: '12px',
              lineHeight: '16px',
            }}
          >
            Fatura Atual
          </span>
          <p
            className="text-2xl font-bold"
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
              color: isNearLimit
                ? 'var(--color-red-accent-700, #DC2626)'
                : 'var(--color-neutral-1000, #111827)',
            }}
          >
            {formatCurrency(card.currentBill)}
          </p>
        </div>

        {/* Limite Disponível e Percentual */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <span
              className="text-xs text-neutral-500"
              style={{
                fontSize: '12px',
                lineHeight: '16px',
              }}
            >
              Limite Disponível
            </span>
            <p
              className="text-base font-semibold text-neutral-1000"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
              }}
            >
              {formatCurrency(availableLimit)}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span
              className="text-xs text-neutral-500"
              style={{
                fontSize: '12px',
                lineHeight: '16px',
              }}
            >
              Uso
            </span>
            <p
              className="text-base font-semibold text-neutral-1000"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
              }}
            >
              {usagePercentage.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{
            height: '12px',
            borderRadius: '100px',
            background: 'var(--color-neutral-200, #F3F4F6)',
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(usagePercentage, 100)}%`,
              background: isNearLimit
                ? 'var(--color-red-accent-700, #DC2626)'
                : 'var(--color-brand-600, #D7FE03)',
              borderRadius: '100px',
            }}
          />
        </div>
      </div>

      {/* Datas */}
      <div className="flex items-center gap-6 pt-2 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <CalendarIcon style={{ width: '16px', height: '16px', color: 'var(--color-neutral-500, #6B7280)' }} />
          <div className="flex flex-col">
            <span
              className="text-xs text-neutral-500"
              style={{
                fontSize: '10px',
                lineHeight: '14px',
              }}
            >
              Fechamento
            </span>
            <span
              className="text-sm font-medium text-neutral-1000"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
              }}
            >
              Dia {card.closingDay}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon style={{ width: '16px', height: '16px', color: 'var(--color-neutral-500, #6B7280)' }} />
          <div className="flex flex-col">
            <span
              className="text-xs text-neutral-500"
              style={{
                fontSize: '10px',
                lineHeight: '14px',
              }}
            >
              Vencimento
            </span>
            <span
              className="text-sm font-medium text-neutral-1000"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
              }}
            >
              Dia {card.dueDay}
            </span>
          </div>
        </div>
      </div>

      {/* Últimos Dígitos */}
      {card.lastDigits && (
        <div className="pt-2 border-t border-neutral-200">
          <span
            className="text-sm font-medium text-neutral-600"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}
          >
            {formattedLastDigits}
          </span>
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails()
          }}
          className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          Ver Detalhes
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddExpense()
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-neutral-1000 text-neutral-0 hover:bg-neutral-900 transition-colors"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          Adicionar Despesa
        </button>
      </div>
    </div>
  )
}

export function CardsView() {
  const { creditCards } = useFinance()
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  // Ordenar cartões por fatura decrescente (mais gasto primeiro)
  const sortedCards = useMemo(() => {
    return [...creditCards].sort((a, b) => b.currentBill - a.currentBill)
  }, [creditCards])

  const handleCardClick = (card: CreditCard) => {
    setSelectedCard(card)
    setIsCardDetailsOpen(true)
  }

  const handleAddCard = () => {
    setIsAddAccountOpen(true)
  }

  const handleAddExpense = (card?: CreditCard) => {
    if (card) {
      setSelectedCard(card)
    }
    setIsCardDetailsOpen(false)
    setIsNewTransactionOpen(true)
  }

  return (
    <div
      className="w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '32px',
        flex: '1 0 0',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        minHeight: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="w-full flex items-center justify-between"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h1
          className="text-3xl font-bold text-neutral-1000"
          style={{
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 700,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Cartões de Crédito
        </h1>
        <button
          onClick={handleAddCard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-1000 text-neutral-0 hover:bg-neutral-900 transition-colors"
          style={{
            display: 'flex',
            padding: 'var(--space-12, 12px) var(--space-16, 16px)',
            alignItems: 'center',
            gap: 'var(--space-8, 8px)',
            borderRadius: '8px',
            background: 'var(--color-neutral-1000, #111827)',
            color: 'var(--color-neutral-0, #FFFFFF)',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            minHeight: '40px',
          }}
        >
          <PlusIcon style={{ width: '16px', height: '16px' }} />
          <span>Novo Cartão</span>
        </button>
      </div>

      {/* Grid de Cartões */}
      {sortedCards.length === 0 ? (
        <div
          className="w-full flex flex-col items-center justify-center py-16 px-4"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px 16px',
            gap: '16px',
            border: '2px dashed var(--color-neutral-300, #E5E7EB)',
            borderRadius: '16px',
            background: 'var(--color-neutral-50, #FAFAFA)',
          }}
        >
          <div
            className="text-neutral-400"
            style={{
              color: 'var(--color-neutral-400, #9CA3AF)',
              width: '48px',
              height: '48px',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3
            className="text-lg font-semibold text-neutral-600"
            style={{
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 600,
              color: 'var(--color-neutral-600, #4B5563)',
            }}
          >
            Nenhum cartão cadastrado
          </h3>
          <button
            onClick={handleAddCard}
            className="px-6 py-3 rounded-lg bg-neutral-1000 text-neutral-0 hover:bg-neutral-900 transition-colors"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'var(--color-neutral-1000, #111827)',
              color: 'var(--color-neutral-0, #FFFFFF)',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
              marginTop: '8px',
            }}
          >
            Cadastrar Primeiro Cartão
          </button>
        </div>
      ) : (
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            gap: '24px',
            width: '100%',
          }}
        >
          {sortedCards.map((card) => (
            <CardDetailCard
              key={card.id}
              card={card}
              onViewDetails={() => handleCardClick(card)}
              onAddExpense={() => handleAddExpense(card)}
            />
          ))}
        </div>
      )}

      {/* Modais */}
      <AddAccountModal isOpen={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />

      <CardDetailsModal
        isOpen={isCardDetailsOpen}
        onClose={() => {
          setIsCardDetailsOpen(false)
          setSelectedCard(null)
        }}
        card={selectedCard}
        onAddExpense={() => handleAddExpense(selectedCard || undefined)}
      />

      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        onClose={() => {
          setIsNewTransactionOpen(false)
          setSelectedCard(null)
        }}
        preselectedAccountId={selectedCard?.id}
      />
    </div>
  )
}
