import { Metadata } from "next"
import { HeroSection } from "components/landing/HeroSection"
import { SocialProof } from "components/landing/SocialProof"
import { HowItWorks } from "components/landing/HowItWorks"
import { Features } from "components/landing/Features"
import { ValuationCTA } from "components/landing/ValuationCTA"
import { BuyerSection } from "components/landing/BuyerSection"
import { Testimonials } from "components/landing/Testimonials"
import { FAQ } from "components/landing/FAQ"
import { FooterCTA } from "components/landing/FooterCTA"

export const metadata: Metadata = {
  title: "ExitMatch - Sell Your Business at the Right Price, to the Right Buyer",
  description: "AI-powered business valuations and intelligent buyer matching for UK SMEs. Get your free valuation in 2 minutes. Join 500+ successful business exits.",
  keywords: "business sale, M&A, UK SME, business valuation, sell business, buy business, acquisition, merger, exit strategy",
  authors: [{ name: "ExitMatch" }],
  creator: "ExitMatch",
  publisher: "ExitMatch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://exitmatch.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ExitMatch - AI-Powered M&A Platform for UK SMEs",
    description: "Sell your business at the right price, to the right buyer. Get AI-powered valuations and connect with pre-qualified buyers.",
    url: "https://exitmatch.co.uk",
    siteName: "ExitMatch",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ExitMatch - M&A Platform for UK SMEs",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExitMatch - Sell Your Business at the Right Price",
    description: "AI-powered valuations and intelligent buyer matching for UK SMEs. Get your free valuation in 2 minutes.",
    creator: "@exitmatch",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-verification-code",
  },
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ExitMatch",
  url: "https://exitmatch.co.uk",
  logo: "https://exitmatch.co.uk/logo.png",
  description: "AI-powered M&A platform connecting UK SME sellers with qualified buyers",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-xxx-xxx-xxxx",
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
  },
  sameAs: [
    "https://twitter.com/exitmatch",
    "https://linkedin.com/company/exitmatch",
    "https://github.com/exitmatch",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "324",
  },
}

export default function Page() {
  return (
    <>
      {/* Add structured data to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ExitMatch Landing Page */}
      <main className="overflow-x-hidden">
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <Features />
        <ValuationCTA />
        <BuyerSection />
        <Testimonials />
        <FAQ />
        <FooterCTA />
      </main>
    </>
  )
}