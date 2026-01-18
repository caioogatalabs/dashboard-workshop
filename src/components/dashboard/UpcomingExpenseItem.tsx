import { FC, useState } from 'react'
import { Transaction } from '../../types/transaction'
import { CreditCard, BankAccount } from '../../types'
import { formatCurrency } from '../../utils/currency'
import { CheckIcon } from './icons/CheckIcon'
import { useFinance } from '../../hooks/useFinance'

interface UpcomingExpenseItemProps {
  transaction: Transaction
  account: CreditCard | BankAccount | null
  onMarkAsPaid: (transactionId: string) => void
}

export const UpcomingExpenseItem: FC<UpcomingExpenseItemProps> = ({
  transaction,
  account,
  onMarkAsPaid,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMarking, setIsMarking] = useState(false)

  // Formatar data de vencimento
  const formatDueDate = (date: Date) => {
    const day = date.getDate()
    return `Vence dia ${day}`
  }

  // Identificar origem do pagamento
  const getPaymentSource = () => {
    if (!account) return 'Conta não encontrada'

    // Verificar se é cartão de crédito
    if ('limit' in account) {
      const card = account as CreditCard
      const lastDigits = card.lastDigits || '****'
      return `Crédito ${card.bankName || card.name} **** ${lastDigits}`
    }

    // É conta bancária
    const bankAccount = account as BankAccount
    return `${bankAccount.bankName || bankAccount.name} conta`
  }

  const handleClick = async () => {
    if (isMarking) return

    setIsMarking(true)
    onMarkAsPaid(transaction.id)

    // Simular delay para animação
    setTimeout(() => {
      setIsMarking(false)
    }, 300)
  }

  return (
    <div
      className="flex items-center justify-between py-4 border-b border-neutral-300"
      style={{
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'var(--color-neutral-300, #E5E7EB)',
      }}
    >
      {/* Lado esquerdo - Informações */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Descrição */}
        <p
          className="text-neutral-1000 font-medium"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          }}
        >
          {transaction.description}
        </p>

        {/* Data de vencimento */}
        <span
          className="text-neutral-600"
          style={{
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          {formatDueDate(transaction.date)}
        </span>

        {/* Origem do pagamento */}
        <span
          className="text-neutral-500"
          style={{
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          {getPaymentSource()}
        </span>
      </div>

      {/* Lado direito - Valor e botão check */}
      <div className="flex-shrink-0 flex items-center gap-3">
        {/* Valor */}
        <p
          className="text-neutral-1000 font-bold text-right"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 700,
          }}
        >
          {formatCurrency(transaction.amount)}
        </p>

        {/* Botão check */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="
            w-8 h-8
            rounded-full
            border
            flex items-center justify-center
            transition-all duration-200
          "
          style={{
            width: '32px',
            height: '32px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isHovered
              ? 'var(--color-green-600, #15BE78)'
              : 'var(--color-neutral-300, #E5E7EB)',
            backgroundColor: isHovered
              ? 'var(--color-green-100, #E6FEF4)'
              : 'transparent',
            cursor: 'pointer',
          }}
          aria-label="Marcar como paga"
        >
          <CheckIcon
            style={{
              width: '16px',
              height: '16px',
              color: isHovered
                ? 'var(--color-green-600, #15BE78)'
                : 'var(--color-neutral-400, #D1D5DB)',
            }}
          />
        </button>
      </div>
    </div>
  )
}
