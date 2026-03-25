/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import SEOHead from '@/components/SEOHead'
import { authService } from '@/api/services/auth.service'
import { useAuthStore } from '@/stores/authStore'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedName = formData.name.trim()
    const normalizedEmail = formData.email.trim().toLowerCase()
    const normalizedPhone = formData.phone.replace(/\D/g, '')

    if (normalizedName.length < 2) {
      toast.error('Please enter your full name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error('Please enter a valid email address.')
      return
    }

    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      toast.error('Please enter a valid phone number.')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match!')
    }

    setLoading(true)
    try {
      const payload = {
        full_name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
        password: formData.password
      }
      const response = await authService.register(payload)

      useAuthStore.getState().setAuth(response.user, response.access_token, response.refresh_token)
      toast.success('Welcome to the ManuAstro Family!')
      navigate(response.user?.is_admin ? '/admin' : '/dashboard', { replace: true })
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Registration failed. Please try again.'
      toast.error(typeof message === 'string' ? message : 'Invalid registration data')
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
      <SEOHead title="Create your Account" description="Join ManuAstro to get personalized horoscopes, book expert consultations, and purchase authentic sacred items." />
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
          }}>OM</div>
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
                autoComplete="name"
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
                autoComplete="email"
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
                inputMode="tel"
                autoComplete="tel"
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
                placeholder="********"
                autoComplete="new-password"
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
              placeholder="********"
              autoComplete="new-password"
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
