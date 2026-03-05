import SEOHead from '@/components/SEOHead'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--color-earth)', marginBottom: '1rem', borderBottom: '2px solid var(--color-gold)', paddingBottom: '0.5rem' }}>
            {title}
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            {children}
        </div>
    </div>
)

export default function TermsOfService() {
    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <SEOHead title="Terms of Service" description="Read the terms and conditions governing your use of ManuAstro's services, products, and website." url="https://manuastro.com/terms-of-service" />

            {/* Hero */}
            <section className="section" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-saffron)', display: 'block', marginBottom: '0.75rem' }}>
                            LEGAL
                        </span>
                        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                            Terms of Service
                        </h1>
                        <div style={{ width: '50px', height: '3px', background: 'var(--color-gold)', margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Last updated: March 2026</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section" style={{ paddingTop: '0' }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 2.5rem' }}>

                        <Section title="1. Acceptance of Terms">
                            <p>By accessing or using the ManuAstro website, mobile application, or services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                            <p style={{ marginTop: '0.75rem' }}>These terms apply to all visitors, users, and others who access or use our services.</p>
                        </Section>

                        <Section title="2. Services Description">
                            <p>ManuAstro provides the following services:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li><strong>Astrology Consultations:</strong> Vedic astrology readings, palm reading, face reading, and Vaastu Shastra analysis by Er. Manu Gupta</li>
                                <li><strong>Sacred Products:</strong> Lab-certified natural gemstones, energised Rudraksha beads, and sacred Yantras</li>
                                <li><strong>Digital Content:</strong> Horoscopes, astrology articles, and educational material</li>
                                <li><strong>Corporate Services:</strong> Astrology-based team building and organisational wellness programs</li>
                            </ul>
                        </Section>

                        <Section title="3. User Responsibilities">
                            <p>When using our services, you agree to:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>Provide accurate and truthful information during registration and consultations</li>
                                <li>Not misuse, reproduce, or commercially exploit our content without permission</li>
                                <li>Not use our services for any unlawful or fraudulent purpose</li>
                                <li>Respect the spiritual and cultural significance of our products and services</li>
                                <li>Not engage in any behaviour that disrupts or interferes with our services</li>
                                <li>Be at least 18 years of age, or have parental consent</li>
                            </ul>
                        </Section>

                        <Section title="4. Disclaimer">
                            <p style={{ fontWeight: 600, color: 'var(--color-earth)' }}>Important: Astrology is for guidance and spiritual exploration only.</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>Our astrology consultations are NOT a substitute for medical, legal, financial, or psychological advice</li>
                                <li>Results from consultations are based on traditional Vedic interpretation and may vary</li>
                                <li>Gemstone, Rudraksha, and Yantra benefits are based on traditional beliefs and are not scientifically guaranteed</li>
                                <li>ManuAstro shall not be liable for any decisions made solely based on astrological guidance</li>
                            </ul>
                        </Section>

                        <Section title="5. Intellectual Property">
                            <p>All content on ManuAstro — including text, images, audio, video, logos, and software — is the intellectual property of ManuAstro and is protected by Indian copyright law.</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>You may not reproduce, distribute, or create derivative works without explicit written permission</li>
                                <li>Personal, non-commercial sharing of links is permitted</li>
                                <li>Unauthorised use will be subject to legal action</li>
                            </ul>
                        </Section>

                        <Section title="6. Payment Terms">
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li>All prices are listed and charged in Indian Rupees (INR)</li>
                                <li>GST is included in the displayed prices where applicable</li>
                                <li>Payments are processed securely via Razorpay</li>
                                <li>ManuAstro does not store credit/debit card information</li>
                                <li>Subscription or consultation fees are charged as displayed at the time of booking</li>
                            </ul>
                        </Section>

                        <Section title="7. Governing Law">
                            <p>These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
                            <p style={{ marginTop: '0.75rem' }}>For any queries, contact <a href="mailto:admin@manuastro.com" style={{ color: 'var(--color-saffron)' }}>admin@manuastro.com</a></p>
                        </Section>

                    </div>
                </div>
            </section>
        </div>
    )
}
