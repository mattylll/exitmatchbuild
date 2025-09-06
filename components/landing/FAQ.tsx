"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "How accurate is the AI-powered business valuation?",
          answer: "Our AI valuation engine analyzes over 50 data points and compares your business against thousands of similar transactions in our database. While no valuation is 100% precise, our accuracy rate is within 15% of final sale prices in 87% of cases. The valuation provides a strong starting point for negotiations."
        },
        {
          question: "How long does it take to sell a business through ExitMatch?",
          answer: "The average time from listing to completion is 8-12 weeks, significantly faster than the traditional 6-12 month process. However, timeline varies based on business complexity, asking price, and buyer-seller negotiations. Our platform streamlines due diligence and communication to accelerate the process."
        },
        {
          question: "What types of businesses can use ExitMatch?",
          answer: "ExitMatch specializes in UK SMEs with annual revenues between £500K and £50M across all sectors. We work with profitable businesses that have been trading for at least 2 years. Whether you're in SaaS, manufacturing, services, or e-commerce, our platform can help facilitate your exit."
        }
      ]
    },
    {
      category: "For Sellers",
      questions: [
        {
          question: "How much does it cost to sell through ExitMatch?",
          answer: "Getting a valuation and listing your business is completely free. We charge a success fee of 2-3% of the transaction value, only payable upon successful completion. This is significantly lower than traditional M&A advisors who typically charge 5-10%."
        },
        {
          question: "How do you maintain confidentiality during the sale process?",
          answer: "Confidentiality is paramount. Buyers must sign NDAs before accessing detailed information. Your business listing uses anonymous details initially, with identifying information only shared with pre-qualified, NDA-signed buyers you approve. Our secure deal rooms ensure document sharing is tracked and controlled."
        },
        {
          question: "Can I still run my business while it's for sale?",
          answer: "Absolutely. Our platform is designed to minimize disruption to your operations. The initial valuation takes just 2 minutes, and our deal room automates much of the documentation process. Most sellers spend only 2-3 hours per week on sale-related activities."
        }
      ]
    },
    {
      category: "For Buyers",
      questions: [
        {
          question: "Is there a fee to register as a buyer?",
          answer: "No, registration and browsing opportunities is completely free. You can set up your buyer profile, create search alerts, and view anonymized listings at no cost. We only charge a success fee on completed transactions over £2M."
        },
        {
          question: "How are businesses vetted before listing?",
          answer: "Every business undergoes our verification process before listing. This includes financial validation, business registration checks, and initial due diligence. While buyers should still conduct their own due diligence, our vetting provides confidence that opportunities are legitimate."
        },
        {
          question: "Can I get financing through ExitMatch?",
          answer: "While we don't provide direct financing, we partner with leading acquisition finance providers who can fund up to 70% of qualified deals. Once you've identified an opportunity, we can introduce you to appropriate funding partners."
        }
      ]
    }
  ]

  const allQuestions = faqData.flatMap((category, categoryIndex) => 
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.category,
      globalIndex: categoryIndex * 10 + questionIndex
    }))
  )

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-full -translate-x-1/2 bg-gradient-to-b from-gold-50/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-gold-100 px-4 py-1 text-sm font-semibold text-gold-700">
            FAQ
          </span>
          <h2 className="mb-4 text-4xl font-bold text-navy-900 sm:text-5xl">
            Frequently Asked
            <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Everything you need to know about buying and selling businesses on ExitMatch
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Category Title */}
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-navy-900">
                <span className="flex size-8 items-center justify-center rounded-full bg-gold-100 text-sm text-gold-700">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h3>

              {/* Questions in Category */}
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex
                  const isOpen = openItems.includes(globalIndex)

                  return (
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: questionIndex * 0.05 }}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                      >
                        <h4 className="pr-8 font-medium text-navy-900">
                          {item.question}
                        </h4>
                        <div className={`shrink-0 rounded-full p-2 transition-all ${
                          isOpen ? 'rotate-180 bg-gold-100' : 'bg-gray-100'
                        }`}>
                          {isOpen ? (
                            <Minus className="size-4 text-gold-600" />
                          ) : (
                            <Plus className="size-4 text-gray-600" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                              <p className="text-gray-600">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-gradient-to-br from-gold-50 to-orange-50 p-8">
            <h3 className="mb-2 text-xl font-bold text-navy-900">
              Still have questions?
            </h3>
            <p className="mb-6 text-gray-600">
              Our team is here to help you navigate your M&A journey
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl border-2 border-gold-500 bg-white px-6 py-3 font-medium text-gold-600 transition-all hover:bg-gold-50">
                Contact Support
              </button>
              <button className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-medium text-white transition-all hover:from-gold-400 hover:to-gold-500">
                Book a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}