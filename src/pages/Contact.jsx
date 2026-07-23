import { useState } from 'react'
import { WhatsAppIcon, InstagramIcon } from '../components/Icons'

export default function Contact({ onSubscribe }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubscribe && formState.email) {
      onSubscribe(`Contact form submission from ${formState.name}`)
    }
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <main style={{ padding: '40px 0 90px' }}>
      <div className="wrap">
        <div style={{ maxWidth: 640, marginBottom: 50 }}>
          <span className="eyebrow">Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 16px' }}>
            We'd love to hear from you.
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>
            Whether you have questions about bulk gifting, custom ladoo orders, or routine snacking advice — drop us a message!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 50,
            alignItems: 'start',
          }}
        >
          {/* Quick Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/918310440354"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 20,
                padding: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                transition: 'transform 0.3s ease',
              }}
              className="contact-card"
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--rust)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                <WhatsAppIcon width={22} height={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 18, marginBottom: 4 }}>WhatsApp Us</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13 }}>+91 83104 40354</p>
                <small style={{ color: 'var(--rust)', fontSize: 12, fontWeight: 700 }}>
                  Instant replies · Tap to chat →
                </small>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://instagram.com/soln_uts"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 20,
                padding: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                transition: 'transform 0.3s ease',
              }}
              className="contact-card"
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--pine)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                <InstagramIcon width={22} height={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 18, marginBottom: 4 }}>Instagram</h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: 13 }}>@soln_uts</p>
                <small style={{ color: 'var(--sage)', fontSize: 12, fontWeight: 700 }}>
                  Follow for harvest updates →
                </small>
              </div>
            </a>

            {/* Location Card */}
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <h4 style={{ fontSize: 18, marginBottom: 8 }}>Dispatch Locations</h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
                Mandya &amp; Mysuru, Karnataka, India
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 24,
              padding: 36,
            }}
          >
            <h3 style={{ fontSize: 22, marginBottom: 20 }}>Send a Message</h3>

            {submitted ? (
              <div
                style={{
                  background: 'var(--ivory-2)',
                  padding: 24,
                  borderRadius: 16,
                  textAlign: 'center',
                }}
              >
                <h4 style={{ color: 'var(--pine)', marginBottom: 8 }}>Thank you!</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                  Your message has been received. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 6,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 6,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 6,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </main>
  )
}
