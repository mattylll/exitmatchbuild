import { Metadata } from 'next'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Building2 } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { generateSEOMetadata } from '@/components/seo/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Create Your Free Account',
  description: 'Join ExitMatch today. Create your free account to list your business for sale or explore acquisition opportunities.',
  noIndex: true
})

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center">
            <span className="text-gold-400 font-bold text-lg">EM</span>
          </div>
          <span className="text-2xl font-bold text-navy-800">ExitMatch</span>
        </Link>

        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Join thousands of business owners and investors
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          {/* Account Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative">
                <input
                  type="radio"
                  name="accountType"
                  value="seller"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-gold-500 peer-checked:bg-gold-50 hover:border-gray-300 transition-colors">
                  <div className="text-center">
                    <Building2 className="h-6 w-6 mx-auto mb-2 text-gray-600 peer-checked:text-gold-600" />
                    <div className="font-medium text-sm text-gray-900">Sell</div>
                    <div className="text-xs text-gray-500">List my business</div>
                  </div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  name="accountType"
                  value="buyer"
                  className="sr-only peer"
                />
                <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-gold-500 peer-checked:bg-gold-50 hover:border-gray-300 transition-colors">
                  <div className="text-center">
                    <User className="h-6 w-6 mx-auto mb-2 text-gray-600 peer-checked:text-gold-600" />
                    <div className="font-medium text-sm text-gray-900">Buy</div>
                    <div className="text-xs text-gray-500">Find businesses</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Continue with LinkedIn</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or create account with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="Your Company Ltd"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <EyeOff className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link href="/terms" className="text-gold-600 hover:text-gold-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-gold-600 hover:text-gold-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="marketing-emails"
                name="marketing-emails"
                type="checkbox"
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
              />
              <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-900">
                Send me updates about new features and M&A insights
              </label>
            </div>

            <div>
              <Button type="submit" size="lg" className="w-full">
                Create your free account
              </Button>
            </div>
          </form>
        </div>

        {/* Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-gold-600 hover:text-gold-500">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help? <Link href="/contact" className="text-gold-600 hover:text-gold-500">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}