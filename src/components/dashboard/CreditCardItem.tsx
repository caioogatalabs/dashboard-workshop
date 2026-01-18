import { FC } from 'react'
import { CreditCard } from '../../types/creditCard'
import { formatCurrency } from '../../utils/currency'

interface CreditCardItemProps {
  card: CreditCard
  onClick: () => void
}

export const CreditCardItem: FC<CreditCardItemProps> = ({ card, onClick }) => {
  // Calcular percentual de uso
  const usagePercentage = card.limit > 0 ? Math.round((card.currentBill / card.limit) * 100) : 0

  // Determinar cores baseadas no tema
  const getThemeStyles = () => {
    switch (card.theme) {
      case 'black':
        return {
          iconBg: 'var(--color-neutral-1000, #111827)',
          iconColor: 'var(--color-neutral-0, #FFFFFF)',
          badgeBg: 'var(--color-neutral-1000, #111827)',
          badgeColor: 'var(--color-neutral-0, #FFFFFF)',
        }
      case 'lime':
        return {
          iconBg: 'var(--color-brand-600, #D7FE03)',
          iconColor: 'var(--color-neutral-1000, #111827)',
          badgeBg: 'var(--color-brand-600, #D7FE03)',
          badgeColor: 'var(--color-neutral-1000, #111827)',
        }
      case 'white':
        return {
          iconBg: 'var(--color-neutral-0, #FFFFFF)',
          iconColor: 'var(--color-neutral-1000, #111827)',
          badgeBg: 'var(--color-neutral-100, #F9FAFB)',
          badgeColor: 'var(--color-neutral-1000, #111827)',
          iconBorder: '1px solid var(--color-neutral-300, #E5E7EB)',
        }
      default:
        return {
          iconBg: 'var(--color-neutral-1000, #111827)',
          iconColor: 'var(--color-neutral-0, #FFFFFF)',
          badgeBg: 'var(--color-neutral-1000, #111827)',
          badgeColor: 'var(--color-neutral-0, #FFFFFF)',
        }
    }
  }

  const themeStyles = getThemeStyles()

  // Obter nome do banco ou usar o nome do cartão
  const displayName = card.bankName || card.name

  // Formatar últimos dígitos
  const formattedLastDigits = card.lastDigits ? `**** ${card.lastDigits}` : '**** ****'

  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-4
        p-4 rounded-lg
        bg-neutral-0
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
      "
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo do banco à esquerda */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold"
        style={{
          backgroundColor: themeStyles.iconBg,
          color: themeStyles.iconColor,
          border: themeStyles.iconBorder || 'none',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        {/* Mostrar iniciais do banco ou ícone de cartão */}
        {card.bankName ? (
          card.bankName.substring(0, 2).toUpperCase()
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
      </div>

      {/* Informações ao centro */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Nome do banco/cartão */}
        <p
          className="text-sm font-medium text-neutral-1000 truncate"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          {displayName}
        </p>

        {/* Valor da fatura atual */}
        <p
          className="text-lg font-bold text-neutral-1000"
          style={{
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 700,
          }}
        >
          {formatCurrency(card.currentBill)}
        </p>

        {/* Vence dia */}
        <span
          className="text-xs text-neutral-500"
          style={{
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          Vence dia {card.dueDay}
        </span>
      </div>

      {/* Últimos dígitos e badge à direita */}
      <div className="flex-shrink-0 flex flex-col items-end gap-2">
        {/* Últimos dígitos */}
        <span
          className="text-sm text-neutral-1000 font-medium"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          {formattedLastDigits}
        </span>

        {/* Badge de percentual */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs"
          style={{
            backgroundColor: themeStyles.badgeBg,
            color: themeStyles.badgeColor,
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: 600,
          }}
        >
          {usagePercentage}%
        </div>
      </div>
    </div>
  )
}
