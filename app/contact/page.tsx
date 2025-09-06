import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { generateSEOMetadata } from '@/components/seo/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us - ExitMatch M&A Platform',
  description: 'Get in touch with our M&A experts. Book a consultation, ask questions, or get support with your business sale or acquisition.',
  keywords: ['contact ExitMatch', 'M&A support', 'business sale help', 'acquisition support']
})

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: 'Speak directly with our M&A experts',
    value: '+44 (0) 20 7946 0958',
    action: 'tel:+442079460958',
    available: 'Mon-Fri, 9am-6pm GMT'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us your questions or requirements',
    value: 'hello@exitmatch.co.uk',
    action: 'mailto:hello@exitmatch.co.uk',
    available: 'Response within 2 hours'
  },
  {
    icon: Calendar,
    title: 'Book a Meeting',
    description: 'Schedule a 30-minute consultation',
    value: 'Free consultation call',
    action: '/demo',
    available: 'Available slots daily'
  }
]

const officeLocations = [
  {
    city: 'London',
    address: 'Canary Wharf, London E14 5AB',
    description: 'Our main office serving UK clients',
    isMain: true
  },
  {
    city: 'Manchester',
    address: 'Manchester M1 1AA',
    description: 'Northern England regional office',
    isMain: false
  }
]

const faqs = [
  {
    question: 'How much does it cost to list my business?',
    answer: 'Listing your business is completely free. We only charge a success fee when your business sells, typically 3-5% of the transaction value.'
  },
  {
    question: 'How long does it take to sell a business?',
    answer: 'The average time from listing to closing is 6-9 months, depending on your business size, industry, and market conditions.'
  },
  {
    question: 'Do you work with businesses outside the UK?',
    answer: 'Currently, we focus exclusively on UK SMEs. However, we do work with international buyers looking to acquire UK businesses.'
  },
  {
    question: 'What information do I need to provide?',
    answer: "You'll need basic business information, financial statements for the last 3 years, and details about your operations and market position."
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Get in Touch with Our 
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> M&A Experts</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Whether you're ready to sell, looking to buy, or just exploring your options, 
              our team is here to guide you through every step of the M&A process.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
                <MessageSquare className="h-8 w-8 text-gold-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">For Sellers</h3>
                <p className="text-gray-300 text-sm">
                  Get a free business valuation, learn about the exit process, and connect with qualified buyers.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
                <Calendar className="h-8 w-8 text-gold-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">For Buyers</h3>
                <p className="text-gray-300 text-sm">
                  Explore our marketplace of vetted UK SMEs and get help with acquisition financing and due diligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us. Our team typically responds within 2 hours during business hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {contactMethods.map((method) => (
              <div key={method.title} className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <method.icon className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-lg font-medium text-navy-900 mb-2">{method.value}</p>
                <p className="text-sm text-gray-500 mb-4">{method.available}</p>
                <Button 
                  href={method.action} 
                  variant={method.title === 'Book a Meeting' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                >
                  {method.title === 'Phone' && 'Call Now'}
                  {method.title === 'Email' && 'Send Email'}
                  {method.title === 'Book a Meeting' && 'Schedule Call'}
                </Button>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-navy-900 mb-6 text-center">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-navy-900 font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy-900 font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none"
                    placeholder="john.smith@company.com"
                  />
                </div>

                <div>
                  <label className="block text-navy-900 font-medium mb-2">I'm interested in</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none">
                    <option value="">Select an option</option>
                    <option value="selling">Selling my business</option>
                    <option value="buying">Buying a business</option>
                    <option value="valuation">Getting a business valuation</option>
                    <option value="partnership">Partnership opportunities</option>
                    <option value="other">Other inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-navy-900 font-medium mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gold-500 focus:outline-none resize-none"
                    placeholder="Tell us about your requirements, timeline, and any specific questions you have..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600">
              With offices across the UK, we're close to you wherever you are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {officeLocations.map((location) => (
              <div key={location.city} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-1">
                      {location.city}
                      {location.isMain && <span className="ml-2 text-sm bg-gold-100 text-gold-800 px-2 py-1 rounded-full">Main Office</span>}
                    </h3>
                    <p className="text-gray-600 mb-2">{location.address}</p>
                    <p className="text-sm text-gray-500">{location.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <Button href="/help" variant="outline">
              Visit Help Center
            </Button>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6 text-white">
            <Clock className="h-6 w-6 text-gold-400" />
            <div className="text-center">
              <p className="font-semibold">Business Hours</p>
              <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}