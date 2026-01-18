interface ArrowUpIconProps {
  style?: React.CSSProperties
}

export function ArrowUpIcon({ style }: ArrowUpIconProps = {}) {
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
        d="M8 4L8 12M8 4L4 8M8 4L12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
