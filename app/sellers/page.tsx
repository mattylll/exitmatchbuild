import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { generateSEOMetadata } from '@/components/seo/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'For Sellers - Exit Your Business Successfully',
  description: 'Sell your UK SME with confidence. Free AI-powered valuations, qualified buyer matching, and expert support throughout the entire process.',
  keywords: ['sell business UK', 'business valuation', 'exit planning', 'M&A for sellers']
})

const features = [
  {
    icon: TrendingUp,
    title: 'AI-Powered Valuations',
    description: 'Get accurate business valuations using advanced algorithms and real market data from thousands of UK SME transactions.'
  },
  {
    icon: Users,
    title: 'Qualified Buyer Network',
    description: 'Access our vetted network of serious buyers, private equity firms, and strategic acquirers actively seeking UK businesses.'
  },
  {
    icon: Shield,
    title: 'Secure Deal Process',
    description: 'Protected data rooms, NDA management, and secure communications to keep your sale confidential until closing.'
  }
]

const process = [
  {
    step: '1',
    title: 'Get Your Free Valuation',
    description: 'Start with our AI-powered valuation tool to understand your business worth in the current market.'
  },
  {
    step: '2',
    title: 'Create Your Listing',
    description: 'Build a compelling business profile with our guided listing wizard and document upload system.'
  },
  {
    step: '3',
    title: 'Connect with Buyers',
    description: 'Our matching engine connects you with pre-qualified buyers who meet your criteria and requirements.'
  },
  {
    step: '4',
    title: 'Negotiate & Close',
    description: 'Use our secure deal room for due diligence, negotiations, and closing with legal and financial support.'
  }
]

export default function SellersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Sell Your Business with 
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Confidence</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of UK business owners who have successfully exited their companies through our platform. 
              Get expert guidance, AI-powered valuations, and access to serious buyers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/valuation" size="lg" className="text-lg px-8">
                Get Free Valuation
              </Button>
              <Button href="/sellers/list" variant="outline" size="lg" className="text-lg px-8">
                List Your Business
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              ✅ No upfront fees • 100% confidential • Average sale time: 6 months
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose ExitMatch?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've helped over 500 UK SMEs achieve successful exits with our proven process and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Your Path to Exit Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process makes selling your business straightforward and successful.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={item.step} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {index < process.length - 1 && (
                    <div className="w-px h-8 bg-gray-300 ml-6"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Exit Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your free business valuation in just 2 minutes and discover what your company is worth in today's market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/valuation" size="lg" className="text-lg px-8">
              Get Free Valuation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="text-lg px-8">
              Speak with an Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}