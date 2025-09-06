"use client"

import { motion, useAnimationControls } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const controls = useAnimationControls()

  const testimonials = [
    {
      type: "seller",
      name: "James Mitchell",
      company: "TechFlow Solutions",
      role: "Founder & CEO",
      image: "/avatars/james.jpg",
      content: "ExitMatch helped me sell my software business for 30% above my initial expectations. The AI valuation was spot-on, and I had multiple offers within two weeks.",
      dealSize: "£3.2M",
      sector: "SaaS",
      rating: 5,
      highlight: "30% above expectations"
    },
    {
      type: "buyer",
      name: "Sarah Chen",
      company: "Apex Capital Partners",
      role: "Investment Director",
      image: "/avatars/sarah.jpg",
      content: "As a PE firm, we've sourced 5 quality deals through ExitMatch. The pre-vetted opportunities save us months of sourcing time.",
      dealSize: "£15M+ Total",
      sector: "Multiple",
      rating: 5,
      highlight: "5 successful acquisitions"
    },
    {
      type: "seller",
      name: "Robert Williams",
      company: "GreenTech Manufacturing",
      role: "Managing Director",
      image: "/avatars/robert.jpg",
      content: "The platform's buyer matching was incredible. We found the perfect strategic buyer who understood our business vision.",
      dealSize: "£8.5M",
      sector: "Manufacturing",
      rating: 5,
      highlight: "Perfect strategic fit"
    },
    {
      type: "buyer",
      name: "Emma Thompson",
      company: "Growth Ventures UK",
      role: "Partner",
      image: "/avatars/emma.jpg",
      content: "ExitMatch's deal room made due diligence seamless. Everything was organized and secure. Closed our deal in just 6 weeks.",
      dealSize: "£4.7M",
      sector: "E-commerce",
      rating: 5,
      highlight: "6-week close"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-full -translate-x-1/2 bg-gradient-to-b from-gold-500/10 to-transparent" />
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
            SUCCESS STORIES
          </span>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Trusted by
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Sellers & Buyers</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Join hundreds of successful business exits and acquisitions
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="mb-12">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="relative rounded-3xl bg-white/10 p-8 backdrop-blur-sm lg:p-12">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                <Quote className="size-6 text-white" />
              </div>

              {/* Type Badge */}
              <div className="mb-6 flex items-center justify-between">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  testimonials[activeIndex].type === 'seller' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {testimonials[activeIndex].type}
                </span>
                <div className="flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="size-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <blockquote className="mb-6 text-xl text-white lg:text-2xl">
                "{testimonials[activeIndex].content}"
              </blockquote>

              {/* Highlight */}
              <div className="mb-6 inline-block rounded-lg bg-gold-500/20 px-4 py-2">
                <span className="font-semibold text-gold-400">
                  {testimonials[activeIndex].highlight}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-700" />
                  <div>
                    <div className="font-semibold text-white">{testimonials[activeIndex].name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Deal Size</div>
                  <div className="font-semibold text-gold-400">{testimonials[activeIndex].dealSize}</div>
                  <div className="text-xs text-gray-500">{testimonials[activeIndex].sector}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Navigation Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`size-2 rounded-full transition-all ${
                index === activeIndex 
                  ? 'w-8 bg-gold-500' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Additional Testimonial Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-300">
              "The valuation was incredibly accurate. Closed in 8 weeks."
            </p>
            <div className="text-sm">
              <div className="font-medium text-white">David Brown</div>
              <div className="text-gray-500">Sold for £1.8M</div>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-300">
              "Found 3 great opportunities in my first month as a buyer."
            </p>
            <div className="text-sm">
              <div className="font-medium text-white">Lisa Anderson</div>
              <div className="text-gray-500">Active Buyer</div>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-300">
              "Professional, efficient, and truly game-changing platform."
            </p>
            <div className="text-sm">
              <div className="font-medium text-white">Mark Taylor</div>
              <div className="text-gray-500">Sold for £5.3M</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}