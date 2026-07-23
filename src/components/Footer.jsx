import { Link } from 'react-router-dom'
import { InstagramIcon, WhatsAppIcon, FacebookIcon } from './Icons'

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--pine)', color: 'var(--ivory)', padding: '80px 0 26px' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 60,
          }}
          className="foot-grid"
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <img
                src="/logo.png"
                alt="Soulnuts Logo"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain',
                  borderRadius: '50%',
                  background: 'var(--pine)',
                  border: '1px solid var(--gold)',
                  padding: 3,
                }}
              />
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19, letterSpacing: '.01em', color: 'var(--ivory)' }}>
                Soulnuts
              </span>
            </Link>
            <p style={{ color: 'rgba(248,243,230,.6)', fontSize: 13, lineHeight: 1.7, margin: '16px 0 20px', maxWidth: 280 }}>
              Premium, mindfully sourced dry fruits, nuts, seeds &amp; home-made ladoos. The soulful way to snack.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://instagram.com/soln_uts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="foot-social-link"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/918310440354"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="foot-social-link"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="foot-social-link"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h5 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 18 }}>
              Shop
            </h5>
            <Link to="/shop?cat=nuts" className="foot-link">Dry Fruits &amp; Nuts</Link>
            <Link to="/shop?cat=seeds" className="foot-link">Seeds &amp; Blends</Link>
            <Link to="/ladoos" className="foot-link">Ladoos</Link>
            <Link to="/shop" className="foot-link">30-Day Pouch Pack</Link>
          </div>

          {/* Company Col */}
          <div>
            <h5 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 18 }}>
              Company
            </h5>
            <Link to="/about" className="foot-link">Our Story</Link>
            <Link to="/about" className="foot-link">Sourcing</Link>
            <Link to="/contact" className="foot-link">Contact</Link>
            <a href="https://wa.me/918310440354?text=Hi%20Soulnuts%2C%20I%27d%20like%20to%20track%20my%20order!" target="_blank" rel="noopener noreferrer" className="foot-link">Track Order</a>
          </div>

          {/* Contact Col */}
          <div>
            <h5 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 18 }}>
              Get in Touch
            </h5>
            <p style={{ fontSize: 13.5, color: 'rgba(248,243,230,.72)', marginBottom: 12 }}>
              Mandya &amp; Mysuru, Karnataka
            </p>
            <a href="https://wa.me/918310440354" target="_blank" rel="noopener noreferrer" className="foot-link">
              +91 83104 40354
            </a>
            <a href="https://instagram.com/soln_uts" target="_blank" rel="noopener noreferrer" className="foot-link">
              @soln_uts
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid var(--line-dark)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 11.5, color: 'rgba(248,243,230,.45)' }}>
            © 2026 Soulnuts. All rights reserved.
          </p>
          <p style={{ fontSize: 11.5, color: 'rgba(248,243,230,.45)' }}>
            Crafted with soul for Soulnuts.
          </p>
        </div>
      </div>

      <style>{`
        .foot-link {
          display: block;
          font-size: 13.5px;
          color: rgba(248,243,230,.72);
          margin-bottom: 12px;
          transition: color 0.2s ease;
        }
        .foot-link:hover {
          color: var(--ivory);
        }
        .foot-social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--line-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .foot-social-link:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--pine);
        }
      `}</style>
    </footer>
  )
}
