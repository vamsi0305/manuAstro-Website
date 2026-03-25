/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

import api from '@/api/axios'
import SEOHead from '@/components/SEOHead'
import { FALLBACK_PRODUCT_IMAGE, resolveAssetUrl } from '@/utils/assets'

function WishlistCard({
    item,
    onRemove,
}: {
    item: any
    onRemove: (productId: number) => Promise<void>
}) {
    const navigate = useNavigate()
    const [adding, setAdding] = useState(false)

    const product = item.product ?? {}
    const imageSource =
        resolveAssetUrl(product.image_url) ||
        resolveAssetUrl(product.thumbnail_url) ||
        resolveAssetUrl(product.image) ||
        FALLBACK_PRODUCT_IMAGE

    const handleAddToCart = async () => {
        setAdding(true)
        try {
            await api.post('/cart/items', { product_id: product.id, quantity: 1 })
            toast.success('Added to cart')
        } catch (err: any) {
            if (err.response?.status === 401) {
                navigate('/login')
                return
            }
        } finally {
            setAdding(false)
        }
    }

    return (
        <article className="card" style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
            <Link to={`/shop/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
                <img
                    src={imageSource}
                    alt={product.name}
                    style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                />
                <button
                    onClick={(event) => {
                        event.preventDefault()
                        void onRemove(product.id)
                    }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '1px solid rgba(201,151,42,0.12)',
                        background: 'rgba(255,255,255,0.96)',
                        color: 'var(--color-saffron)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(65,37,16,0.08)'
                    }}
                >
                    <Heart size={16} fill="currentColor" />
                </button>
            </Link>

            <div style={{ padding: '1.25rem' }}>
                <Link to={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-earth)', marginBottom: '0.35rem' }}>
                        {product.name}
                    </h3>
                </Link>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {product.category?.name || 'Sacred Item'}
                </p>

                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                            {`\u20B9${product.price?.toLocaleString('en-IN') || 0}`}
                        </div>
                        {product.compare_price && product.compare_price > product.price && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                                {`\u20B9${product.compare_price.toLocaleString('en-IN')}`}
                            </div>
                        )}
                    </div>
                    <Link to={`/shop/${product.slug}`} className="btn-outline" style={{ textDecoration: 'none', padding: '0.55rem 0.85rem', fontSize: '0.75rem' }}>
                        View
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={handleAddToCart} disabled={adding} className="btn-primary" style={{ flex: 1 }}>
                        <ShoppingCart size={16} /> {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                    <button
                        onClick={() => void onRemove(product.id)}
                        style={{
                            width: '48px',
                            borderRadius: '0.85rem',
                            border: '1px solid rgba(199,69,0,0.12)',
                            background: 'rgba(199,69,0,0.06)',
                            color: 'var(--color-saffron)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default function Wishlist() {
    const navigate = useNavigate()
    const [wishlistItems, setWishlistItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const { data } = await api.get('/wishlist')
                setWishlistItems(data)
            } catch (err: any) {
                if (err.response?.status === 401) {
                    navigate('/login')
                    return
                }
            } finally {
                setLoading(false)
            }
        }
        void loadWishlist()
    }, [navigate])

    const handleRemove = async (productId: number) => {
        try {
            await api.delete(`/wishlist/${productId}`)
            setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId))
            toast.success('Removed from wishlist')
        } catch (err: any) {
            if (err.response?.status === 401) {
                navigate('/login')
            }
        }
    }

    const count = wishlistItems.length

    return (
        <div className="bg-[#fdf7ed] min-h-screen">
            <SEOHead title="My Wishlist" description="View and manage your saved sacred items. Keep track of the gemstones, rudraksha, and yantras you resonate with." />

            <section className="section" style={{ paddingBottom: '2.5rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>MY COLLECTION</span>
                        <h1 className="font-serif" style={{ fontSize: '3rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>My Wishlist</h1>
                        <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                            Save your favorite sacred items and move them to cart whenever you are ready.
                        </p>
                    </div>
                </div>
            </section>

            {loading ? (
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                            Loading your wishlist...
                        </div>
                    </div>
                </section>
            ) : count === 0 ? (
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div className="card" style={{
                            maxWidth: '540px',
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
                                border: '2px solid var(--color-gold)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(250,242,226,0.7)'
                            }}>
                                <Heart size={34} color="var(--color-saffron)" />
                            </div>
                            <h2 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--color-earth)' }}>Your wishlist is empty</h2>
                            <p style={{ color: 'var(--color-text-muted)', maxWidth: '360px' }}>
                                Start exploring gemstones, rudraksha, and yantras, then save the ones you want to revisit.
                            </p>
                            <Link to="/shop" className="btn-primary" style={{ textDecoration: 'none' }}>Explore Products</Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                {count} saved {count === 1 ? 'item' : 'items'}
                            </p>
                            <Link to="/cart" className="btn-outline" style={{ textDecoration: 'none' }}>
                                Go to Cart <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: '1.75rem' }}>
                            {wishlistItems.map((item) => (
                                <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
