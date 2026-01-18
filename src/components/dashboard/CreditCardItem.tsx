import { FC } from 'react'
import { CreditCard } from '../../types/creditCard'
import { formatCurrency } from '../../utils/currency'
import { getBankLogo } from './icons/BankLogos'

interface CreditCardItemProps {
  card: CreditCard
  onClick: () => void
}

export const CreditCardItem: FC<CreditCardItemProps> = ({ card, onClick }) => {
  // Obter nome do banco ou usar o nome do cartão
  const displayName = card.bankName || card.name

  // Formatar últimos dígitos
  const formattedLastDigits = card.lastDigits ? `**** ${card.lastDigits}` : '**** ****'

  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-4
        p-4
        bg-neutral-0
        cursor-pointer
        border-b
        border-neutral-300
      "
      style={{
        outline: 'none',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'var(--color-neutral-300, #E5E7EB)',
      }}
    >
      {/* Informações ao centro */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Nome do banco/cartão com logo na mesma linha */}
        <div className="flex items-center gap-2">
          {getBankLogo(card.bankName)}
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
        </div>

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

      {/* Últimos dígitos à direita */}
      <div className="flex-shrink-0">
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
      </div>
    </div>
  )
}
