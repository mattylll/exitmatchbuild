'use client'

import { useState } from 'react'
import { ValuationWizard } from '@/components/valuation/ValuationWizard'
import { Button } from '@/components/Button/Button'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calculator, 
  ChartBar, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'

export default function ValuationPage() {
  const [showWizard, setShowWizard] = useState(false)

  if (showWizard) {
    return <ValuationWizard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8"
          >
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Trusted by 10,000+ UK Business Owners</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your Business&apos;s 
            <span className="block mt-2 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              True Market Value
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get an instant, AI-powered valuation of your UK business using real market data, 
            industry benchmarks, and recent comparable transactions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => setShowWizard(true)}
              size="lg"
              className="group"
            >
              Get Free Valuation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Watch Demo (2 min)
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>100% Free & Confidential</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Results in 2 Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FileText className="w-5 h-5 text-green-400" />
              <span>Detailed PDF Report</span>
            </div>
          </div>
        </motion.div>

        {/* Value Props */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3 Valuation Methods</h3>
            <p className="text-gray-400">
              We use revenue multiples, EBITDA multiples, and asset-based valuations 
              for comprehensive accuracy.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
              <ChartBar className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Industry Benchmarks</h3>
            <p className="text-gray-400">
              Compare against 50,000+ UK business sales and sector-specific 
              multiples updated monthly.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Growth Insights</h3>
            <p className="text-gray-400">
              Receive personalized recommendations to increase your business 
              value before selling.
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Business Details",
                description: "Tell us about your industry, revenue, and operations"
              },
              {
                step: "2",
                title: "Financial Metrics",
                description: "Share your profit margins and growth rate"
              },
              {
                step: "3",
                title: "AI Analysis",
                description: "Our algorithms analyze 20+ valuation factors"
              },
              {
                step: "4",
                title: "Get Results",
                description: "Receive your valuation range and detailed report"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <p className="text-gray-300 text-lg italic mb-4">
              "The valuation tool gave me incredible insights into my business value. 
              The recommendations helped me increase my sale price by £200,000!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-500 rounded-full"></div>
              <div>
                <p className="text-white font-bold">James Mitchell</p>
                <p className="text-gray-400 text-sm">Sold Manufacturing Business for £2.3M</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <Button
            onClick={() => setShowWizard(true)}
            size="xl"
            className="group"
          >
            Start Your Free Valuation Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-gray-400 text-sm mt-4">
            No credit card required • 100% confidential • Takes 2 minutes
          </p>
        </motion.div>
      </div>
    </div>
  )
}