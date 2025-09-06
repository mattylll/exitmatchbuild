'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/Button/Button'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'For Sellers', 
    href: '/sellers',
    dropdown: [
      { name: 'List Your Business', href: '/sellers/list' },
      { name: 'Free Valuation', href: '/valuation' },
      { name: 'Seller Guide', href: '/sellers/guide' },
    ]
  },
  { 
    name: 'For Buyers', 
    href: '/buyers',
    dropdown: [
      { name: 'Browse Businesses', href: '/buyers/browse' },
      { name: 'Buyer Dashboard', href: '/buyers/dashboard' },
      { name: 'Buying Guide', href: '/buyers/guide' },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-navy-800 rounded-lg flex items-center justify-center">
                <span className="text-gold font-bold text-sm">EM</span>
              </div>
              <span className="text-xl font-bold text-navy-800">ExitMatch</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-navy-600 px-3 py-2 text-sm font-medium transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy-600 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-navy-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-navy-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Button href="/auth/register" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-gray-700 hover:text-navy-600 hover:bg-gray-50 px-3 py-2 text-base font-medium transition-colors rounded-md"
                        onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            dropdownOpen === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {dropdownOpen === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-600 hover:text-navy-600 hover:bg-gray-50 px-3 py-2 text-sm transition-colors rounded-md"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-navy-600 hover:bg-gray-50 px-3 py-2 text-base font-medium transition-colors rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link
                  href="/auth/login"
                  className="block text-gray-700 hover:text-navy-600 hover:bg-gray-50 px-3 py-2 text-base font-medium transition-colors rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-3">
                  <Button 
                    href="/auth/register" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}