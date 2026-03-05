import { motion } from 'framer-motion'
import { ArrowRight, Fingerprint, Eye, Sparkles, Sparkles as Stars } from 'lucide-react'
import SEOHead from '@/components/SEOHead'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
})

export default function PalmReading() {
  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Palm Reading Services" description="Expert palmistry and hand analysis sessions. Discover your life path through the ancient science of palm reading." />

      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1591279055498-4d75d013e4b5?w=1400&auto=format&fit=crop" alt="Palm Reading" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>PALM READING</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Your Destiny in Your Hands
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Explore the subtle lines and mounts on your palm to understand your personality, health, and future life path through ancient Samudrika Shastra.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
              Book a Consultation <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <div className="divider-ornamental">*</div>

      {/* What We Read - Fix 4 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              What We Read In Your Palm
            </h2>
            <div style={{
              width: '50px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: <Fingerprint />, title: 'Life Line', desc: 'Vitality, energy, and major life changes.' },
              { icon: <Stars />, title: 'Head Line', desc: 'Intellectual style, focus, and mindset.' },
              { icon: <Sparkles />, title: 'Heart Line', desc: 'Emotional depth, relationships, and romance.' },
              { icon: <Eye />, title: 'Fate Line', desc: 'Career path, success, and destiny.' }
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

      {/* Session Process - Fix 6 & 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              How It Works
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
              { title: 'Cleansing & Prep', desc: 'A quick meditative preparation to align our energies before the reading.' },
              { title: 'Line Analysis', desc: 'Detailed observation of primary and secondary lines on both hands.' },
              { title: 'Mount & Shape', desc: 'Assessment of hand shape and the mounts representing planetary energies.' }
            ].map((step, i) => (
              <div key={i} className="card" style={{
                padding: '2.5rem 2rem', textAlign: 'center',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem'
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--color-gold)',
                  color: 'var(--color-saffron)', fontSize: '1.3rem',
                  fontWeight: 700, fontFamily: 'var(--font-serif)',
                  background: 'var(--color-bg-secondary)', flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <h3 className="font-serif" style={{
                  fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-muted)', fontSize: '0.9rem',
                  lineHeight: 1.7, margin: 0
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12">✦</div>

      {/* Benefits - Fix 7 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Benefits of Consultation
            </h2>
            <div style={{
              width: '50px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { title: 'Personality Insight', desc: 'Understand your hidden strengths and latent talents.' },
              { title: 'Health Awareness', desc: 'Identify early physical and mental health tendencies.' },
              { title: 'Emotional Growth', desc: 'Navigate relationship patterns and emotional triggers.' },
              { title: 'Career Guidance', desc: 'Align your vocational path with your natural abilities.' }
            ].map((b, i) => (
              <div key={i} className="card" style={{
                padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1.5px solid var(--color-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-saffron)', flexShrink: 0
                }}>
                  <Stars className="w-4 h-4" />
                </div>
                <span style={{
                  color: 'var(--color-text-primary)', fontSize: '0.95rem',
                  fontWeight: 500
                }}>
                  {b.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
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
            }}>Discover What Your Hands Reveal</h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto'
            }}>Join thousands who have found clarity and direction through our expert palmistry sessions.</p>
            <button
              onClick={() => window.open('https://calendly.com/manuastro2022/30min', '_blank')}
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              Book Your Reading
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
