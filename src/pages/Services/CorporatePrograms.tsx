import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Users, LayoutDashboard, TrendingUp } from 'lucide-react'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
})

export default function CorporatePrograms() {
  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&auto=format&fit=crop" alt="Corporate Programs" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>CORPORATE PROGRAMS</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Intuitive Strategy for Modern Business
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Align your team's energy and business strategy using ancient insights and modern management principles for sustainable growth and synergy.
            </p>
            <a href="https://calendly.com/manuastro2022/30min" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
              Book a Session <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* specialized Programs - Fix 4 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Our Specialized Programs
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
              { icon: <Users />, title: 'Team Synergy', desc: 'Compatibility analysis between co-founders and key team members for smoother operations.' },
              { icon: <LayoutDashboard />, title: 'Astro-Vaastu Design', desc: 'Designing workspace layouts that boost creativity and minimize energetic friction.' },
              { icon: <TrendingUp />, title: 'Strategic Timing', desc: 'Selecting auspicious dates (Muhurtas) for product launches, mergers, and major investments.' }
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

      {/* Who Its For - Fix 6 & 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Who It's For
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
              { title: 'CEOs & Founders', desc: 'Visionary leaders looking for a competitive edge through spiritual alignment and strategic timing.' },
              { title: 'Startup Core Teams', desc: 'New organizations looking to build a cohesive, energetically balanced foundation for growth.' },
              { title: 'Project Leaders', desc: 'Managers seeking to optimize team output and minimize interpersonal friction.' }
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

      {/* Key Benefits - Fix 7 & 10 */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Key Benefits
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
              'Increased Employee Retention',
              'Reduced Decision-Making Friction',
              'Enhanced Creative Output',
              'Optimal Financial Timing',
              'Strategic Competitive Advantage',
              'Balanced Workspace Energy'
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
                  <Briefcase className="w-4 h-4" />
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
            }}>Empower Your Business Today</h2>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto'
            }}>Connect with us for a custom-tailored program that meets your organization's unique requirements.</p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
