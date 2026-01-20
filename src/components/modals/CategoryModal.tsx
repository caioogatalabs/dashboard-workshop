import { useState, useEffect } from 'react'
import { ModalOverlay } from '../ui/ModalOverlay'
import { CloseIcon } from '../dashboard/icons/CloseIcon'

export type CategoryType = 'income' | 'expense'

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, color: string, type: CategoryType) => void
  type: CategoryType
  initialName?: string
  initialColor?: string
}

const CATEGORY_COLORS = [
  { name: 'Verde', value: '#15BE78' },
  { name: 'Azul', value: '#3B82F6' },
  { name: 'Roxo', value: '#903CF5' },
  { name: 'Laranja', value: '#F97316' },
  { name: 'Rosa', value: '#EC4899' },
  { name: 'Amarelo', value: '#EAB308' },
  { name: 'Vermelho', value: '#EF4444' },
  { name: 'Ciano', value: '#06B6D4' },
]

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  type,
  initialName = '',
  initialColor = CATEGORY_COLORS[0].value,
}: CategoryModalProps) {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState(initialColor)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setName(initialName)
      setSelectedColor(initialColor || CATEGORY_COLORS[0].value)
      setError('')
    }
  }, [isOpen, initialName, initialColor])

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Por favor, insira um nome para a categoria')
      return
    }

    onSave(name.trim(), selectedColor, type)
    onClose()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-neutral-0 rounded-lg shadow-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-300">
          <h2 className="text-2xl font-bold text-neutral-1000">
            {initialName ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
            aria-label="Fechar"
          >
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-2">
              Nome da Categoria *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Ex: Alimentação"
              className={`w-full px-4 py-3 rounded-lg border bg-neutral-0 text-neutral-1000 ${
                error ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-3">
              Cor
            </label>
            <div className="flex flex-wrap gap-3">
              {CATEGORY_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className="w-10 h-10 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color.value,
                    borderColor: selectedColor === color.value ? 'var(--color-neutral-1000, #111827)' : 'transparent',
                    borderWidth: selectedColor === color.value ? '3px' : '2px',
                  }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-neutral-300 bg-neutral-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900 transition-colors"
          >
            {initialName ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
