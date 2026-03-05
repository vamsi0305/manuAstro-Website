import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Star, Sparkles } from 'lucide-react'

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', date: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', date: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', date: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', date: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', date: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', date: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', date: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', date: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', date: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: '♑', date: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', date: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', date: 'Feb 19 - Mar 20' }
]

const HOROSCOPE_DATA: Record<string, Record<string, string>> = {
  Today: {
    Aries: 'Today is a day for bold moves. Your energy is peaking, making it perfect to start new projects.',
    Taurus: 'Financial stability is highlighted. A small investment made today could lead to significant gains.',
    Gemini: 'Communication is your strength today. Reach out to old friends or clear up misunderstandings.',
    Cancer: 'Emotional balance is key today. Focus on self-care and your domestic surroundings for peace.',
    Leo: 'Your leadership qualities shine today. Take charge of a group project for maximum impact.',
    Virgo: 'Attention to detail will pay off. Organize your workspace to boost your productivity significantly.',
    Libra: 'Harmony in relationships is expected. It is a great time to resolve any lingering conflicts.',
    Scorpio: 'Your intuition is heightened today. Trust your gut feelings when making important personal decisions.',
    Sagittarius: 'Adventure calls your name today. Try something new or plan a future trip for excitement.',
    Capricorn: 'Disciplined effort brings rewards today. Stay focused on your long-term goals for success.',
    Aquarius: 'Your innovative ideas are noticed. Share your unique perspective with colleagues for better collaboration.',
    Pisces: 'Creativity flows naturally today. Spend time on artistic pursuits to find inner fulfillment and joy.'
  },
  'This Week': {
    Aries: 'This week focuses on career growth. Expect a positive response from your superiors regarding your recent work.',
    Taurus: 'Relationships take center stage. Spend quality time with loved ones to strengthen your bond effectively.',
    Gemini: 'Focus on your health this week. Incorporating a light exercise routine will make a massive difference.',
    Cancer: 'Home related matters require attention. You might find yourself planning a small renovation or reorganization.',
    Leo: 'Social opportunities abound this week. Networking could lead to an unexpected and exciting professional lead.',
    Virgo: 'Your analytical skills are sharp. Use them to solve a complex problem that has been bothering you.',
    Libra: 'Balance in all things is vital. Manage your time wisely between work and leisure for well-being.',
    Scorpio: 'Transformation is the theme now. Letting go of old habits will pave the way for progress.',
    Sagittarius: 'New learning experiences await you. Consider enrolling in a short course or reading a new book.',
    Capricorn: 'Financial planning is encouraged now. Review your budget to ensure you are on the right track.',
    Aquarius: 'Social connections are strengthened now. Reach out to community groups for support and shared interests.',
    Pisces: 'Spiritual growth is highlighted now. Meditation or quiet reflection will provide the clarity you seek.'
  },
  'This Month': {
    Aries: 'March 2026 is a transformative month for you. New opportunities in personal growth will arise frequently.',
    Taurus: 'Business travels are likely. These trips will be productive and could lead to long-term partnerships.',
    Gemini: 'Creativity is at its all-time high. Use this month to express yourself through art or writing.',
    Cancer: 'Emotional security is your focus. Strengthening family ties will bring a sense of deep contentment.',
    Leo: 'Self-expression is favored this month. Your charisma will open doors in both personal and professional life.',
    Virgo: 'Health and wellness are priorities. Establishing a solid routine will improve your energy levels greatly.',
    Libra: 'Partnerships are under the spotlight. Collaborative efforts will yield much better results than solo projects.',
    Scorpio: 'Deep insights come your way. Research and investigation will help you uncover hidden truths and facts.',
    Sagittarius: 'Expanding horizons is the goal. Look for ways to broaden your knowledge and life experiences.',
    Capricorn: 'Ambitious goals are within reach. Your hard work over the past months begins to pay off.',
    Aquarius: 'Unconventional thinking leads to success. Break away from traditional methods to find surprising new solutions.',
    Pisces: 'Intuitive guidance is very strong. Following your inner voice will lead you to the right path.'
  }
}

export default function Horoscope() {
  const [activeTab, setActiveTab] = useState('Today')

  return (
    <div className="bg-[#fdf7ed]">
      {/* ════ HERO ════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1400&auto=format&fit=crop" alt="Cosmic Guidance" className="w-full h-full object-cover opacity-15" />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', opacity: 0.75 }} />
        </div>

        <div className="container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>COSMIC GUIDANCE</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', color: 'var(--color-earth)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Daily Horoscope 2026
            </h1>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-gold)', marginBottom: '1.5rem' }} />
            <p className="font-sans" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
              Get accurate predictions based on Vedic Astrology principles to plan your day, week, and month with clarity and cosmic alignment.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-ornamental">*</div>

      {/* Tabs - Fix 10 */}
      <div className="container mt-12 mb-12 flex justify-center">
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl shadow-xl border border-[var(--color-gold)]/10">
          {['Today', 'This Week', 'This Month'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab
                ? 'bg-[var(--color-saffron)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-earth)] hover:bg-[var(--color-gold)]/10'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Zodiac Grid - Fix 5 */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ZODIAC_SIGNS.map((sign, i) => (
              <motion.div
                key={sign.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="card p-8 group transition-all bg-white text-center"
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--color-gold)',
                  background: 'var(--color-bg-secondary)',
                  color: 'var(--color-saffron)',
                  fontSize: '1.75rem', marginBottom: '1rem'
                }}>
                  <span className="leading-none">{sign.symbol}</span>
                </div>

                <div className="mb-4">
                  <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-earth)', marginBottom: '0.25rem' }}>{sign.name}</h3>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{sign.date}</span>
                </div>

                <div className="divider-ornamental text-[10px] opacity-20 mb-4 text-[var(--color-gold)]" style={{ margin: '1rem 0' }}>✦</div>

                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }} className="line-clamp-4">
                  {HOROSCOPE_DATA[activeTab][sign.name]}
                </p>

                <div className="mt-8">
                  <button style={{
                    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.1em', color: 'var(--color-saffron)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'none', border: 'none', cursor: 'pointer'
                  }} className="mx-auto hover:gap-3 transition-all">
                    Read More <Sparkles size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promo - Fix 10 */}
      <section className="section bg-[#faf2e2]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="font-serif" style={{
              fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem'
            }}>
              Personalized Analysis
            </h2>
            <div style={{
              width: '50px', height: '3px',
              background: 'var(--color-gold)', margin: '0 auto'
            }} />
          </div>

          <div className="card p-12 bg-white flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="font-serif" style={{ fontSize: '2rem', color: 'var(--color-earth)' }}>Go Beyond General Predictions</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>A detailed Janam Kundli analysis provides personalized timings (Dashas) and remedies specific to your birth time.</p>
              <a href="https://calendly.com/manuastro2022/30min" className="btn-primary">Book Personal Reading</a>
            </div>
            <div className="w-64 h-64 bg-gold/10 rounded-3xl rotate-6 flex items-center justify-center relative overflow-hidden">
              <span className="text-[120px] opacity-10">🕉</span>
              <div className="absolute inset-4 rounded-2xl border-2 border-gold/20 flex flex-col items-center justify-center text-center p-4">
                <Calendar className="text-saffron mb-2" />
                <p className="text-xs font-bold text-earth leading-tight">Your 2026 Year-Ahead Report</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
