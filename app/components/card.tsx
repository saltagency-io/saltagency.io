import React, { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { H5 } from './typography'
import { sbGradientIconMap } from '~/utils/storyblok'

export type CardIcon =
  | 'calendar'
  | 'community'
  | 'draw'
  | 'eye'
  | 'handHeart'
  | 'money'
  | 'shield'
  | 'speechBubble'
  | 'star'
  | 'tag'
  | 'team'

type Variant = 'light' | 'dark'
export type Props = {
  icon: CardIcon
  title: string
  variant?: Variant
  className?: string
}

const variantStyles: Record<Variant, string> = {
  light: 'border-white/10 bg-white',
  dark: 'border-white/5 bg-black/1 backdrop-blur-sm',
}

export const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function Card({ icon, title, variant = 'light', className, children }, ref) {
    const Icon = sbGradientIconMap[icon ?? '']
    return (
      <div
        className={clsx(
          'flex flex-col gap-4 rounded-3xl border p-6 shadow-card',
          variantStyles[variant],
          className,
        )}
        ref={ref}
      >
        {Icon && <Icon width={40} height={40} />}
        <div className="flex h-12 items-center">
          <H5 as="span" inverse={variant === 'dark'}>
            {title}
          </H5>
        </div>
        <div className={clsx(variant === 'dark' && 'text-gray-100')}>
          {children}
        </div>
      </div>
    )
  },
)
