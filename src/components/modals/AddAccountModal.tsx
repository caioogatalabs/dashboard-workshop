import { useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalOverlay } from '../dashboard/ModalOverlay'
import { CloseIcon } from '../dashboard/icons/CloseIcon'
import { CreditCardTheme } from '../../types/creditCard'

interface AddAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const { addBankAccount, addCreditCard, familyMembers } = useFinance()
  
  const [type, setType] = useState<'account' | 'card'>('account')
  const [name, setName] = useState('')
  const [holderId, setHolderId] = useState('')
  
  // Account fields
  const [balance, setBalance] = useState('')
  
  // Card fields
  const [closingDay, setClosingDay] = useState('')
  const [dueDay, setDueDay] = useState('')
  const [limit, setLimit] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [theme, setTheme] = useState<CreditCardTheme>('black')
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      setType('account')
      setName('')
      setHolderId('')
      setBalance('')
      setClosingDay('')
      setDueDay('')
      setLimit('')
      setLastDigits('')
      setTheme('black')
      setErrors({})
    }
  }, [isOpen])

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === '') {
      setBalance('')
      return
    }
    const numValue = parseInt(value, 10) / 100
    setBalance(numValue.toFixed(2))
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === '') {
      setLimit('')
      return
    }
    const numValue = parseInt(value, 10) / 100
    setLimit(numValue.toFixed(2))
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!name || name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    }

    if (!holderId) {
      newErrors.holderId = 'Selecione um titular'
    }

    if (type === 'account') {
      if (!balance || parseFloat(balance) < 0) {
        newErrors.balance = 'Saldo inicial é obrigatório'
      }
    } else {
      const closing = parseInt(closingDay, 10)
      const due = parseInt(dueDay, 10)
      const limitNum = parseFloat(limit)

      if (!closingDay || closing < 1 || closing > 31) {
        newErrors.closingDay = 'Dia de fechamento deve ser entre 1 e 31'
      }

      if (!dueDay || due < 1 || due > 31) {
        newErrors.dueDay = 'Dia de vencimento deve ser entre 1 e 31'
      }

      if (!limit || limitNum <= 0) {
        newErrors.limit = 'Limite deve ser maior que zero'
      }

      if (lastDigits && lastDigits.length !== 4) {
        newErrors.lastDigits = 'Últimos 4 dígitos devem ter exatamente 4 dígitos'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (type === 'account') {
      addBankAccount({
        name: name.trim(),
        holderId,
        balance: parseFloat(balance),
        bankName: undefined,
        accountNumber: undefined,
        agency: undefined,
        accountType: 'checking',
      })
      console.log('Conta adicionada com sucesso!')
    } else {
      addCreditCard({
        name: name.trim(),
        holderId,
        closingDay: parseInt(closingDay, 10),
        dueDay: parseInt(dueDay, 10),
        limit: parseFloat(limit),
        currentBill: 0,
        theme,
        lastDigits: lastDigits || undefined,
        bankName: undefined,
      })
      console.log('Cartão adicionado com sucesso!')
    }

    onClose()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-neutral-0 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-300">
          <h2 className="text-2xl font-bold text-neutral-1000">Adicionar Conta/Cartão</h2>
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
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setType('account')}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                type === 'account'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-neutral-0 border border-neutral-300 text-neutral-600'
              }`}
            >
              Conta Bancária
            </button>
            <button
              onClick={() => setType('card')}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                type === 'card'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-neutral-0 border border-neutral-300 text-neutral-600'
              }`}
            >
              Cartão de Crédito
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-2">
              {type === 'account' ? 'Nome da Conta' : 'Nome do Cartão'} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={type === 'account' ? 'Ex: Nubank Conta' : 'Ex: Nubank Mastercard'}
              className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                errors.name ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Holder */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-2">
              Titular *
            </label>
            <select
              value={holderId}
              onChange={(e) => setHolderId(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                errors.holderId ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <option value="">Selecione o titular</option>
              {familyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.holderId && <p className="text-red-500 text-sm mt-1">{errors.holderId}</p>}
          </div>

          {/* Account Fields */}
          {type === 'account' && (
            <div>
              <label className="block text-sm font-medium text-neutral-1000 mb-2">
                Saldo Inicial *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">R$</span>
                <input
                  type="text"
                  value={balance ? `R$ ${balance}` : ''}
                  onChange={handleBalanceChange}
                  placeholder="R$ 0,00"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                    errors.balance ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
            </div>
          )}

          {/* Card Fields */}
          {type === 'card' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-1000 mb-2">
                    Dia de Fechamento *
                  </label>
                  <input
                    type="number"
                    value={closingDay}
                    onChange={(e) => setClosingDay(e.target.value)}
                    placeholder="1 a 31"
                    min="1"
                    max="31"
                    className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                      errors.closingDay ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.closingDay && <p className="text-red-500 text-sm mt-1">{errors.closingDay}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-1000 mb-2">
                    Dia de Vencimento *
                  </label>
                  <input
                    type="number"
                    value={dueDay}
                    onChange={(e) => setDueDay(e.target.value)}
                    placeholder="1 a 31"
                    min="1"
                    max="31"
                    className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                      errors.dueDay ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.dueDay && <p className="text-red-500 text-sm mt-1">{errors.dueDay}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Limite Total *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">R$</span>
                  <input
                    type="text"
                    value={limit ? `R$ ${limit}` : ''}
                    onChange={handleLimitChange}
                    placeholder="R$ 0,00"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                      errors.limit ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                </div>
                {errors.limit && <p className="text-red-500 text-sm mt-1">{errors.limit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Últimos 4 Dígitos (opcional)
                </label>
                <input
                  type="text"
                  value={lastDigits}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                    setLastDigits(value)
                  }}
                  placeholder="1234"
                  maxLength={4}
                  className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                    errors.lastDigits ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                {errors.lastDigits && <p className="text-red-500 text-sm mt-1">{errors.lastDigits}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-1000 mb-2">
                  Tema Visual *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['black', 'lime', 'white'] as CreditCardTheme[]).map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === themeOption
                          ? 'border-blue-600'
                          : 'border-neutral-300'
                      }`}
                      style={{
                        backgroundColor:
                          themeOption === 'black'
                            ? 'var(--color-neutral-1000, #111827)'
                            : themeOption === 'lime'
                            ? 'var(--color-brand-600, #D7FE03)'
                            : 'var(--color-neutral-0, #FFFFFF)',
                      }}
                    >
                      <span
                        className="font-medium"
                        style={{
                          color:
                            themeOption === 'white'
                              ? 'var(--color-neutral-1000, #111827)'
                              : themeOption === 'lime'
                              ? 'var(--color-neutral-1000, #111827)'
                              : 'var(--color-neutral-0, #FFFFFF)',
                        }}
                      >
                        {themeOption === 'black' ? 'Black' : themeOption === 'lime' ? 'Lime' : 'White'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-300 bg-neutral-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-full bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
