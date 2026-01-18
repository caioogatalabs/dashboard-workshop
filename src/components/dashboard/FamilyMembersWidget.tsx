import { useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { PlusIcon } from './icons/PlusIcon'
import { CheckIcon } from './icons/CheckIcon'

export function FamilyMembersWidget() {
  const { familyMembers, selectedMember, setSelectedMember } = useFinance()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleMemberClick = (memberId: string) => {
    if (selectedMember === memberId) {
      setSelectedMember(null)
    } else {
      setSelectedMember(memberId)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-brand-600',
      'bg-purple-600',
      'bg-blue-600',
      'bg-green-600',
      'bg-neutral-600',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="flex items-center gap-2">
      {/* Avatares sobrepostos */}
      <div className="flex items-center -space-x-2">
        {familyMembers.slice(0, 4).map((member, index) => {
          const isSelected = selectedMember === member.id
          const isHovered = hoveredIndex === index

          return (
            <button
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative w-10 h-10 rounded-full border-2 transition-all duration-200
                ${isSelected ? 'border-neutral-1000 z-10' : 'border-neutral-0'}
                ${isHovered ? 'scale-110 z-20' : ''}
                ${getAvatarColor(index)} text-neutral-0
                flex items-center justify-center font-semibold
                shadow-sm
              `}
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                transform: isHovered ? 'scale(1.1) translateX(4px)' : undefined,
              }}
              aria-label={`Filtrar por ${member.name}`}
            >
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{getInitials(member.name)}</span>
              )}

              {/* Check verde quando selecionado */}
              {isSelected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-600 border-2 border-neutral-0 flex items-center justify-center">
                  <CheckIcon />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Botão adicionar membro */}
      <button
        className="w-10 h-10 rounded-full border-2 border-neutral-300 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 transition-colors flex items-center justify-center"
        aria-label="Adicionar membro"
      >
        <PlusIcon />
      </button>
    </div>
  )
}
