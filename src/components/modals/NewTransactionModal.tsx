import { useState, useEffect, useMemo } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalFullscreen } from './ModalFullscreen'
import { CloseIcon } from '../dashboard/icons/CloseIcon'
import { ArrowDownLeftIcon } from '../dashboard/icons/ArrowDownLeftIcon'
import { ArrowUpRightIcon } from '../dashboard/icons/ArrowUpRightIcon'
import { format } from 'date-fns'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedAccountId?: string
}

const INCOME_CATEGORIES = ['Salário', 'Freelance', 'Investimentos', 'Aluguel', 'Outros']
const EXPENSE_CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Contas']

export function NewTransactionModal({ isOpen, onClose, preselectedAccountId }: NewTransactionModalProps) {
  const { addTransaction, bankAccounts, creditCards, familyMembers } = useFinance()
  
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [memberId, setMemberId] = useState<string | null>(null)
  const [accountId, setAccountId] = useState(preselectedAccountId || '')
  const [installments, setInstallments] = useState(1)
  const [isRecurring, setIsRecurring] = useState(false)
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isCreditCard = useMemo(() => {
    return creditCards.some(c => c.id === accountId)
  }, [accountId, creditCards])

  const availableCategories = useMemo(() => {
    return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  }, [type])

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setType('income')
      setAmount('')
      setDescription('')
      setCategory('')
      setDate(format(new Date(), 'yyyy-MM-dd'))
      setMemberId(null)
      setAccountId(preselectedAccountId || '')
      setInstallments(1)
      setIsRecurring(false)
      setErrors({})
    }
  }, [isOpen, preselectedAccountId])

  useEffect(() => {
    if (isRecurring) {
      setInstallments(1)
    }
  }, [isRecurring])

  useEffect(() => {
    if (installments > 1) {
      setIsRecurring(false)
    }
  }, [installments])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === '') {
      setAmount('')
      return
    }
    const numValue = parseInt(value, 10) / 100
    setAmount(numValue.toFixed(2))
  }

  const handleCreateCategory = () => {
    if (newCategoryName.trim().length >= 3) {
      // In a real app, this would add to a categories list
      setCategory(newCategoryName.trim())
      setNewCategoryName('')
      setIsCreatingCategory(false)
    }
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    // Validation
    const amountNum = parseFloat(amount)
    if (!amount || amountNum <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero'
    }

    if (!description || description.trim().length < 3) {
      newErrors.description = 'Descrição deve ter pelo menos 3 caracteres'
    }

    if (!category) {
      newErrors.category = 'Selecione uma categoria'
    }

    if (!accountId) {
      newErrors.accountId = 'Selecione uma conta ou cartão'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Create transaction
    addTransaction({
      type,
      amount: amountNum,
      description: description.trim(),
      category,
      date: new Date(date),
      accountId,
      memberId,
      installments: isCreditCard && type === 'expense' ? installments : 1,
      currentInstallment: 1,
      isRecurring: type === 'expense' ? isRecurring : false,
      recurringPeriod: isRecurring ? 'monthly' : undefined,
      isPaid: false,
      status: 'completed',
    })

    // Close modal
    onClose()
    
    // Show success toast (would need toast system)
    console.log('Transação registrada com sucesso!')
  }

  return (
    <ModalFullscreen isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-neutral-300"
        style={{
          padding: 'var(--space-24, 24px) var(--space-32, 32px)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: type === 'income' 
                ? 'var(--color-brand-600, #D7FE03)' 
                : 'var(--color-neutral-1000, #111827)',
            }}
          >
            {type === 'income' ? (
              <ArrowDownLeftIcon style={{ width: '32px', height: '32px', color: 'var(--color-neutral-1000, #111827)' }} />
            ) : (
              <ArrowUpRightIcon style={{ width: '32px', height: '32px', color: 'var(--color-neutral-0, #FFFFFF)' }} />
            )}
          </div>
          <div>
            <h2
              className="text-3xl font-bold text-neutral-1000"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 700,
              }}
            >
              Nova Transação
            </h2>
            <p
              className="text-neutral-600 mt-1"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              Registre entradas e saídas para manter seu controle.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
          aria-label="Fechar"
        >
          <CloseIcon style={{ width: '24px', height: '24px' }} />
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto bg-neutral-100"
        style={{
          backgroundColor: 'var(--color-neutral-100, #F9FAFB)',
        }}
      >
        <div
          className="max-w-2xl mx-auto py-8 px-6"
          style={{
            maxWidth: '700px',
            padding: 'var(--space-32, 32px)',
          }}
        >
          {/* Type Toggle */}
          <div
            className="mb-6 p-1 rounded-lg bg-neutral-200"
            style={{
              backgroundColor: 'var(--color-neutral-200, #F3F4F6)',
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setType('income')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  type === 'income'
                    ? 'bg-neutral-0 text-neutral-1000 shadow-sm'
                    : 'bg-transparent text-neutral-600'
                }`}
                style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                Receita
              </button>
              <button
                onClick={() => setType('expense')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  type === 'expense'
                    ? 'bg-neutral-0 text-neutral-1000 shadow-sm'
                    : 'bg-transparent text-neutral-600'
                }`}
                style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                Despesa
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-neutral-1000 mb-2">
                Valor da Transação
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  style={{ fontSize: '18px', fontWeight: 500 }}
                >
                  R$
                </span>
                <input
                  type="text"
                  value={amount ? `R$ ${amount}` : ''}
                  onChange={handleAmountChange}
                  placeholder="R$ 0,00"
                  className={`w-full pl-12 pr-4 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                    errors.amount ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  style={{
                    height: '56px',
                    fontSize: '18px',
                    lineHeight: '24px',
                  }}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-1000 mb-2">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000"
                style={{
                  height: '56px',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-1000 mb-2">
                Descrição
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Supermercado Semanal"
                className={`w-full px-4 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                  errors.description ? 'border-red-500' : 'border-neutral-300'
                }`}
                style={{
                  height: '56px',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-1000 mb-2">
                Categoria
              </label>
              {!isCreatingCategory ? (
                <div className="space-y-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-4 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                      errors.category ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    style={{
                      height: '56px',
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}
                  >
                    <option value="">Selecione a categoria</option>
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsCreatingCategory(true)}
                    className="text-sm text-brand-600 hover:text-brand-700"
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-brand-600, #D7FE03)',
                    }}
                  >
                    + Nova categoria
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Nome da categoria"
                      className="flex-1 px-4 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000"
                      style={{
                        height: '56px',
                        fontSize: '16px',
                        lineHeight: '24px',
                      }}
                    />
                    <button
                      onClick={handleCreateCategory}
                      className="px-4 py-2 rounded-lg bg-brand-600 text-neutral-1000 font-medium"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingCategory(false)
                        setNewCategoryName('')
                      }}
                      className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Member and Account Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Member */}
              <div>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Membro
                </label>
                <select
                  value={memberId || ''}
                  onChange={(e) => setMemberId(e.target.value || null)}
                  className="w-full px-4 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000"
                  style={{
                    height: '56px',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  <option value="">Família (Geral)</option>
                  {familyMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account/Card */}
              <div>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Conta / Cartão
                </label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className={`w-full px-4 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                    errors.accountId ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  style={{
                    height: '56px',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  <option value="">Selecione</option>
                  <optgroup label="Contas Bancárias">
                    {bankAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cartões de Crédito">
                    {creditCards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.accountId && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountId}</p>
                )}
              </div>
            </div>

            {/* Installments - Only for credit card expenses */}
            {isCreditCard && type === 'expense' && (
              <div className={`transition-all duration-300 ${installments > 1 ? 'opacity-100' : 'opacity-100'}`}>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Parcelamento
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(parseInt(e.target.value, 10))}
                  disabled={isRecurring}
                  className="w-full px-4 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 disabled:bg-neutral-100 disabled:text-neutral-400"
                  style={{
                    height: '56px',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num === 1 ? 'À vista (1x)' : `${num}x`}
                    </option>
                  ))}
                </select>
                {isRecurring && (
                  <p className="text-sm text-neutral-500 italic mt-1">
                    Parcelamento desabilitado para despesas recorrentes
                  </p>
                )}
              </div>
            )}

            {/* Recurring Expense - Only for expenses */}
            {type === 'expense' && (
              <div
                className={`p-4 rounded-lg border ${
                  isRecurring
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
                style={{
                  backgroundColor: isRecurring ? 'rgba(50, 71, 255, 0.05)' : 'var(--color-neutral-100, #F9FAFB)',
                  borderColor: isRecurring ? 'rgba(50, 71, 255, 0.2)' : 'var(--color-neutral-300, #E5E7EB)',
                }}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    disabled={installments > 1}
                    className="mt-1 w-5 h-5 rounded border-neutral-300 text-brand-600 focus:ring-brand-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="recurring" className="flex items-center gap-2 font-semibold text-neutral-1000 cursor-pointer">
                      <span>Despesa Recorrente</span>
                      <span>🔄</span>
                    </label>
                    <p className="text-sm text-neutral-600 mt-1">
                      {installments > 1
                        ? 'Não disponível para compras parceladas'
                        : 'Esta despesa será repetida automaticamente todo mês'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-end gap-4 px-6 py-4 border-t border-neutral-300 bg-neutral-0"
        style={{
          padding: 'var(--space-24, 24px) var(--space-32, 32px)',
        }}
      >
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-full border border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-100 transition-colors"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            borderRadius: '100px',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-full bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            borderRadius: '100px',
          }}
        >
          Salvar Transação
        </button>
      </div>
    </ModalFullscreen>
  )
}
