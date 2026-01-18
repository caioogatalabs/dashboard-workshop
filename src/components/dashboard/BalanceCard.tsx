import { useEffect, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { formatCurrency } from '../../utils/currency'

// Ícone de gráfico crescente
const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 12L6 8L4 8L4 4L12 4L12 8L14 8L8 14L2 12Z"
      fill="currentColor"
      style={{ width: '16px', height: '16px' }}
    />
  </svg>
)

export function BalanceCard() {
  const { calculateTotalBalance } = useFinance()
  const [displayValue, setDisplayValue] = useState(0)
  const [growthPercentage, setGrowthPercentage] = useState(0)

  const currentBalance = calculateTotalBalance()

  // Calcular crescimento percentual comparando com 30 dias atrás
  useEffect(() => {
    // Simular saldo de 30 dias atrás (em produção viria do histórico)
    // Por enquanto, calculamos baseado em uma variação estimada
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Calcular saldo estimado de 30 dias atrás
    // (em produção, isso viria de dados históricos reais)
    const estimatedPreviousBalance = currentBalance * 0.88 // Simulação: 12% de crescimento

    if (estimatedPreviousBalance > 0) {
      const growth = ((currentBalance - estimatedPreviousBalance) / estimatedPreviousBalance) * 100
      setGrowthPercentage(Math.round(growth))
    } else {
      setGrowthPercentage(0)
    }
  }, [currentBalance])

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

  return (
    <div
      className="relative rounded-2xl bg-neutral-1000 text-neutral-0 overflow-hidden"
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
      {/* Círculo decorativo verde-limão desfocado */}
      <div
        className="
          absolute -top-20 -right-20
          w-64 h-64
          rounded-full
          bg-brand-600
        "
        style={{
          opacity: 0.15,
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Label "Saldo Total" */}
      <p className="text-sm text-neutral-400 relative z-10" style={{ fontSize: '14px', lineHeight: '20px' }}>
        Saldo Total
      </p>

      {/* Valor formatado */}
      <p className="text-4xl font-bold relative z-10" style={{ fontSize: '36px', lineHeight: '44px' }}>
        {formatCurrency(displayValue)}
      </p>

      {/* Badge de crescimento */}
      <div
        className="
          inline-flex items-center
          rounded-full
          bg-neutral-0 bg-opacity-20
          font-medium
          relative z-10
          w-fit
        "
        style={{
          padding: '6px 12px',
          gap: '8px',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        <TrendingUpIcon />
        <span>
          {growthPercentage > 0 ? '+' : ''}
          {growthPercentage}% esse mês
        </span>
      </div>
    </div>
  )
}
