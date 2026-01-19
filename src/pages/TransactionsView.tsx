import { useState, useMemo } from 'react'
import { useFinance } from '../hooks/useFinance'
import { Transaction, TransactionStatus } from '../types/transaction'
import { formatCurrency } from '../utils/currency'
import { PlusIcon } from '../components/dashboard/icons/PlusIcon'
import { SearchIcon } from '../components/dashboard/icons/SearchIcon'
import { ArrowDownIcon } from '../components/dashboard/icons/ArrowDownIcon'
import { ArrowUpIcon } from '../components/dashboard/icons/ArrowUpIcon'
import { UserIcon } from '../components/dashboard/icons/UserIcon'
import { DatePicker } from '../components/dashboard/DatePicker'
import { NewTransactionModal } from '../components/modals/NewTransactionModal'

type SortField = 'date' | 'amount' | 'description' | 'category'
type SortDirection = 'asc' | 'desc'

interface TransactionsTableExpandedProps {
  transactions: Transaction[]
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  itemsPerPage?: number
}

function TransactionsTableExpanded({
  transactions,
  sortField,
  sortDirection,
  onSort,
  itemsPerPage = 10,
}: TransactionsTableExpandedProps) {
  const { creditCards, bankAccounts, familyMembers } = useFinance()
  const [currentPage, setCurrentPage] = useState(0)

  // Ordenar transações
  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'date':
          comparison = a.date.getTime() - b.date.getTime()
          break
        case 'amount':
          comparison = a.amount - b.amount
          break
        case 'description':
          comparison = a.description.localeCompare(b.description)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        default:
          return 0
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [transactions, sortField, sortDirection])

  // Paginação
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const visibleTransactions = sortedTransactions.slice(startIndex, endIndex)

  // Resetar página quando filtros mudarem
  useMemo(() => {
    setCurrentPage(0)
  }, [transactions.length])

  const findAccount = (accountId: string) => {
    const account = bankAccounts.find((a) => a.id === accountId)
    if (account) return { type: 'account' as const, data: account }

    const card = creditCards.find((c) => c.id === accountId)
    if (card) return { type: 'card' as const, data: card }

    return null
  }

  const findMember = (memberId: string | null) => {
    if (!memberId) return null
    return familyMembers.find((m) => m.id === memberId) || null
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatInstallments = (transaction: Transaction) => {
    if (transaction.installments === 1) return '-'
    return `${transaction.currentInstallment}/${transaction.installments}`
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ArrowUpIcon style={{ width: '12px', height: '12px', marginLeft: '4px' }} />
    ) : (
      <ArrowDownIcon style={{ width: '12px', height: '12px', marginLeft: '4px' }} />
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        borderRadius: '16px',
        background: 'var(--color-neutral-0, #FEFEFE)',
        padding: '32px',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {sortedTransactions.length === 0 ? (
        <div className="w-full flex items-center justify-center py-16">
          <p className="text-neutral-500" style={{ fontSize: '14px', lineHeight: '20px' }}>
            Nenhum lançamento encontrado.
          </p>
        </div>
      ) : (
        <>
          {/* Tabela */}
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
              <button
                onClick={() => onSort('date')}
                className="text-left flex items-center hover:opacity-70 transition-opacity"
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Datas
                <SortIcon field="date" />
              </button>
              <button
                onClick={() => onSort('description')}
                className="text-left flex items-center hover:opacity-70 transition-opacity"
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Descrição
                <SortIcon field="description" />
              </button>
              <button
                onClick={() => onSort('category')}
                className="text-left flex items-center hover:opacity-70 transition-opacity"
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Categorias
                <SortIcon field="category" />
              </button>
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
              <button
                onClick={() => onSort('amount')}
                className="text-right flex items-center justify-end hover:opacity-70 transition-opacity"
                style={{
                  color: '#070B13',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '0.3px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                Valor
                <SortIcon field="amount" />
              </button>
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
                          style={{ width: '24px', height: '24px' }}
                        />
                      ) : (
                        <div className="text-neutral-400">
                          <UserIcon />
                        </div>
                      )}
                    </div>

                    {/* Data */}
                    <div className="text-neutral-600" style={{ fontSize: '14px', lineHeight: '20px' }}>
                      {formatDate(transaction.date)}
                    </div>

                    {/* Descrição */}
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? (
                        <ArrowDownIcon
                          style={{
                            width: '16px',
                            height: '16px',
                            color: 'var(--color-green-600, #15BE78)',
                          }}
                        />
                      ) : (
                        <ArrowUpIcon
                          style={{
                            width: '16px',
                            height: '16px',
                            color: '#B91C1C',
                          }}
                        />
                      )}
                      <span className="text-neutral-1000 font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
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
                    <div className="text-neutral-600" style={{ fontSize: '14px', lineHeight: '20px' }}>
                      {account
                        ? account.type === 'card'
                          ? `Cartão ${account.data.bankName || account.data.name}`
                          : `${account.data.bankName || account.data.name} conta`
                        : 'Desconhecido'}
                    </div>

                    {/* Parcelas */}
                    <div className="text-neutral-600" style={{ fontSize: '14px', lineHeight: '20px' }}>
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
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 w-full pt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
              >
                Anterior
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      i === currentPage
                        ? 'bg-neutral-1000 text-neutral-0'
                        : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                    }`}
                    style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function TransactionsView() {
  const {
    getFilteredTransactions,
    creditCards,
    bankAccounts,
    familyMembers,
  } = useFinance()

  const [localSearch, setLocalSearch] = useState('')
  const [localType, setLocalType] = useState<'all' | 'income' | 'expense'>('all')
  const [localCategory, setLocalCategory] = useState<string>('all')
  const [localAccount, setLocalAccount] = useState<string>('all')
  const [localMember, setLocalMember] = useState<string>('all')
  const [localStatus, setLocalStatus] = useState<'all' | TransactionStatus>('all')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // Buscar transações filtradas do contexto (já aplica filtros globais)
  const globalFilteredTransactions = getFilteredTransactions()

  // Aplicar filtros locais adicionais
  const filteredTransactions = useMemo(() => {
    let filtered = [...globalFilteredTransactions]

    // Filtro local por tipo
    if (localType !== 'all') {
      filtered = filtered.filter((t) => t.type === localType)
    }

    // Filtro local por categoria
    if (localCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === localCategory)
    }

    // Filtro local por conta/cartão
    if (localAccount !== 'all') {
      filtered = filtered.filter((t) => t.accountId === localAccount)
    }

    // Filtro local por membro
    if (localMember !== 'all') {
      filtered = filtered.filter((t) => t.memberId === localMember)
    }

    // Filtro local por status
    if (localStatus !== 'all') {
      filtered = filtered.filter((t) => t.status === localStatus)
    }

    // Filtro local por busca textual
    if (localSearch.trim()) {
      const searchLower = localSearch.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [globalFilteredTransactions, localType, localCategory, localAccount, localMember, localStatus, localSearch])

  // Calcular estatísticas
  const stats = useMemo(() => {
    const incomes = filteredTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expenses = filteredTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const difference = incomes - expenses

    return {
      incomes,
      expenses,
      difference,
      count: filteredTransactions.length,
    }
  }, [filteredTransactions])

  // Obter categorias únicas
  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    filteredTransactions.forEach((t) => categories.add(t.category))
    return Array.from(categories).sort()
  }, [filteredTransactions])

  // Obter todas as contas e cartões
  const allAccounts = useMemo(() => {
    return [
      ...bankAccounts.map((a) => ({ id: a.id, name: `${a.bankName || a.name} conta`, type: 'account' as const })),
      ...creditCards.map((c) => ({ id: c.id, name: `Cartão ${c.bankName || c.name}`, type: 'card' as const })),
    ]
  }, [bankAccounts, creditCards])

  // Função de ordenação
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Função de exportação CSV
  const handleExportCSV = () => {
    const headers = ['Data', 'Tipo', 'Descrição', 'Categoria', 'Conta/Cartão', 'Membro', 'Parcelas', 'Valor', 'Status']
    const rows = filteredTransactions.map((t) => {
      const account = allAccounts.find((a) => a.id === t.accountId)
      const member = familyMembers.find((m) => m.id === t.memberId)
      const installments = t.installments === 1 ? '-' : `${t.currentInstallment}/${t.installments}`

      return [
        t.date.toLocaleDateString('pt-BR'),
        t.type === 'income' ? 'Receita' : 'Despesa',
        t.description,
        t.category,
        account?.name || 'Desconhecido',
        member?.name || '-',
        installments,
        formatCurrency(t.amount),
        t.status === 'completed' ? 'Concluído' : t.status === 'pending' ? 'Pendente' : 'Cancelado',
      ]
    })

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `transacoes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Função de exportação PDF (simplificada - apenas abre nova janela com dados formatados)
  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Transações - ${new Date().toLocaleDateString('pt-BR')}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .income { color: #15BE78; }
            .expense { color: #111827; }
          </style>
        </head>
        <body>
          <h1>Transações</h1>
          <p>Período: ${new Date().toLocaleDateString('pt-BR')}</p>
          <p>Total de transações: ${filteredTransactions.length}</p>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Conta/Cartão</th>
                <th>Membro</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransactions
                .map((t) => {
                  const account = allAccounts.find((a) => a.id === t.accountId)
                  const member = familyMembers.find((m) => m.id === t.memberId)
                  return `
                    <tr>
                      <td>${t.date.toLocaleDateString('pt-BR')}</td>
                      <td>${t.type === 'income' ? 'Receita' : 'Despesa'}</td>
                      <td>${t.description}</td>
                      <td>${t.category}</td>
                      <td>${account?.name || 'Desconhecido'}</td>
                      <td>${member?.name || '-'}</td>
                      <td class="${t.type === 'income' ? 'income' : 'expense'}">${formatCurrency(t.amount)}</td>
                      <td>${t.status === 'completed' ? 'Concluído' : t.status === 'pending' ? 'Pendente' : 'Cancelado'}</td>
                    </tr>
                  `
                })
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.print()
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
      <div className="w-full flex items-center justify-between flex-wrap gap-4">
        <h1
          className="text-3xl font-bold text-neutral-1000"
          style={{
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 700,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Transações
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
            }}
          >
            Exportar CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
            }}
          >
            Exportar PDF
          </button>
          <button
            onClick={() => setIsNewTransactionOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-1000 text-neutral-0 hover:bg-neutral-900 transition-colors"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
            }}
          >
            <PlusIcon style={{ width: '16px', height: '16px' }} />
            <span>Nova Transação</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div
        className="w-full flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px',
          borderRadius: '8px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        {/* Campo de busca */}
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar transações"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
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
          onChange={(e) => setLocalType(e.target.value as 'all' | 'income' | 'expense')}
          className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
            minWidth: '140px',
          }}
        >
          <option value="all">Todos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>

        {/* Select de categoria */}
        <select
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
            minWidth: '160px',
          }}
        >
          <option value="all">Todas categorias</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Select de conta/cartão */}
        <select
          value={localAccount}
          onChange={(e) => setLocalAccount(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
            minWidth: '180px',
          }}
        >
          <option value="all">Todas contas</option>
          {allAccounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>

        {/* Select de membro */}
        <select
          value={localMember}
          onChange={(e) => setLocalMember(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
            minWidth: '160px',
          }}
        >
          <option value="all">Todos membros</option>
          {familyMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        {/* Date Picker */}
        <div className="relative">
          <DatePicker isOpen={isDatePickerOpen} onToggle={() => setIsDatePickerOpen(!isDatePickerOpen)} />
        </div>

        {/* Select de status */}
        <select
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value as 'all' | TransactionStatus)}
          className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
            minWidth: '140px',
          }}
        >
          <option value="all">Todos status</option>
          <option value="completed">Concluído</option>
          <option value="pending">Pendente</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Linha de Resumo */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          gap: '16px',
          padding: '16px',
          borderRadius: '8px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px' }}>
            Total Receitas
          </span>
          <p className="text-lg font-bold text-green-600" style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-green-600, #15BE78)' }}>
            {formatCurrency(stats.incomes)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px' }}>
            Total Despesas
          </span>
          <p className="text-lg font-bold text-neutral-1000" style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 700 }}>
            {formatCurrency(stats.expenses)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px' }}>
            Diferença
          </span>
          <p
            className="text-lg font-bold"
            style={{
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 700,
              color: stats.difference >= 0 ? 'var(--color-green-600, #15BE78)' : '#B91C1C',
            }}
          >
            {stats.difference >= 0 ? '+' : ''}
            {formatCurrency(stats.difference)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px' }}>
            Quantidade
          </span>
          <p className="text-lg font-bold text-neutral-1000" style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 700 }}>
            {stats.count} {stats.count === 1 ? 'transação' : 'transações'}
          </p>
        </div>
      </div>

      {/* Tabela */}
      {filteredTransactions.length === 0 && globalFilteredTransactions.length === 0 ? (
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
          <p className="text-lg font-semibold text-neutral-600" style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 600, color: 'var(--color-neutral-600, #4B5563)' }}>
            Nenhuma transação registrada ainda
          </p>
          <button
            onClick={() => setIsNewTransactionOpen(true)}
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
            Adicionar Primeira Transação
          </button>
        </div>
      ) : (
        <TransactionsTableExpanded
          transactions={filteredTransactions}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          itemsPerPage={10}
        />
      )}

      {/* Modais */}
      <NewTransactionModal isOpen={isNewTransactionOpen} onClose={() => setIsNewTransactionOpen(false)} />
    </div>
  )
}
