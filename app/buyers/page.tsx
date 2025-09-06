import { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Buyers | ExitMatch",
  description: "Find and acquire UK SMEs with AI-powered matching and comprehensive business intelligence.",
}

export default function BuyersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Find Your Next 
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Acquisition</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12">
            Access pre-vetted UK SMEs, detailed financials, and AI-powered matching to find the perfect acquisition opportunity.
          </p>

          {/* Key Features for Buyers */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-navy-900 font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Matching</h3>
              <p className="text-gray-300">AI algorithms match you with businesses that fit your investment criteria and strategic goals.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-navy-900 font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Due Diligence</h3>
              <p className="text-gray-300">Access verified financials, market analysis, and comprehensive business intelligence reports.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-navy-900 font-bold">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Deals</h3>
              <p className="text-gray-300">Conduct negotiations and complete transactions through our secure deal room platform.</p>
            </div>
          </div>

          <div className="mt-16">
            <button className="bg-gold hover:bg-gold-600 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl mr-4">
              Start Browsing Businesses
            </button>
            <button className="border-2 border-gold text-gold hover:bg-gold hover:text-navy-900 font-semibold px-8 py-4 rounded-xl transition-all">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}