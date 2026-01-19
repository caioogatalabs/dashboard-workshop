import { FC, useState, useMemo } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { WalletIcon } from './icons/WalletIcon'
import { PlusIcon } from './icons/PlusIcon'
import { CheckIcon } from './icons/CheckIcon'
import { UpcomingExpenseItem } from './UpcomingExpenseItem'
import { NewTransactionModal } from '../modals/NewTransactionModal'

export const UpcomingExpensesWidget: FC = () => {
  const { transactions, creditCards, bankAccounts, updateTransaction, addTransaction } = useFinance()
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  // Buscar despesas pendentes e ordenar por data de vencimento
  const upcomingExpenses = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pending = transactions
      .filter((t) => {
        // Filtrar: tipo expense, não paga, status não cancelado, não removida, data >= hoje
        const transactionDate = new Date(t.date)
        transactionDate.setHours(0, 0, 0, 0)

        return (
          t.type === 'expense' &&
          !t.isPaid &&
          t.status !== 'cancelled' &&
          !removedIds.has(t.id) &&
          transactionDate >= today
        )
      })
      .sort((a, b) => {
        // Ordenar por data de vencimento (mais próximas primeiro)
        return a.date.getTime() - b.date.getTime()
      })

    return pending
  }, [transactions, removedIds])

  // Função para encontrar conta ou cartão pelo ID
  const findAccount = (accountId: string) => {
    const card = creditCards.find((c) => c.id === accountId)
    if (card) return card

    const account = bankAccounts.find((a) => a.id === accountId)
    return account || null
  }

  // Marcar despesa como paga
  const handleMarkAsPaid = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId)
    if (!transaction) return

    // Marcar como paga
    updateTransaction(transactionId, {
      isPaid: true,
      status: 'completed',
      updatedAt: new Date(),
    })

    // Se for recorrente, criar próxima ocorrência
    if (transaction.isRecurring && transaction.recurringPeriod === 'monthly') {
      const nextDate = new Date(transaction.date)
      nextDate.setMonth(nextDate.getMonth() + 1)

      addTransaction({
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        category: transaction.category,
        date: nextDate,
        accountId: transaction.accountId,
        memberId: transaction.memberId,
        installments: transaction.installments,
        currentInstallment: transaction.currentInstallment,
        isRecurring: transaction.isRecurring,
        recurringPeriod: transaction.recurringPeriod,
        isPaid: false,
        status: 'pending',
      })
    }

    // Se for parcelada, verificar próxima parcela
    if (transaction.installments > 1 && transaction.currentInstallment < transaction.installments) {
      const nextDate = new Date(transaction.date)
      nextDate.setMonth(nextDate.getMonth() + 1)

      addTransaction({
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        category: transaction.category,
        date: nextDate,
        accountId: transaction.accountId,
        memberId: transaction.memberId,
        installments: transaction.installments,
        currentInstallment: transaction.currentInstallment + 1,
        isRecurring: transaction.isRecurring,
        recurringPeriod: transaction.recurringPeriod,
        isPaid: false,
        status: 'pending',
      })
    }

    // Remover da lista com animação
    setRemovedIds((prev) => new Set(prev).add(transactionId))

    // Mostrar mensagem de confirmação (pode ser implementado com toast)
    console.log('Despesa marcada como paga!')
  }

  const handleAddExpense = () => {
    setIsNewTransactionOpen(true)
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: 'var(--color-neutral-0, #FEFEFE)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        {/* Título com ícone */}
        <div className="flex items-center gap-3">
          <div className="text-neutral-1000">
            <WalletIcon />
          </div>
          <h2
            className="text-xl font-semibold text-neutral-1000"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              fontWeight: 600,
            }}
          >
            Próximas despesas
          </h2>
        </div>

        {/* Botão adicionar */}
        <button
          onClick={handleAddExpense}
          className="
            w-10 h-10
            rounded-full
            bg-neutral-0
            border border-neutral-300
            flex items-center justify-center
            text-neutral-600
            hover:bg-neutral-100
            transition-colors duration-200
          "
          aria-label="Adicionar despesa"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Lista de despesas */}
      {upcomingExpenses.length === 0 ? (
        <div
          className="w-full py-12 flex flex-col items-center justify-center gap-3"
          style={{
            border: '1px dashed var(--color-neutral-300, #E5E7EB)',
            borderRadius: '8px',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-green-100, #E6FEF4)',
            }}
          >
            <CheckIcon
              style={{
                width: '24px',
                height: '24px',
                color: 'var(--color-green-600, #15BE78)',
              }}
            />
          </div>
          <p
            className="text-neutral-500 text-center"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            Nenhuma despesa pendente
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {upcomingExpenses.map((expense) => {
            const account = findAccount(expense.accountId)
            return (
              <UpcomingExpenseItem
                key={expense.id}
                transaction={expense}
                account={account}
                onMarkAsPaid={handleMarkAsPaid}
              />
            )
          })}
        </div>
      )}
      
      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        onClose={() => setIsNewTransactionOpen(false)}
      />
    </div>
  )
}
