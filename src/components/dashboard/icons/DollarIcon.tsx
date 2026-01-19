interface DollarIconProps {
  style?: React.CSSProperties
}

export function DollarIcon({ style }: DollarIconProps = {}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M10 1.66667V18.3333M14.1667 5.83333H8.33333C7.41286 5.83333 6.66667 6.57952 6.66667 7.5C6.66667 8.42048 7.41286 9.16667 8.33333 9.16667H11.6667C12.5871 9.16667 13.3333 9.91286 13.3333 10.8333C13.3333 11.7538 12.5871 12.5 11.6667 12.5H5.83333M14.1667 14.1667H5.83333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
