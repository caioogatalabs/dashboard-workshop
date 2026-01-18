import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de seta para baixo (↓)
const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4V20M12 20L8 16M12 20L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function IncomeCard() {
  const { calculateIncomeForPeriod } = useFinance()
  const [displayValue, setDisplayValue] = useState(0)

  const income = calculateIncomeForPeriod()

  // Animação de contagem
  useEffect(() => {
    const duration = 800 // ms
    const steps = 60
    const stepDuration = duration / steps
    const increment = income / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(increment * currentStep)
      } else {
        setDisplayValue(income)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [income])

  // Calcular próximo vencimento (simulado - dia 23)
  const dueDay = 23

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: 'var(--color-neutral-0, #FEFEFE)',
      }}
    >
      {/* Ícone */}
      <div className="text-neutral-1000">
        <ArrowDownIcon />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col w-full">
        {/* Título */}
        <p className="text-neutral-500" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
          Receitas
        </p>

        {/* Valor */}
        <p className="text-neutral-1000" style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700 }}>
          {formatCurrency(displayValue)}
        </p>

        {/* Vencimento */}
        <p className="text-neutral-500" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}>
          Vence dia {dueDay}
        </p>
      </div>
    </div>
  )
}
