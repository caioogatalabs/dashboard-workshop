import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
} from './dialog'
import { cn } from '@/lib/utils'

interface ModalOverlayProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

/**
 * Wrapper do Dialog do ShadCN que mantém a mesma API do ModalOverlay antigo
 * para facilitar a migração gradual.
 * 
 * Este componente mantém compatibilidade com o código existente enquanto
 * usa o Dialog do ShadCN por baixo dos panos.
 */
export function ModalOverlay({ isOpen, onClose, children, className }: ModalOverlayProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0",
          "bg-neutral-0 rounded-lg shadow-lg",
          "[&>button]:hidden", // Esconde o botão de fechar padrão do DialogContent
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          e.preventDefault()
          onClose()
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault()
          onClose()
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
