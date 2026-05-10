'use client'

import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: string[]) { return twMerge(clsx(inputs)) }

interface Props {
  label: string
  color: string
  variant?: 'primary' | 'secondary'
  classes?: string
  animate?: boolean
  delay?: number
}

const MotionButton: FC<Props> = ({ label, color, classes }) => {
  const H = 52

  return (
    <button
      className={cn(
        'group relative inline-flex items-center cursor-pointer rounded-full bg-white',
        classes ?? ''
      )}
      style={{
        height: H,
        padding: `4px 24px 4px 4px`,
        border: `1px solid ${color}`,
        ['--btn-color' as string]: color,
        overflow: 'visible',
      }}
    >
      {/* Expanding fill */}
      <span
        aria-hidden='true'
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          height: H - 8,
          width: H - 8,
          borderRadius: 9999,
          backgroundColor: color,
          transition: 'width 500ms cubic-bezier(0.76,0,0.24,1)',
          zIndex: 0,
        }}
        className='group-hover:!w-[calc(100%-8px)] group-hover:!h-[calc(100%-8px)]'
      />

      {/* Arrow — inside the circle */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          width: H - 8,
          height: H - 8,
          marginRight: 16,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowRight size={18} strokeWidth={2.5} color='white' />
      </span>

      {/* Label */}
      <span
        className='font-manrope relative whitespace-nowrap text-sm font-semibold tracking-tight duration-500 [color:var(--btn-color)] group-hover:!text-white'
        style={{ zIndex: 1 }}
      >
        {label}
      </span>
    </button>
  )
}

export default MotionButton
