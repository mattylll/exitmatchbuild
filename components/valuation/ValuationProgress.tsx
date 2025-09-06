'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { WIZARD_STEPS } from '@/types/valuation'
import { useValuationStore } from '@/stores/valuationStore'

export function ValuationProgress() {
  const { currentStep, isStepCompleted, canNavigateToStep, setCurrentStep } = useValuationStore()
  
  return (
    <div className="w-full py-8">
      {/* Desktop Progress Bar */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / 9) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {WIZARD_STEPS.map((step) => {
              const isCompleted = isStepCompleted(step.id)
              const isCurrent = currentStep === step.id
              const canNavigate = canNavigateToStep(step.id)
              
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                >
                  <button
                    onClick={() => canNavigate && setCurrentStep(step.id)}
                    disabled={!canNavigate}
                    className={`
                      relative z-10 flex h-10 w-10 items-center justify-center rounded-full
                      border-2 transition-all duration-300
                      ${isCurrent
                        ? 'border-blue-500 bg-blue-500 text-white shadow-lg scale-110'
                        : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : canNavigate
                        ? 'border-gray-300 bg-white text-gray-500 hover:border-blue-400'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </button>
                  
                  <div className="mt-2 text-center">
                    <p className={`
                      text-xs font-medium max-w-[100px]
                      ${isCurrent ? 'text-blue-600' : 'text-gray-500'}
                    `}>
                      {step.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Mobile Progress */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep} of 10
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((currentStep / 10) * 100)}% Complete
          </span>
        </div>
        
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / 10) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {WIZARD_STEPS[currentStep - 1].title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {WIZARD_STEPS[currentStep - 1].description}
          </p>
        </div>
      </div>
    </div>
  )
}