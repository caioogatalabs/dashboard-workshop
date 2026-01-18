import { FC, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/currency'
import { ChartIcon } from './icons/ChartIcon'

// Tipo para o filtro
type FilterType = 'both' | 'income' | 'expense'

// Dados mock para sete meses
// Estrutura preparada para receber dados reais no futuro
interface MonthlyData {
  month: string
  monthAbbr: string
  income: number
  expense: number
}

// Função para formatar valores compactos no eixo Y (R$ 2k, R$ 4k, etc)
const formatCompactCurrency = (value: number): string => {
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  }
  return `R$ ${value}`
}

// Tooltip customizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as MonthlyData
    const hasIncome = payload.some((p: any) => p.dataKey === 'income')
    const hasExpense = payload.some((p: any) => p.dataKey === 'expense')
    
    return (
      <div
        style={{
          backgroundColor: 'var(--color-neutral-0, #FFFFFF)',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          border: '1px solid var(--color-neutral-300, #E5E7EB)',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--color-neutral-1000, #111827)',
            marginBottom: '8px',
          }}
        >
          {data.monthAbbr}
        </p>
        {hasIncome && (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-green-600, #15BE78)',
              marginBottom: hasExpense ? '4px' : '0',
            }}
          >
            Receitas: {formatCurrency(data.income)}
          </p>
        )}
        {hasExpense && (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-neutral-1000, #111827)',
            }}
          >
            Despesas: {formatCurrency(data.expense)}
          </p>
        )}
      </div>
    )
  }
  return null
}

export const FinancialFlowChart: FC = () => {
  const [filter, setFilter] = useState<FilterType>('both')

  // Dados mock - no futuro virão de transações reais agrupadas por mês
  const mockData: MonthlyData[] = [
    { month: 'Janeiro', monthAbbr: 'Jan', income: 8000, expense: 8000 },
    { month: 'Fevereiro', monthAbbr: 'Fev', income: 8000, expense: 8000 },
    { month: 'Março', monthAbbr: 'Mar', income: 8000, expense: 8000 },
    { month: 'Abril', monthAbbr: 'Abr', income: 8000, expense: 8000 },
    { month: 'Maio', monthAbbr: 'Mai', income: 8000, expense: 8000 },
    { month: 'Junho', monthAbbr: 'Jun', income: 8000, expense: 8000 },
    { month: 'Julho', monthAbbr: 'Jul', income: 8000, expense: 8000 },
  ]

  return (
    <div
      className="flex flex-col items-start rounded-[20px] bg-neutral-0"
      style={{
        width: '100%',
        maxWidth: '100%',
        padding: '32px',
        gap: '32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header com título e filtros */}
      <div className="flex items-center justify-between w-full flex-wrap gap-4">
        {/* Título com ícone */}
        <div className="flex items-center gap-3">
          <div className="text-neutral-1000">
            <ChartIcon />
          </div>
          <h2 className="text-xl font-semibold text-neutral-1000">Fluxo Financeiro</h2>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('both')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                filter === 'both'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }
            `}
          >
            Ambos
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                filter === 'income'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }
            `}
          >
            Receitas
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                filter === 'expense'
                  ? 'bg-neutral-1000 text-neutral-0'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }
            `}
          >
            Despesas
          </button>
        </div>
      </div>

      {/* Gráfico */}
      <div
        className="w-full rounded-lg"
        style={{
          height: '300px',
          backgroundColor: 'var(--color-neutral-100, #F9FAFB)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            {/* Grid horizontal tracejado */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-neutral-200, #F3F4F6)"
              vertical={false}
            />

            {/* Eixo X - Meses */}
            <XAxis
              dataKey="monthAbbr"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: 'var(--color-neutral-600, #6B7280)',
                fontSize: 12,
              }}
              style={{
                color: 'var(--color-neutral-600, #6B7280)',
              }}
            />

            {/* Eixo Y - Valores monetários */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: 'var(--color-neutral-600, #6B7280)',
                fontSize: 12,
              }}
              tickFormatter={formatCompactCurrency}
              style={{
                color: 'var(--color-neutral-600, #6B7280)',
              }}
            />

            {/* Tooltip customizado */}
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Barra de Receitas */}
            {(filter === 'both' || filter === 'income') && (
              <Bar
                dataKey="income"
                fill="var(--color-brand-600, #D7FE03)"
                radius={[4, 4, 0, 0]}
              />
            )}

            {/* Barra de Despesas */}
            {(filter === 'both' || filter === 'expense') && (
              <Bar
                dataKey="expense"
                fill="var(--color-neutral-1000, #111827)"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
