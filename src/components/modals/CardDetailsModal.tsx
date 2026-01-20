import { useMemo } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalOverlay } from '../dashboard/ModalOverlay'
import { CloseIcon } from '../dashboard/icons/CloseIcon'
import { formatCurrency } from '../../utils/currency'
import { CreditCard } from '../../types/creditCard'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  card: CreditCard | null
  onAddExpense?: () => void
}

export function CardDetailsModal({ isOpen, onClose, card, onAddExpense }: CardDetailsModalProps) {
  const { transactions } = useFinance()

  const cardTransactions = useMemo(() => {
    if (!card) return []
    return transactions
      .filter((t) => t.type === 'expense' && t.accountId === card.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [card, transactions])

  const usagePercentage = useMemo(() => {
    if (!card || card.limit === 0) return 0
    return (card.currentBill / card.limit) * 100
  }, [card])

  const availableLimit = useMemo(() => {
    if (!card) return 0
    return card.limit - card.currentBill
  }, [card])

  if (!card) return null

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-neutral-0 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-300">
          <h2 className="text-2xl font-bold text-neutral-1000">{card.name}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
            aria-label="Fechar"
          >
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Limite Total</p>
              <p className="text-lg font-bold text-neutral-1000">{formatCurrency(card.limit)}</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Fatura Atual</p>
              <p className="text-lg font-bold text-neutral-1000">{formatCurrency(card.currentBill)}</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Limite Disponível</p>
              <p className="text-lg font-bold text-neutral-1000">{formatCurrency(availableLimit)}</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Percentual de Uso</p>
              <p className="text-lg font-bold text-neutral-1000">{usagePercentage.toFixed(1)}%</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Data de Fechamento</p>
              <p className="text-lg font-bold text-neutral-1000">Dia {card.closingDay}</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-1">Data de Vencimento</p>
              <p className="text-lg font-bold text-neutral-1000">Dia {card.dueDay}</p>
            </div>
            {card.lastDigits && (
              <div className="p-4 rounded-lg border border-neutral-300 bg-neutral-50">
                <p className="text-sm text-neutral-600 mb-1">Últimos 4 Dígitos</p>
                <p className="text-lg font-bold text-neutral-1000">•••• {card.lastDigits}</p>
              </div>
            )}
          </div>

          {/* Usage Visualization */}
          <div className="p-6 rounded-lg border border-neutral-300 bg-neutral-50">
            <p className="text-sm font-medium text-neutral-1000 mb-3">Uso do Limite</p>
            <div className="w-full bg-neutral-200 rounded-full h-8 relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${usagePercentage}%`,
                  backgroundColor: usagePercentage > 80 ? '#EF4444' : usagePercentage > 50 ? '#F59E0B' : '#15BE78',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-neutral-1000">
                  {usagePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-1000 mb-4">Despesas Vinculadas</h3>
            {cardTransactions.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                <p>Nenhuma despesa registrada neste cartão ainda.</p>
              </div>
            ) : (
              <div className="border border-neutral-300 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-1000">Data</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-1000">Descrição</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-1000">Categoria</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-1000">Parcelas</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-neutral-1000">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cardTransactions.slice(0, 10).map((transaction) => (
                        <tr key={transaction.id} className="border-t border-neutral-300 hover:bg-neutral-50">
                          <td className="px-4 py-3 text-sm text-neutral-600">
                            {format(transaction.date, 'dd/MM/yyyy', { locale: ptBR })}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-neutral-1000">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-600">{transaction.category}</td>
                          <td className="px-4 py-3 text-sm text-neutral-600">
                            {transaction.installments > 1 ? `${transaction.installments}x` : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-neutral-1000 text-right">
                            {formatCurrency(transaction.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-300 bg-neutral-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Fechar
          </button>
          <div className="flex gap-3">
            {onAddExpense && (
              <button
                onClick={onAddExpense}
                className="px-6 py-3 rounded-lg bg-brand-600 text-neutral-1000 font-medium hover:bg-brand-500 transition-colors"
              >
                Adicionar Despesa
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
            >
              Ver Extrato Completo
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  )
}
