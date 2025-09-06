"use client"

import { motion } from "framer-motion"
import { Button } from "../Button/Button"
import { ArrowRight, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"

export const FooterCTA = () => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail("")
    }, 3000)
  }

  const benefits = [
    "Weekly M&A market insights",
    "Exclusive off-market opportunities",
    "Industry valuation trends",
    "Success stories & case studies"
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -left-32 top-32 size-64 rounded-full bg-gold-500/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -right-32 bottom-32 size-64 rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/10 backdrop-blur-sm"
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 size-40 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-orange-400/20 blur-3xl" />
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Main CTA */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                    Ready to Make Your
                    <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Next Move?</span>
                  </h2>
                  <p className="mb-8 text-lg text-gray-300">
                    Whether you're looking to sell your business or find your next acquisition, 
                    ExitMatch makes the process simple, secure, and successful.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      href="/valuation"
                      className="group bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-lg font-semibold text-navy-900 transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-2xl hover:shadow-gold-500/25"
                    >
                      Start Selling
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      href="/buyers/register"
                      className="border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      Browse Opportunities
                    </Button>
                  </div>

                  {/* Trust Indicator */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="size-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-gray-600 to-gray-700" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">
                      Join <span className="font-semibold text-white">2,500+ businesses</span> on ExitMatch
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Newsletter */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Mail className="size-6 text-gold-400" />
                    <h3 className="text-xl font-bold text-white">M&A Insider Newsletter</h3>
                  </div>
                  
                  <p className="mb-6 text-gray-300">
                    Get weekly insights into the UK M&A market
                  </p>

                  {/* Benefits List */}
                  <ul className="mb-6 space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="size-4 shrink-0 text-green-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Newsletter Form */}
                  <form onSubmit={handleSubmit} className="space-y-3" suppressHydrationWarning>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                    <button
                      type="submit"
                      disabled={subscribed}
                      className={`w-full rounded-lg px-4 py-3 font-medium transition-all ${
                        subscribed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-navy-900 hover:bg-gray-100'
                      }`}
                    >
                      {subscribed ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="size-5" />
                          Subscribed!
                        </span>
                      ) : (
                        'Subscribe for Free'
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-white/10 pt-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/about" className="text-gray-400 transition-colors hover:text-white">About Us</a>
              <a href="/how-it-works" className="text-gray-400 transition-colors hover:text-white">How It Works</a>
              <a href="/pricing" className="text-gray-400 transition-colors hover:text-white">Pricing</a>
              <a href="/resources" className="text-gray-400 transition-colors hover:text-white">Resources</a>
              <a href="/contact" className="text-gray-400 transition-colors hover:text-white">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}