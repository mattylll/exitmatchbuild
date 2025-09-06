'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ValuationStepProps {
  children: ReactNode
  stepNumber: number
  title: string
  description: string
}

export function ValuationStep({ children, stepNumber, title, description }: ValuationStepProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepNumber}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
          
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}