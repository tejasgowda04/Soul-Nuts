// Shared SVG components & Brand Logo used across the app

export function LogoEmblem({ className = '', style = {}, lightMode = false }) {
  return (
    <div
      className={className}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: '#fff',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: lightMode ? '1px solid var(--gold)' : '1px solid var(--line)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        ...style
      }}
    >
      <img
        src="/logo.png"
        alt="Sol Nuts Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '50%'
        }}
      />
    </div>
  )
}

export function CartIcon({ width = 20, height = 20 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" />
      <circle cx="9" cy="21" r="1.4" />
      <circle cx="18" cy="21" r="1.4" />
    </svg>
  )
}

export function ArrowRight({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export function WhatsAppIcon({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5C8.3 21.5 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.3 1 1-3.2-.2-.3C3.5 14.6 3 13.3 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/>
    </svg>
  )
}

export function StarIcon({ width = 14, height = 14 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.3L22 9l-5 5 1.3 7L12 17.8 5.7 21 7 14 2 9l7.1-.7z"/>
    </svg>
  )
}

export function CloseIcon({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}

export function CheckIcon({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

export function InstagramIcon({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export function FacebookIcon({ width = 15, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}
