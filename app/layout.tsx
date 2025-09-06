import "styles/tailwind.css"
import { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://exitmatch.co.uk'),
  title: {
    default: 'ExitMatch | M&A Platform for UK SMEs',
    template: '%s | ExitMatch'
  },
  description: 'Connect UK SME sellers with qualified buyers. AI-powered business valuations, intelligent matching, and secure deal management.',
  keywords: ['M&A', 'business for sale', 'UK SME', 'business valuation', 'mergers and acquisitions'],
  authors: [{ name: 'ExitMatch' }],
  creator: 'ExitMatch',
  publisher: 'ExitMatch',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'ExitMatch',
    title: 'ExitMatch | M&A Platform for UK SMEs',
    description: 'Connect UK SME sellers with qualified buyers. AI-powered valuations and secure deal management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExitMatch | M&A Platform for UK SMEs',
    description: 'Connect UK SME sellers with qualified buyers. AI-powered valuations and secure deal management.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
