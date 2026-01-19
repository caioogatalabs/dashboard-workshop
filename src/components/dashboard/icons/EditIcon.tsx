interface EditIconProps {
  style?: React.CSSProperties
}

export function EditIcon({ style }: EditIconProps = {}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M11.6667 3.33333L16.6667 8.33333M2.5 17.5H5.83333L15.4167 7.91667C15.7482 7.58514 15.9167 7.13514 15.9167 6.66667C15.9167 6.19819 15.7482 5.74819 15.4167 5.41667L14.5833 4.58333C13.9203 3.92029 12.7464 3.92029 12.0833 4.58333L2.5 14.1667V17.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
