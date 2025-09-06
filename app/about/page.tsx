import { Metadata } from 'next'
import { Award, Users, TrendingUp, Shield, Target, Globe } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { generateSEOMetadata } from '@/components/seo/SEOHead'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About ExitMatch - Leading UK M&A Platform',
  description: 'Learn about ExitMatch, the UK\'s most trusted M&A platform. Our mission, team, and track record of successful business sales and acquisitions.',
  keywords: ['about ExitMatch', 'UK M&A platform', 'business acquisition platform', 'SME marketplace']
})

const stats = [
  { number: '500+', label: 'Businesses Sold', description: 'Successful exits completed' },
  { number: '£2.3B', label: 'Transaction Value', description: 'Total deals facilitated' },
  { number: '95%', label: 'Client Satisfaction', description: 'Highly rated service' },
  { number: '6 months', label: 'Average Sale Time', description: 'From listing to close' }
]

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Co-Founder',
    background: 'Former Goldman Sachs M&A Director with 15+ years experience',
    image: '/team/sarah.jpg'
  },
  {
    name: 'James Thompson',
    role: 'CTO & Co-Founder',
    background: 'Ex-Google engineer, built scalable marketplace platforms',
    image: '/team/james.jpg'
  },
  {
    name: 'Dr. Emma Davies',
    role: 'Head of Valuations',
    background: 'PhD Finance, former PwC Corporate Finance partner',
    image: '/team/emma.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Business Development',
    background: '20+ years in UK SME sector, former HSBC Commercial Banking',
    image: '/team/michael.jpg'
  }
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We believe in complete transparency throughout the M&A process, with no hidden fees or surprise costs.'
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Our success is measured by yours. We only succeed when we help you achieve the best possible outcome.'
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: "Every decision we make is guided by what's best for our clients, whether they're buying or selling."
  },
  {
    icon: Globe,
    title: 'Innovation',
    description: 'We leverage cutting-edge technology and AI to make M&A more efficient, accurate, and accessible.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Revolutionizing M&A for 
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> UK SMEs</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Founded in 2019, ExitMatch has become the UK's most trusted M&A platform, 
              connecting ambitious business owners with qualified buyers through innovative technology and expert guidance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">{stat.number}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              To democratize M&A for UK SMEs by making the process more transparent, efficient, and accessible 
              through innovative technology and expert guidance.
            </p>
            
            <div className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-2xl p-8 text-left">
              <blockquote className="text-lg text-navy-900 italic mb-4">
                "We founded ExitMatch after witnessing firsthand how complex and opaque the M&A process was for smaller businesses. 
                Too many great companies were either selling for less than they were worth or struggling to find the right buyers. 
                We knew technology could solve this problem."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-200 rounded-full flex items-center justify-center">
                  <span className="text-gold-800 font-bold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-navy-900">Sarah Mitchell</div>
                  <div className="text-gray-600">CEO & Co-Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product development to client relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines deep M&A expertise with cutting-edge technology to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gold-800">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{member.name}</h3>
                <p className="text-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to the UK's leading M&A platform for SMEs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: '2019',
                  title: 'ExitMatch Founded',
                  description: 'Sarah and James launched ExitMatch with a vision to democratize M&A for UK SMEs.'
                },
                {
                  year: '2020',
                  title: 'First 100 Deals',
                  description: 'Completed our first 100 transactions, establishing proof of concept and market fit.'
                },
                {
                  year: '2021',
                  title: 'Series A Funding',
                  description: 'Raised £15M Series A led by Balderton Capital to accelerate growth and product development.'
                },
                {
                  year: '2022',
                  title: 'AI Valuation Engine',
                  description: 'Launched our proprietary AI-powered valuation engine, processing over 10,000 data points.'
                },
                {
                  year: '2023',
                  title: '£1B Milestone',
                  description: 'Crossed £1B in total transaction value and expanded to serve businesses across all UK regions.'
                },
                {
                  year: '2024',
                  title: 'Market Leadership',
                  description: 'Became the #1 rated M&A platform for UK SMEs with over 500 successful exits completed.'
                }
              ].map((milestone, index) => (
                <div key={milestone.year} className="flex items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8">
                    {milestone.year}
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recognition & Awards
            </h2>
            <p className="text-xl text-gray-300">
              We're proud to be recognized as industry leaders in UK M&A.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                award: 'FinTech50 Winner',
                year: '2023',
                organization: 'FinTech Magazine',
                description: 'Recognized as one of the top 50 most innovative FinTech companies in the UK'
              },
              {
                award: 'Best M&A Platform',
                year: '2023',
                organization: 'Corporate Finance Awards',
                description: 'Winner of the Best Technology Platform category for SME M&A'
              },
              {
                award: 'Startup of the Year',
                year: '2022',
                organization: 'TechRound Awards',
                description: 'Named Startup of the Year in the Financial Services category'
              }
            ].map((recognition) => (
              <div key={recognition.award} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Award className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{recognition.award}</h3>
                <p className="text-gold-400 font-medium mb-2">{recognition.organization} • {recognition.year}</p>
                <p className="text-gray-300 text-sm">{recognition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to sell your business or find your next acquisition, 
            let our experienced team guide you to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/valuation" size="lg" className="text-lg px-8">
              Get Free Valuation
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="text-lg px-8">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}