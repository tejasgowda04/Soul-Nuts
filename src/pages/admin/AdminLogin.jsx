import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogoEmblem } from '../../components/Icons'

export default function AdminLogin() {
  const { user, isAdmin, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background pouch gradient circle */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,161,91,0.15) 0%, rgba(31,59,44,0.05) 70%, transparent 100%)',
          top: '-10%',
          right: '-10%',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--paper)',
          borderRadius: 24,
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)',
          padding: '40px 36px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-block', marginBottom: 12 }}>
            <LogoEmblem style={{ width: 54, height: 54 }} />
          </div>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10.5,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--rust)',
              display: 'block',
              fontWeight: 700,
              marginBottom: 4
            }}
          >
            MANDYA, KARNATAKA
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: 'var(--pine)' }}>Admin Sign In</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>
            Manage Soul Nuts product catalog, pricing, and orders.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: '#fdf2f2',
              border: '1px solid #f8b4b4',
              color: '#9b1c1c',
              fontSize: 13,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                fontFamily: "'Space Mono', monospace",
                marginBottom: 8,
                color: 'var(--ink)'
              }}
            >
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@soulnuts.in"
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: 12,
                border: '1.5px solid var(--line)',
                background: '#fff',
                fontSize: 14.5,
                color: 'var(--ink)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                fontFamily: "'Space Mono', monospace",
                marginBottom: 8,
                color: 'var(--ink)'
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: 12,
                border: '1.5px solid var(--line)',
                background: '#fff',
                fontSize: 14.5,
                color: 'var(--ink)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '15px',
              fontSize: 15,
              marginTop: 8,
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px dashed var(--line)',
            fontSize: 12,
            color: 'var(--ink-soft)',
            textAlign: 'center'
          }}
        >
          <span>Quick Demo Access: </span>
          <code style={{ background: 'var(--ivory)', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
            admin@soulnuts.in
          </code>
        </div>
      </div>
    </div>
  )
}
