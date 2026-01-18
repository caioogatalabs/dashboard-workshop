import { useState, useEffect, useRef } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { CalendarIcon } from './icons/CalendarIcon'
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
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedStart(dateRange.startDate)
    setSelectedEnd(dateRange.endDate)
  }, [dateRange])

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        if (isOpen) {
          onToggle()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const formatDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, 'dd MMM', { locale: ptBR })} - ${format(
        dateRange.endDate,
        'dd MMM yyyy',
        { locale: ptBR }
      )}`
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
    <div className="relative" ref={calendarRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 transition-colors whitespace-nowrap"
        style={{ fontSize: '14px', lineHeight: '20px' }}
      >
        <CalendarIcon />
        <span>{formatDateRange()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 rounded-lg border border-neutral-300 bg-neutral-0 shadow-lg z-50 p-4">
          {/* Atalhos rápidos */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handleQuickSelect('thisMonth')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              Este mês
            </button>
            <button
              onClick={() => handleQuickSelect('lastMonth')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              Mês passado
            </button>
            <button
              onClick={() => handleQuickSelect('last3Months')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              Últimos 3 meses
            </button>
            <button
              onClick={() => handleQuickSelect('thisYear')}
              className="px-3 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              Este ano
            </button>
          </div>

          {/* Calendário */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                ←
              </button>
              <h3 className="font-semibold text-neutral-1000">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-neutral-100 rounded"
              >
                →
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-xs text-neutral-600 font-medium py-1">
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
                        ? 'bg-neutral-1000 text-neutral-0 font-semibold'
                        : inRange
                          ? 'bg-neutral-200 text-neutral-1000'
                          : isToday
                            ? 'bg-brand-100 text-neutral-1000 font-semibold'
                            : 'hover:bg-neutral-100 text-neutral-1000'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botão confirmar */}
          {selectedStart && selectedEnd && (
            <button
              onClick={confirmSelection}
              className="w-full px-4 py-2 rounded-lg bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
            >
              Confirmar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
