import { useState } from 'react'

export function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)

  // Persistir preferência no estado (sem localStorage conforme regras)
  // Por padrão, sidebar começa expandida
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    toggleSidebar,
  }
}
