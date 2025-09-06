"use client"

import { motion } from "framer-motion"
import { Brain, Shield, Users, BarChart3, Lock, Headphones } from "lucide-react"

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Valuations",
      description: "Get accurate business valuations using advanced machine learning algorithms trained on thousands of UK SME transactions.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: Users,
      title: "Intelligent Buyer Matching",
      description: "Our proprietary algorithm matches your business with pre-qualified buyers based on 50+ compatibility factors.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: Lock,
      title: "Secure Deal Rooms",
      description: "Share sensitive documents safely with bank-level encryption and granular access controls for each party.",
      gradient: "from-green-500 to-teal-500",
      delay: 0.2
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Access real-time market data and comparable transactions to negotiate from a position of strength.",
      gradient: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Due Diligence Support",
      description: "Streamline the due diligence process with automated document collection and verification workflows.",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.4
    },
    {
      icon: Headphones,
      title: "Expert M&A Support",
      description: "Get guidance from experienced M&A advisors throughout your journey, from valuation to closing.",
      gradient: "from-gold-500 to-yellow-500",
      delay: 0.5
    }
  ]

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 size-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 size-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-gold-500/20 px-4 py-1 text-sm font-semibold text-gold-400">
            Platform Features
          </span>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Everything You Need for a
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Successful Exit</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Our comprehensive platform provides all the tools and support you need to maximize your business value
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-20`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`inline-flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg`}>
                    <feature.icon className="size-7" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>

                {/* Hover Effect Arrow */}
                <div className="mt-6 flex items-center text-gold-400 opacity-0 transition-all group-hover:opacity-100">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="ml-2 size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Corner Decoration */}
                <div className={`absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-gray-300">
            See how ExitMatch compares to traditional M&A advisors
          </p>
          <button className="group inline-flex items-center gap-2 rounded-full border-2 border-gold-500/50 bg-transparent px-6 py-3 font-medium text-gold-400 transition-all hover:border-gold-400 hover:bg-gold-500/10">
            View Comparison
            <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}