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

export default function RefundPolicy() {
    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
            <SEOHead title="Refund & Return Policy" description="ManuAstro's refund and return policy for consultations and physical products. Learn about eligibility, timelines, and how to request a refund." url="https://manuastro.com/refund-policy" />

            {/* Hero */}
            <section className="section" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-saffron)', display: 'block', marginBottom: '0.75rem' }}>
                            LEGAL
                        </span>
                        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--color-earth)', marginBottom: '1rem' }}>
                            Refund &amp; Return Policy
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

                        <Section title="1. Consultation Services">
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>Completed sessions:</strong> No refund is offered once a consultation session has been completed</li>
                                <li><strong>Rescheduling:</strong> You may reschedule your appointment up to 24 hours before the scheduled time at no extra charge</li>
                                <li><strong>No-show policy:</strong> If you miss a session without prior notice, the session fee is forfeited</li>
                                <li><strong>Technical issues:</strong> If the session cannot proceed due to technical issues on our end, a full refund or free rescheduling will be offered</li>
                            </ul>
                        </Section>

                        <Section title="2. Physical Products">
                            <p>We accept returns for physical products (Gemstones, Rudraksha, Yantras) under the following conditions:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li><strong>Eligibility:</strong> Return request must be raised within 7 days of delivery</li>
                                <li><strong>Condition:</strong> Product must be in original packaging, unused, and undamaged</li>
                                <li><strong>Damaged/Defective:</strong> If the product arrives damaged or defective, we will provide a full replacement or refund</li>
                                <li><strong>Wrong item:</strong> If you received the wrong item, we will arrange a replacement at no cost</li>
                            </ul>
                        </Section>

                        <Section title="3. How to Request a Refund">
                            <p>To initiate a return or refund:</p>
                            <ol style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>Email <a href="mailto:admin@manuastro.com" style={{ color: 'var(--color-saffron)' }}>admin@manuastro.com</a> with subject: "Refund Request - [Order ID]"</li>
                                <li>Include your Order ID and the reason for the return</li>
                                <li>Attach photos if the product is damaged or defective</li>
                                <li>Our team will respond within 24–48 business hours</li>
                                <li>Approved returns must be shipped back within 5 days of approval</li>
                            </ol>
                        </Section>

                        <Section title="4. Refund Timeline">
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                <li>Approved refunds are processed within <strong>5–7 business days</strong></li>
                                <li>Refund will be credited to the original payment method used at purchase</li>
                                <li>Bank processing time may add an additional 2–3 business days</li>
                                <li>Shipping charges are non-refundable unless the return is due to our error</li>
                            </ul>
                        </Section>

                        <Section title="5. Non-Refundable Items">
                            <p>The following items are not eligible for return or refund:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                                <li>Energised and consecrated (pran pratishtha) items</li>
                                <li>Personalised Yantras engraved with specific names or birth details</li>
                                <li>Digital products and downloadable content</li>
                                <li>Products with broken seals or showing signs of use</li>
                                <li>Completed consultation sessions</li>
                            </ul>
                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
                                <strong>Note:</strong> We take great care to package and ship every product safely. In case of any issues, please contact us at <a href="mailto:admin@manuastro.com" style={{ color: 'var(--color-saffron)' }}>admin@manuastro.com</a> and we will do our best to resolve it.
                            </p>
                        </Section>

                    </div>
                </div>
            </section>
        </div>
    )
}
