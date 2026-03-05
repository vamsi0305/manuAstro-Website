import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '@/api/axios'

interface ProductProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        compare_price?: number
        thumbnail_url?: string
        fallback_url?: string
        rating?: number
        badge?: string
        planet?: string
    }
}

export default function ProductCard({ product }: ProductProps) {
    const navigate = useNavigate()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [adding, setAdding] = useState(false)

    // Check if this product belongs to categories that should REMAIN MOCK
    const isMockOnly = ['Gemstones', 'Rudraksha', 'Yantra'].some(cat =>
        product.badge === cat || product.planet // rough check, but safe
    )

    useEffect(() => {
        if (!isMockOnly) {
            api.get(`/wishlist/check/${product.id}`)
                .then(({ data }) => setIsWishlisted(data.is_wishlisted))
                .catch(() => { })
        }
    }, [product.id, isMockOnly])

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (isMockOnly) return // Keep mock behavior or do nothing

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
        if (isMockOnly) {
            // Logic for mock items if needed, or fallback to existing store
            return
        }
        setAdding(true)
        try {
            await api.post('/cart/items', { product_id: product.id, quantity: 1 })
            // brief success indication could be handled via toast or state
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
                        src={product.thumbnail_url}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: '1rem 1rem 0 0'
                        }}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = product.fallback_url || 'https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311';
                        }}
                    />
                    {/* Planet badge top-left */}
                    {product.planet && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-saffron)', color: 'white',
                            fontSize: '0.7rem', fontWeight: 600,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.05em'
                        }}>
                            {product.planet}
                        </span>
                    )}
                    {/* Badge top-left (fallback for general badges) */}
                    {!product.planet && product.badge && (
                        <span style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            background: 'var(--color-saffron)', color: 'white',
                            fontSize: '0.7rem', fontWeight: 600,
                            padding: '0.2rem 0.6rem', borderRadius: '1rem',
                            fontFamily: 'var(--font-accent)', letterSpacing: '0.05em'
                        }}>
                            {product.badge}
                        </span>
                    )}
                    {/* Wishlist heart top-right */}
                    <button onClick={handleWishlistToggle} style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(255,249,242,0.9)',
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer',
                        color: isWishlisted ? 'var(--color-saffron)' : 'var(--color-text-muted)'
                    }}>
                        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>

            <div className="p-6">
                <Link to={`/shop/${product.slug}`}>
                    <h3 className="font-serif text-lg mb-2 text-[var(--color-earth)] line-clamp-1 group-hover:text-[var(--color-saffron)] transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                    <div className="stars flex text-[var(--color-gold)]">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < (product.rating || 5) ? "currentColor" : "none"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">({product.rating || 5}.0)</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-[var(--color-gold)]">
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.compare_price && (
                            <span className="text-xs text-[var(--color-text-muted)] line-through">
                                ₹{product.compare_price.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="btn-primary px-4 py-2 text-xs"
                    >
                        <ShoppingCart size={14} /> {adding ? '...' : 'Add'}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
