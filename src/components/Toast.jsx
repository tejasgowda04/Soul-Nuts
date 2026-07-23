import { CheckIcon } from './Icons'

export default function Toast({ message, isVisible }) {
  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      <span style={{ color: 'var(--sage)', display: 'inline-flex' }}>
        <CheckIcon />
      </span>
      <span>{message}</span>
    </div>
  )
}
