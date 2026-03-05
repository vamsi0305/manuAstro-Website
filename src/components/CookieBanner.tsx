import { useState } from 'react'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
    const [accepted, setAccepted] = useState(
        localStorage.getItem('cookies_accepted') === 'true'
    )

    if (accepted) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: '90%',
            maxWidth: '600px'
        }}>
            <div className="card" style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
            }}>
                <p style={{
                    flex: 1,
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 1.6
                }}>
                    We use cookies to enhance your experience. By continuing, you agree to our{' '}
                    <Link to="/privacy-policy" style={{ color: 'var(--color-saffron)' }}>
                        Privacy Policy
                    </Link>.
                </p>
                <button
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                    onClick={() => {
                        localStorage.setItem('cookies_accepted', 'true')
                        setAccepted(true)
                    }}>
                    Accept
                </button>
            </div>
        </div>
    )
}

export default CookieBanner
