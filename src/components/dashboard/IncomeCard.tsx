import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de seta diagonal baixo-esquerda (entrada de dinheiro)
const ArrowDownLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5L15 15M15 15H9M15 15V9"
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
        <h3 className="font-bold text-neutral-1000" style={{ fontSize: '16px', lineHeight: '24px' }}>
          Receitas
        </h3>
        <div
          className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 flex-shrink-0"
        >
          <ArrowDownLeftIcon />
        </div>
      </div>

      {/* Valor formatado */}
      <p className="font-bold text-neutral-1000" style={{ fontSize: '32px', lineHeight: '40px' }}>
        {formatCurrency(displayValue)}
      </p>
    </div>
  )
}
