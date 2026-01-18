import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de seta para cima (↑)
const ArrowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 20V4M12 4L8 8M12 4L16 8"
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

  // Calcular próximo vencimento (simulado - dia 23)
  const dueDay = 23

  return (
    <div
      className="rounded-2xl"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: '#FEFEFE',
        padding: '32px',
      }}
    >
      {/* Ícone */}
      <div className="flex-shrink-0 text-neutral-1000">
        <ArrowUpIcon />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Título */}
        <p className="text-neutral-1000 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
          Despesas
        </p>

        {/* Valor */}
        <p className="text-neutral-1000 mb-2" style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700 }}>
          {formatCurrency(displayValue)}
        </p>

        {/* Vencimento */}
        <p className="text-neutral-600" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
          Vence dia {dueDay}
        </p>
      </div>
    </div>
  )
}
