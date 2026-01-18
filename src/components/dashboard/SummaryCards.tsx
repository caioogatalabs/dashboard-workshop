import { BalanceCard } from './BalanceCard'
import { IncomeCard } from './IncomeCard'
import { ExpenseCard } from './ExpenseCard'

export function SummaryCards() {
  return (
    <div
      className="
        w-full
        flex flex-col md:flex-row
      "
      style={{
        gap: '16px',
      }}
    >
      {/* BalanceCard - pode ser um pouco maior no desktop */}
      <div className="w-full md:w-2/5">
        <BalanceCard />
      </div>

      {/* IncomeCard e ExpenseCard - dividem o espaço restante */}
      <div className="w-full md:w-3/5 flex flex-col md:flex-row" style={{ gap: '16px' }}>
        <div className="w-full md:w-1/2">
          <IncomeCard />
        </div>
        <div className="w-full md:w-1/2">
          <ExpenseCard />
        </div>
      </div>
    </div>
  )
}
