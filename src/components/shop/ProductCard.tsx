import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '@/api/axios'

interface ProductProps {
    product: {
        id: string | number
        name: string
        slug: string
        price: number
        compare_price?: number
        image_url?: string        // ← backend field
        thumbnail_url?: string    // ← keep for compatibility
        fallback_url?: string
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
    const [imgError, setImgError] = useState(false)

    // Use image_url from backend, fallback to thumbnail_url, then fallback image
    const imageSource = imgError
        ? 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311'
        : (product.image_url || product.thumbnail_url || 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311')

    useEffect(() => {
        // Only check wishlist if product.id is a valid integer (backend requirement)
        // Mock IDs like 'g1', 'g2' will be skipped to avoid 422 errors
        const idNum = Number(product.id)
        if (!isNaN(idNum) && Number.isInteger(idNum)) {
            api.get(`/wishlist/check/${product.id}`)
                .then(({ data }) => setIsWishlisted(data.is_wishlisted))
                .catch(() => { })
        }
    }, [product.id])

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const idNum = Number(product.id)
        if (isNaN(idNum) || !Number.isInteger(idNum)) return
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

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const idNum = Number(product.id)
        if (isNaN(idNum) || !Number.isInteger(idNum)) return
        setAdding(true)
        try {
            await api.post('/cart/items', { product_id: product.id, quantity: 1 })
        } catch (err: any) {
            if (err.response?.status === 401) navigate('/login')
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

                    {/* Category badge top-left */}
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

                    {/* Featured badge */}
                    {product.is_featured && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-gold)', color: 'white',
                            fontSize: '0.65rem', fontWeight: 700,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.06em',
                            textTransform: 'uppercase'
                        }}>
                            Featured
                        </span>
                    )}

                    {/* Wishlist heart top-right */}
                    <button
                        onClick={handleWishlistToggle}
                        style={{
                            position: 'absolute', top: '0.75rem', right: '0.75rem',
                            width: '34px', height: '34px', borderRadius: '50%',
                            background: 'rgba(255,249,242,0.95)',
                            border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer',
                            color: isWishlisted ? 'var(--color-saffron)' : 'var(--color-text-muted)',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                        <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>

                    {/* Hover overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.04)',
                        opacity: 0,
                        transition: 'opacity 0.2s'
                    }} className="group-hover:opacity-100" />
                </div>
            </Link>

            <div style={{ padding: '1.25rem' }}>
                <Link to={`/shop/${product.slug}`}>
                    <h3 style={{
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
                    }} className="group-hover:text-[var(--color-saffron)]">
                        {product.name}
                    </h3>
                </Link>

                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.875rem' }}>
                    <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13}
                                fill={i < (product.rating || 5) ? 'currentColor' : 'none'} />
                        ))}
                    </div>
                    <span style={{
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-accent)'
                    }}>({product.rating || 5}.0)</span>
                </div>

                {/* Price + Add to Cart */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--color-gold)',
                            fontFamily: 'var(--font-serif)'
                        }}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        {product.compare_price && (
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-text-muted)',
                                textDecoration: 'line-through'
                            }}>
                                ₹{product.compare_price.toLocaleString('en-IN')}
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
                        }}>
                        <ShoppingCart size={13} />
                        {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
