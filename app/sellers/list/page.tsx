'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  DollarSign, 
  FileText, 
  Users, 
  MapPin, 
  TrendingUp,
  Check,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const steps = [
  { id: 1, name: 'Basic Information', icon: Building2 },
  { id: 2, name: 'Financial Details', icon: DollarSign },
  { id: 3, name: 'Business Operations', icon: Users },
  { id: 4, name: 'Documents', icon: FileText },
  { id: 5, name: 'Review & Submit', icon: Check }
]

const industries = [
  'Technology', 'Manufacturing', 'Retail', 'Healthcare', 'Professional Services',
  'Construction', 'Transportation', 'Food & Beverage', 'Real Estate', 'Education'
]

const legalStructures = [
  'Limited Company (Ltd)', 'Public Limited Company (PLC)', 'Limited Liability Partnership (LLP)',
  'Sole Trader', 'Partnership', 'Charity', 'Other'
]

export default function ListBusinessPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    businessName: '',
    confidentialName: '',
    industry: '',
    subIndustry: '',
    yearEstablished: '',
    legalStructure: '',
    website: '',
    
    // Financial Details
    askingPrice: '',
    annualRevenue: '',
    annualProfit: '',
    ebitda: '',
    grossMargin: '',
    cashFlow: '',
    debt: '',
    
    // Business Operations
    employees: '',
    location: '',
    propertyIncluded: false,
    reasonForSelling: '',
    sellingPoints: '',
    growthOpportunities: '',
    
    // Documents
    documents: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log('Submitting listing:', formData)
    router.push('/sellers/dashboard')
  }

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900">List Your Business</h1>
              <p className="mt-1 text-sm text-gray-500">Complete the information below to create your business listing</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    ${currentStep >= step.id 
                      ? 'bg-gold-600 text-white' 
                      : 'bg-gray-200 text-gray-500'}
                  `}>
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-6 w-16 h-0.5 ${
                      currentStep > step.id ? 'bg-gold-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Business Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Your Business Ltd"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confidential Name
                        <Info className="inline h-4 w-4 ml-1 text-gray-400" />
                      </label>
                      <input
                        type="text"
                        name="confidentialName"
                        value={formData.confidentialName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="e.g., Leading UK Tech Company"
                      />
                      <p className="text-xs text-gray-500 mt-1">Name shown before NDA is signed</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Select industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub-Industry
                      </label>
                      <input
                        type="text"
                        name="subIndustry"
                        value={formData.subIndustry}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="e.g., SaaS, E-commerce"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established *
                      </label>
                      <input
                        type="number"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="2010"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Legal Structure *
                      </label>
                      <select
                        name="legalStructure"
                        value={formData.legalStructure}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Select structure</option>
                        {legalStructures.map(structure => (
                          <option key={structure} value={structure}>{structure}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="https://www.yourbusiness.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Financial Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Information</h2>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-800">
                      <Info className="inline h-4 w-4 mr-2" />
                      All financial information is kept strictly confidential and only shared with NDA-signed buyers.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asking Price (£) *
                      </label>
                      <input
                        type="number"
                        name="askingPrice"
                        value={formData.askingPrice}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="2500000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Revenue (£) *
                      </label>
                      <input
                        type="number"
                        name="annualRevenue"
                        value={formData.annualRevenue}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="850000"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Profit (£) *
                      </label>
                      <input
                        type="number"
                        name="annualProfit"
                        value={formData.annualProfit}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="350000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        EBITDA (£)
                      </label>
                      <input
                        type="number"
                        name="ebitda"
                        value={formData.ebitda}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="400000"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gross Margin (%)
                      </label>
                      <input
                        type="number"
                        name="grossMargin"
                        value={formData.grossMargin}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="65"
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Outstanding Debt (£)
                      </label>
                      <input
                        type="number"
                        name="debt"
                        value={formData.debt}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Business Operations */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Operations</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees *
                      </label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Select range</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-250">101-250</option>
                        <option value="250+">250+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="London, UK"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="propertyIncluded"
                        checked={formData.propertyIncluded}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Property included in sale</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Selling *
                    </label>
                    <textarea
                      name="reasonForSelling"
                      value={formData.reasonForSelling}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="Describe why you're selling the business..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Selling Points
                    </label>
                    <textarea
                      name="sellingPoints"
                      value={formData.sellingPoints}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="What makes your business attractive to buyers?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Growth Opportunities
                    </label>
                    <textarea
                      name="growthOpportunities"
                      value={formData.growthOpportunities}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="Describe potential growth areas for the business..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Documents</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <Info className="inline h-4 w-4 mr-2" />
                      Documents help buyers evaluate your business. All documents are kept confidential.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB each)
                    </p>
                    <Button variant="outline" size="sm">
                      Select Files
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Recommended documents:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Financial statements (last 3 years)</li>
                      <li>• Tax returns</li>
                      <li>• Business plan or executive summary</li>
                      <li>• Equipment and inventory lists</li>
                      <li>• Lease agreements</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Listing</h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-800">
                      <Check className="inline h-4 w-4 mr-2" />
                      Your listing is ready to submit! Review the details below before publishing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="text-gray-500">Business Name:</dt>
                        <dd className="text-gray-900">{formData.businessName || 'Not provided'}</dd>
                        <dt className="text-gray-500">Industry:</dt>
                        <dd className="text-gray-900">{formData.industry || 'Not provided'}</dd>
                        <dt className="text-gray-500">Year Established:</dt>
                        <dd className="text-gray-900">{formData.yearEstablished || 'Not provided'}</dd>
                      </dl>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Financial Details</h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="text-gray-500">Asking Price:</dt>
                        <dd className="text-gray-900">£{formData.askingPrice || '0'}</dd>
                        <dt className="text-gray-500">Annual Revenue:</dt>
                        <dd className="text-gray-900">£{formData.annualRevenue || '0'}</dd>
                        <dt className="text-gray-500">Annual Profit:</dt>
                        <dd className="text-gray-900">£{formData.annualProfit || '0'}</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I confirm that all information provided is accurate and I agree to the listing terms
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button onClick={nextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Submit Listing
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}