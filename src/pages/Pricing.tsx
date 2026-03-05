import { motion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck } from 'lucide-react'

const PLANS = [
  {
    name: 'Basic',
    price: '₹2,100',
    desc: 'Perfect for single query sessions.',
    features: ['15 Min Session', 'Personalized Kundli', '1 Major Query', 'Remedy Advice', 'Email Support']
  },
  {
    name: 'Premium',
    price: '₹5,100',
    desc: 'Our most popular comprehensive session.',
    features: ['45 Min Session', 'Full Life Analysis', '5 Key Queries', 'Detailed Remedies', 'WhatsApp Support', 'Gemstone Suggestion'],
    featured: true
  },
  {
    name: 'Elite',
    price: '₹11,000',
    desc: 'Intensive guidance for life transformation.',
    features: ['90 Min Session', 'Annual Planning', 'Unlimited Queries', 'Vaastu Scan (Online)', 'Priority Support', 'Energy Rituals']
  }
]

export default function Pricing() {
  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&auto=format&fit=crop" alt="Consultation Plans" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>SACRED GUIDANCE</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Consultation Plans
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              Investment in self-awareness and spiritual guidance. Choose the plan that fits your journey towards clarity and transformation.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* Pricing Grid - Fix 10 */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card p-10 flex flex-col h-full bg-white relative transition-all duration-500 ${plan.featured ? 'border-2 border-[var(--color-saffron)] shadow-2xl scale-105 z-10' : 'hover:border-[var(--color-gold)]/30'}`}
              >
                {plan.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-saffron)] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Recommended</span>
                )}
                <h3 className="text-xl font-serif text-[var(--color-earth)] mb-2" style={{ fontSize: '1.5rem' }}>{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-[var(--color-gold)]">{plan.price}</span>
                  <span className="text-[var(--color-text-muted)] text-[10px] uppercase font-bold tracking-widest">/ Session</span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-10 leading-relaxed font-sans">{plan.desc}</p>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex gap-3 items-center text-sm font-medium text-[var(--color-text-secondary)]">
                      <Check size={16} className="text-[var(--color-saffron)] flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                <a href="https://calendly.com/manuastro2022/30min"
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all ${plan.featured ? 'btn-primary' : 'bg-[var(--color-bg-secondary)] text-[var(--color-earth)] border border-[var(--color-gold)]/20 hover:bg-[var(--color-gold)]/10'}`}>
                  Book Now <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12 opacity-20">✦</div>

      {/* FAQ Mini - Fix 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container max-w-4xl">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
              Why Consult with Er. Manu Gupta?
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center space-y-4">
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--color-bg-secondary)', border: '2px solid var(--color-gold)',
                color: 'var(--color-saffron)'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-serif text-xl text-[var(--color-earth)]">Scientific Approach</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-xs mx-auto">Rational explanations behind planetary movements and their psychological effects.</p>
            </div>
            <div className="text-center space-y-4">
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--color-bg-secondary)', border: '2px solid var(--color-gold)',
                color: 'var(--color-saffron)'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-serif text-xl text-[var(--color-earth)]">Practical Remedies</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-xs mx-auto">Solutions that are easy to follow and integrate into your daily modern life.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
