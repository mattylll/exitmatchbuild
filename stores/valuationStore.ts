import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ValuationStepData, ValuationResult } from '@/types/valuation'

interface ValuationStore {
  // Current step
  currentStep: number
  
  // Form data
  formData: ValuationStepData
  
  // Validation errors
  errors: Record<string, string>
  
  // Results
  valuationResult: ValuationResult | null
  
  // Loading states
  isCalculating: boolean
  isSaving: boolean
  
  // Actions
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  
  // Form actions
  updateFormData: (data: Partial<ValuationStepData>) => void
  setFormData: (data: ValuationStepData) => void
  resetForm: () => void
  
  // Validation
  setErrors: (errors: Record<string, string>) => void
  clearErrors: () => void
  
  // Results
  setValuationResult: (result: ValuationResult) => void
  clearValuationResult: () => void
  
  // Loading
  setIsCalculating: (isCalculating: boolean) => void
  setIsSaving: (isSaving: boolean) => void
  
  // Progress
  getProgress: () => number
  isStepCompleted: (step: number) => boolean
  canNavigateToStep: (step: number) => boolean
}

const initialFormData: ValuationStepData = {}

export const useValuationStore = create<ValuationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      formData: initialFormData,
      errors: {},
      valuationResult: null,
      isCalculating: false,
      isSaving: false,
      
      // Navigation actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < 10) {
          set({ currentStep: currentStep + 1 })
        }
      },
      
      previousStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 })
        }
      },
      
      // Form actions
      updateFormData: (data) => {
        const { formData } = get()
        set({ formData: { ...formData, ...data } })
      },
      
      setFormData: (data) => set({ formData: data }),
      
      resetForm: () => set({
        currentStep: 1,
        formData: initialFormData,
        errors: {},
        valuationResult: null,
        isCalculating: false,
        isSaving: false
      }),
      
      // Validation
      setErrors: (errors) => set({ errors }),
      clearErrors: () => set({ errors: {} }),
      
      // Results
      setValuationResult: (result) => set({ valuationResult: result }),
      clearValuationResult: () => set({ valuationResult: null }),
      
      // Loading
      setIsCalculating: (isCalculating) => set({ isCalculating }),
      setIsSaving: (isSaving) => set({ isSaving }),
      
      // Progress helpers
      getProgress: () => {
        const { currentStep } = get()
        return (currentStep / 10) * 100
      },
      
      isStepCompleted: (step) => {
        const { formData } = get()
        
        // Check if required fields for each step are filled
        switch (step) {
          case 1:
            return !!formData.sector
          case 2:
            return !!formData.annualRevenue
          case 3:
            return !!formData.profitType && (!!formData.profitValue || !!formData.profitMargin)
          case 4:
            return !!formData.yearEstablished
          case 5:
            return !!formData.employeeCount || !!formData.employeeRange
          case 6:
            return formData.topCustomerPercentage !== undefined
          case 7:
            return formData.growthRate !== undefined
          case 8:
            return formData.recurringRevenuePercentage !== undefined
          case 9:
            return !!formData.keyAssets && formData.keyAssets.length > 0
          case 10:
            return !!formData.exitReason
          default:
            return false
        }
      },
      
      canNavigateToStep: (targetStep) => {
        const { isStepCompleted } = get()
        
        // Can always go back
        const { currentStep } = get()
        if (targetStep <= currentStep) return true
        
        // Can only go forward if all previous steps are completed
        for (let i = 1; i < targetStep; i++) {
          if (!isStepCompleted(i)) return false
        }
        return true
      }
    }),
    {
      name: 'valuation-wizard-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep
      })
    }
  )
)