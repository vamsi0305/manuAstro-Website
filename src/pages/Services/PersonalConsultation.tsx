import { motion } from 'framer-motion'
import { ArrowRight, UserCheck, MessageSquare, ShieldCheck, Heart, Moon, Sparkles as Stars } from 'lucide-react'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
})

export default function PersonalConsultation() {
  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&auto=format&fit=crop" alt="Personal Consultation" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>PERSONAL CONSULTATION</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              One-on-One Personalized Guidance
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              A dedicated session to address your specific life concerns and find actionable solutions through Vedic wisdom and analytical logic.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
              Book a Consultation <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* Types of Consultation - Fix 4 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Types of Consultation
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
              { title: 'Career & Wealth', icon: <Stars />, desc: 'Guidance on business growth, job changes, and financial stability.' },
              { title: 'Love & Marriage', icon: <Heart className="w-6 h-6" />, desc: 'Compatibility analysis and solving relationship challenges.' },
              { title: 'Education & Health', icon: <Moon />, desc: 'Insights into academic success and overall physical/mental well-being.' }
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

      {/* How to Book - Fix 6 & 10 */}
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
              { title: 'Select Slot', desc: 'Click "Book Session" and select your preferred date and time from our calendar.' },
              { title: 'Registration', desc: 'Complete the form with your accurate birth details for chart preparation.' },
              { title: 'Live Guidance', desc: 'Join the session for personalized answers, chart analysis, and remedies.' }
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

      {/* Benefits - Fix 7 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Benefits of Personal Session
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
              '30-60 Minutes Live Session',
              'Digital Kundli Report',
              'Specific Answer to 3 Queries',
              'Personalized Remedy Advice',
              'Energy Alignment Meditation',
              'Recorded Session Access'
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
                  <ShieldCheck className="w-4 h-4" />
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

      {/* CTA */}
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
            }}>Ready to Get Started?</h2>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={() => window.open('https://calendly.com/manuastro2022/30min', '_blank')}
                className="btn-primary"
              >
                Book Now
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="btn-outline"
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

