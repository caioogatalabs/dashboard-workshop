interface TrashIconProps {
  style?: React.CSSProperties
}

export function TrashIcon({ style }: TrashIconProps = {}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M3.33333 5.83333H16.6667M7.5 5.83333V4.16667C7.5 3.70643 7.8731 3.33333 8.33333 3.33333H11.6667C12.1269 3.33333 12.5 3.70643 12.5 4.16667V5.83333M5.83333 5.83333V15.8333C5.83333 16.2936 6.20643 16.6667 6.66667 16.6667H13.3333C13.7936 16.6667 14.1667 16.2936 14.1667 15.8333V5.83333M8.33333 9.16667V13.3333M11.6667 9.16667V13.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
