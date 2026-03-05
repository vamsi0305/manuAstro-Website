import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import api from '@/api/axios'

export default function CartPage() {
  const [cartData, setCartData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadCart = async () => {
      try {
        const { data } = await api.get('/cart')
        setCartData(data)
      } catch (err) {
        console.error('Cart load failed', err)
      } finally {
        setLoading(false)
      }
    }
    loadCart()
  }, [])

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      await api.put(`/cart/items/${itemId}`, { quantity })
      const { data } = await api.get('/cart')
      setCartData(data)
    } catch (err) {
      console.error('Update failed', err)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    try {
      await api.delete(`/cart/items/${itemId}`)
      const { data } = await api.get('/cart')
      setCartData(data)
    } catch (err) {
      console.error('Remove failed', err)
    }
  }

  if (loading) return (
    <div className="min-h-[60vh] flex flex-center flex-col text-center bg-[#fdf7ed] py-20">
      <h2 className="text-2xl font-serif text-earth mb-4">Loading Sacred Cart...</h2>
    </div>
  )

  if (cartData.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-center flex-col text-center bg-[#fdf7ed] py-20">
        <div className="w-24 h-24 bg-[#faf2e2] rounded-full flex items-center justify-center text-gold mx-auto mb-8">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-serif text-earth mb-4">Your Cart is Empty</h2>
        <p className="text-muted mb-10 max-w-sm mx-auto">It looks like you haven't added any sacred items to your cart yet.</p>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="bg-[#fdf7ed] min-h-screen section">
      <SEOHead title="Your Shopping Cart" description="Review your selected sacred items and proceed to secure checkout for your spiritual journey." />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Shopping Cart</h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Cart Items */}
          <div className="space-y-6">
            <div className="card overflow-hidden border-0 shadow-2xl" style={{ padding: 0 }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#faf2e2] text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-gold)]/10">
                    <tr>
                      <th className="px-8 py-5">Product</th>
                      <th className="px-8 py-5">Price</th>
                      <th className="px-8 py-5">Quantity</th>
                      <th className="px-8 py-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-gold)]/10">
                    {cartData.items.map((item: any) => (
                      <tr key={item.id} className="group hover:bg-[var(--color-bg-secondary)]/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#faf2e2] flex-shrink-0 border border-[var(--color-gold)]/10 p-1">
                              <img src={item.product?.image || 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686'} className="w-full h-full object-cover rounded-xl" />
                            </div>
                            <div>
                              <Link to={`/shop/${item.product?.slug}`} className="font-serif font-bold text-[var(--color-earth)] hover:text-[var(--color-saffron)] transition-colors block mb-2 text-lg" style={{ textDecoration: 'none' }}>{item.product?.name}</Link>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-[10px] font-bold text-[var(--color-saffron)] uppercase flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} /> Remove Item
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-[var(--color-earth)] font-bold">₹{item.product?.price?.toLocaleString()}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center bg-[#faf2e2] rounded-xl w-fit p-1 border border-[var(--color-gold)]/10">
                            <button onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] transition-colors"><Minus size={14} /></button>
                            <span className="w-10 text-center text-sm font-bold text-[var(--color-earth)]">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] transition-colors"><Plus size={14} /></button>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right text-[var(--color-earth)] font-bold text-lg">₹{(item.product?.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-saffron)] uppercase tracking-widest hover:translate-x-1 transition-transform" style={{ textDecoration: 'none' }}>
              <ArrowRight size={16} className="rotate-180" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary - Fix 7 */}
          <aside className="card p-8 sticky top-24 bg-white border-2 border-[var(--color-gold)]/10 shadow-3xl">
            <h3 className="font-serif text-[var(--color-earth)] mb-8" style={{ fontSize: '1.75rem' }}>Order Summary</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[var(--color-text-secondary)] font-sans">
                <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">₹{cartData.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[var(--color-saffron)] font-sans">
                <span className="text-xs font-bold uppercase tracking-widest">Discount</span>
                <span className="font-bold">-₹0</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)] font-sans items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Shipping</span>
                <span className="text-[9px] font-bold uppercase text-forest bg-forest/10 px-2.5 py-1 rounded-full border border-forest/10">Free Shipping</span>
              </div>
              <div className="border-t border-[var(--color-gold)]/10 pt-5 mt-5 flex justify-between items-baseline">
                <span className="font-serif text-[var(--color-earth)] text-xl">Total</span>
                <span className="font-bold text-[var(--color-gold)] text-3xl">₹{cartData.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-8 p-4 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-gold)]/10">
              <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Apply Coupon</p>
              <div className="flex gap-2">
                <input type="text" placeholder="SACRED10" className="flex-1 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl border border-[var(--color-gold)]/10 focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none bg-white transition-all shadow-sm" />
                <button className="bg-[var(--color-earth)] text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-saffron)] transition-all shadow-md">Apply</button>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full justify-center py-5 text-sm font-bold uppercase tracking-widest shadow-xl" style={{ textDecoration: 'none' }}>
              Proceed to Checkout <ArrowRight size={16} className="ml-2" />
            </Link>

            <div className="mt-8 flex justify-center gap-6 grayscale opacity-30">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
