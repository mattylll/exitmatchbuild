'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  FileText,
  Users,
  BarChart3,
  Clock,
  Target,
  Settings,
  ChevronRight,
  Star,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const stats = [
  { label: 'Saved Listings', value: '12', change: '+3 this week', icon: Heart },
  { label: 'Active Inquiries', value: '5', change: '2 pending', icon: MessageSquare },
  { label: 'Matches Found', value: '24', change: '+8 new', icon: Target },
  { label: 'NDA Signed', value: '3', change: 'Active', icon: FileText }
]

const savedListings = [
  {
    id: 1,
    title: 'Tech SaaS Platform',
    askingPrice: '£2.5M',
    revenue: '£850K',
    location: 'London',
    matchScore: 92,
    status: 'active'
  },
  {
    id: 2,
    title: 'E-commerce Business',
    askingPrice: '£1.8M',
    revenue: '£2.2M',
    location: 'Manchester',
    matchScore: 87,
    status: 'under_offer'
  },
  {
    id: 3,
    title: 'Manufacturing Firm',
    askingPrice: '£3.5M',
    revenue: '£4.1M',
    location: 'Birmingham',
    matchScore: 78,
    status: 'active'
  }
]

const recentMatches = [
  {
    id: 1,
    title: 'Digital Marketing Agency',
    industry: 'Professional Services',
    askingPrice: '£950K',
    matchScore: 95,
    matchedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Healthcare Tech Startup',
    industry: 'Healthcare',
    askingPrice: '£1.2M',
    matchScore: 88,
    matchedDate: '5 days ago'
  }
]

const activeInquiries = [
  {
    id: 1,
    business: 'Tech SaaS Platform',
    status: 'awaiting_response',
    lastUpdate: '2 hours ago',
    seller: 'Confidential'
  },
  {
    id: 2,
    business: 'E-commerce Business',
    status: 'in_discussion',
    lastUpdate: '1 day ago',
    seller: 'StyleCraft Ltd'
  }
]

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Track your acquisition opportunities and manage inquiries</p>
              </div>
              <Button href="/buyers/browse" size="md">
                <Search className="h-4 w-4 mr-2" />
                Browse Businesses
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {['overview', 'saved', 'inquiries', 'matches', 'preferences'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm capitalize
                    ${activeTab === tab 
                      ? 'border-gold-500 text-gold-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-gold-600" />
                      </div>
                      <span className="text-sm text-gray-500">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Matches */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">AI-Matched Opportunities</h2>
                    <span className="text-sm text-gold-600 font-medium">Based on your criteria</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentMatches.map((match) => (
                      <div key={match.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">{match.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{match.industry} • {match.askingPrice}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="flex items-center justify-end mb-1">
                              <span className="text-sm font-semibold text-gold-600">{match.matchScore}%</span>
                              <span className="text-xs text-gray-500 ml-1">match</span>
                            </div>
                            <p className="text-xs text-gray-400">{match.matchedDate}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="xs" variant="outline">View Details</Button>
                          <Button size="xs">Contact Seller</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-gray-100">
                    <Link href="/buyers/matches" className="text-sm font-medium text-gold-600 hover:text-gold-500">
                      View all matches
                      <ChevronRight className="inline h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  {/* Search Preferences */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-gray-900">Search Preferences</h2>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Industries:</span>
                        <span className="text-gray-900">Technology, SaaS</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget:</span>
                        <span className="text-gray-900">£1M - £5M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-900">UK Wide</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min Revenue:</span>
                        <span className="text-gray-900">£500K</span>
                      </div>
                      <Button href="/buyers/preferences" variant="outline" size="sm" className="w-full mt-4">
                        <Settings className="h-4 w-4 mr-2" />
                        Update Preferences
                      </Button>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-start space-x-3">
                        <Bell className="h-5 w-5 text-gold-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">New match found</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Seller responded</p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Price reduced</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-6">
              <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Saved Listings</h2>
                  <span className="text-sm text-gray-500">{savedListings.length} businesses</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Asking Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Match
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {savedListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {listing.askingPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {listing.revenue}/yr
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {listing.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gold-600">{listing.matchScore}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              listing.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {listing.status === 'active' ? 'Active' : 'Under Offer'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-3">
                              <Link href={`/buyers/businesses/${listing.id}`} className="text-gold-600 hover:text-gold-500">
                                View
                              </Link>
                              <button className="text-red-600 hover:text-red-500">
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Active Inquiries</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {activeInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{inquiry.business}</h3>
                          <p className="text-sm text-gray-500 mt-1">Seller: {inquiry.seller}</p>
                          <p className="text-xs text-gray-400 mt-2">Last update: {inquiry.lastUpdate}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            inquiry.status === 'in_discussion' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {inquiry.status === 'in_discussion' ? 'In Discussion' : 'Awaiting Response'}
                          </span>
                          <div className="mt-3 space-x-2">
                            <Button size="xs" variant="outline">View Thread</Button>
                            <Button size="xs">Send Message</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Matched Businesses</h2>
              <p className="text-gray-600">Our AI has found 24 businesses matching your investment criteria.</p>
              <Button href="/buyers/matches" className="mt-4">
                View All Matches
              </Button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Preferences</h2>
              <p className="text-gray-600">Configure your acquisition criteria to receive better matches.</p>
              <Button href="/buyers/preferences" className="mt-4">
                Update Preferences
              </Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}