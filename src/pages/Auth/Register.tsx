import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, CheckCircle } from 'lucide-react'
import { authService } from '@/api/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import toast from 'react-hot-toast'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!")
    }
    setLoading(true)
    try {
      const response = await authService.register(formData)
      login(response.user, response.access_token, response.access_token)
      toast.success('Welcome to the ManuAstro Family!')
      navigate('/dashboard')
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card" style={{
          width: '100%',
          maxWidth: '560px',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '2px solid var(--color-gold)',
            background: 'var(--color-bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.8rem',
            color: 'var(--color-saffron)'
          }}>ॐ</div>
          <h1 className="font-serif" style={{
            fontSize: '2rem',
            color: 'var(--color-earth)'
          }}>Create Account</h1>
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginTop: '0.25rem'
          }}>Join the ManuAstro community for Vedic insights</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.05em'
              }}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                placeholder="John Doe"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.05em'
              }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.05em'
              }}>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.05em'
              }}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-accent)',
              letterSpacing: '0.05em'
            }}>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <input type="checkbox" required style={{
              marginTop: '3px',
              accentColor: 'var(--color-saffron)',
              width: '16px',
              height: '16px'
            }} />
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5
            }}>
              I agree to the <Link to="/terms" style={{ color: 'var(--color-saffron)' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--color-saffron)' }}>Privacy Policy</Link>
            </span>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.5rem'
        }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-saffron)' }}>Sign In</Link>
        </p>

      </motion.div>
    </div>
  )
}
