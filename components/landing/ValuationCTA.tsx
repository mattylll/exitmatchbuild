"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../Button/Button"
import { Clock, FileText, TrendingUp, Award } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

export const ValuationCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const benefits = [
    { icon: Clock, text: "2-minute assessment" },
    { icon: FileText, text: "Detailed PDF report" },
    { icon: TrendingUp, text: "Market comparables" },
    { icon: Award, text: "100% confidential" }
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-gold-50 via-white to-orange-50 py-20 isolate">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute -left-20 top-20 size-64 rounded-full bg-gold-200/30 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute -right-20 bottom-20 size-64 rounded-full bg-orange-200/30 blur-3xl"
      />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-gold-500 to-orange-500 px-4 py-1 text-sm font-semibold text-white">
                FREE VALUATION
              </span>

              {/* Heading */}
              <h2 className="mb-6 text-4xl font-bold text-navy-900 sm:text-5xl">
                Discover What Your Business is
                <span className="bg-gradient-to-r from-gold-500 to-orange-600 bg-clip-text text-transparent"> Really Worth</span>
              </h2>

              {/* Description */}
              <p className="mb-8 text-lg text-gray-600">
                Our AI-powered valuation engine analyzes your business against thousands of comparable transactions to provide an accurate, data-driven valuation range.
              </p>

              {/* Benefits List */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gold-100">
                      <benefit.icon className="size-5 text-gold-600" />
                    </div>
                    <span className="font-medium text-navy-900">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  href="/valuation"
                  className="group bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-2xl hover:shadow-gold-500/25"
                >
                  Get Your Free Valuation
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  No credit card required • Results in 2 minutes
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Report Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative lg:pl-8"
          >
            {/* Report Preview Card - with padding for floating elements */}
            <div className="relative overflow-hidden px-12 py-12">
              {/* Main Report */}
              <motion.div
                whileHover={{ rotate: -2, scale: 1.02 }}
                className="relative z-10 rounded-2xl bg-white p-8 shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-400">Business Valuation Report</h3>
                    <p className="text-3xl font-bold text-navy-900">£2.4M - £3.2M</p>
                  </div>
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white">
                    <span className="text-xl font-bold">A+</span>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="mb-6 h-32 rounded-lg bg-gradient-to-r from-gold-100 to-orange-100" />

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Multiple</p>
                    <p className="text-lg font-bold text-navy-900">4.2x</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="text-lg font-bold text-navy-900">87/100</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Demand</p>
                    <p className="text-lg font-bold text-green-600">High</p>
                  </div>
                </div>
              </motion.div>

              {/* Background Reports */}
              <motion.div
                initial={{ opacity: 0, rotate: 6 }}
                whileInView={{ opacity: 0.6, rotate: 6 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -right-4 top-4 -z-10 h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-2xl bg-white/80 shadow-xl"
              />
              <motion.div
                initial={{ opacity: 0, rotate: 12 }}
                whileInView={{ opacity: 0.4, rotate: 12 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -right-8 top-8 -z-20 h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-2xl bg-white/60 shadow-lg"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute left-4 top-16 z-20 rounded-xl bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Live market data</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute right-4 bottom-16 z-20 rounded-xl bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">50+ data points</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}