import { FC } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface SwitchWrapperProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  showBadge?: string
}

/**
 * Wrapper do Switch do ShadCN que mantém a mesma API do ToggleSwitch antigo
 * para facilitar a migração gradual.
 */
export const SwitchWrapper: FC<SwitchWrapperProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  showBadge,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      {label && (
        <Label
          htmlFor={label ? `switch-${label}` : undefined}
          className={cn(
            "text-base text-neutral-1000",
            disabled && "text-neutral-400 cursor-not-allowed"
          )}
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: disabled ? 'var(--color-neutral-400, #D1D5DB)' : 'var(--color-neutral-1000, #111827)',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
        </Label>
      )}
      <div className="flex items-center gap-2">
        {showBadge && (
          <span
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: 500,
              background: 'var(--color-neutral-200, #F3F4F6)',
              color: 'var(--color-neutral-600, #6B7280)',
            }}
          >
            {showBadge}
          </span>
        )}
        <SwitchPrimitive.Root
          id={label ? `switch-${label}` : undefined}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-neutral-300"
          )}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
              "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            )}
          />
        </SwitchPrimitive.Root>
      </div>
    </div>
  )
}
