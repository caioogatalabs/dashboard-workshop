// Logo XP
export const XPLogo = () => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2042_10759" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="17">
      <path d="M18 0H0V16.2431H18V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0_2042_10759)">
      <path
        d="M13.1105 12.547H15.1492C15.9116 12.547 16.442 12.1989 16.442 11.4862C16.442 10.7735 15.9116 10.4254 15.1492 10.4254H13.1105V12.547ZM13.1105 16.2431H15.8287C17.2707 16.2431 18.0166 15.4972 18.0166 14.0552V12.547H17.9669C17.5525 13.8067 16.4752 14.1878 15.1989 14.1878H13.1768C13.1271 14.1878 13.1105 14.2044 13.1105 14.2541V16.2431ZM9.28176 11.4862L11.3702 13.5083V9.4641L9.28176 11.4862ZM2.18785 16.2431H11.3702V15.779C11.3702 14.9669 11.6519 14.5028 12.2983 14.2541V14.2044H9.7293C9.5967 14.2044 9.54696 14.1878 9.44754 14.0884L8.10498 12.6961L6.71268 14.105C6.64638 14.1713 6.5967 14.2044 6.4641 14.2044H4.39226C4.27624 14.2044 4.27624 14.1381 4.34254 14.0718L6.9945 11.5028L4.29282 8.88396C4.22652 8.81766 4.24309 8.75136 4.35911 8.75136H6.44754C6.56352 8.75136 6.61326 8.76798 6.67956 8.85084L8.1381 10.3094L9.51384 8.85084C9.58014 8.78454 9.62982 8.75136 9.7293 8.75136H15.1823C16.442 8.75136 17.5525 9.16572 17.9669 10.4254H18.0166V2.18785C18.0166 0.745854 17.2707 0 15.8287 0H2.18785C0.745854 0 0 0.745854 0 2.18785V14.0718C0 15.4972 0.745854 16.2431 2.18785 16.2431Z"
        fill="currentColor"
      />
    </g>
  </svg>
)

// Logo Nubank (simplificado - "nu" em roxo)
export const NubankLogo = () => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      backgroundColor: '#903CF5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: 700,
    }}
  >
    nu
  </div>
)

// Logo Itaú (simplificado - "IT" em laranja)
export const ItauLogo = () => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      backgroundColor: '#EC7000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: 700,
    }}
  >
    IT
  </div>
)

// Logo Bradesco (simplificado - "BR" em vermelho)
export const BradescoLogo = () => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      backgroundColor: '#CC092F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: 700,
    }}
  >
    BR
  </div>
)

// Logo C6 Bank (simplificado - "C6" em preto)
export const C6Logo = () => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: 700,
    }}
  >
    C6
  </div>
)

// Função helper para retornar o logo correto baseado no nome do banco
export const getBankLogo = (bankName?: string) => {
  if (!bankName) return null

  const bankNameLower = bankName.toLowerCase()

  if (bankNameLower.includes('xp')) {
    return <XPLogo />
  }
  if (bankNameLower.includes('nubank') || bankNameLower.includes('nu')) {
    return <NubankLogo />
  }
  if (bankNameLower.includes('itau') || bankNameLower.includes('itaú')) {
    return <ItauLogo />
  }
  if (bankNameLower.includes('bradesco')) {
    return <BradescoLogo />
  }
  if (bankNameLower.includes('c6')) {
    return <C6Logo />
  }

  // Fallback: iniciais do banco
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        backgroundColor: 'var(--color-neutral-1000, #111827)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '10px',
        fontWeight: 700,
      }}
    >
      {bankName.substring(0, 2).toUpperCase()}
    </div>
  )
}
