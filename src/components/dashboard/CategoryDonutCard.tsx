import { formatCurrency } from '../../utils/currency'

interface CategoryDonutCardProps {
  category: string
  amount: number
  percentage: number
  color: string
}

export function CategoryDonutCard({ category, amount, percentage, color }: CategoryDonutCardProps) {
  const donutSize = 64
  const strokeWidth = 8
  const radius = (donutSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  // Truncar nome da categoria se muito longo
  const truncatedCategory = category.length > 15 ? `${category.substring(0, 15)}...` : category

  return (
    <div
      className="
        rounded-2xl
        border border-neutral-300
        bg-neutral-0
        transition-all duration-200
        hover:border-brand-600
        flex-shrink-0
      "
      style={{
        display: 'flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '14px',
        flex: '1 0 0',
        borderRadius: '16px',
        background: '#FEFEFE',
        minWidth: '160px',
      }}
    >
      {/* Gráfico Donut */}
      <div className="relative flex items-center justify-center w-full" style={{ height: `${donutSize}px` }}>
        <svg width={donutSize} height={donutSize} className="transform -rotate-90">
          {/* Anel de fundo (cinza claro) */}
          <circle
            cx={donutSize / 2}
            cy={donutSize / 2}
            r={radius}
            fill="none"
            stroke="var(--color-neutral-300, #E5E7EB)"
            strokeWidth={strokeWidth}
          />
          {/* Anel colorido (percentual) */}
          <circle
            cx={donutSize / 2}
            cy={donutSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        {/* Percentual no centro */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 600,
            color: 'var(--color-neutral-1000, #111827)',
          }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>

      {/* Nome da categoria */}
      <p
        className="w-full text-center"
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
          color: 'var(--color-neutral-1000, #111827)',
        }}
        title={category}
      >
        {truncatedCategory}
      </p>

      {/* Valor formatado */}
      <p
        className="w-full text-center font-bold"
        style={{
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: 700,
          color: 'var(--color-neutral-1000, #111827)',
        }}
      >
        {formatCurrency(amount)}
      </p>
    </div>
  )
}
