"use client"

import { motion } from "framer-motion"
import { FileText, Search, Users, CheckCircle } from "lucide-react"

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Complete Your Profile",
      description: "Tell us about your business with our intelligent questionnaire. Get an instant AI-powered valuation based on real market data.",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      duration: "2 minutes"
    },
    {
      number: "02", 
      title: "Get Matched with Buyers",
      description: "Our AI algorithm matches you with pre-qualified buyers actively looking for businesses like yours.",
      icon: Search,
      color: "from-purple-500 to-pink-500",
      duration: "24-48 hours"
    },
    {
      number: "03",
      title: "Negotiate & Close",
      description: "Use our secure deal room to share documents, negotiate terms, and close the deal with full support from our M&A experts.",
      icon: Users,
      color: "from-gold-500 to-orange-500",
      duration: "4-8 weeks"
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-gold-100/20 to-transparent blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-gold-100 px-4 py-1 text-sm font-semibold text-gold-700">
            How It Works
          </span>
          <h2 className="mb-4 text-4xl font-bold text-navy-900 sm:text-5xl">
            Three Simple Steps to
            <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent"> Success</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our streamlined process makes selling your business straightforward and stress-free
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-1/2 top-20 hidden h-[calc(100%-160px)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-gray-300 via-gold-300 to-gray-300 lg:block" />
          
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl bg-white p-8 shadow-xl transition-all hover:shadow-2xl"
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-8">
                      <span className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} px-4 py-2 text-sm font-bold text-white`}>
                        STEP {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`mb-4 mt-4 inline-flex size-16 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} p-3 text-white`}>
                      <step.icon className="size-8" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="mb-3 text-2xl font-bold text-navy-900">{step.title}</h3>
                    <p className="mb-4 text-gray-600">{step.description}</p>

                    {/* Duration Badge */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="size-4 text-green-500" />
                      <span>Typical duration: <strong className="text-navy-900">{step.duration}</strong></span>
                    </div>
                  </motion.div>
                </div>

                {/* Center Indicator - Desktop */}
                <div className="relative hidden lg:block">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex size-20 items-center justify-center"
                  >
                    <div className={`absolute size-20 rounded-full bg-gradient-to-br ${step.color} opacity-20`} />
                    <div className={`absolute size-14 rounded-full bg-gradient-to-br ${step.color} opacity-40`} />
                    <div className={`relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white font-bold`}>
                      {index + 1}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-gold-50 to-orange-50 p-8 sm:flex-row">
            <div className="text-left">
              <h3 className="mb-1 text-xl font-bold text-navy-900">Ready to get started?</h3>
              <p className="text-gray-600">Join hundreds of successful business exits</p>
            </div>
            <button className="group rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3 font-semibold text-white transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-xl">
              Start Your Journey
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}