import { motion } from 'framer-motion'
import SEOHead from '@/components/SEOHead'

export default function Shipping() {
  return (
    <div className="bg-[#fdf7ed] min-h-screen pt-32 pb-20">
      <SEOHead title="Shipping Policy" description="Details about our secure, eco-friendly shipping methods for domestic and international orders." />
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 bg-white border-2 border-[var(--color-gold)]/10"
        >
          <h1 className="text-4xl font-serif text-[var(--color-earth)] mb-8 heading-underline">Shipping Policy</h1>
          <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-6">
            <p>At ManuAstro, we strive to deliver your sacred items in the most efficient and respectful manner possible.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Domestic Shipping (India)</h2>
            <p>Orders are typically processed within 2-3 business days. Delivery usually takes 5-7 business days depending on your location.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">International Shipping</h2>
            <p>We ship to over 50 countries. International delivery typically takes 10-15 business days. Customs duties, if any, are the responsibility of the customer.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Tracking Your Order</h2>
            <p>Once your order has shipped, you will receive an email with a tracking number and a link to track your package.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Packaging</h2>
            <p>All items are securely packed in premium, eco-friendly packaging to ensure they reach you in perfect condition.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
