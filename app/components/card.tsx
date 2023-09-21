import React, { PropsWithChildren } from 'react'

import clsx from 'clsx'

import { H5 } from './typography'
import { sbGradientIconMap } from '~/utils/storyblok'

export type CardIcon =
  | 'community'
  | 'eye'
  | 'handHeart'
  | 'money'
  | 'shield'
  | 'star'
  | 'team'

type Variant = 'light' | 'dark'
type Props = {
  icon: CardIcon
  title: string
  variant?: Variant
}

const variantStyles: Record<Variant, string> = {
  light: 'border-white/10 bg-white',
  dark: 'border-black/5 bg-black/1',
}

export const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function Card({ icon, title, variant = 'light', children }, ref) {
    const Icon = sbGradientIconMap[icon ?? '']
    return (
      <div
        className={clsx(
          'flex flex-col gap-6 rounded-3xl border p-6 shadow-card',
          variantStyles[variant],
        )}
        ref={ref}
      >
        {Icon && <Icon width={40} height={40} />}
        <div className="flex h-12 items-center">
          <H5 as="span">{title}</H5>
        </div>
        <div className="">{children}</div>
      </div>
    )
  },
)
