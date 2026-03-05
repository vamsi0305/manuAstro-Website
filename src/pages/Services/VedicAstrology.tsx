import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Sun, Stars, Moon } from 'lucide-react'
import SEOHead from '@/components/SEOHead'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
})

export default function VedicAstrology() {
  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Vedic Astrology Services" description="Personalised Vedic astrology consultations. Birth chart analysis, planetary remedies and life guidance by Er. Manu Gupta." />


      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1400&auto=format&fit=crop" alt="Vedic Astrology" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>VEDIC ASTROLOGY</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Wisdom of the Celestial Bodies
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Deep insights into your life path, career, and relationships through the precise science of Jyotish. Ancient wisdom for modern evolution.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
              Book a Session <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <div className="divider-ornamental">*</div>

      {/* What is Vedic Astrology */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...rise()}>
              <h2 className="text-3xl font-serif text-[var(--color-earth)] mb-6">What is Vedic Astrology?</h2>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Vedic Astrology, or Jyotish, is the eyes of the Vedas. It is a profound spiritual and mathematical system that maps the planetary influences at the time of your birth to illuminate your destiny, strengths, and evolution.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Unlike Western astrology, the Vedic system uses the sidereal zodiac, which aligns with the actual astronomical positions of the constellations, providing unparalleled accuracy in timing life events.
              </p>
            </motion.div>
            <motion.div {...rise(0.2)}>
              {/* Fix 8: Planet Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem'
              }}>
                {[
                  { name: 'Surya', subtitle: 'The Soul', icon: <Sun className="w-6 h-6" /> },
                  { name: 'Chandra', subtitle: 'The Mind', icon: <Moon className="w-6 h-6" /> },
                  { name: '9 Navagrahas', subtitle: 'Planetary Forces', icon: <Stars className="w-6 h-6" /> }
                ].map((planet, i) => (
                  <div key={i} className="card" style={{
                    padding: '2rem 1.5rem', textAlign: 'center',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid var(--color-gold)',
                      background: 'var(--color-bg-secondary)',
                      color: 'var(--color-saffron)', fontSize: '1.5rem', flexShrink: 0
                    }}>
                      {planet.icon}
                    </div>
                    <h3 className="font-serif" style={{
                      fontSize: '1.2rem', color: 'var(--color-earth)', margin: 0
                    }}>
                      {planet.name}
                    </h3>
                    <p style={{
                      color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0
                    }}>
                      {planet.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="divider-ornamental my-12">✦</div>

      {/* How it Works - Fix 6 & 10 */}
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
              { title: 'Data Collection', desc: 'Provide your accurate date, time, and place of birth for precise calculation.' },
              { title: 'Chart Preparation', desc: 'We construct your Janam Kundli and analyze various divisional charts (Vargas).' },
              { title: 'Detailed Reading', desc: 'A live session where we discuss your life trends, timing, and specific queries.' }
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

      <div className="divider-ornamental my-12">*</div>

      {/* Benefits Grid - Fix 7 & 10 */}
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
              'Career & Financial Success Timing',
              'Relationship & Marriage Compatibility',
              'Health & Emotional Well-being',
              'Self-Discovery & Soul Purpose',
              'Timely Remedial Measures (Upayas)',
              'Academic & Educational Guidance'
            ].map((benefit, i) => (
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
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span style={{
                  color: 'var(--color-text-primary)', fontSize: '0.95rem',
                  fontWeight: 500
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
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
            }}>Awaken Your True Potential</h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto'
            }}>Don't leave your life to chance. Harness the power of the stars to navigate your future with confidence.</p>
            <button
              onClick={() => window.open('https://calendly.com/manuastro2022/30min', '_blank')}
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              Book Your 30-Min Session
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
