import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/stores/cartStore'
import { CreditCard, Wallet, Truck, ChevronRight } from 'lucide-react'
import { orderService } from '@/api/services/order.service'
import toast from 'react-hot-toast'
import SEOHead from '@/components/SEOHead'

export default function CheckoutPage() {
  const { items, total, clearCart, subtotal } = useCartStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await orderService.create({
        items: items.map(i => ({ product_id: parseInt(i.product_id), quantity: i.quantity })),
        shipping_address: shippingData,
        payment_method: 'UPI/Bank Transfer'
      })
      toast.success('Pranam! Your sacred order has been placed.')
      clearCart()
      navigate('/dashboard/orders')
    } catch (err: any) {
      // Error handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#fdf7ed] min-h-screen py-20 section">
      <SEOHead title="Secure Checkout" description="Complete your purchase securely. Provide your shipping details to receive your energized Vedic products." />
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-start">

          {/* Shipping Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            <div style={{ marginBottom: '3rem' }}>
              <h1 className="font-serif text-[var(--color-earth)] mb-6" style={{ fontSize: '3.5rem' }}>Checkout</h1>
              <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)' }} />
            </div>

            <div className="card p-10 bg-white border-2 border-[var(--color-gold)]/10 shadow-3xl">
              <h2 className="font-serif text-[var(--color-earth)] mb-10 flex items-center gap-4" style={{ fontSize: '1.75rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--color-bg-secondary)', color: 'var(--color-saffron)',
                  border: '1px solid var(--color-gold)/20'
                }}>
                  <Truck size={24} />
                </div>
                Shipping Details
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Shipping Address</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your complete address with landmark"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">City</label>
                  <input
                    required
                    type="text"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">State / Region</label>
                  <input
                    required
                    type="text"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Pincode</label>
                  <input
                    required
                    type="text"
                    value={shippingData.pincode}
                    onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-[#faf2e2]/30 focus:bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="card p-10 bg-white border-2 border-[var(--color-gold)]/10 shadow-3xl">
              <h2 className="font-serif text-[var(--color-earth)] mb-8 flex items-center gap-4" style={{ fontSize: '1.75rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--color-bg-secondary)', color: 'var(--color-saffron)',
                  border: '1px solid var(--color-gold)/20'
                }}>
                  <CreditCard size={24} />
                </div>
                Payment Method
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 border-2 border-[var(--color-saffron)]/20 rounded-2xl bg-[var(--color-saffron)]/5 text-[var(--color-earth)] font-bold">
                  <Wallet size={24} className="text-[var(--color-saffron)]" />
                  <span className="text-lg">UPI / Bank Transfer / Net Banking</span>
                </div>
                <div className="p-6 bg-[#faf2e2]/50 rounded-2xl border border-[var(--color-gold)]/10">
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans italic opacity-80">
                    "Pranam! To maintain the sanctity of our divine items and ensure secure processing, we utilize direct bank transfers and verified UPI payments. Details will be provided upon clicking 'Place Your Order' below."
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn-primary w-full py-6 text-sm font-bold uppercase tracking-widest justify-center shadow-3xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Consulting Stars...
                </div>
              ) : 'Confirm Sacred Order'}
            </button>
          </form>

          {/* Sidebar Order Summary */}
          <aside className="sticky top-24">
            <div className="card p-10 bg-white border-2 border-[var(--color-gold)]/10 shadow-3xl">
              <h3 className="font-serif text-[var(--color-earth)] mb-10" style={{ fontSize: '2rem' }}>Your Journey</h3>

              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.product_id} className="flex gap-6 items-center mb-6 pb-6 border-b border-[var(--color-gold)]/10 last:border-0 last:mb-0 last:pb-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#faf2e2] flex-shrink-0 border border-[var(--color-gold)]/10 p-1">
                      <img src={item.product?.thumbnail_url || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=200'} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-[var(--color-earth)] truncate text-lg mb-1">{item.product?.name}</p>
                      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-gold)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 py-8 border-t-2 border-[var(--color-gold)]/10">
                <div className="flex justify-between items-center text-[var(--color-text-secondary)] font-sans">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Shipping</span>
                  <span className="text-forest font-bold bg-forest/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest">Complimentary</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-[var(--color-earth)] text-2xl">Total</span>
                  <span className="text-4xl font-bold text-[var(--color-saffron)]">₹{total().toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-gold)]/10 text-center">
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest leading-relaxed">
                  SSL Secured & Encrypted Transaction
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
