import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ROUTES } from './constants'

// Placeholder components - serão implementados nos próximos prompts
const Dashboard = () => <div>Dashboard - Em construção</div>
const Transactions = () => <div>Transações - Em construção</div>
const Cards = () => <div>Cartões - Em construção</div>
const Goals = () => <div>Objetivos - Em construção</div>
const Profile = () => <div>Perfil - Em construção</div>

function App() {
  return (
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
  )
}

export default App
