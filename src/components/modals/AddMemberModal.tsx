import { useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { ModalOverlay } from '../ui/ModalOverlay'
import { CloseIcon } from '../dashboard/icons/CloseIcon'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

const ROLE_SUGGESTIONS = ['Pai', 'Mãe', 'Filho', 'Filha', 'Avô', 'Avó', 'Tio', 'Tia']

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const { addFamilyMember } = useFinance()
  
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarType, setAvatarType] = useState<'url' | 'upload'>('url')
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false)
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      setName('')
      setRole('')
      setAvatarUrl('')
      setAvatarType('url')
      setMonthlyIncome('')
      setErrors({})
    }
  }, [isOpen])

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === '') {
      setMonthlyIncome('')
      return
    }
    const numValue = parseInt(value, 10) / 100
    setMonthlyIncome(numValue.toFixed(2))
  }

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!name || name.trim().length < 3) {
      newErrors.name = 'Por favor, insira um nome válido'
    }

    if (!role || role.trim().length === 0) {
      newErrors.role = 'Por favor, informe a função na família'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addFamilyMember({
      name: name.trim(),
      role: role.trim(),
      avatarUrl: avatarUrl.trim() || undefined,
      monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : undefined,
      email: undefined,
    })

    onClose()
    console.log('Membro adicionado com sucesso!')
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-neutral-0 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-300">
          <h2 className="text-2xl font-bold text-neutral-1000">Adicionar Membro da Família</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
            aria-label="Fechar"
          >
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Name */}
          <div>
            <Label className="block text-sm font-medium text-neutral-1000 mb-2">
              Nome Completo *
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-neutral-0 text-neutral-1000",
                errors.name ? 'border-red-500' : 'border-neutral-300'
              )}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Role */}
          <div className="relative">
            <Label className="block text-sm font-medium text-neutral-1000 mb-2">
              Função na Família *
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                  setShowRoleSuggestions(true)
                }}
                onFocus={() => setShowRoleSuggestions(true)}
                placeholder="Ex: Pai, Mãe, Filho, Avô..."
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-neutral-0 text-neutral-1000",
                  errors.role ? 'border-red-500' : 'border-neutral-300'
                )}
              />
              {showRoleSuggestions && role.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-neutral-0 border border-neutral-300 rounded-lg shadow-lg">
                  {ROLE_SUGGESTIONS.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="ghost"
                      onClick={() => {
                        setRole(suggestion)
                        setShowRoleSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 first:rounded-t-lg last:rounded-b-lg justify-start"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-2">
              Avatar
            </label>
            <div className="space-y-3">
              <div className="flex gap-2 border-b border-neutral-300">
                <Button
                  variant="ghost"
                  onClick={() => setAvatarType('url')}
                  className={cn(
                    "px-4 py-2 font-medium rounded-none",
                    avatarType === 'url'
                      ? 'text-neutral-1000 border-b-2 border-neutral-1000'
                      : 'text-neutral-600'
                  )}
                >
                  URL
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setAvatarType('upload')}
                  className={cn(
                    "px-4 py-2 font-medium rounded-none",
                    avatarType === 'upload'
                      ? 'text-neutral-1000 border-b-2 border-neutral-1000'
                      : 'text-neutral-600'
                  )}
                >
                  Upload
                </Button>
              </div>
              {avatarType === 'url' ? (
                <Input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://exemplo.com/avatar.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000"
                />
              ) : (
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                  <p className="text-neutral-600 mb-2">Clique para fazer upload</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    id="avatar-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file && file.size <= 5 * 1024 * 1024) {
                        // In a real app, upload to server and get URL
                        console.log('File selected:', file.name)
                      }
                    }}
                  />
                  <Button
                    asChild
                    variant="default"
                    className="bg-neutral-1000 text-neutral-0 hover:bg-neutral-900"
                  >
                    <label
                      htmlFor="avatar-upload"
                      className="inline-block px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Selecionar arquivo
                    </label>
                  </Button>
                  <p className="text-xs text-neutral-500 mt-2">JPG, PNG (máx. 5MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Monthly Income */}
          <div>
            <label className="block text-sm font-medium text-neutral-1000 mb-2">
              Renda Mensal Estimada (opcional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 z-10">R$</span>
              <Input
                type="text"
                value={monthlyIncome ? `R$ ${monthlyIncome}` : ''}
                onChange={handleIncomeChange}
                placeholder="R$ 0,00"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-300 bg-neutral-0 text-neutral-1000"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-neutral-300 bg-neutral-0">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-6 py-3 rounded-full border-neutral-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-full bg-neutral-1000 text-neutral-0 font-medium hover:bg-neutral-900"
          >
            Adicionar Membro
          </Button>
        </div>
      </div>
    </ModalOverlay>
  )
}
