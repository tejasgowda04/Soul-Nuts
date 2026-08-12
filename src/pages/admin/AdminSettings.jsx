import { useState } from 'react'
import { isSupabaseConfigured } from '../../lib/supabase'
import { isCloudinaryConfigured } from '../../lib/cloudinary'
import { seedInitialDatabase } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
  const { user } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')

  const handleSeedDatabase = async () => {
    if (!window.confirm('Reset/seed initial database with default Soul Nuts products and categories?')) return
    setSeeding(true)
    setSeedMsg('')
    try {
      const res = await seedInitialDatabase()
      setSeedMsg(res.message)
    } catch (e) {
      setSeedMsg(`Error: ${e.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 28, color: 'var(--pine)', fontWeight: 600 }}>Store &amp; System Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
          Environment diagnostics, database seeder, and admin configuration.
        </p>
      </div>

      {/* Admin Profile Box */}
      <div
        style={{
          background: 'var(--paper)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          padding: 24
        }}
      >
        <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 14 }}>Admin Profile</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
          <div>
            <strong>Email:</strong> {user?.email || 'admin@soulnuts.in'}
          </div>
          <div>
            <strong>Brand:</strong> Soul Nuts — Dry Fruits &amp; Healthy Snacks
          </div>
          <div>
            <strong>Origin:</strong> Mandya, Karnataka, India 🇮🇳
          </div>
        </div>
      </div>

      {/* Infrastructure Diagnostics */}
      <div
        style={{
          background: 'var(--paper)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          padding: 24
        }}
      >
        <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 14 }}>Infrastructure Integration Status</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Supabase Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: 'var(--ivory)', borderRadius: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Supabase Database &amp; Auth</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                PostgreSQL database connection for products, categories, orders &amp; admin authentication.
              </div>
            </div>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                background: isSupabaseConfigured ? '#e6fffa' : 'rgba(198,161,91,0.2)',
                color: isSupabaseConfigured ? '#234e52' : 'var(--pine)'
              }}
            >
              {isSupabaseConfigured ? '✓ Connected' : '● Local Fallback Active'}
            </span>
          </div>

          {/* Cloudinary Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: 'var(--ivory)', borderRadius: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Cloudinary CDN Storage</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                Unsigned photo upload preset for product photography.
              </div>
            </div>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                background: isCloudinaryConfigured ? '#e6fffa' : 'rgba(198,161,91,0.2)',
                color: isCloudinaryConfigured ? '#234e52' : 'var(--pine)'
              }}
            >
              {isCloudinaryConfigured ? '✓ Connected' : '● Local Fallback Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Database Seeder Tool */}
      <div
        style={{
          background: 'var(--paper)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          padding: 24
        }}
      >
        <h3 style={{ fontSize: 18, color: 'var(--pine)', marginBottom: 8 }}>Initial Database Seeder</h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 16 }}>
          Populate your Supabase or local storage database with the 12 Soul Nuts default product items (Almonds, Cashews, Pistachios, Walnuts, Stuffed Dates, Ladoos, etc.) and categories.
        </p>

        {seedMsg && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: '#e6fffa', color: '#234e52', fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
            {seedMsg}
          </div>
        )}

        <button
          onClick={handleSeedDatabase}
          disabled={seeding}
          className="btn btn-outline"
          style={{ padding: '10px 20px', fontSize: 13.5, opacity: seeding ? 0.6 : 1 }}
        >
          {seeding ? 'Seeding Database...' : '🌱 Seed Initial Database'}
        </button>
      </div>
    </div>
  )
}
