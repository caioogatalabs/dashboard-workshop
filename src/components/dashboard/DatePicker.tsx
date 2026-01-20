import { useState, useEffect, useRef } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { CalendarIcon } from './icons/CalendarIcon'
import { ModalOverlay } from '../ui/ModalOverlay'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DatePickerProps {
  isOpen: boolean
  onToggle: () => void
}

export function DatePicker({ isOpen, onToggle }: DatePickerProps) {
  const { dateRange, setDateRange } = useFinance()
  const [selectedStart, setSelectedStart] = useState<Date | null>(dateRange.startDate)
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(dateRange.endDate)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedStart(dateRange.startDate)
    setSelectedEnd(dateRange.endDate)
  }, [dateRange])

  const formatDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const startFormatted = format(dateRange.startDate, 'dd MMM', { locale: ptBR })
      const endFormatted = format(dateRange.endDate, 'dd MMM yyyy', { locale: ptBR })
      return `${startFormatted} - ${endFormatted}`
    }
    if (dateRange.startDate) {
      return format(dateRange.startDate, 'dd MMM yyyy', { locale: ptBR })
    }
    return 'Selecionar período'
  }

  const handleQuickSelect = (type: 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear') => {
    const now = new Date()
    let start: Date
    let end: Date = new Date(now)

    switch (type) {
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        end = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case 'last3Months':
        start = new Date(now.getFullYear(), now.getMonth() - 3, 1)
        break
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1)
        break
      default:
        start = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    setDateRange({ startDate: start, endDate: end })
    onToggle()
  }

  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Iniciar nova seleção
      setSelectedStart(date)
      setSelectedEnd(null)
    } else if (selectedStart && !selectedEnd) {
      // Completar seleção
      if (date < selectedStart) {
        setSelectedEnd(selectedStart)
        setSelectedStart(date)
      } else {
        setSelectedEnd(date)
      }
    }
  }

  const confirmSelection = () => {
    if (selectedStart && selectedEnd) {
      setDateRange({ startDate: selectedStart, endDate: selectedEnd })
      onToggle()
    }
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false
    return date >= selectedStart && date <= selectedEnd
  }

  const isDateSelected = (date: Date) => {
    if (selectedStart && date.getTime() === selectedStart.getTime()) return true
    if (selectedEnd && date.getTime() === selectedEnd.getTime()) return true
    return false
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
    <>
      <div className="relative">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-0 transition-colors whitespace-nowrap"
          style={{
            display: 'flex',
            padding: 'var(--space-12, 12px) var(--space-16, 16px)',
            alignItems: 'center',
            gap: 'var(--space-8, 8px)',
            borderRadius: 'var(--shape-100, 100px)',
            background: 'var(--color-neutral-1100, #060B14)',
            border: '1px solid var(--color-neutral-900, #1F2937)',
            fontSize: '14px',
            lineHeight: '20px',
            minHeight: '48px',
          }}
        >
          <CalendarIcon style={{ width: '16px', height: '16px' }} />
          <span>{formatDateRange()}</span>
        </button>
      </div>

      <ModalOverlay isOpen={isOpen} onClose={onToggle}>
        <div
          ref={contentRef}
          className="rounded-[28px] shadow-lg"
          style={{
            display: 'flex',
            width: '360px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRadius: '28px',
            background: 'var(--color-neutral-1100, #060B14)',
            padding: 'var(--space-16, 16px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="w-full mb-4">
            <h3 className="text-neutral-0 mb-2" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
              Select date
            </h3>
            {selectedStart && (
              <div className="text-brand-600" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}>
                {format(selectedStart, 'EEE, MMM dd', { locale: ptBR }).replace(/\./g, '')}
              </div>
            )}
          </div>

          {/* Atalhos rápidos */}
          <div className="grid grid-cols-2 gap-2 mb-4 w-full">
            <button
              onClick={() => handleQuickSelect('thisMonth')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-900 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Este mês
            </button>
            <button
              onClick={() => handleQuickSelect('lastMonth')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-900 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Mês passado
            </button>
            <button
              onClick={() => handleQuickSelect('last3Months')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-900 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Últimos 3 meses
            </button>
            <button
              onClick={() => handleQuickSelect('thisYear')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-900 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Este ano
            </button>
          </div>

          {/* Calendário */}
          <div className="mb-4 w-full">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-neutral-900 rounded text-neutral-400"
                style={{ fontSize: '16px' }}
              >
                ←
              </button>
              <h3 className="font-semibold text-neutral-0" style={{ fontSize: '14px', lineHeight: '20px' }}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-neutral-900 rounded text-neutral-400"
                style={{ fontSize: '16px' }}
              >
                →
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-xs text-neutral-400 font-medium py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />
                }

                const isSelected = isDateSelected(date)
                const inRange = isDateInRange(date)
                const isToday = date.toDateString() === new Date().toDateString()

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDateClick(date)}
                    className={`aspect-square rounded text-sm transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-neutral-1100 font-semibold'
                        : inRange
                          ? 'bg-neutral-900 text-neutral-0'
                          : isToday
                            ? 'border border-brand-600 text-neutral-0'
                            : 'hover:bg-neutral-900 text-neutral-0'
                    }`}
                    style={{ fontSize: '14px', lineHeight: '20px' }}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-between w-full gap-2">
            <button
              onClick={() => {
                setSelectedStart(null)
                setSelectedEnd(null)
                setDateRange({ startDate: null, endDate: null })
              }}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-0 transition-colors"
              style={{ fontSize: '14px', lineHeight: '20px' }}
            >
              Clear
            </button>
            <div className="flex gap-2">
              <button
                onClick={onToggle}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-0 transition-colors"
                style={{ fontSize: '14px', lineHeight: '20px' }}
              >
                Cancel
              </button>
              {selectedStart && selectedEnd && (
                <button
                  onClick={() => {
                    confirmSelection()
                    onToggle()
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-brand-600 text-neutral-1100 font-medium hover:bg-brand-500 transition-colors"
                  style={{ fontSize: '14px', lineHeight: '20px' }}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalOverlay>
    </>
  )
}
