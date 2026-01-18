interface ArrowDownLeftIconProps {
  style?: React.CSSProperties
}

export function ArrowDownLeftIcon({ style }: ArrowDownLeftIconProps = {}) {
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
        d="M11.3333 4.66667L4.66667 11.3333M4.66667 11.3333H11.3333M4.66667 11.3333V4.66667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
