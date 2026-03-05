import { useParams } from 'react-router-dom'
import ShopPage from './ShopPage'

const CAT_MAP: Record<string, string> = {
    'vastu-products': 'Vastue Products',
    'dosh-nivaran': 'Dosh Nivaran Kit',
    'feng-shui': 'Feng Shui Remedies',
    'pooja-samagri': 'Pooja Samagri',
    'idols': 'Sacred Idols',
    'shaligram': 'Shaligram',
    'shivling': 'Shivling'
}

export default function CategoryPage() {
    const { category } = useParams()
    const displayName = category ? (CAT_MAP[category] || category.replace(/-/g, ' ')) : 'Sacred Items'

    return (
        <div className="bg-[#fdf7ed]">
            {/* ════ HERO ════ */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '360px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1400&auto=format&fit=crop" alt={displayName} className="w-full h-full object-cover opacity-15" />
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
                </div>

                <div className="container relative z-10">
                    <div style={{ maxWidth: '720px' }}>
                        <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>SACRED COLLECTION</span>
                        <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                            {displayName}
                        </h1>
                        <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)' }} />
                    </div>
                </div>
            </section>

            <div className="divider-ornamental">*</div>
            {/* Use the same layout as ShopPage, but potentially filtered in the future by the category param */}
            <ShopPage />
        </div>
    )
}
