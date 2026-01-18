import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de cifrão ($)
const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2V22M17 8C17 10.2091 14.7614 12 12 12C9.23858 12 7 10.2091 7 8C7 5.79086 9.23858 4 12 4C14.7614 4 17 5.79086 17 8ZM17 16C17 18.2091 14.7614 20 12 20C9.23858 20 7 18.2091 7 16C7 13.7909 9.23858 12 12 12C14.7614 12 17 13.7909 17 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function BalanceCard() {
  const { calculateTotalBalance } = useFinance()
  const [displayValue, setDisplayValue] = useState(0)

  const currentBalance = calculateTotalBalance()

  // Animação de contagem
  useEffect(() => {
    const duration = 800 // ms
    const steps = 60
    const stepDuration = duration / steps
    const increment = currentBalance / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(increment * currentStep)
      } else {
        setDisplayValue(currentBalance)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [currentBalance])

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
        <DollarIcon />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col w-full">
        {/* Título */}
        <p className="text-neutral-500" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
          Saldo Total
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
