import { FC } from 'react'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  showBadge?: string
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  showBadge,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      {label && (
        <label
          className="text-base text-neutral-1000"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: disabled ? 'var(--color-neutral-400, #D1D5DB)' : 'var(--color-neutral-1000, #111827)',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
        </label>
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
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className="relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
          style={{
            width: '44px',
            height: '24px',
            backgroundColor: disabled
              ? 'var(--color-neutral-200, #F3F4F6)'
              : checked
              ? 'var(--color-brand-600, #D7FE03)'
              : 'var(--color-neutral-300, #E5E7EB)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease-in-out',
          }}
        >
          <span
            className="inline-block rounded-full bg-white shadow-sm transform transition-transform"
            style={{
              width: '20px',
              height: '20px',
              transform: checked ? 'translateX(20px)' : 'translateX(2px)',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </button>
      </div>
    </div>
  )
}
