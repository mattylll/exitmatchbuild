'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  FileText, 
  MessageSquare, 
  Users, 
  Clock,
  Lock,
  Download,
  Upload,
  Folder,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Activity
} from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const dealStages = [
  { id: 'INITIAL_DISCUSSION', name: 'Initial Discussion', icon: MessageSquare },
  { id: 'NDA_SIGNED', name: 'NDA Signed', icon: Shield },
  { id: 'DUE_DILIGENCE', name: 'Due Diligence', icon: FileText },
  { id: 'NEGOTIATION', name: 'Negotiation', icon: Users },
  { id: 'CLOSING', name: 'Closing', icon: CheckCircle }
]

const mockDealRoom = {
  id: '1',
  referenceCode: 'DR-KX8M9P',
  name: 'Tech Solutions Ltd - Acquisition',
  stage: 'DUE_DILIGENCE',
  status: 'ACTIVE',
  dealValue: 2500000,
  createdAt: '2024-01-15',
  business: {
    title: 'Tech Solutions Ltd',
    industry: 'Technology',
    askingPrice: 2500000
  },
  participants: [
    { id: 1, name: 'John Smith', role: 'SELLER', company: 'Tech Solutions Ltd', status: 'online' },
    { id: 2, name: 'Sarah Johnson', role: 'BUYER', company: 'Growth Capital', status: 'online' },
    { id: 3, name: 'Michael Brown', role: 'ADVISOR', company: 'M&A Advisors', status: 'offline' }
  ],
  documents: {
    folders: [
      {
        name: 'Financial Statements',
        count: 12,
        lastModified: '2 days ago',
        items: [
          { name: 'P&L 2023.pdf', size: '2.4MB', uploadedBy: 'John Smith', date: '3 days ago' },
          { name: 'Balance Sheet 2023.pdf', size: '1.8MB', uploadedBy: 'John Smith', date: '3 days ago' }
        ]
      },
      {
        name: 'Legal Documents',
        count: 8,
        lastModified: '5 days ago',
        items: []
      },
      {
        name: 'Due Diligence',
        count: 15,
        lastModified: '1 day ago',
        items: []
      }
    ]
  },
  activities: [
    { id: 1, type: 'document', message: 'John Smith uploaded Financial Statements', time: '2 hours ago' },
    { id: 2, type: 'message', message: 'Sarah Johnson sent a message', time: '3 hours ago' },
    { id: 3, type: 'stage', message: 'Deal moved to Due Diligence stage', time: '1 day ago' },
    { id: 4, type: 'nda', message: 'NDA signed by all parties', time: '3 days ago' }
  ],
  milestones: [
    { title: 'NDA Signed', date: '2024-01-20', completed: true },
    { title: 'Initial Offer', date: '2024-01-25', completed: true },
    { title: 'Due Diligence Complete', date: '2024-02-15', completed: false },
    { title: 'Final Agreement', date: '2024-02-28', completed: false },
    { title: 'Closing', date: '2024-03-15', completed: false }
  ]
}

export default function DealRoomPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const currentStageIndex = dealStages.findIndex(s => s.id === mockDealRoom.stage)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{mockDealRoom.name}</h1>
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      {mockDealRoom.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Reference: {mockDealRoom.referenceCode}</span>
                    <span>•</span>
                    <span>Deal Value: £{(mockDealRoom.dealValue / 1000000).toFixed(1)}M</span>
                    <span>•</span>
                    <span>Created: {mockDealRoom.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button size="sm">
                    <Lock className="h-4 w-4 mr-2" />
                    Manage Access
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Progress */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {dealStages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center ${index <= currentStageIndex ? '' : 'opacity-50'}`}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${index <= currentStageIndex 
                        ? 'bg-gold-600 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                    `}>
                      {index < currentStageIndex ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <stage.icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        index <= currentStageIndex ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                  </div>
                  {index < dealStages.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${
                      index < currentStageIndex ? 'bg-gold-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {['overview', 'documents', 'messages', 'activity', 'participants'].map((tab) => (
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Key Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Deal Information</h2>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Business</dt>
                      <dd className="text-sm font-medium text-gray-900">{mockDealRoom.business.title}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Industry</dt>
                      <dd className="text-sm font-medium text-gray-900">{mockDealRoom.business.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Asking Price</dt>
                      <dd className="text-sm font-medium text-gray-900">£{(mockDealRoom.business.askingPrice / 1000000).toFixed(1)}M</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Current Stage</dt>
                      <dd className="text-sm font-medium text-gray-900">Due Diligence</dd>
                    </div>
                  </dl>
                </div>

                {/* Milestones */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Milestones</h2>
                  <div className="space-y-3">
                    {mockDealRoom.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {milestone.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                          )}
                          <span className={`text-sm ${milestone.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {milestone.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{milestone.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {mockDealRoom.activities.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === 'document' && <FileText className="h-4 w-4 text-gold-600" />}
                          {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-gold-600" />}
                          {activity.type === 'stage' && <Activity className="h-4 w-4 text-gold-600" />}
                          {activity.type === 'nda' && <Shield className="h-4 w-4 text-gold-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Document Library</h2>
                <Button size="sm" onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {mockDealRoom.documents.folders.map((folder, index) => (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedFolder(folder.name)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Folder className="h-8 w-8 text-gold-600" />
                        <span className="text-sm text-gray-500">{folder.count} files</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{folder.name}</h3>
                      <p className="text-xs text-gray-500">Modified {folder.lastModified}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Secure Messaging</h2>
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Messaging interface coming soon</p>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h2>
              <div className="space-y-4">
                {mockDealRoom.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'document' && <FileText className="h-5 w-5 text-gold-600" />}
                      {activity.type === 'message' && <MessageSquare className="h-5 w-5 text-gold-600" />}
                      {activity.type === 'stage' && <Activity className="h-5 w-5 text-gold-600" />}
                      {activity.type === 'nda' && <Shield className="h-5 w-5 text-gold-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Participants Tab */}
          {activeTab === 'participants' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Deal Participants</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockDealRoom.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-navy-600">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                          <p className="text-xs text-gray-500">{participant.company} • {participant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`w-2 h-2 rounded-full ${
                          participant.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-xs text-gray-500">{participant.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}