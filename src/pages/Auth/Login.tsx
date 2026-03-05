import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/api/services/auth.service'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const loginProgress = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await authService.login({ email, password })
      loginProgress(response.user, response.access_token, response.access_token)
      toast.success('Pranam! Welcome back.')
      navigate('/dashboard')
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf7ed] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 sm:p-10 bg-white shadow-2xl"
        >
          <div className="text-center mb-10">
            <Link to="/" className="inline-block w-16 h-16 bg-saffron rounded-2xl mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-saffron/20 group">
              <span className="group-hover:scale-110 transition-transform">मं</span>
            </Link>
            <h1 className="text-3xl font-serif text-earth mb-2">Welcome Back</h1>
            <p className="text-sm text-secondary">Sign in to access your sacred dashboard.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-earth mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-earth">Password</label>
                <Link to="/forgot-password" hidden className="text-xs font-bold text-saffron hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold justify-center mt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={18} className="ml-2" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-muted">New Here?</span></div>
          </div>

          <Link
            to="/register"
            className="btn-gold w-full py-3 text-base justify-center"
          >
            Create Free Account
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
