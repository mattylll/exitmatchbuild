'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp,
  Heart,
  Eye,
  ChevronDown,
  SlidersHorizontal,
  Grid,
  List,
  Star
} from 'lucide-react'
import { Button } from '@/components/Button/Button'

const mockListings = [
  {
    id: 1,
    title: 'Leading UK Tech SaaS Platform',
    confidential: true,
    industry: 'Technology',
    location: 'London, UK',
    askingPrice: 2500000,
    revenue: 850000,
    ebitda: 425000,
    employees: '11-50',
    yearEstablished: 2018,
    description: 'Profitable B2B SaaS platform with 500+ enterprise clients across the UK. Strong recurring revenue model with 95% customer retention rate.',
    isFeatured: true,
    isNew: true,
    matchScore: 92
  },
  {
    id: 2,
    title: 'Premium E-commerce Retailer',
    confidential: false,
    businessName: 'StyleCraft Ltd',
    industry: 'Retail',
    location: 'Manchester, UK',
    askingPrice: 1800000,
    revenue: 2200000,
    ebitda: 330000,
    employees: '11-50',
    yearEstablished: 2015,
    description: 'Award-winning online retailer specializing in premium home goods with strong brand recognition and loyal customer base.',
    isFeatured: false,
    isNew: false,
    matchScore: 87
  },
  {
    id: 3,
    title: 'Established Manufacturing Business',
    confidential: true,
    industry: 'Manufacturing',
    location: 'Birmingham, UK',
    askingPrice: 3500000,
    revenue: 4100000,
    ebitda: 720000,
    employees: '51-100',
    yearEstablished: 2008,
    description: 'ISO-certified manufacturer with long-term contracts with major UK retailers. Modern facility with state-of-the-art equipment.',
    isFeatured: true,
    isNew: false,
    matchScore: 78
  },
  {
    id: 4,
    title: 'Digital Marketing Agency',
    confidential: false,
    businessName: 'Growth Digital',
    industry: 'Professional Services',
    location: 'Bristol, UK',
    askingPrice: 950000,
    revenue: 1200000,
    ebitda: 280000,
    employees: '11-50',
    yearEstablished: 2016,
    description: 'Full-service digital agency with blue-chip client portfolio. Specializes in SEO, PPC, and social media marketing.',
    isFeatured: false,
    isNew: true,
    matchScore: 85
  }
]

const industries = [
  'All Industries',
  'Technology',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Professional Services',
  'Construction',
  'Food & Beverage'
]

const priceRanges = [
  { label: 'Any Price', min: 0, max: null },
  { label: 'Under £500k', min: 0, max: 500000 },
  { label: '£500k - £1M', min: 500000, max: 1000000 },
  { label: '£1M - £2.5M', min: 1000000, max: 2500000 },
  { label: '£2.5M - £5M', min: 2500000, max: 5000000 },
  { label: 'Over £5M', min: 5000000, max: null }
]

export default function BrowseBusinessesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('match')
  const [savedListings, setSavedListings] = useState<number[]>([])

  const toggleSaved = (listingId: number) => {
    setSavedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    )
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `£${(price / 1000000).toFixed(1)}M`
    }
    return `£${(price / 1000).toFixed(0)}k`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by industry, location, or keywords..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex items-center gap-3">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                >
                  <option value="match">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={priceRanges.indexOf(selectedPriceRange)}
                      onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={index}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City or region"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Revenue
                    </label>
                    <input
                      type="number"
                      placeholder="£0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employees
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-gold-500 focus:border-gold-500">
                      <option>Any</option>
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-100</option>
                      <option>100+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">4</span> businesses matching your criteria
          </p>
          <p className="text-sm text-gray-500">
            {savedListings.length} saved
          </p>
        </div>
      </div>

      {/* Listings Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      {listing.isFeatured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-gold-100 text-gold-800 rounded-full mb-2">
                          Featured
                        </span>
                      )}
                      {listing.isNew && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mb-2 ml-2">
                          New
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSaved(listing.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${savedListings.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {listing.confidential ? listing.title : listing.businessName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {listing.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {listing.employees} employees
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {listing.description}
                  </p>

                  {/* Financial Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Asking Price</span>
                      <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.askingPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Revenue</span>
                      <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.revenue)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">EBITDA</span>
                      <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.ebitda)}</span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Match Score</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-gold-500 h-2 rounded-full"
                            style={{ width: `${listing.matchScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gold-600">{listing.matchScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <Button 
                      href={`/buyers/businesses/${listing.id}`}
                      size="sm"
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {listing.isFeatured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold bg-gold-100 text-gold-800 rounded-full">
                              Featured
                            </span>
                          )}
                          {listing.isNew && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                              New
                            </span>
                          )}
                          <span className="text-sm text-gray-500">{listing.industry}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {listing.confidential ? listing.title : listing.businessName}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleSaved(listing.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                      >
                        <Heart className={`h-5 w-5 ${savedListings.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">{listing.description}</p>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500 block">Location</span>
                        <span className="text-sm font-semibold text-gray-900">{listing.location}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Asking Price</span>
                        <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.askingPrice)}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Revenue</span>
                        <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.revenue)}/yr</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">EBITDA</span>
                        <span className="text-sm font-semibold text-gray-900">{formatPrice(listing.ebitda)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          Est. {listing.yearEstablished} • {listing.employees} employees
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Match:</span>
                          <span className="text-sm font-semibold text-gold-600">{listing.matchScore}%</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          href={`/buyers/businesses/${listing.id}`}
                          size="sm"
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                        >
                          Contact Seller
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}