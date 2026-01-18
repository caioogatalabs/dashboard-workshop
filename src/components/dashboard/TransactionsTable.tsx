import { FC, useState, useMemo, useEffect, useRef } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { Transaction } from '../../types/transaction'
import { formatCurrency } from '../../utils/currency'
import { FlagIcon } from './icons/FlagIcon'
import { SearchIcon } from './icons/SearchIcon'
import { ArrowDownIcon } from './icons/ArrowDownIcon'
import { ArrowUpIcon } from './icons/ArrowUpIcon'
import { UserIcon } from './icons/UserIcon'

type LocalTransactionType = 'all' | 'income' | 'expense'

export const TransactionsTable: FC = () => {
  const {
    getFilteredTransactions,
    creditCards,
    bankAccounts,
    familyMembers,
  } = useFinance()

  // Estados locais da tabela
  const [localSearch, setLocalSearch] = useState('')
  const [localType, setLocalType] = useState<LocalTransactionType>('all')
  const [itemsToShow, setItemsToShow] = useState(5)
  const tableRef = useRef<HTMLDivElement>(null)

  // Buscar transações filtradas do contexto (já aplica filtros globais)
  const globalFilteredTransactions = getFilteredTransactions()

  // Aplicar filtros locais adicionais
  const filteredTransactions = useMemo(() => {
    let filtered = [...globalFilteredTransactions]

    // Filtro local por tipo
    if (localType !== 'all') {
      filtered = filtered.filter((t) => t.type === localType)
    }

    // Filtro local por busca textual (descrição OU categoria)
    if (localSearch.trim()) {
      const searchLower = localSearch.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    // Ordenar por data decrescente (mais recente primeiro)
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime())

    return filtered
  }, [globalFilteredTransactions, localType, localSearch])

  // Calcular transações visíveis (botão "Ver mais")
  const visibleTransactions = filteredTransactions.slice(0, itemsToShow)
  const hasMore = filteredTransactions.length > itemsToShow

  // Resetar quantidade visível quando filtros mudarem
  useEffect(() => {
    setItemsToShow(5)
  }, [localSearch, localType, globalFilteredTransactions.length])

  // Função para encontrar conta ou cartão
  const findAccount = (accountId: string) => {
    const account = bankAccounts.find((a) => a.id === accountId)
    if (account) return { type: 'account' as const, data: account }

    const card = creditCards.find((c) => c.id === accountId)
    if (card) return { type: 'card' as const, data: card }

    return null
  }

  // Função para encontrar membro
  const findMember = (memberId: string | null) => {
    if (!memberId) return null
    return familyMembers.find((m) => m.id === memberId) || null
  }

  // Formatar data
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Formatar parcelas
  const formatInstallments = (transaction: Transaction) => {
    if (transaction.installments === 1) return '-'
    return `${transaction.currentInstallment}/${transaction.installments}`
  }

  // Carregar mais itens
  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 5)
    // Scroll suave até o final da tabela
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 100)
  }

  return (
    <div
      ref={tableRef}
      style={{
        display: 'flex',
        width: '100%',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '50px',
        borderRadius: '20px',
        background: 'var(--color-neutral-0, #FEFEFE)',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between flex-wrap gap-4">
        {/* Título */}
        <div className="flex items-center gap-3">
          <div className="text-neutral-1000">
            <FlagIcon />
          </div>
          <h2
            className="text-2xl font-bold text-neutral-1000"
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
            }}
          >
            Extrato Detalhado
          </h2>
        </div>

        {/* Controles de busca e filtro */}
        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Campo de busca */}
          <div className="relative w-full md:w-[256px]">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar lançamentos"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="
                w-full
                pl-10 pr-4 py-2
                rounded-lg
                border border-neutral-300
                bg-neutral-0
                text-neutral-1000
                placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
              "
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Select de tipo */}
          <select
            value={localType}
            onChange={(e) => setLocalType(e.target.value as LocalTransactionType)}
            className="
              w-full md:w-[140px]
              px-4 py-2
              rounded-lg
              border border-neutral-300
              bg-neutral-0
              text-neutral-1000
              focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent
              cursor-pointer
            "
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <option value="all">Todos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      {filteredTransactions.length === 0 ? (
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: '96px',
          }}
        >
          <p
            className="text-neutral-500"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            Nenhum lançamento encontrado.
          </p>
        </div>
      ) : (
        <>
          {/* Container da tabela */}
          <div className="w-full overflow-hidden">
            {/* Header da tabela */}
            <div
              className="grid px-4 py-3"
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 2fr 1fr 1.5fr 80px 1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Membro
              </div>
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Datas
              </div>
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Descrição
              </div>
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Categorias
              </div>
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Conta/cartão
              </div>
              <div
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Parcelas
              </div>
              <div
                className="text-right"
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Valor
              </div>
            </div>

            {/* Linhas da tabela */}
            <div>
              {visibleTransactions.map((transaction) => {
                const member = findMember(transaction.memberId)
                const account = findAccount(transaction.accountId)

                return (
                  <div
                    key={transaction.id}
                    className="grid px-4 py-3 items-center hover:bg-neutral-50 transition-colors duration-150"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 2fr 1fr 1.5fr 80px 1fr',
                      gap: '16px',
                      backgroundColor: 'var(--color-neutral-0, #FEFEFE)',
                    }}
                  >
                    {/* Avatar */}
                    <div className="flex items-center">
                      {member?.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-6 h-6 rounded-full object-cover"
                          style={{
                            width: '24px',
                            height: '24px',
                          }}
                        />
                      ) : (
                        <div className="text-neutral-400">
                          <UserIcon />
                        </div>
                      )}
                    </div>

                    {/* Data */}
                    <div
                      className="text-neutral-600"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                      }}
                    >
                      {formatDate(transaction.date)}
                    </div>

                    {/* Descrição */}
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? (
                        <div className="flex items-center justify-center">
                          <ArrowDownIcon
                            style={{
                              width: '16px',
                              height: '16px',
                              color: 'var(--color-green-600, #15BE78)',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <ArrowUpIcon
                            style={{
                              width: '16px',
                              height: '16px',
                              color: '#B91C1C', // Red accent 700
                            }}
                          />
                        </div>
                      )}
                      <span
                        className="text-neutral-1000 font-medium"
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 500,
                        }}
                      >
                        {transaction.description}
                      </span>
                    </div>

                    {/* Categoria */}
                    <div>
                      <span
                        className="inline-block px-2 py-1 rounded-lg"
                        style={{
                          backgroundColor: 'var(--color-neutral-100, #F9FAFB)',
                          color: 'var(--color-neutral-600, #6B7280)',
                          fontSize: '12px',
                          lineHeight: '16px',
                        }}
                      >
                        {transaction.category}
                      </span>
                    </div>

                    {/* Conta/Cartão */}
                    <div
                      className="text-neutral-600"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                      }}
                    >
                      {account
                        ? account.type === 'card'
                          ? `Cartão ${account.data.bankName || account.data.name}`
                          : `${account.data.bankName || account.data.name} conta`
                        : 'Desconhecido'}
                    </div>

                    {/* Parcelas */}
                    <div
                      className="text-neutral-600"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                      }}
                    >
                      {formatInstallments(transaction)}
                    </div>

                    {/* Valor */}
                    <div
                      className="text-right font-bold"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 700,
                        color:
                          transaction.type === 'income'
                            ? 'var(--color-green-600, #15BE78)'
                            : 'var(--color-neutral-1000, #111827)',
                      }}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{' '}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Botão Ver Mais */}
          {hasMore && (
            <div className="w-full flex items-center justify-center pt-4">
              <button
                onClick={handleLoadMore}
                className="
                  px-6 py-3
                  rounded-lg
                  border border-neutral-300
                  bg-neutral-0
                  text-neutral-1000
                  font-medium
                  hover:bg-neutral-100
                  transition-colors duration-200
                "
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Ver mais
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
