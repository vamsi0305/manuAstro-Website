/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import api from '@/api/axios'
import { FALLBACK_PRODUCT_IMAGE, resolveAssetUrl } from '@/utils/assets'

interface ProductProps {
    product: {
        id: string | number
        name: string
        slug: string
        price: number
        compare_price?: number
        image_url?: string
        thumbnail_url?: string
        rating?: number
        badge?: string
        planet?: string
        category?: { name?: string }
        is_featured?: boolean
    }
}

export default function ProductCard({ product }: ProductProps) {
    const navigate = useNavigate()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [adding, setAdding] = useState(false)
    const [wishlistUpdating, setWishlistUpdating] = useState(false)
    const [imgError, setImgError] = useState(false)
    const hasAuthToken = Boolean(localStorage.getItem('access_token'))
    const idNum = Number(product.id)
    const isPurchasable = !isNaN(idNum) && Number.isInteger(idNum)

    const imageSource = imgError
        ? FALLBACK_PRODUCT_IMAGE
        : (resolveAssetUrl(product.image_url) || resolveAssetUrl(product.thumbnail_url) || FALLBACK_PRODUCT_IMAGE)

    useEffect(() => {
        const wishlistProductId = Number(product.id)
        if (hasAuthToken && !isNaN(wishlistProductId) && Number.isInteger(wishlistProductId)) {
            api.get(`/wishlist/check/${product.id}`)
                .then(({ data }) => setIsWishlisted(data.is_wishlisted))
                .catch(() => {})
        }
    }, [hasAuthToken, product.id])

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isPurchasable) {
            toast('This catalog item will be available for wishlist soon.')
            navigate(`/shop/${product.slug}`)
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

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isPurchasable) {
            toast('This catalog item is being synced. Please open the product page for details.')
            navigate(`/shop/${product.slug}`)
            return
        }

        if (!hasAuthToken) {
            toast.error('Please sign in to add items to your cart.')
            navigate('/login')
            return
        }

        setAdding(true)
        try {
            await api.post('/cart/items', { product_id: product.id, quantity: 1 })
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card group overflow-hidden"
            style={{ background: 'white', border: '1px solid rgba(201,151,42,0.15)' }}
        >
            <Link to={`/shop/${product.slug}`} className="block">
                <div style={{
                    borderRadius: '1rem 1rem 0 0',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '220px',
                    background: 'var(--color-bg-secondary)'
                }}>
                    <img
                        src={imageSource}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: '1rem 1rem 0 0',
                            transition: 'transform 0.4s ease'
                        }}
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />

                    {(product.badge || product.category?.name || product.planet) && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-saffron)', color: 'white',
                            fontSize: '0.65rem', fontWeight: 700,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.06em',
                            textTransform: 'uppercase'
                        }}>
                            {product.planet || product.badge || product.category?.name}
                        </span>
                    )}

                    {product.is_featured && (
                        <span style={{
                            position: 'absolute', bottom: '0.75rem', left: '0.75rem',
                            background: 'var(--color-gold)', color: 'white',
                            fontSize: '0.65rem', fontWeight: 700,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.06em',
                            textTransform: 'uppercase'
                        }}>
                            Featured
                        </span>
                    )}

                    <button
                        onClick={handleWishlistToggle}
                        disabled={wishlistUpdating}
                        style={{
                            position: 'absolute', top: '0.75rem', right: '0.75rem',
                            width: '34px', height: '34px', borderRadius: '50%',
                            background: 'rgba(255,249,242,0.95)',
                            border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer',
                            color: isWishlisted ? 'var(--color-saffron)' : 'var(--color-text-muted)',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            opacity: wishlistUpdating ? 0.75 : 1
                        }}
                    >
                        <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>

                    <div
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(0,0,0,0.04)',
                            opacity: 0,
                            transition: 'opacity 0.2s'
                        }}
                        className="group-hover:opacity-100"
                    />
                </div>
            </Link>

            <div style={{ padding: '1.25rem' }}>
                <Link to={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1rem',
                            marginBottom: '0.5rem',
                            color: 'var(--color-earth)',
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            transition: 'color 0.2s'
                        }}
                        className="group-hover:text-[var(--color-saffron)]"
                    >
                        {product.name}
                    </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.875rem' }}>
                    <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill={i < (product.rating || 5) ? 'currentColor' : 'none'} />
                        ))}
                    </div>
                    <span style={{
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-accent)'
                    }}>
                        ({product.rating || 5}.0)
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--color-gold)',
                            fontFamily: 'var(--font-serif)'
                        }}>
                            {`\u20B9${product.price.toLocaleString('en-IN')}`}
                        </div>
                        {product.compare_price && product.compare_price > product.price && (
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-text-muted)',
                                textDecoration: 'line-through'
                            }}>
                                {`\u20B9${product.compare_price.toLocaleString('en-IN')}`}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="btn-primary"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.72rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <ShoppingCart size={13} />
                        {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
