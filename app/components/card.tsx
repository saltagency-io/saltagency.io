import React, { PropsWithChildren } from 'react'

import { Link } from '@remix-run/react'
import { LinkType } from '~/types'
import { IconArrowRight } from '~/components/icons'
import { sbGradientIconMap } from '~/utils/storyblok'
import clsx from 'clsx'

import { H5, Paragraph } from './typography'

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
  link?: LinkType
  variant?: Variant
  className?: string
}

const variantStyles: Record<Variant, string> = {
  light: 'border-white/10 bg-white',
  dark: 'border-white/5 bg-black/1 backdrop-blur-sm',
}

export const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function Card(
    { icon, title, link, variant = 'light', className, children },
    ref,
  ) {
    const Icon = sbGradientIconMap[icon ?? '']

    const content = (
      <>
        {Icon && <Icon width={40} height={40} />}
        <div className="flex items-center h-12">
        <H5
          as="span"
          // Somehow the text color classname gets overridden by the gray color classname in the heading component (maybe because the number is higher?)
          // Add a breakpoint prefix to make sure the classname is more specific.
          // Check if a link is present and if the variant is light or dark. If so, add the hover effect.
          className={clsx(link ? 'sm:text-blue-500' : undefined, {
            'group-hover:text-blue-600': link && variant === 'light',
            'group-hover:text-blue-400': link && variant === 'dark',
          })}
          inverse={variant === 'dark'}
        >
          {
            link ? (
              <span className='relative flex items-center gap-x-2'>
                <span className='transition-all duration-300 ease-in-out transform-gpu'>{title}</span>
                <span className='card-arrow'>
                  <IconArrowRight width={22} height={22} />
                </span>
              </span>
            ) : (
              title
            )
          }
        </H5>
        </div>
        <Paragraph
          textColorClassName={clsx({
            'text-gray-100': variant === 'dark',
            // 'group-hover:text-gray-800': variant === 'dark' && link,
          })}
        >
          {children}
        </Paragraph>
      </>
    )

    const rootClassName = clsx(
      'relative group flex flex-col gap-4 rounded-3xl border p-6',
      link ? 'bg-transparent' : variantStyles[variant],
      {
        'shadow-card': !link,
        'md:pb-12': link,
      },
      className,
    )

    if (link) {
      return (
        <Link
          className={clsx(rootClassName, 'transition-all', {
            'border-white/10 hover:border-transparent hover:bg-card-dark-hover': variant === 'dark',
            'hover:border-transparent hover:bg-card-light-hover hover:shadow-card':
              variant === 'light',
          })}
          to={link.url}
          prefetch="intent"
        >
          {content}
        </Link>
      )
    }

    return (
      <div className={rootClassName} ref={ref}>
        {content}
      </div>
    )
  },
)
