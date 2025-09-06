"use client"

import { motion } from "framer-motion"
import { Button } from "../Button/Button"
import { Search, Filter, Bell, Shield, BarChart3, Users } from "lucide-react"

export const BuyerSection = () => {
  const buyerBenefits = [
    {
      icon: Search,
      title: "Pre-Vetted Opportunities",
      description: "Access a curated pipeline of acquisition opportunities that match your investment criteria."
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Filter businesses by sector, location, revenue, EBITDA, and 20+ other criteria."
    },
    {
      icon: Bell,
      title: "Real-Time Alerts",
      description: "Get notified instantly when businesses matching your criteria become available."
    },
    {
      icon: Shield,
      title: "Verified Financials",
      description: "All financial data is verified through our due diligence process before listing."
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Access comprehensive market data and comparable transaction analysis."
    },
    {
      icon: Users,
      title: "Direct Communication",
      description: "Connect directly with sellers through our secure messaging platform."
    }
  ]

  const stats = [
    { value: "2000+", label: "Active Buyers" },
    { value: "£500K-£50M", label: "Deal Range" },
    { value: "15", label: "Industry Sectors" },
    { value: "24hrs", label: "Average Response" }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            FOR BUYERS
          </span>
          <h2 className="mb-4 text-4xl font-bold text-navy-900 sm:text-5xl">
            Find Your Next
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Strategic Acquisition</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join thousands of PE firms, strategic buyers, and entrepreneurs finding quality acquisition opportunities
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Benefits Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {buyerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl">
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <benefit.icon className="size-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-navy-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-white lg:p-12">
              {/* Decorative Elements */}
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-cyan-500/20 blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-bold">
                  Start Finding Opportunities Today
                </h3>
                <p className="mb-6 text-gray-300">
                  Create your buyer profile and get matched with businesses that meet your exact criteria.
                </p>

                {/* Features List */}
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-green-500">
                      <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Free to register and browse</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-green-500">
                      <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>No success fees on smaller deals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-green-500">
                      <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Exclusive off-market opportunities</span>
                  </li>
                </ul>

                <Button
                  href="/buyers/register"
                  className="w-full bg-white py-4 text-lg font-semibold text-navy-900 transition-all hover:bg-gray-100"
                >
                  Register as Buyer
                </Button>

                <p className="mt-4 text-center text-sm text-gray-400">
                  Join 2000+ active buyers on the platform
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}