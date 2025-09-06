"use client"

import { motion } from "framer-motion"
import { Button } from "../Button/Button"
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react"
import { useEffect, useState } from "react"

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setIsLoaded(true)
    // Generate particles only on client-side to avoid hydration mismatch
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 1000,
      y: Math.random() * 500,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
    setParticles(generatedParticles)
  }, [])

  const trustMetrics = [
    { icon: TrendingUp, value: "500+", label: "Businesses Valued" },
    { icon: Shield, value: "92%", label: "Match Success" },
    { icon: Users, value: "2000+", label: "Active Buyers" }
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/20 to-navy-900/40" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0" suppressHydrationWarning>
        {isLoaded && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute size-1 rounded-full bg-gold-400/20"
            initial={{ 
              x: particle.x,
              y: particle.y
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen items-center gap-12 py-20 lg:grid-cols-2">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
              </span>
              <span className="text-sm font-medium text-gold-400">
                Trusted by 500+ UK SMEs
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
              >
                Sell Your Business at the{" "}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Right Price
                </span>
                , to the{" "}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Right Buyer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-300"
              >
                AI-powered valuations and intelligent matching for UK SMEs. 
                Get your free business valuation in just 2 minutes.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href="/valuation"
                className="group bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-lg font-semibold text-navy-900 transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-2xl hover:shadow-gold-500/25"
              >
                Get Free Valuation
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="/buyers"
                intent="secondary"
                className="border-2 border-gray-600 bg-transparent px-8 py-4 text-lg text-white hover:border-gold-500 hover:bg-gold-500/10"
              >
                I'm a Buyer
              </Button>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 flex justify-center">
                    <metric.icon className="size-6 text-gold-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Business Metrics Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Mock Dashboard */}
            <div className="relative size-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm">
              {/* Dashboard Header */}
              <div className="border-b border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Business Valuation Dashboard</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">Live</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-6 p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-gray-400">Estimated Value</p>
                  <p className="text-2xl font-bold text-gold-400">£2.4M - £3.2M</p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12% vs sector</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-gray-400">Confidence Score</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-600">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isLoaded ? "92%" : 0 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Chart Representation */}
              <div className="px-6 pb-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-4 text-sm text-gray-400">Revenue Growth Trend</p>
                  <div className="flex h-32 items-end justify-between gap-2">
                    {[65, 78, 82, 95, 88, 92, 100, 87, 94, 89, 96, 100].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: isLoaded ? `${height}%` : 0 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                        className="w-full rounded-t bg-gradient-to-t from-gold-600 to-gold-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-2 text-sm">
                  <span className="text-gray-300">Last updated: 2 minutes ago</span>
                  <span className="text-gold-400">View Full Report →</span>
                </div>
              </div>
            </div>
            
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gold-500/20 via-transparent to-navy-800/50" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="size-6 rounded-full border-2 border-gray-400"
          >
            <div className="mx-auto mt-1 size-1 rounded-full bg-gray-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}