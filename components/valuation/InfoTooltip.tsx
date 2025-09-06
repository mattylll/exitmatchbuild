'use client'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { ReactNode } from 'react'

interface InfoTooltipProps {
  content: string
  children: ReactNode
}

export function InfoTooltip({ content, children }: InfoTooltipProps) {
  return (
    <Tooltip 
      explainer={content}
      withArrow
      side="top"
    >
      <span className="inline-flex cursor-help">
        {children}
      </span>
    </Tooltip>
  )
}