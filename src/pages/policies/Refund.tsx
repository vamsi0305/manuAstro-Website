import { motion } from 'framer-motion'
import SEOHead from '@/components/SEOHead'

export default function Refund() {
  return (
    <div className="bg-[#fdf7ed] min-h-screen pt-32 pb-20">
      <SEOHead title="Refund & Return Policy" description="Learn about our return eligibility and refund process for products and services." />
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 bg-white border-2 border-[var(--color-gold)]/10"
        >
          <h1 className="text-4xl font-serif text-[var(--color-earth)] mb-8 heading-underline">Refund & Return Policy</h1>
          <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-6">
            <p>We want you to be completely satisfied with your purchase from ManuAstro. If you are not satisfied, we are here to help.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Returns</h2>
            <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Refunds</h2>
            <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalized Consultation Services (once session is completed)</li>
              <li>Custom-made energized items</li>
              <li>Digital Reports</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
