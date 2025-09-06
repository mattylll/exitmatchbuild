import { Business, FinancialData, BusinessImage, Document } from '@prisma/client'

export type BusinessWithRelations = Business & {
  financials: FinancialData[]
  documents: Document[]
  images: BusinessImage[]
}

export interface BusinessSearchParams {
  industry?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  minRevenue?: number
  maxRevenue?: number
  sortBy?: 'price' | 'revenue' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface BusinessFormData {
  title: string
  description: string
  askingPrice?: number
  annualRevenue?: number
  annualProfit?: number
  industry: string
  location: string
  employees?: number
  yearEstablished?: number
  reasonForSelling?: string
  confidential: boolean
}