interface ArrowUpRightIconProps {
  style?: React.CSSProperties
}

export function ArrowUpRightIcon({ style }: ArrowUpRightIconProps = {}) {
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
        d="M4.66667 11.3333L11.3333 4.66667M11.3333 4.66667V11.3333M11.3333 4.66667H4.66667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
