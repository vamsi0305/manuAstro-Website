import { motion } from 'framer-motion'
import { ArrowRight, User, Eye, Search, Sparkles } from 'lucide-react'
import SEOHead from '@/components/SEOHead'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
})

export default function FaceReading() {
  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Face Reading Services" description="Expert face reading and physiognomy sessions. Understand personality and destiny through facial features." />

      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&auto=format&fit=crop" alt="Face Reading" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>FACE READING</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              The Mirror of Your Soul
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Discover your hidden potential and inherent character through Samudrika Shastra — the ancient Vedic art of facial analysis and intuitive reading.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
              Book a Session <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* What We Analyze - Fix 4 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              What We Analyze
            </h2>
            <div style={{
              width: '50px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: <User />, title: 'Facial Contours', desc: 'Understanding your emotional endurance and practical approach to life.' },
              { icon: <Eye />, title: 'Eye Expression', desc: 'Insights into your intent, focus, and depth of character.' },
              { icon: <Search />, title: 'Minor Features', desc: 'Analyzing the nose, forehead, and lips to reveal specific destiny traits.' }
            ].map((item, i) => (
              <div key={i} className="card" style={{
                padding: '2.5rem 2rem', textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem'
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--color-gold)',
                  background: 'var(--color-bg-secondary)',
                  color: 'var(--color-saffron)',
                  fontSize: '1.5rem', flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <h3 className="font-serif" style={{
                  fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-muted)', fontSize: '0.9rem',
                  lineHeight: 1.6, margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12">✦</div>

      {/* Integrated Numerology - Fix 6 & 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Integrated Numerology
            </h2>
            <div style={{
              width: '50px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto'
            }} />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="text-lg text-[var(--color-text-secondary)] mb-12 leading-relaxed">
              We combine face reading with Numerological analysis of your birth date and name to provide a 360-degree view of your personality and future trends.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem'
            }}>
              {[1, 5, 9].map(num => (
                <div key={num} className="card" style={{
                  padding: '2rem', fontSize: '3rem', fontWeight: 700, color: 'var(--color-saffron)',
                  background: 'var(--color-bg-secondary)', opacity: 0.6
                }}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12">✦</div>

      {/* Combined Session - Fix 10 */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="card" style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '3rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h2 className="font-serif" style={{
              fontSize: '2rem',
              color: 'var(--color-earth)',
              marginBottom: '0.5rem'
            }}>Combined Analysis Session</h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '500px',
              fontStyle: 'italic',
              margin: '0 auto'
            }}>"A single session that covers your face reading, hand analysis, and numerological vibration for complete clarity."</p>
            <button
              onClick={() => window.open('https://calendly.com/manuastro2022/30min', '_blank')}
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              Book Combined Session
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
