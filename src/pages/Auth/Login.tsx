/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import SEOHead from '@/components/SEOHead'
import { useAuthStore } from '@/stores/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Email is required')
      toast.error('Please enter your email address.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address')
      toast.error('Please enter a valid email address.')
      return
    }

    if (!password.trim()) {
      setError('Password is required')
      toast.error('Please enter your password.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await login(normalizedEmail, password)
      toast.success('Pranam! Welcome back.')
      navigate(data.user?.is_admin ? '/admin' : '/dashboard', { replace: true })
    } catch (err: any) {
      const message = err?.response?.data?.detail || 'Invalid email or password'
      setError(message)
      toast.error(message)
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
      <SEOHead title="Login to your Account" description="Access your Vedic astrology dashboard, view orders, and manage your personal consultation sessions." />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card" style={{
          width: '100%',
          maxWidth: '480px',
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
          }}>Welcome Back</h1>
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginTop: '0.25rem'
          }}>Sign in to your ManuAstro account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-accent)',
              letterSpacing: '0.05em'
            }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '0.05em'
              }}>Password</label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p style={{
              color: '#b42318',
              fontSize: '0.875rem',
              marginTop: '-0.25rem'
            }}>
              {error}
            </p>
          )}

          <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.5rem'
        }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-saffron)' }}>Create one free</Link>
        </p>

      </motion.div>
    </div>
  )
}
