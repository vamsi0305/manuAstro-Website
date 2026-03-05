import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SEOHead from '@/components/SEOHead'

const FAQS = [
  { q: 'How do I book a consultation?', a: 'You can book directly through our integrated Calendly link found on the "Personal Consultation" page.' },
  { q: 'Are your Rudraksha beads certified?', a: 'Yes, every Rudraksha bead we sell comes with an independent X-Ray lab certificate.' },
  { q: 'Do you provide international shipping?', a: 'Absolutely. We ship our sacred items to over 50 countries worldwide.' },
  { q: 'How long does a typical session last?', a: 'Most consultation sessions last between 30 to 45 minutes, depending on the complexity of the reading.' }
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-[#fdf7ed]">
      <SEOHead title="Contact Us" description="Get in touch with Er. Manu Gupta for astrology, palmistry, and Vaastu consultations. Visit our center or book online." />
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1400&auto=format&fit=crop" alt="Get in Touch" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>GET IN TOUCH</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Connect With Us
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              We are here to support your spiritual and life journey. Reach out for consultations, product queries, or general support with Vedic wisdom.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_450px] gap-16">
            {/* Contact Form - Fix 10 */}
            <div>
              <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '2rem' }}>
                Send an Enquiry
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Your Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Message</label>
                  <textarea rows={5} className="w-full px-5 py-4 rounded-xl border border-[var(--color-gold)]/10 bg-white focus:ring-2 focus:ring-[var(--color-saffron)]/10 outline-none text-[var(--color-text-primary)] transition-all" placeholder="How can we help you today?" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-5 text-lg">
                  Send Message <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <aside className="space-y-8">
              <div className="card p-8 bg-white">
                <h3 className="font-serif mb-8 text-[var(--color-earth)]" style={{ fontSize: '1.5rem' }}>Connect with Us</h3>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-bg-secondary)', border: '1px solid var(--color-gold)',
                      color: 'var(--color-gold)', flexShrink: 0
                    }}><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Call/WhatsApp</p>
                      <p className="font-serif font-bold" style={{ color: 'var(--color-earth)', fontSize: '1.1rem' }}>+91 97424 00000</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-bg-secondary)', border: '1px solid var(--color-gold)',
                      color: 'var(--color-saffron)', flexShrink: 0
                    }}><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Email Support</p>
                      <p className="font-serif font-bold" style={{ color: 'var(--color-earth)', fontSize: '1.1rem' }}>support@manuastro.com</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-bg-secondary)', border: '1px solid var(--color-gold)',
                      color: 'var(--color-earth)', flexShrink: 0
                    }}><MapPin size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Corporate Office</p>
                      <p className="font-serif font-bold" style={{ color: 'var(--color-earth)', fontSize: '1rem', lineHeight: 1.5 }}>HSR Layout, Sector 2, Bengaluru, Karnataka - 560102</p>
                    </div>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/91XXXXXXXXXX" className="btn-gold w-full justify-center py-5 gap-3" style={{ fontSize: '1.1rem' }}>
                <MessageCircle size={22} /> Chat on WhatsApp
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section - Fix 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container max-w-4xl">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="card bg-white overflow-hidden" style={{ padding: 0 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left transition-colors hover:bg-[var(--color-bg-secondary)]"
                >
                  <span className="font-serif text-lg text-earth">{faq.q}</span>
                  <ChevronDown className={`text-gold transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 text-[var(--color-text-secondary)] text-sm leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
