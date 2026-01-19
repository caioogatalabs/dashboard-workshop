import { useState, useMemo } from 'react'
import { useFinance } from '../hooks/useFinance'
import { formatCurrency } from '../utils/currency'
import { UserIcon } from '../components/dashboard/icons/UserIcon'
import { EnvelopeIcon } from '../components/dashboard/icons/EnvelopeIcon'
import { DollarIcon } from '../components/dashboard/icons/DollarIcon'
import { LogoutIcon } from '../components/dashboard/icons/LogoutIcon'
import { PlusIcon } from '../components/dashboard/icons/PlusIcon'
import { EditIcon } from '../components/dashboard/icons/EditIcon'
import { TrashIcon } from '../components/dashboard/icons/TrashIcon'
import { AddMemberModal } from '../components/modals/AddMemberModal'
import { CategoryModal, CategoryType } from '../components/modals/CategoryModal'
import { ToggleSwitch } from '../components/ui/ToggleSwitch'
import { DEFAULT_INCOME_CATEGORIES, DEFAULT_EXPENSE_CATEGORIES, APP_VERSION } from '../constants'

type TabType = 'info' | 'settings'

export function ProfileView() {
  const { familyMembers } = useFinance()
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  // Usuário principal é o primeiro membro do array
  const currentUser = familyMembers[0] || null

  const handleLogout = () => {
    // Por enquanto apenas mostra um alerta, pode ser implementado com contexto de autenticação
    if (window.confirm('Tem certeza que deseja sair?')) {
      // Aqui seria implementada a lógica de logout
      console.log('Logout realizado')
    }
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
      {/* Header com Abas */}
      <div className="w-full">
        <div className="flex items-center gap-8 border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('info')}
            className="px-4 py-3 relative"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: activeTab === 'info' ? 600 : 400,
              color: activeTab === 'info' ? 'var(--color-neutral-1000, #111827)' : 'var(--color-neutral-500, #6B7280)',
              borderBottom: activeTab === 'info' ? '2px solid var(--color-neutral-1000, #111827)' : '2px solid transparent',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Informações
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="px-4 py-3 relative"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: activeTab === 'settings' ? 600 : 400,
              color: activeTab === 'settings' ? 'var(--color-neutral-1000, #111827)' : 'var(--color-neutral-500, #6B7280)',
              borderBottom: activeTab === 'settings' ? '2px solid var(--color-neutral-1000, #111827)' : '2px solid transparent',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Configurações
          </button>
        </div>
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === 'info' && (
        <div className="w-full flex flex-col gap-6">
          {/* Seção de Perfil */}
          {currentUser && (
            <div
              className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px',
                gap: '24px',
                borderRadius: '16px',
                background: 'var(--color-neutral-0, #FEFEFE)',
                border: '1px solid var(--color-neutral-200, #E5E7EB)',
              }}
            >
              <div className="flex items-start gap-6 flex-col md:flex-row">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="rounded-full object-cover"
                      style={{
                        width: '120px',
                        height: '120px',
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-full bg-neutral-200 flex items-center justify-center"
                      style={{
                        width: '120px',
                        height: '120px',
                      }}
                    >
                      <UserIcon style={{ width: '48px', height: '48px', color: 'var(--color-neutral-500, #6B7280)' }} />
                    </div>
                  )}
                </div>

                {/* Informações */}
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <h2
                      className="text-2xl font-bold text-neutral-1000"
                      style={{
                        fontSize: '24px',
                        lineHeight: '32px',
                        fontWeight: 700,
                        color: 'var(--color-neutral-1000, #111827)',
                        marginBottom: '4px',
                      }}
                    >
                      {currentUser.name}
                    </h2>
                    <p
                      className="text-base text-neutral-500"
                      style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'var(--color-neutral-500, #6B7280)',
                      }}
                    >
                      {currentUser.role}
                    </p>
                  </div>

                  {/* Email */}
                  {currentUser.email && (
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon style={{ width: '20px', height: '20px', color: 'var(--color-neutral-500, #6B7280)' }} />
                      <span
                        className="text-base text-neutral-600"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: 'var(--color-neutral-600, #4B5563)',
                        }}
                      >
                        {currentUser.email}
                      </span>
                    </div>
                  )}

                  {/* Renda Mensal */}
                  {currentUser.monthlyIncome !== undefined && (
                    <div className="flex items-center gap-2">
                      <DollarIcon style={{ width: '20px', height: '20px', color: 'var(--color-neutral-500, #6B7280)' }} />
                      <span
                        className="text-base text-neutral-600"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: 'var(--color-neutral-600, #4B5563)',
                        }}
                      >
                        Renda mensal: {formatCurrency(currentUser.monthlyIncome)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Seção Membros da Família */}
          <div
            className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              gap: '24px',
              borderRadius: '16px',
              background: 'var(--color-neutral-0, #FEFEFE)',
              border: '1px solid var(--color-neutral-200, #E5E7EB)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-xl font-semibold text-neutral-1000"
                style={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontWeight: 600,
                  color: 'var(--color-neutral-1000, #111827)',
                }}
              >
                Membros da Família
              </h3>
              {familyMembers.length > 1 && (
                <button
                  onClick={() => setIsAddMemberOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 500,
                  }}
                >
                  <PlusIcon style={{ width: '16px', height: '16px' }} />
                  <span>Adicionar Membro</span>
                </button>
              )}
            </div>

            {familyMembers.length === 1 ? (
              <div
                className="w-full flex flex-col items-center justify-center py-12 px-4"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 16px',
                  gap: '16px',
                  border: '2px dashed var(--color-neutral-300, #E5E7EB)',
                  borderRadius: '12px',
                  background: 'var(--color-neutral-50, #FAFAFA)',
                }}
              >
                <p
                  className="text-base text-neutral-600 text-center"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: 'var(--color-neutral-600, #4B5563)',
                    marginBottom: '8px',
                  }}
                >
                  Adicione outros membros da família para gerenciar as finanças em conjunto
                </p>
                <button
                  onClick={() => setIsAddMemberOpen(true)}
                  className="px-6 py-3 rounded-lg bg-neutral-1000 text-neutral-0 hover:bg-neutral-900 transition-colors"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: 'var(--color-neutral-1000, #111827)',
                    color: 'var(--color-neutral-0, #FFFFFF)',
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 500,
                  }}
                >
                  Adicionar Membro da Família
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => {
                      // Por enquanto apenas loga, pode abrir modal de edição no futuro
                      console.log('Editar membro:', member.id)
                    }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px',
                      borderRadius: '8px',
                      background: 'var(--color-neutral-50, #FAFAFA)',
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="rounded-full object-cover"
                          style={{
                            width: '48px',
                            height: '48px',
                          }}
                        />
                      ) : (
                        <div
                          className="rounded-full bg-neutral-200 flex items-center justify-center"
                          style={{
                            width: '48px',
                            height: '48px',
                          }}
                        >
                          <UserIcon style={{ width: '24px', height: '24px', color: 'var(--color-neutral-500, #6B7280)' }} />
                        </div>
                      )}
                    </div>

                    {/* Nome e Função */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <p
                        className="text-base font-medium text-neutral-1000 truncate"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 500,
                          color: 'var(--color-neutral-1000, #111827)',
                        }}
                      >
                        {member.name}
                      </p>
                      <p
                        className="text-sm text-neutral-500 truncate"
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: 'var(--color-neutral-500, #6B7280)',
                        }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Renda Mensal */}
                    <div className="flex-shrink-0">
                      <p
                        className="text-base font-semibold text-neutral-1000"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 600,
                          color: 'var(--color-neutral-1000, #111827)',
                        }}
                      >
                        {member.monthlyIncome !== undefined ? formatCurrency(member.monthlyIncome) : '-'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Sair */}
          <div className="w-full flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-neutral-0 hover:bg-red-700 transition-colors"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: '#DC2626',
                color: 'var(--color-neutral-0, #FFFFFF)',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
                transition: 'background-color 0.2s ease-in-out',
              }}
            >
              <LogoutIcon style={{ width: '16px', height: '16px' }} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && <SettingsTab />}

      {/* Modais */}
      <AddMemberModal isOpen={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} />
    </div>
  )
}

// Componente para a aba de Configurações
function SettingsTab() {
  const {
    transactions,
    creditCards,
    bankAccounts,
    familyMembers,
    goals,
  } = useFinance()

  // Estados para preferências de exibição
  const [darkMode, setDarkMode] = useState(false)
  const [currency, setCurrency] = useState('BRL')
  const [dateFormat, setDateFormat] = useState('DD/MM/AAAA')

  // Estados para notificações
  const [billReminder, setBillReminder] = useState(true)
  const [cardLimitAlert, setCardLimitAlert] = useState(true)
  const [monthlySummary, setMonthlySummary] = useState(false)
  const [goalNotifications, setGoalNotifications] = useState(true)

  // Estados para categorias
  const [customIncomeCategories, setCustomIncomeCategories] = useState<
    Array<{ name: string; color: string }>
  >([])
  const [customExpenseCategories, setCustomExpenseCategories] = useState<
    Array<{ name: string; color: string }>
  >([])
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [categoryModalType, setCategoryModalType] = useState<CategoryType>('income')
  const [editingCategory, setEditingCategory] = useState<{ name: string; color: string } | null>(null)

  // Categorias combinadas (padrão + customizadas)
  const allIncomeCategories = useMemo(() => {
    const defaults = DEFAULT_INCOME_CATEGORIES.map((name) => ({ name, color: '#15BE78' }))
    return [...defaults, ...customIncomeCategories]
  }, [customIncomeCategories])

  const allExpenseCategories = useMemo(() => {
    const defaults = DEFAULT_EXPENSE_CATEGORIES.map((name) => ({ name, color: '#EF4444' }))
    return [...defaults, ...customExpenseCategories]
  }, [customExpenseCategories])

  const handleAddCategory = (type: CategoryType) => {
    setCategoryModalType(type)
    setEditingCategory(null)
    setIsCategoryModalOpen(true)
  }

  const handleEditCategory = (name: string, color: string, type: CategoryType) => {
    setCategoryModalType(type)
    setEditingCategory({ name, color })
    setIsCategoryModalOpen(true)
  }

  const handleDeleteCategory = (name: string, type: CategoryType) => {
    if (window.confirm(`Tem certeza que deseja deletar a categoria "${name}"?`)) {
      if (type === 'income') {
        setCustomIncomeCategories((prev) => prev.filter((cat) => cat.name !== name))
      } else {
        setCustomExpenseCategories((prev) => prev.filter((cat) => cat.name !== name))
      }
    }
  }

  const handleSaveCategory = (name: string, color: string, type: CategoryType) => {
    if (editingCategory) {
      // Editar categoria existente
      if (type === 'income') {
        setCustomIncomeCategories((prev) =>
          prev.map((cat) => (cat.name === editingCategory.name ? { name, color } : cat))
        )
      } else {
        setCustomExpenseCategories((prev) =>
          prev.map((cat) => (cat.name === editingCategory.name ? { name, color } : cat))
        )
      }
    } else {
      // Adicionar nova categoria
      if (type === 'income') {
        setCustomIncomeCategories((prev) => [...prev, { name, color }])
      } else {
        setCustomExpenseCategories((prev) => [...prev, { name, color }])
      }
    }
  }

  const handleExportData = () => {
    const data = {
      transactions,
      creditCards,
      bankAccounts,
      familyMembers,
      goals,
      exportDate: new Date().toISOString(),
    }

    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mycash-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClearData = () => {
    const confirmMessage =
      'Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.\n\nDigite "CONFIRMAR" para prosseguir.'
    const userInput = window.prompt(confirmMessage)

    if (userInput === 'CONFIRMAR') {
      // Por enquanto apenas loga, pode implementar limpeza real no contexto
      console.log('Dados limpos')
      alert('Dados limpos com sucesso')
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Preferências de Exibição */}
      <div
        className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '24px',
          borderRadius: '16px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Preferências de Exibição
        </h3>

        <div className="flex flex-col gap-4">
          <ToggleSwitch
            checked={darkMode}
            onChange={setDarkMode}
            disabled={true}
            label="Modo Escuro"
            showBadge="Em breve"
          />

          <div className="flex items-center justify-between">
            <label
              className="text-base text-neutral-1000"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                color: 'var(--color-neutral-1000, #111827)',
              }}
            >
              Moeda Padrão
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">Dólar Americano ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label
              className="text-base text-neutral-1000"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                color: 'var(--color-neutral-1000, #111827)',
              }}
            >
              Formato de Data
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent cursor-pointer"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              <option value="DD/MM/AAAA">DD/MM/AAAA</option>
              <option value="MM/DD/AAAA">MM/DD/AAAA</option>
              <option value="AAAA-MM-DD">AAAA-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div
        className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '24px',
          borderRadius: '16px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Notificações
        </h3>

        <div className="flex flex-col gap-4">
          <ToggleSwitch
            checked={billReminder}
            onChange={setBillReminder}
            label="Lembrete de vencimento de contas"
          />
          <ToggleSwitch
            checked={cardLimitAlert}
            onChange={setCardLimitAlert}
            label="Alerta de aproximação do limite de cartão"
          />
          <ToggleSwitch
            checked={monthlySummary}
            onChange={setMonthlySummary}
            label="Resumo mensal por email"
          />
          <ToggleSwitch
            checked={goalNotifications}
            onChange={setGoalNotifications}
            label="Notificações de novos objetivos alcançados"
          />
        </div>
      </div>

      {/* Gerenciar Categorias */}
      <div
        className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '24px',
          borderRadius: '16px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Gerenciar Categorias
        </h3>

        {/* Categorias de Receita */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4
              className="text-base font-medium text-neutral-700"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 500,
                color: 'var(--color-neutral-700, #4B5563)',
              }}
            >
              Categorias de Receita
            </h4>
            <button
              onClick={() => handleAddCategory('income')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
            >
              <PlusIcon style={{ width: '14px', height: '14px' }} />
              <span>Adicionar Categoria</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {allIncomeCategories.map((category) => {
              const isDefault = DEFAULT_INCOME_CATEGORIES.includes(category.name as any)
              return (
                <div
                  key={category.name}
                  className="group flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'var(--color-neutral-50, #FAFAFA)',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span
                      className="text-base text-neutral-1000"
                      style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'var(--color-neutral-1000, #111827)',
                      }}
                    >
                      {category.name}
                    </span>
                  </div>
                  {!isDefault && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditCategory(category.name, category.color, 'income')}
                        className="p-1.5 rounded hover:bg-neutral-200 transition-colors"
                        aria-label="Editar categoria"
                      >
                        <EditIcon style={{ width: '16px', height: '16px', color: 'var(--color-neutral-600, #6B7280)' }} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.name, 'income')}
                        className="p-1.5 rounded hover:bg-neutral-200 transition-colors"
                        aria-label="Deletar categoria"
                      >
                        <TrashIcon style={{ width: '16px', height: '16px', color: '#EF4444' }} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Categorias de Despesa */}
        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <h4
              className="text-base font-medium text-neutral-700"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 500,
                color: 'var(--color-neutral-700, #4B5563)',
              }}
            >
              Categorias de Despesa
            </h4>
            <button
              onClick={() => handleAddCategory('expense')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
            >
              <PlusIcon style={{ width: '14px', height: '14px' }} />
              <span>Adicionar Categoria</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {allExpenseCategories.map((category) => {
              const isDefault = DEFAULT_EXPENSE_CATEGORIES.includes(category.name as any)
              return (
                <div
                  key={category.name}
                  className="group flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'var(--color-neutral-50, #FAFAFA)',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span
                      className="text-base text-neutral-1000"
                      style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'var(--color-neutral-1000, #111827)',
                      }}
                    >
                      {category.name}
                    </span>
                  </div>
                  {!isDefault && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditCategory(category.name, category.color, 'expense')}
                        className="p-1.5 rounded hover:bg-neutral-200 transition-colors"
                        aria-label="Editar categoria"
                      >
                        <EditIcon style={{ width: '16px', height: '16px', color: 'var(--color-neutral-600, #6B7280)' }} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.name, 'expense')}
                        className="p-1.5 rounded hover:bg-neutral-200 transition-colors"
                        aria-label="Deletar categoria"
                      >
                        <TrashIcon style={{ width: '16px', height: '16px', color: '#EF4444' }} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dados e Privacidade */}
      <div
        className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '24px',
          borderRadius: '16px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Dados e Privacidade
        </h3>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleExportData}
            className="w-full md:w-auto px-6 py-3 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000 hover:bg-neutral-100 transition-colors text-left"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 500,
            }}
          >
            Exportar Todos os Dados
          </button>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleClearData}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-red-600 text-neutral-0 hover:bg-red-700 transition-colors"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
              }}
            >
              Limpar Todos os Dados
            </button>
            <p
              className="text-sm text-neutral-500"
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: 'var(--color-neutral-500, #6B7280)',
              }}
            >
              Esta ação não pode ser desfeita
            </p>
          </div>
        </div>
      </div>

      {/* Sobre */}
      <div
        className="w-full rounded-lg bg-neutral-0 border border-neutral-200"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '16px',
          borderRadius: '16px',
          background: 'var(--color-neutral-0, #FEFEFE)',
          border: '1px solid var(--color-neutral-200, #E5E7EB)',
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-1000"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          Sobre o mycash+
        </h3>

        <p
          className="text-base text-neutral-600"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: 'var(--color-neutral-600, #4B5563)',
          }}
        >
          Versão {APP_VERSION}
        </p>

        <p
          className="text-sm text-neutral-500"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--color-neutral-500, #6B7280)',
          }}
        >
          Sistema de gestão financeira familiar
        </p>

        <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              console.log('Termos de Uso')
            }}
            className="text-sm text-brand-600 hover:text-brand-700 transition-colors"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: 'var(--color-brand-600, #D7FE03)',
              cursor: 'pointer',
            }}
          >
            Termos de Uso
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              console.log('Política de Privacidade')
            }}
            className="text-sm text-brand-600 hover:text-brand-700 transition-colors"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: 'var(--color-brand-600, #D7FE03)',
              cursor: 'pointer',
            }}
          >
            Política de Privacidade
          </a>
        </div>
      </div>

      {/* Modal de Categoria */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        type={categoryModalType}
        initialName={editingCategory?.name}
        initialColor={editingCategory?.color}
      />
    </div>
  )
}
