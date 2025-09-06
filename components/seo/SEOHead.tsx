import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  canonical,
  noIndex = false
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://exitmatch.co.uk'
  const defaultTitle = 'ExitMatch | M&A Platform for UK SMEs'
  const defaultDescription = 'Connect UK SME sellers with qualified buyers. AI-powered business valuations, intelligent matching, and secure deal management.'
  
  const fullTitle = title ? `${title} | ExitMatch` : defaultTitle
  const metaDescription = description || defaultDescription
  const metaKeywords = [...keywords, 'M&A', 'business for sale', 'UK SME', 'business valuation', 'mergers and acquisitions']
  
  return {
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: canonical || baseUrl,
      siteName: 'ExitMatch',
      title: fullTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
  }
}

// Schema.org structured data generators
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ExitMatch',
    description: 'UK M&A platform for SME business sales and acquisitions',
    url: 'https://exitmatch.co.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://exitmatch.co.uk/buyers/browse?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExitMatch Ltd',
    description: 'Leading UK M&A platform connecting SME sellers with qualified buyers',
    url: 'https://exitmatch.co.uk',
    logo: 'https://exitmatch.co.uk/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-20-7946-0958',
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'en'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London'
    },
    sameAs: [
      'https://linkedin.com/company/exitmatch',
      'https://twitter.com/exitmatch'
    ]
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Valuation and M&A Services',
    description: 'AI-powered business valuations and M&A marketplace for UK SMEs',
    provider: {
      '@type': 'Organization',
      name: 'ExitMatch Ltd'
    },
    areaServed: 'GB',
    serviceType: 'Business Brokerage',
    offers: {
      '@type': 'Offer',
      description: 'Free business valuation and M&A marketplace access'
    }
  }
}