import { BalanceCard } from './BalanceCard'
import { IncomeCard } from './IncomeCard'
import { ExpenseCard } from './ExpenseCard'

export function SummaryCards() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        width: '100%',
      }}
    >
      {/* Cards lado a lado */}
      <div style={{ flex: '1 0 0', alignSelf: 'stretch' }}>
        <BalanceCard />
      </div>
      <div style={{ flex: '1 0 0', alignSelf: 'stretch' }}>
        <IncomeCard />
      </div>
      <div style={{ flex: '1 0 0', alignSelf: 'stretch' }}>
        <ExpenseCard />
      </div>
    </div>
  )
}
