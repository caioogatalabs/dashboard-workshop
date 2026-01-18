import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de seta diagonal cima-direita (saída de dinheiro)
const ArrowUpRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 5L5 15M5 15H11M5 15V9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function ExpenseCard() {
  const { calculateExpensesForPeriod } = useFinance()
  const [displayValue, setDisplayValue] = useState(0)

  const expenses = calculateExpensesForPeriod()

  // Animação de contagem
  useEffect(() => {
    const duration = 800 // ms
    const steps = 60
    const stepDuration = duration / steps
    const increment = expenses / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(increment * currentStep)
      } else {
        setDisplayValue(expenses)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [expenses])

  return (
    <div
      className="
        flex flex-col
        items-start
        rounded-2xl
        bg-neutral-0
        border border-neutral-300
      "
      style={{
        display: 'flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        flex: '1 0 0',
        alignSelf: 'stretch',
      }}
    >
      {/* Header com label e ícone */}
      <div className="flex items-center justify-between w-full">
        <h3 className="font-bold text-neutral-600" style={{ fontSize: '16px', lineHeight: '24px' }}>
          Despesas
        </h3>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-red-600 flex-shrink-0"
          style={{
            backgroundColor: '#FEE2E2', // red-100 - cor primitiva para ação destrutiva
          }}
        >
          <ArrowUpRightIcon />
        </div>
      </div>

      {/* Valor formatado */}
      <p className="font-bold text-neutral-1000" style={{ fontSize: '32px', lineHeight: '40px' }}>
        {formatCurrency(displayValue)}
      </p>
    </div>
  )
}
