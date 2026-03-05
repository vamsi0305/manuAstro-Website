import { motion } from 'framer-motion'

export default function Terms() {
  return (
    <div className="bg-[#fdf7ed] min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 bg-white border-2 border-[var(--color-gold)]/10"
        >
          <h1 className="text-4xl font-serif text-[var(--color-earth)] mb-8 heading-underline">Terms of Service</h1>
          <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-6">
            <p>Welcome to ManuAstro. These terms and conditions outline the rules and regulations for the use of ManuAstro's Website, located at manuastro.com.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">1. Introduction</h2>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use ManuAstro if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">2. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, ManuAstro and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publishing any Website material in any other media;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>Publicly performing and/or showing any Website material;</li>
              <li>Using this Website in any way that is or may be damaging to this Website;</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
