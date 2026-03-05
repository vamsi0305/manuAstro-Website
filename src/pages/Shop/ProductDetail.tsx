import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShieldCheck, Truck, RefreshCcw, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '@/api/axios'
import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'
import { Helmet } from 'react-helmet-async'

import { useQuery } from '@tanstack/react-query'
import { productService } from '@/api/services/product.service'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getBySlug(slug!),
    enabled: !!slug
  })

  useEffect(() => {
    if (product && product.category?.name && !['Gemstones', 'Rudraksha', 'Yantra'].includes(product.category.name)) {
      api.get(`/wishlist/check/${product.id}`)
        .then(({ data }) => setIsWishlisted(data.is_wishlisted))
        .catch(() => { })
    }
  }, [product])

  const handleAddToCart = async () => {
    if (!product) return
    setAdding(true)
    try {
      await api.post('/cart/items', { product_id: product.id, quantity: qty })
    } catch (err: any) {
      if (err.response?.status === 401) navigate('/login')
    } finally {
      setAdding(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (!product) return
    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${product.id}`)
        setIsWishlisted(false)
      } else {
        await api.post('/wishlist', { product_id: product.id })
        setIsWishlisted(true)
      }
    } catch (err: any) {
      if (err.response?.status === 401) navigate('/login')
    }
  }

  if (isLoading) return (
    <div className="section min-h-screen flex items-center justify-center">
      <div className="text-xl font-serif text-earth animate-pulse">Consulting the Stars...</div>
    </div>
  )

  if (error || !product) return (
    <div className="section min-h-screen flex items-center justify-center">
      <div className="text-xl font-serif text-saffron">Product not found in our sacred records.</div>
    </div>
  )

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title={product.name} description={product.description} />
      {product && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.thumbnail_url,
              "brand": { "@type": "Brand", "name": "ManuAstro" },
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "ManuAstro" }
              }
            })}
          </script>
        </Helmet>
      )}
      {/* Breadcrumbs */}
      <nav className="bg-[#faf2e2] py-5 border-b border-[var(--color-gold)]/10">
        <div className="container flex items-center gap-2 text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase">
          <Link to="/" className="hover:text-[var(--color-saffron)] transition-colors">Home</Link>
          <ChevronRight size={12} className="opacity-50" />
          <Link to="/shop" className="hover:text-[var(--color-saffron)] transition-colors">Shop</Link>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-[var(--color-earth)]">{slug}</span>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: Gallery */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[520px] card overflow-hidden border-0 shadow-2xl relative group"
                style={{ padding: 0 }}
              >
                <img src={product.thumbnail_url || product.images[activeImg]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="badge-saffron">LAB CERTIFIED</span>
                </div>
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {(product.images || []).map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-24 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${activeImg === i ? 'border-[var(--color-saffron)] p-1' : 'border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30'}`}
                  >
                    <img src={img} className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge-gold">PREMIUM SELECTION</span>
              </div>
              <h1 className="font-serif text-[var(--color-earth)] mb-4" style={{ fontSize: '3rem', lineHeight: 1.2 }}>{product.name}</h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--color-gold)]/10">
                <div className="stars flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'} />)}
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">({product.reviews_count || 48} Verified Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-[var(--color-saffron)]">₹{product.price.toLocaleString('en-IN')}</span>
                {product.compare_price && (
                  <span className="text-lg text-[var(--color-text-muted)] line-through opacity-50">₹{product.compare_price.toLocaleString('en-IN')}</span>
                )}
                {product.compare_price && (
                  <span className="badge-gold ml-2">SAVE {Math.round((1 - product.price / product.compare_price) * 100)}%</span>
                )}
              </div>

              <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed mb-10 text-lg opacity-90">{product.description}</p>

              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center bg-white border border-[var(--color-gold)]/20 rounded-2xl p-1.5 shadow-sm">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] text-xl transition-colors">-</button>
                  <span className="w-12 text-center font-bold text-[var(--color-earth)]">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] text-xl transition-colors">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="btn-primary flex-1 py-4 text-sm font-bold uppercase tracking-widest shadow-xl"
                >
                  <ShoppingCart size={18} className="mr-2" /> {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-14 h-14 rounded-2xl bg-white border transition-all flex items-center justify-center shadow-sm ${isWishlisted ? 'border-[var(--color-saffron)] text-[var(--color-saffron)]' : 'border-[var(--color-gold)]/20 text-[var(--color-text-muted)]'}`}>
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 p-8 bg-[#faf2e2] rounded-3xl border border-[var(--color-gold)]/10">
                <div className="text-center space-y-3">
                  <ShieldCheck className="mx-auto text-[var(--color-saffron)]" size={28} />
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest">Authentic</p>
                </div>
                <div className="text-center space-y-3">
                  <Truck className="mx-auto text-[var(--color-saffron)]" size={28} />
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest">Free Shipping</p>
                </div>
                <div className="text-center space-y-3">
                  <RefreshCcw className="mx-auto text-[var(--color-saffron)]" size={28} />
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest">7 Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider-ornamental my-24 opacity-20">✿</div>

          {/* Related Products - Fix 10 */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                Related Sacred Items
              </h2>
              <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-20">
              {[1, 2, 4, 5].map(id => (
                <ProductCard key={id} product={{ id: String(id), name: 'Related Product ' + id, slug: 'related-' + id, price: 1000 + (id * 500), compare_price: 2000, rating: 5, thumbnail_url: 'https://manuastro.com/cdn/shop/files/16_FACE_1.jpg?v=1770990686' } as any} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
