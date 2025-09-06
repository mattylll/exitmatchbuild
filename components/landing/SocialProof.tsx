"use client"

import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import Image from "next/image"

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true })
  const displayValue = useTransform(springValue, (latest) => `${prefix}${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

export const SocialProof = () => {
  const metrics = [
    { value: 500, suffix: "+", label: "Businesses Valued", prefix: "" },
    { value: 150, suffix: "M+", label: "in Deals", prefix: "£" },
    { value: 92, suffix: "%", label: "Match Success", prefix: "" },
    { value: 48, suffix: "hrs", label: "Average Time to First Offer", prefix: "" }
  ]

  const partners = [
    { name: "Partner 1", logo: "/logos/partner1.svg" },
    { name: "Partner 2", logo: "/logos/partner2.svg" },
    { name: "Partner 3", logo: "/logos/partner3.svg" },
    { name: "Partner 4", logo: "/logos/partner4.svg" },
    { name: "Partner 5", logo: "/logos/partner5.svg" },
    { name: "Partner 6", logo: "/logos/partner6.svg" }
  ]

  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-2 text-4xl font-bold text-navy-900 sm:text-5xl">
                <AnimatedCounter 
                  value={metric.value} 
                  suffix={metric.suffix} 
                  prefix={metric.prefix}
                />
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Partners Section */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-500"
          >
            Trusted by leading UK acquisition firms
          </motion.p>

          {/* Partners Logo Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12 py-4">
              {/* Duplicate partners array for infinite scroll effect */}
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (index % partners.length) * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex size-32 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100"
                >
                  {/* Placeholder for partner logos */}
                  <div className="size-full rounded bg-gradient-to-br from-gray-200 to-gray-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full bg-gold-50 px-6 py-3">
            <svg className="size-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-left">
              <div className="font-semibold text-navy-900">FCA Regulated Partners</div>
              <div className="text-sm text-gray-600">All transactions secured and compliant</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add custom CSS for infinite scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}