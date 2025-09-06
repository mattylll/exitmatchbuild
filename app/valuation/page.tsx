import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Business Valuation | ExitMatch",
  description: "Get an instant AI-powered valuation of your UK SME. Quick, accurate, and completely free.",
}

export default function ValuationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Get Your Free 
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Business Valuation</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Our AI-powered valuation tool analyzes your business in just 2 minutes using real market data and industry benchmarks.
            </p>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 inline-block">
              <p className="text-green-400 font-medium">✅ 100% Free • No obligations • Instant results</p>
            </div>
          </div>

          {/* Valuation Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Industry</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none">
                    <option value="">Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail</option>
                    <option value="services">Professional Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Annual Revenue (£)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none"
                    placeholder="e.g. 1000000"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Annual Profit (£)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none"
                    placeholder="e.g. 200000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Number of Employees</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none">
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-250">101-250</option>
                    <option value="250+">250+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Years in Operation</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none"
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none"
                  placeholder="your.email@company.com"
                />
                <p className="text-sm text-gray-400 mt-1">We'll send your valuation report to this email</p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-600 text-navy-900 font-bold py-4 rounded-xl transition-all hover:shadow-xl"
              >
                Get My Free Valuation
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                By clicking "Get My Free Valuation", you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold text-gold mb-2">500+</div>
              <p className="text-gray-300">Businesses Valued</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold mb-2">92%</div>
              <p className="text-gray-300">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold mb-2">2 min</div>
              <p className="text-gray-300">Average Completion Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}