import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="bg-[#fdf7ed] min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 bg-white border-2 border-[var(--color-gold)]/10"
        >
          <h1 className="text-4xl font-serif text-[var(--color-earth)] mb-8 heading-underline">Privacy Policy</h1>
          <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-6">
            <p>At ManuAstro, accessible from manuastro.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ManuAstro and how we use it.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Consent</h2>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">Information we collect</h2>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <h2 className="text-2xl font-serif text-[var(--color-earth)]">How we use your information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
