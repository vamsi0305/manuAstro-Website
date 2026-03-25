/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShieldCheck, Truck, RefreshCcw, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import api from '@/api/axios'
import { productService } from '@/api/services/product.service'
import ProductCard from '@/components/shop/ProductCard'
import SEOHead from '@/components/SEOHead'
import { FALLBACK_PRODUCT_IMAGE } from '@/utils/assets'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [wishlistUpdating, setWishlistUpdating] = useState(false)
  const [heroImageError, setHeroImageError] = useState(false)
  const navigate = useNavigate()
  const hasAuthToken = Boolean(localStorage.getItem('access_token'))

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getBySlug(slug!),
    enabled: !!slug
  })

  const { data: relatedCatalog = [] } = useQuery({
    queryKey: ['related-products', product?.category?.name],
    queryFn: () => productService.getAll({
      category: product?.category?.name || undefined,
    }),
    enabled: Boolean(product?.category?.name),
  })

  useEffect(() => {
    const wishlistProductId = Number(product?.id)

    if (product && hasAuthToken && !isNaN(wishlistProductId) && Number.isInteger(wishlistProductId)) {
      api.get(`/wishlist/check/${product.id}`)
        .then(({ data }) => setIsWishlisted(data.is_wishlisted))
        .catch(() => {})
    } else {
      setIsWishlisted(false)
    }
  }, [hasAuthToken, product])

  useEffect(() => {
    setActiveImg(0)
    setHeroImageError(false)
  }, [product?.id])

  const handleAddToCart = async () => {
    if (!product) return
    const productId = Number(product.id)
    const isPurchasable = !isNaN(productId) && Number.isInteger(productId)
    const availableStock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : null

    if (!isPurchasable) {
      toast.error('This catalog item is not ready for checkout yet.')
      return
    }

    if (!hasAuthToken) {
      toast.error('Please sign in to add items to your cart.')
      navigate('/login')
      return
    }

    if (availableStock !== null && qty > availableStock) {
      setQty(availableStock)
      toast.error(`Only ${availableStock} item${availableStock === 1 ? '' : 's'} currently available.`)
      return
    }

    setAdding(true)
    try {
      await api.post('/cart/items', { product_id: product.id, quantity: qty })
      toast.success(`${product.name} added to cart`)
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please sign in to add items to your cart.')
        navigate('/login')
        return
      }
      toast.error(err.response?.data?.detail || 'Unable to add this item to your cart right now.')
    } finally {
      setAdding(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (!product) return
    const productId = Number(product.id)
    const isPurchasable = !isNaN(productId) && Number.isInteger(productId)

    if (!isPurchasable) {
      toast.error('This catalog item is not ready for wishlist yet.')
      return
    }

    if (!hasAuthToken) {
      toast.error('Please sign in to save items to your wishlist.')
      navigate('/login')
      return
    }

    try {
      setWishlistUpdating(true)
      if (isWishlisted) {
        await api.delete(`/wishlist/${product.id}`)
        setIsWishlisted(false)
        toast.success('Removed from wishlist')
      } else {
        await api.post('/wishlist', { product_id: product.id })
        setIsWishlisted(true)
        toast.success('Saved to wishlist')
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please sign in to save items to your wishlist.')
        navigate('/login')
        return
      }
      toast.error(err.response?.data?.detail || 'Unable to update wishlist right now.')
    } finally {
      setWishlistUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="section min-h-screen flex items-center justify-center">
        <div className="text-xl font-serif text-earth animate-pulse">Consulting the Stars...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="section min-h-screen flex items-center justify-center">
        <div className="text-xl font-serif text-saffron">Product not found in our sacred records.</div>
      </div>
    )
  }

  const galleryImages = product.images?.length
    ? product.images
    : [product.thumbnail_url || FALLBACK_PRODUCT_IMAGE]
  const productId = Number(product.id)
  const isPurchasable = !isNaN(productId) && Number.isInteger(productId)
  const availableStock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : null
  const heroImage = heroImageError
    ? FALLBACK_PRODUCT_IMAGE
    : (galleryImages[activeImg] || product.thumbnail_url || FALLBACK_PRODUCT_IMAGE)
  const showDiscount = Boolean(product.compare_price && product.compare_price > product.price)
  const savingsPercent = showDiscount ? Math.round((1 - product.price / product.compare_price!) * 100) : 0
  const relatedProducts = relatedCatalog.filter((item: any) => item.slug !== product.slug).slice(0, 4)

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title={product.name} description={product.description} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.thumbnail_url || heroImage,
            brand: { '@type': 'Brand', name: 'ManuAstro' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'ManuAstro' }
            }
          })}
        </script>
      </Helmet>

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
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[520px] card overflow-hidden border-0 shadow-2xl relative group"
                style={{ padding: 0 }}
              >
                <img
                  src={heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={() => setHeroImageError(true)}
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-saffron">LAB CERTIFIED</span>
                </div>
              </motion.div>

              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-24 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${activeImg === i ? 'border-[var(--color-saffron)] p-1' : 'border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30'}`}
                  >
                    <img
                      src={img || FALLBACK_PRODUCT_IMAGE}
                      alt={`${product.name} preview ${i + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge-gold">PREMIUM SELECTION</span>
              </div>
              <h1 className="font-serif text-[var(--color-earth)] mb-4" style={{ fontSize: '3rem', lineHeight: 1.2 }}>{product.name}</h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--color-gold)]/10">
                <div className="stars flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">
                  ({product.reviews_count || 48} Verified Reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-[var(--color-saffron)]">{`\u20B9${product.price.toLocaleString('en-IN')}`}</span>
                {showDiscount && (
                  <span className="text-lg text-[var(--color-text-muted)] line-through opacity-50">
                    {`\u20B9${product.compare_price!.toLocaleString('en-IN')}`}
                  </span>
                )}
                {showDiscount && (
                  <span className="badge-gold ml-2">SAVE {savingsPercent}%</span>
                )}
              </div>

              {product.description && (
                <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed mb-10 text-lg opacity-90">
                  {product.description}
                </p>
              )}

              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center bg-white border border-[var(--color-gold)]/20 rounded-2xl p-1.5 shadow-sm">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] text-xl transition-colors">-</button>
                  <span className="w-12 text-center font-bold text-[var(--color-earth)]">{qty}</span>
                  <button
                    onClick={() => {
                      if (availableStock !== null && qty >= availableStock) {
                        toast.error(`Only ${availableStock} item${availableStock === 1 ? '' : 's'} currently available.`)
                        return
                      }
                      setQty(qty + 1)
                    }}
                    className="w-10 h-10 flex items-center justify-center font-bold text-[var(--color-text-muted)] hover:text-[var(--color-saffron)] text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={adding || !isPurchasable}
                  className="btn-primary flex-1 py-4 text-sm font-bold uppercase tracking-widest shadow-xl"
                >
                  <ShoppingCart size={18} className="mr-2" /> {adding ? 'Adding...' : isPurchasable ? 'Add to Cart' : 'Available Soon'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistUpdating || !isPurchasable}
                  className={`w-14 h-14 rounded-2xl bg-white border transition-all flex items-center justify-center shadow-sm ${isWishlisted ? 'border-[var(--color-saffron)] text-[var(--color-saffron)]' : 'border-[var(--color-gold)]/20 text-[var(--color-text-muted)]'}`}
                  style={{ opacity: wishlistUpdating || !isPurchasable ? 0.7 : 1 }}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {availableStock !== null && (
                <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                  {availableStock > 0 ? `${availableStock} item${availableStock === 1 ? '' : 's'} available right now.` : 'Currently out of stock.'}
                </p>
              )}

              <div className="grid grid-cols-3 gap-6 p-8 bg-[#faf2e2] rounded-3xl border border-[var(--color-gold)]/10">
                <div className="flex flex-col items-center justify-start text-center gap-3">
                  <div className="h-8 flex items-center justify-center">
                    <ShieldCheck className="text-[var(--color-saffron)]" size={28} />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest leading-none">Authentic</p>
                </div>
                <div className="flex flex-col items-center justify-start text-center gap-3">
                  <div className="h-8 flex items-center justify-center">
                    <Truck className="text-[var(--color-saffron)]" size={28} />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest leading-none">Free Shipping</p>
                </div>
                <div className="flex flex-col items-center justify-start text-center gap-3">
                  <div className="h-8 flex items-center justify-center">
                    <RefreshCcw className="text-[var(--color-saffron)]" size={28} />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest leading-none">7 Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider-ornamental my-24 opacity-20">*</div>

          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                Related Sacred Items
              </h2>
              <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-20">
              {relatedProducts.length > 0 ? relatedProducts.map((item: any) => (
                <ProductCard
                  key={item.slug}
                  product={item}
                />
              )) : (
                <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: 'white', gridColumn: '1 / -1' }}>
                  More products from this category will appear here as you add them in the admin dashboard.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
