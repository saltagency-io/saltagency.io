import React, { PropsWithChildren } from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'
import { Link as CardLink } from 'types/storyblok'

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
  link?: CardLink
  variant?: Variant
  transparantCards?: boolean
  className?: string
}

const variantStyles: Record<Variant, string> = {
  light: 'border-white/10 bg-white',
  dark: 'border-white/5 bg-black/1 backdrop-blur-sm',
}

export const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function Card(
    {
      icon,
      title,
      link,
      variant = 'light',
      transparantCards,
      className,
      children,
    },
    ref,
  ) {
    const Icon = sbGradientIconMap[icon ?? '']

    const baseClasses = 'flex flex-col gap-4 rounded-3xl border p-6'
    const shadowCardClass = !transparantCards ? 'shadow-card' : ''
    const backgroundClass = transparantCards
      ? 'bg-transparent'
      : variantStyles[variant]

    const cardClasses = clsx(
      baseClasses,
      shadowCardClass,
      backgroundClass,
      className,
    )
    return (
      <div ref={ref} className={cardClasses}>
        {Icon && <Icon width={40} height={40} />}
        <div className="flex items-center h-12">
          <H5 as="span" inverse={variant === 'dark'}>
            {link?.story ? (
              <Link to={`/${link.story.full_slug}`} className="text-[#4353FF]">
                {title}
              </Link>
            ) : (
              title
            )}
          </H5>
        </div>
        <div className={clsx(variant === 'dark' && 'text-gray-100')}>
          {children}
        </div>
      </div>
    )
  },
)
