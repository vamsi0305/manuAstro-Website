/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

import SEOHead from '@/components/SEOHead'
import api from '@/api/axios'
import { FALLBACK_PRODUCT_IMAGE, resolveAssetUrl } from '@/utils/assets'

interface CartItemShape {
  id: number
  product_id: number
  quantity: number
  subtotal: number
  product: {
    id: number
    name: string
    slug: string
    price: number
    compare_price?: number
    image?: string
    image_url?: string
    thumbnail_url?: string
    category?: { name?: string }
  }
}

export default function CartPage() {
  const navigate = useNavigate()
  const [cartData, setCartData] = useState<{ items: CartItemShape[]; total: number }>({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  const loadCart = useCallback(async () => {
    try {
      const { data } = await api.get('/cart')
      setCartData(data)
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please sign in to view your cart.')
        navigate('/login')
        return
      }
      toast.error(err.response?.data?.detail || 'Unable to load your cart right now.')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    void loadCart()
  }, [loadCart])

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) {
      toast.error('Quantity must be at least 1.')
      return
    }

    if (quantity > 99) {
      toast.error('You can add up to 99 units of one item at a time.')
      return
    }

    try {
      await api.put(`/cart/items/${itemId}`, { quantity })
      await loadCart()
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please sign in to update your cart.')
        navigate('/login')
        return
      }
      toast.error(err.response?.data?.detail || 'Unable to update cart quantity right now.')
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    try {
      await api.delete(`/cart/items/${itemId}`)
      await loadCart()
      toast.success('Item removed from cart')
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please sign in to update your cart.')
        navigate('/login')
        return
      }
      toast.error(err.response?.data?.detail || 'Unable to remove this item right now.')
    }
  }

  if (loading) {
    return (
      <div className="bg-[#fdf7ed] min-h-screen section">
        <div className="container">
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            Loading your cart...
          </div>
        </div>
      </div>
    )
  }

  if (cartData.items.length === 0) {
    return (
      <div className="bg-[#fdf7ed] min-h-screen section">
        <SEOHead title="Your Shopping Cart" description="Review your selected sacred items and proceed to secure checkout for your spiritual journey." />
        <div className="container">
          <div className="card" style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--color-gold)',
              background: 'rgba(250,242,226,0.75)'
            }}>
              <ShoppingBag size={38} color="var(--color-saffron)" />
            </div>
            <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '380px' }}>
              Add your selected sacred items here and continue to checkout when you are ready.
            </p>
            <Link to="/shop" className="btn-primary" style={{ textDecoration: 'none' }}>Start Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#fdf7ed] min-h-screen">
      <SEOHead title="Your Shopping Cart" description="Review your selected sacred items and proceed to secure checkout for your spiritual journey." />

      <section className="section" style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>YOUR ORDER</span>
            <h1 className="font-serif" style={{ fontSize: '3rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>Shopping Cart</h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--color-text-muted)' }}>
              Review your items, adjust quantities, and continue to checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid lg:grid-cols-[minmax(0,1.6fr)_380px]" style={{ gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cartData.items.map((item) => {
                const product = item.product
                const imageSource =
                  resolveAssetUrl(product.image_url) ||
                  resolveAssetUrl(product.thumbnail_url) ||
                  resolveAssetUrl(product.image) ||
                  FALLBACK_PRODUCT_IMAGE

                return (
                  <article key={item.id} className="card" style={{ padding: '1.25rem', background: 'white' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '1.25rem', alignItems: 'center' }}>
                      <Link to={`/shop/${product.slug}`} style={{ display: 'block' }}>
                        <img
                          src={imageSource}
                          alt={product.name}
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '1rem', background: 'rgba(250,242,226,0.75)' }}
                        />
                      </Link>

                      <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          {product.category?.name || 'Sacred Item'}
                        </p>
                        <Link to={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
                          <h3 className="font-serif" style={{ fontSize: '1.55rem', color: 'var(--color-earth)', marginBottom: '0.65rem' }}>
                            {product.name}
                          </h3>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--color-saffron)', fontWeight: 700, fontSize: '1.25rem' }}>
                            {`\u20B9${product.price.toLocaleString('en-IN')}`}
                          </span>
                          {product.compare_price && product.compare_price > product.price && (
                            <span style={{ color: 'var(--color-text-muted)', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                              {`\u20B9${product.compare_price.toLocaleString('en-IN')}`}
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(250,242,226,0.9)', border: '1px solid rgba(201,151,42,0.12)', borderRadius: '999px', padding: '0.25rem' }}>
                            <button onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--color-saffron)', cursor: 'pointer' }}>
                              <Minus size={16} />
                            </button>
                            <span style={{ minWidth: '2.5rem', textAlign: 'center', fontWeight: 700, color: 'var(--color-earth)' }}>{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--color-saffron)', cursor: 'pointer' }}>
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: 'var(--color-saffron)',
                              fontSize: '0.8rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.45rem' }}>Subtotal</p>
                        <div className="font-serif" style={{ fontSize: '1.9rem', color: 'var(--color-earth)' }}>
                          {`\u20B9${item.subtotal.toLocaleString('en-IN')}`}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}

              <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-saffron)', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem' }}>
                <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
            </div>

            <aside className="card" style={{ padding: '1.75rem', background: 'white', position: 'sticky', top: '6.5rem' }}>
              <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)', marginBottom: '1.5rem' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem', fontWeight: 700 }}>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>{`\u20B9${cartData.total.toLocaleString('en-IN')}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-saffron)' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem', fontWeight: 700 }}>Discount</span>
                  <span style={{ fontWeight: 700 }}>{`\u2212\u20B90`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem', fontWeight: 700 }}>Shipping</span>
                  <span style={{ padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'rgba(46,125,50,0.08)', color: '#2e7d32', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Free Shipping
                  </span>
                </div>
                <div style={{ borderTop: '1px solid rgba(201,151,42,0.12)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                  <span className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--color-earth)' }}>Total</span>
                  <span style={{ fontSize: '2.6rem', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>
                    {`\u20B9${cartData.total.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(201,151,42,0.12)', background: 'rgba(250,242,226,0.55)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-earth)', marginBottom: '0.75rem' }}>
                  Apply Coupon
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="SACRED10"
                    style={{
                      flex: 1,
                      borderRadius: '0.85rem',
                      border: '1px solid rgba(201,151,42,0.12)',
                      padding: '0.8rem 1rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  />
                  <button className="btn-outline" style={{ paddingInline: '1rem' }}>Apply</button>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', paddingBlock: '1rem' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
