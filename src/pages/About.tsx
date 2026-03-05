import { motion } from 'framer-motion'
import { ShieldCheck, Heart, Users, Brain, Star } from 'lucide-react'
import SEOHead from '@/components/SEOHead'


const founderImage = "https://manuastro.com/cdn/shop/files/new_astro.png?v=1766604311&width=900"

const testimonials = [
  { name: "Dr. Anjali R.", location: "Bengaluru", comment: "Manu Ji's reading didn't just tell me my future; it gave me the clarity to build it. His scientific explanation is mind-blowing." },
  { name: "Rajesh Khanna", location: "Delhi", comment: "The Vaastu remedies suggested for my office showed results within weeks. Truly logical and effective guidance." },
  { name: "Sarah Jenkins", location: "London", comment: "I bought a 5 Mukhi Rudraksha, and the quality is exceptional. The energy shift in my meditation is palpable." }
]

export default function About() {
  return (
    <div className='page-wrapper'>
      <SEOHead title="About Er. Manu Gupta" description="Learn about the journey of Er. Manu Gupta, an IIM Ahmedabad alumnus dedicated to helping people through Vedic sciences." />
      <main>
        {/* ■■ SECTION 1: HERO ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
        <section style={{
          position: 'relative', width: '100%', minHeight: '420px',
          display: 'flex', alignItems: 'center',
          background: 'var(--color-bg)', padding: '5rem 0', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src='https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&auto=format&fit=crop'
              alt='about'
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--color-bg)', opacity: 0.80
            }} />
          </div>
          <div className='container' style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <span className='badge-saffron'
              style={{ marginBottom: '1rem', display: 'inline-block' }}>
              ABOUT MANUASTRO
            </span>
            <h1 className='font-serif' style={{
              fontSize: '3rem', color: 'var(--color-earth)',
              lineHeight: 1.2, marginBottom: '1rem'
            }}>
              Our Story
            </h1>
            <div style={{
              width: '60px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto 1.5rem'
            }} />
            <p className='font-sans' style={{
              fontSize: '1.1rem', color: 'var(--color-text-secondary)',
              lineHeight: 1.75, maxWidth: '640px', margin: '0 auto'
            }}>
              Bridging ancient Vedic wisdom with modern analytical thinking.
            </p>
          </div>
        </section>

        <div className='divider-ornamental'>*</div>

        {/* ■■ SECTION 2: FOUNDER STORY ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
        <section className='section'>
          <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              {/* LEFT: Text content */}
              <div>
                <span className='badge-gold'
                  style={{ marginBottom: '1rem', display: 'inline-block' }}>
                  FOUNDER
                </span>
                <h2 className='font-serif' style={{
                  fontSize: '2.2rem', color: 'var(--color-earth)',
                  marginBottom: '1.5rem', lineHeight: 1.3
                }}>
                  Guided by Truth,<br />Driven by Logic
                </h2>
                <p className='font-sans' style={{
                  color: 'var(--color-text-secondary)', lineHeight: 1.8,
                  marginBottom: '1rem', fontSize: '1rem'
                }}>
                  Founded by Er. Manu Gupta, an IIM Ahmedabad alumnus,
                  ManuAstro was born out of a vision to simplify complex
                  astrological concepts for the modern world without losing
                  the essence of traditional Vedic sciences.
                </p>
                <p className='font-sans' style={{
                  color: 'var(--color-text-secondary)', lineHeight: 1.8,
                  marginBottom: '2rem', fontSize: '1rem'
                }}>
                  Er. Manu Gupta combines his technical background with
                  deep-rooted spiritual knowledge to provide solutions that
                  are both practical and transformative.
                </p>
                {/* Badges row */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span className='badge-saffron'>IIM Ahmedabad Alumnus</span>
                  <span className='badge-gold'>Vedic Expert</span>
                  <span className='badge-saffron'>15+ Years Exp</span>
                </div>
              </div>

              {/* RIGHT: Founder image -- NO dark background */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '3px solid var(--color-gold)',
                  maxWidth: '440px',
                  width: '100%',
                  background: 'var(--color-bg-secondary)',
                  padding: '10px'
                }}>
                  <img
                    src={founderImage}
                    alt='Er. Manu Gupta'
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='divider-ornamental'>*</div>

        {/* ■■ SECTION 3: CORE VALUES ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
        <section className='section' style={{ background: 'var(--color-bg-secondary)' }}>
          <div className='container'>
            {/* Heading -- proper spacing below */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className='font-serif' style={{
                fontSize: '2.5rem',
                color: 'var(--color-earth)',
                marginBottom: '1rem'
              }}>
                Our Core Values
              </h2>
              <div style={{
                width: '50px', height: '3px',
                background: 'var(--color-gold)', margin: '0 auto'
              }} />
            </div>

            {/* 4-column values grid -- all inside container */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                { icon: <ShieldCheck />, label: 'Authenticity', desc: '100% genuine, lab-certified items.' },
                { icon: <Heart />, label: 'Compassion', desc: 'Empathy in every consultation.' },
                { icon: <Users />, label: 'Inclusivity', desc: 'Open to everyone, everywhere.' },
                { icon: <Brain />, label: 'Modern Logic', desc: 'Analytical Vedic principles.' }
              ].map((v, i) => (
                <div key={i} className='card' style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  {/* Icon -- gold border, cream bg, NO dark color */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--color-gold)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-saffron)', fontSize: '1.4rem'
                  }}>
                    {v.icon}
                  </div>
                  <h3 className='font-serif' style={{
                    fontSize: '1.1rem', color: 'var(--color-earth)', margin: 0
                  }}>
                    {v.label}
                  </h3>
                  <p style={{
                    color: 'var(--color-text-muted)', fontSize: '0.875rem',
                    lineHeight: 1.6, margin: 0
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className='divider-ornamental'>*</div>

        {/* ■■ SECTION 4: TRUSTED BY THOUSANDS / TESTIMONIALS ■■■■■■■ */}
        <section className='section'>
          <div className='container'>
            {/* Heading with 3rem bottom spacing */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className='font-serif' style={{
                fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
              }}>
                Trusted by Thousands
              </h2>
              <div style={{
                width: '50px', height: '3px',
                background: 'var(--color-gold)', margin: '0 auto'
              }} />
            </div>

            {/* Testimonial cards -- 3 equal columns, inside container */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {testimonials.map((t, i) => (
                <div key={i} className='card' style={{ padding: '2rem' }}>
                  {/* Stars */}
                  <div style={{
                    color: 'var(--color-gold)', fontSize: '1rem',
                    marginBottom: '1rem', display: 'flex', gap: '2px'
                  }}>
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="var(--color-gold)" />)}
                  </div>
                  {/* Review text */}
                  <p style={{
                    color: 'var(--color-text-secondary)', lineHeight: 1.7,
                    fontSize: '0.95rem', marginBottom: '1.5rem'
                  }}>
                    "{t.comment}"
                  </p>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'var(--color-bg-secondary)',
                      border: '2px solid var(--color-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-saffron)', fontWeight: 700, fontSize: '1rem'
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{
                        fontWeight: 600, color: 'var(--color-earth)',
                        margin: 0, fontSize: '0.95rem'
                      }}>
                        {t.name}
                      </p>
                      <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.8rem', margin: 0
                      }}>
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

