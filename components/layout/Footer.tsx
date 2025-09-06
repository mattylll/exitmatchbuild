import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

const footerNavigation = {
  platform: [
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Trust & Security', href: '/security' },
  ],
  sellers: [
    { name: 'List Your Business', href: '/sellers/list' },
    { name: 'Free Valuation', href: '/valuation' },
    { name: 'Seller Resources', href: '/sellers/resources' },
    { name: 'Due Diligence Prep', href: '/sellers/due-diligence' },
  ],
  buyers: [
    { name: 'Browse Businesses', href: '/buyers/browse' },
    { name: 'Investment Criteria', href: '/buyers/criteria' },
    { name: 'Financing Options', href: '/buyers/financing' },
    { name: 'Buyer Resources', href: '/buyers/resources' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Book a Demo', href: '/demo' },
    { name: 'API Documentation', href: '/api-docs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-bold text-sm">EM</span>
              </div>
              <span className="text-xl font-bold text-white">ExitMatch</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              The UK's leading M&A platform connecting SME sellers with qualified buyers. 
              AI-powered valuations, intelligent matching, and secure deal management.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-gold-400" />
                <span>hello@exitmatch.co.uk</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-gold-400" />
                <span>+44 (0) 20 7946 0958</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>London, United Kingdom</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com/company/exitmatch" 
                className="text-gray-400 hover:text-gold-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/exitmatch" 
                className="text-gray-400 hover:text-gold-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.platform.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-gold-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">For Sellers</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.sellers.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-gold-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">For Buyers</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.buyers.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-gold-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-gold-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 border-t border-navy-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Get weekly insights on M&A trends, deal opportunities, and platform updates.
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md md:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-gold-600 px-3 py-2 text-sm font-semibold text-navy-900 shadow-sm hover:bg-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 border-t border-navy-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-gray-400 hover:text-gold-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} ExitMatch Ltd. All rights reserved. 
            Registered in England & Wales. FCA Regulated.
          </p>
        </div>
      </div>
    </footer>
  )
}