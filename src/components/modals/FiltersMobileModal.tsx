import { useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalOverlay } from '../dashboard/ModalOverlay'
import { CloseIcon } from '../dashboard/icons/CloseIcon'

interface FiltersMobileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FiltersMobileModal({ isOpen, onClose }: FiltersMobileModalProps) {
  const {
    transactionType,
    selectedMember,
    dateRange,
    setTransactionType,
    setSelectedMember,
    setDateRange,
    familyMembers,
  } = useFinance()

  const [tempType, setTempType] = useState(transactionType)
  const [tempMember, setTempMember] = useState(selectedMember)
  const [tempDateRange, setTempDateRange] = useState(dateRange)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (isOpen) {
      setTempType(transactionType)
      setTempMember(selectedMember)
      setTempDateRange(dateRange)
    }
  }, [isOpen, transactionType, selectedMember, dateRange])

  const handleApply = () => {
    setTransactionType(tempType)
    setSelectedMember(tempMember)
    setDateRange(tempDateRange)
    onClose()
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    return days
  }

  const isDateInRange = (date: Date) => {
    if (!tempDateRange.startDate || !tempDateRange.endDate) return false
    return date >= tempDateRange.startDate && date <= tempDateRange.endDate
  }

  const isDateSelected = (date: Date) => {
    if (tempDateRange.startDate && date.getTime() === tempDateRange.startDate.getTime()) return true
    if (tempDateRange.endDate && date.getTime() === tempDateRange.endDate.getTime()) return true
    return false
  }

  const handleDateClick = (date: Date) => {
    if (!tempDateRange.startDate || (tempDateRange.startDate && tempDateRange.endDate)) {
      setTempDateRange({ startDate: date, endDate: null })
    } else if (tempDateRange.startDate && !tempDateRange.endDate) {
      if (date < tempDateRange.startDate) {
        setTempDateRange({ startDate: date, endDate: tempDateRange.startDate })
      } else {
        setTempDateRange({ startDate: tempDateRange.startDate, endDate: date })
      }
    }
  }

  const days = generateCalendarDays()
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-neutral-0 rounded-t-3xl fixed bottom-0 left-0 right-0 max-h-[90vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-300 flex-shrink-0">
          <h2 className="text-2xl font-bold text-neutral-1000">Filtros</h2>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
            aria-label="Fechar"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <CloseIcon style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Transaction Type */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-1000 mb-4">Tipo de Transação</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['all', 'income', 'expense'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTempType(type)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    tempType === type
                      ? 'bg-neutral-1000 text-neutral-0'
                      : 'bg-neutral-0 border border-neutral-300 text-neutral-600'
                  }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                  }}
                >
                  {type === 'all' ? 'Todos' : type === 'income' ? 'Receitas' : 'Despesas'}
                </button>
              ))}
            </div>
          </div>

          {/* Family Members */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-1000 mb-4">Membro da Família</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTempMember(null)}
                className={`px-4 py-3 rounded-full font-medium transition-all ${
                  tempMember === null
                    ? 'bg-neutral-1000 text-neutral-0'
                    : 'bg-neutral-0 border border-neutral-300 text-neutral-600'
                }`}
                style={{
                  height: '48px',
                  fontSize: '16px',
                }}
              >
                Todos
              </button>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setTempMember(member.id)}
                  className={`px-4 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    tempMember === member.id
                      ? 'bg-neutral-1000 text-neutral-0'
                      : 'bg-neutral-0 border border-neutral-300 text-neutral-600'
                  }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                  }}
                >
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                      style={{
                        border: tempMember === member.id ? '2px solid white' : '2px solid transparent',
                      }}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-neutral-1000 font-semibold"
                      style={{
                        border: tempMember === member.id ? '2px solid white' : '2px solid transparent',
                        fontSize: '12px',
                      }}
                    >
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  <span>{member.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-1000 mb-4">Período</h3>
            <div className="border border-neutral-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-neutral-100 rounded"
                >
                  ←
                </button>
                <h4 className="font-semibold text-neutral-1000">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-neutral-100 rounded"
                >
                  →
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs text-neutral-600 font-medium py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }
                  const isSelected = isDateSelected(date)
                  const inRange = isDateInRange(date)
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateClick(date)}
                      className={`aspect-square rounded text-sm transition-colors ${
                        isSelected
                          ? 'bg-brand-600 text-neutral-1100 font-semibold'
                          : inRange
                            ? 'bg-neutral-200 text-neutral-1000'
                            : 'hover:bg-neutral-100 text-neutral-1000'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-neutral-300 bg-neutral-0">
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-lg bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
            style={{
              height: '56px',
              fontSize: '16px',
            }}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
