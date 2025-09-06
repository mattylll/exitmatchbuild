'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  DollarSign,
  Users,
  BarChart3,
  Clock,
  FileText,
  Settings,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const stats = [
  { label: 'Total Views', value: '2,451', change: '+12%', icon: Eye },
  { label: 'Active Inquiries', value: '18', change: '+5', icon: MessageSquare },
  { label: 'Valuation', value: '£2.3M', change: '+8%', icon: TrendingUp },
  { label: 'Interested Buyers', value: '24', change: '+3', icon: Users }
]

const recentActivity = [
  { id: 1, type: 'inquiry', message: 'New inquiry from Private Equity Fund', buyer: 'PE Capital', time: '2 hours ago' },
  { id: 2, type: 'view', message: 'Business profile viewed', buyer: 'Strategic Buyer', time: '5 hours ago' },
  { id: 3, type: 'document', message: 'NDA signed by buyer', buyer: 'Tech Ventures Ltd', time: '1 day ago' },
  { id: 4, type: 'match', message: 'New matched buyer', buyer: 'Growth Partners', time: '2 days ago' },
]

const businessListings = [
  {
    id: 1,
    title: 'Tech Solutions Ltd',
    status: 'active',
    askingPrice: '£2.3M',
    revenue: '£850K',
    views: 451,
    inquiries: 12,
    favorited: 8,
    daysListed: 45
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    status: 'draft',
    askingPrice: '£1.5M',
    revenue: '£500K',
    views: 0,
    inquiries: 0,
    favorited: 0,
    daysListed: 0
  }
]

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your business listings and track buyer interest</p>
              </div>
              <Button href="/sellers/list" size="md">
                <Plus className="h-4 w-4 mr-2" />
                List New Business
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {['overview', 'listings', 'inquiries', 'analytics'].map((tab) => (
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
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {activity.type === 'inquiry' && <MessageSquare className="h-5 w-5 text-gold-600" />}
                            {activity.type === 'view' && <Eye className="h-5 w-5 text-gold-600" />}
                            {activity.type === 'document' && <FileText className="h-5 w-5 text-gold-600" />}
                            {activity.type === 'match' && <Users className="h-5 w-5 text-gold-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-sm text-gray-500">{activity.buyer}</p>
                          </div>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-gray-100">
                    <Link href="/sellers/activity" className="text-sm font-medium text-gold-600 hover:text-gold-500">
                      View all activity
                      <ChevronRight className="inline h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <Button href="/valuation" variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-3" />
                      Update Valuation
                    </Button>
                    <Button href="/sellers/documents" variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-3" />
                      Upload Documents
                    </Button>
                    <Button href="/sellers/inquiries" variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-3" />
                      Respond to Inquiries
                    </Button>
                    <Button href="/sellers/settings" variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-3" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-6">
              {/* Listings Table */}
              <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Your Business Listings</h2>
                  <Button href="/sellers/list" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Listing
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Asking Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {businessListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                              <div className="text-sm text-gray-500">Revenue: {listing.revenue}/year</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              listing.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {listing.askingPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="flex items-center text-gray-600">
                                <Eye className="h-4 w-4 mr-1" />
                                {listing.views}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {listing.inquiries}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-1" />
                                {listing.favorited}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-3">
                              <Link href={`/sellers/listings/${listing.id}`} className="text-gold-600 hover:text-gold-500">
                                View
                              </Link>
                              <Link href={`/sellers/listings/${listing.id}/edit`} className="text-gold-600 hover:text-gold-500">
                                Edit
                              </Link>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Buyer Inquiries</h2>
              <p className="text-gray-600">You have 18 active inquiries from potential buyers.</p>
              <Button href="/sellers/inquiries" className="mt-4">
                View All Inquiries
              </Button>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Views Over Time</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-gray-400" />
                      <span className="ml-3 text-gray-500">Chart placeholder</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Inquiry Sources</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-gray-400" />
                      <span className="ml-3 text-gray-500">Chart placeholder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}