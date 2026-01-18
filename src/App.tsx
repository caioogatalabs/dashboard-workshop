import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { FinanceProvider } from './contexts/FinanceContext'
import { ROUTES } from './constants'

import { SummaryCards, DashboardHeader, ExpensesByCategoryCarousel, FinancialFlowChart } from './components/dashboard'
import { CreditCardsWidget } from './components/dashboard/CreditCardsWidget'

// Placeholder components - serão implementados nos próximos prompts
const Dashboard = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '32px',
      flex: '1 0 0',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}
  >
    <DashboardHeader />
    
    {/* Top Row - Expense Breakdown */}
    <div className="w-full">
      <ExpensesByCategoryCarousel />
    </div>

    {/* Bottom Section - Summary Cards (left) + Credit Cards Widget (right) */}
    <div
      className="w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Desktop: lado a lado, Mobile: empilhado */}
      <div
        className="w-full flex flex-col lg:flex-row gap-8"
        style={{
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column - Summary Cards */}
        <div
          className="w-full lg:flex-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <SummaryCards />
        </div>

        {/* Right Column - Credit Cards Widget */}
        <div className="w-full lg:flex-1">
          <CreditCardsWidget />
        </div>
      </div>

      {/* Financial Flow Chart - abaixo */}
      <div className="w-full">
        <FinancialFlowChart />
      </div>
    </div>
  </div>
)
const Transactions = () => <div>Transações - Em construção</div>
const Cards = () => <div>Cartões - Em construção</div>
const Goals = () => <div>Objetivos - Em construção</div>
const Profile = () => <div>Perfil - Em construção</div>

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
            <Route path={ROUTES.CARDS} element={<Cards />} />
            <Route path={ROUTES.GOALS} element={<Goals />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </FinanceProvider>
  )
}

export default App
