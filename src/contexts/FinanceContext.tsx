import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '../types'

// Tipos para filtros globais
interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

type TransactionTypeFilter = 'all' | 'income' | 'expense'

interface FinanceContextType {
  // Arrays principais
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]

  // Filtros globais
  selectedMember: string | null
  dateRange: DateRange
  transactionType: TransactionTypeFilter
  searchText: string

  // Setters de filtros
  setSelectedMember: (memberId: string | null) => void
  setDateRange: (range: DateRange) => void
  setTransactionType: (type: TransactionTypeFilter) => void
  setSearchText: (text: string) => void

  // CRUD Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // CRUD Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // CRUD CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // CRUD BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // CRUD FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Funções de cálculo derivadas
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; amount: number }>
  calculateCategoryPercentage: (category: string) => number
  calculateSavingsRate: () => number
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Função auxiliar para gerar IDs únicos
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Dados mock iniciais
const createMockData = () => {
  const now = new Date()

  // Membros da família
  const member1: FamilyMember = {
    id: generateId(),
    name: 'Caio Ogata',
    role: 'Pai',
    email: 'caio.ogata@gmail.com',
    monthlyIncome: 15000,
    createdAt: now,
    updatedAt: now,
  }

  const member2: FamilyMember = {
    id: generateId(),
    name: 'Maria Silva',
    role: 'Mãe',
    email: 'maria.silva@gmail.com',
    monthlyIncome: 12000,
    createdAt: now,
    updatedAt: now,
  }

  const member3: FamilyMember = {
    id: generateId(),
    name: 'João Ogata',
    role: 'Filho',
    monthlyIncome: 0,
    createdAt: now,
    updatedAt: now,
  }

  const members = [member1, member2, member3]

  // Contas bancárias
  const account1: BankAccount = {
    id: generateId(),
    name: 'Conta Corrente Nubank',
    holderId: member1.id,
    bankName: 'Nubank',
    balance: 8500.50,
    accountType: 'checking',
    createdAt: now,
    updatedAt: now,
  }

  const account2: BankAccount = {
    id: generateId(),
    name: 'Conta Poupança Itaú',
    holderId: member2.id,
    bankName: 'Itaú',
    balance: 25000.00,
    accountType: 'savings',
    createdAt: now,
    updatedAt: now,
  }

  const accounts = [account1, account2]

  // Cartões de crédito
  const card1: CreditCard = {
    id: generateId(),
    name: 'Nubank Mastercard',
    holderId: member1.id,
    bankName: 'Nubank',
    closingDay: 10,
    dueDay: 17,
    limit: 15000,
    currentBill: 3200.75,
    theme: 'black',
    lastDigits: '1234',
    createdAt: now,
    updatedAt: now,
  }

  const card2: CreditCard = {
    id: generateId(),
    name: 'Itaú Visa',
    holderId: member2.id,
    bankName: 'Itaú',
    closingDay: 5,
    dueDay: 12,
    limit: 8000,
    currentBill: 1500.00,
    theme: 'lime',
    lastDigits: '5678',
    createdAt: now,
    updatedAt: now,
  }

  const card3: CreditCard = {
    id: generateId(),
    name: 'Bradesco Elo',
    holderId: member1.id,
    bankName: 'Bradesco',
    closingDay: 15,
    dueDay: 22,
    limit: 12000,
    currentBill: 4500.50,
    theme: 'white',
    lastDigits: '9012',
    createdAt: now,
    updatedAt: now,
  }

  const cards = [card1, card2, card3]

  // Transações (20-30 transações distribuídas nos últimos 3 meses)
  const transactions: Transaction[] = []
  const categories = {
    income: ['Salário', 'Freelance', 'Investimentos', 'Aluguel', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Contas'],
  }

  // Receitas
  for (let i = 0; i < 8; i++) {
    const daysAgo = Math.floor(Math.random() * 90)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)

    transactions.push({
      id: generateId(),
      type: 'income',
      amount: Math.floor(Math.random() * 5000) + 2000,
      description: categories.income[Math.floor(Math.random() * categories.income.length)],
      category: categories.income[Math.floor(Math.random() * categories.income.length)],
      date,
      accountId: accounts[Math.floor(Math.random() * accounts.length)].id,
      memberId: members[Math.floor(Math.random() * 2)].id, // Apenas pais têm renda
      installments: 1,
      currentInstallment: 1,
      isRecurring: Math.random() > 0.5,
      recurringPeriod: 'monthly',
      isPaid: true,
      status: 'completed',
      createdAt: date,
      updatedAt: date,
    })
  }

  // Despesas
  for (let i = 0; i < 22; i++) {
    const daysAgo = Math.floor(Math.random() * 90)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)

    const isCard = Math.random() > 0.4
    const accountId = isCard
      ? cards[Math.floor(Math.random() * cards.length)].id
      : accounts[Math.floor(Math.random() * accounts.length)].id

    const installments = isCard && Math.random() > 0.6 ? Math.floor(Math.random() * 6) + 2 : 1

    transactions.push({
      id: generateId(),
      type: 'expense',
      amount: Math.floor(Math.random() * 800) + 50,
      description: categories.expense[Math.floor(Math.random() * categories.expense.length)],
      category: categories.expense[Math.floor(Math.random() * categories.expense.length)],
      date,
      accountId,
      memberId: members[Math.floor(Math.random() * members.length)].id,
      installments,
      currentInstallment: installments > 1 ? Math.floor(Math.random() * installments) + 1 : 1,
      isRecurring: Math.random() > 0.7,
      recurringPeriod: 'monthly',
      isPaid: Math.random() > 0.3,
      status: Math.random() > 0.2 ? 'completed' : 'pending',
      createdAt: date,
      updatedAt: date,
    })
  }

  // Objetivos
  const goal1: Goal = {
    id: generateId(),
    title: 'Viagem para Europa',
    description: 'Economizar para viagem de 15 dias',
    targetAmount: 50000,
    currentAmount: 15000,
    deadline: new Date(now.getFullYear() + 1, 5, 1),
    category: 'Viagem',
    memberId: null,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const goal2: Goal = {
    id: generateId(),
    title: 'Reserva de Emergência',
    description: '6 meses de despesas',
    targetAmount: 60000,
    currentAmount: 35000,
    deadline: new Date(now.getFullYear(), 11, 31),
    category: 'Reserva',
    memberId: null,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const goal3: Goal = {
    id: generateId(),
    title: 'Carro Novo',
    description: 'Entrada para financiamento',
    targetAmount: 30000,
    currentAmount: 12000,
    deadline: new Date(now.getFullYear() + 1, 2, 1),
    category: 'Automóvel',
    memberId: member1.id,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const goal4: Goal = {
    id: generateId(),
    title: 'Curso de Inglês',
    description: 'Curso completo para João',
    targetAmount: 8000,
    currentAmount: 8000,
    deadline: new Date(now.getFullYear(), 8, 1),
    category: 'Educação',
    memberId: member3.id,
    status: 'completed',
    createdAt: new Date(now.getFullYear(), 0, 1),
    updatedAt: now,
  }

  const goals = [goal1, goal2, goal3, goal4]

  return {
    members,
    accounts,
    cards,
    transactions,
    goals,
  }
}

interface FinanceProviderProps {
  children: ReactNode
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  const mockData = createMockData()

  // Estados dos arrays principais
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.transactions)
  const [goals, setGoals] = useState<Goal[]>(mockData.goals)
  const [creditCards, setCreditCards] = useState<CreditCard[]>(mockData.cards)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockData.accounts)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockData.members)

  // Estados dos filtros globais
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null })
  const [transactionType, setTransactionType] = useState<TransactionTypeFilter>('all')
  const [searchText, setSearchText] = useState<string>('')

  // CRUD Transactions
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setTransactions((prev) => [...prev, newTransaction])
  }, [])

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t))
    )
  }, [])

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // CRUD Goals
  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newGoal: Goal = {
      ...goal,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setGoals((prev) => [...prev, newGoal])
  }, [])

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g))
    )
  }, [])

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  // CRUD CreditCards
  const addCreditCard = useCallback((card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newCard: CreditCard = {
      ...card,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setCreditCards((prev) => [...prev, newCard])
  }, [])

  const updateCreditCard = useCallback((id: string, updates: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    )
  }, [])

  const deleteCreditCard = useCallback((id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  // CRUD BankAccounts
  const addBankAccount = useCallback((account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newAccount: BankAccount = {
      ...account,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setBankAccounts((prev) => [...prev, newAccount])
  }, [])

  const updateBankAccount = useCallback((id: string, updates: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a))
    )
  }, [])

  const deleteBankAccount = useCallback((id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id))
  }, [])

  // CRUD FamilyMembers
  const addFamilyMember = useCallback((member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const newMember: FamilyMember = {
      ...member,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setFamilyMembers((prev) => [...prev, newMember])
  }, [])

  const updateFamilyMember = useCallback((id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m))
    )
  }, [])

  const deleteFamilyMember = useCallback((id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id))
  }, [])

  // Funções de cálculo derivadas
  const getFilteredTransactions = useCallback((): Transaction[] => {
    let filtered = [...transactions]

    // Filtro por membro
    if (selectedMember) {
      filtered = filtered.filter((t) => t.memberId === selectedMember)
    }

    // Filtro por tipo
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType)
    }

    // Filtro por período
    if (dateRange.startDate) {
      filtered = filtered.filter((t) => t.date >= dateRange.startDate!)
    }
    if (dateRange.endDate) {
      filtered = filtered.filter((t) => t.date <= dateRange.endDate!)
    }

    // Filtro por busca textual
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [transactions, selectedMember, transactionType, dateRange, searchText])

  const calculateTotalBalance = useCallback((): number => {
    const accountsBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0)
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    return accountsBalance - cardsDebt
  }, [bankAccounts, creditCards])

  const calculateIncomeForPeriod = useCallback((): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesForPeriod = useCallback((): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [getFilteredTransactions])

  const calculateExpensesByCategory = useCallback((): Array<{ category: string; amount: number }> => {
    const filtered = getFilteredTransactions()
    const expenses = filtered.filter((t) => t.type === 'expense' && t.status === 'completed')

    const categoryMap = new Map<string, number>()
    expenses.forEach((t) => {
      const current = categoryMap.get(t.category) || 0
      categoryMap.set(t.category, current + t.amount)
    })

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [getFilteredTransactions])

  const calculateCategoryPercentage = useCallback(
    (category: string): number => {
      const totalIncome = calculateIncomeForPeriod()
      if (totalIncome === 0) return 0

      const categoryExpenses = calculateExpensesByCategory().find((c) => c.category === category)
      if (!categoryExpenses) return 0

      return (categoryExpenses.amount / totalIncome) * 100
    },
    [calculateIncomeForPeriod, calculateExpensesByCategory]
  )

  const calculateSavingsRate = useCallback((): number => {
    const income = calculateIncomeForPeriod()
    const expenses = calculateExpensesForPeriod()

    if (income === 0) return 0
    return ((income - expenses) / income) * 100
  }, [calculateIncomeForPeriod, calculateExpensesForPeriod])

  const value: FinanceContextType = {
    // Arrays
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,

    // Filtros
    selectedMember,
    dateRange,
    transactionType,
    searchText,

    // Setters de filtros
    setSelectedMember,
    setDateRange,
    setTransactionType,
    setSearchText,

    // CRUD Transactions
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // CRUD Goals
    addGoal,
    updateGoal,
    deleteGoal,

    // CRUD CreditCards
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,

    // CRUD BankAccounts
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,

    // CRUD FamilyMembers
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,

    // Funções de cálculo
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}
