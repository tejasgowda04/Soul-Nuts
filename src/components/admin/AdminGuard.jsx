import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminGuard() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ivory)',
          gap: 16
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            border: '3px solid var(--line)',
            borderTopColor: 'var(--rust)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--ink-soft)' }}>
          Authenticating Soul Nuts Admin...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
