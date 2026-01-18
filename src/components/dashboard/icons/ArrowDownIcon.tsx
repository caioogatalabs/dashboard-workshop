interface ArrowDownIconProps {
  style?: React.CSSProperties
}

export function ArrowDownIcon({ style }: ArrowDownIconProps = {}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M8 12L8 4M8 12L4 8M8 12L12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
