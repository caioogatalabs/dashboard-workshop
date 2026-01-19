import { ReactNode, useEffect, useRef } from 'react'

interface ModalFullscreenProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function ModalFullscreen({ isOpen, onClose, children, className = '' }: ModalFullscreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col bg-neutral-0"
      style={{
        backgroundColor: 'var(--color-neutral-0, #FFFFFF)',
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
    >
      <div className={`flex-1 flex flex-col overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  )
}
