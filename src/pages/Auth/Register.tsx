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
    <div className="min-h-screen bg-[#fdf7ed] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 sm:p-10 bg-white shadow-2xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-earth mb-2">Create Account</h1>
            <p className="text-sm text-secondary">Join the ManuAstro community for Vedic insights.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/10 bg-[#faf2e2]/30 text-earth placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-saffron transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" className="mt-1 accent-saffron h-4 w-4 rounded" required />
              <p className="text-sm text-secondary leading-tight">
                I agree to the <Link to="/terms" className="text-saffron font-bold hover:underline">Terms</Link> and <Link to="/privacy" className="text-saffron font-bold hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold justify-center mt-2 group"
            >
              {loading ? 'Sacred initiation...' : 'Create Account'}
              <CheckCircle size={18} className="ml-2 group-hover:scale-110 transition-transform" />
            </button>
          </form>

          <div className="text-center mt-10 pt-8 border-t border-gold/10">
            <p className="text-sm text-muted">
              Already have an account?
              <Link to="/login" className="text-saffron font-bold ml-1 hover:underline">Sign In Instead</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
