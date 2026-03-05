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

export default function PrivacyPolicy() {
    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <SEOHead title="Privacy Policy" description="Learn how ManuAstro collects, uses, and protects your personal information in compliance with the Indian IT Act 2000 and DPDP Act 2023." url="https://manuastro.com/privacy-policy" />

            {/* Hero */}
            <section className="section" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-saffron)', display: 'block', marginBottom: '0.75rem' }}>
                            LEGAL
                        </span>
                        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                            Privacy Policy
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

                        <Section title="1. Information We Collect">
                            <p>We collect the following personal information when you use ManuAstro:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li><strong>Identity:</strong> Full name, date of birth, time and place of birth (required for astrology chart generation)</li>
                                <li><strong>Contact:</strong> Email address, phone number, shipping address</li>
                                <li><strong>Payment:</strong> Transaction IDs and payment references (we never store full card details)</li>
                                <li><strong>Usage:</strong> Pages visited, products viewed, consultation history</li>
                                <li><strong>Device:</strong> Browser type, IP address, operating system</li>
                            </ul>
                        </Section>

                        <Section title="2. How We Use Your Information">
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li>Processing and fulfilling your product orders</li>
                                <li>Providing personalised astrology consultations and chart generation</li>
                                <li>Sending order confirmations, shipping updates, and consultation reminders</li>
                                <li>Improving our services and personalising your experience</li>
                                <li>Sending newsletters only with your explicit consent</li>
                                <li>Complying with legal obligations under Indian law</li>
                            </ul>
                        </Section>

                        <Section title="3. Data Storage & Security">
                            <p>Your data is stored on secured servers with industry-standard encryption (AES-256). We implement appropriate technical and organisational measures including:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>SSL/TLS encryption for all data in transit</li>
                                <li>Encrypted databases with access controls</li>
                                <li>Regular security audits and updates</li>
                                <li><strong>We do not sell, rent, or trade your personal information to third parties.</strong></li>
                            </ul>
                            <p style={{ marginTop: '0.75rem' }}>Data may be shared with trusted payment processors (Razorpay) and shipping partners solely to fulfil your orders.</p>
                        </Section>

                        <Section title="4. Your Rights">
                            <p>Under the DPDP Act 2023, you have the right to:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                                <li><strong>Objection:</strong> Object to specific processing activities</li>
                            </ul>
                            <p style={{ marginTop: '0.75rem' }}>To exercise these rights, email us at <a href="mailto:admin@manuastro.com" style={{ color: 'var(--color-saffron)' }}>admin@manuastro.com</a></p>
                        </Section>

                        <Section title="5. Cookies">
                            <p>We use cookies to:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li><strong>Session cookies:</strong> Keep you logged in during your visit</li>
                                <li><strong>Analytics:</strong> Understand how visitors use our website (anonymised)</li>
                                <li><strong>Preferences:</strong> Remember your language and display settings</li>
                            </ul>
                            <p style={{ marginTop: '0.75rem' }}>You can disable cookies in your browser settings. Some features may not function properly without cookies.</p>
                        </Section>

                        <Section title="6. Governing Law">
                            <p>This Privacy Policy is governed by the laws of India, including:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>The Information Technology Act, 2000</li>
                                <li>The Digital Personal Data Protection (DPDP) Act, 2023</li>
                                <li>The IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                            </ul>
                            <p style={{ marginTop: '0.75rem' }}>Jurisdiction: Courts of New Delhi, India.</p>
                        </Section>

                        <Section title="7. Contact Us">
                            <p>For any privacy-related queries or to exercise your data rights:</p>
                            <div style={{ marginTop: '0.75rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
                                <p><strong>ManuAstro</strong></p>
                                <p>Email: <a href="mailto:admin@manuastro.com" style={{ color: 'var(--color-saffron)' }}>admin@manuastro.com</a></p>
                                <p>Address: HSR Layout, Bengaluru, Karnataka, India</p>
                            </div>
                        </Section>

                    </div>
                </div>
            </section>
        </div>
    )
}
