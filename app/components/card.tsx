import React, { PropsWithChildren } from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'

import { H5, Paragraph } from './typography'
import { LinkType } from '~/types'
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
        <div className="flex h-12 items-center">
          <H5
            as="span"
            // Somehow the text color classname gets overridden by the gray color classname in the heading component (maybe because the number is higher?)
            // Add a breakpoint prefix to make sure the classname is more specific
            className={
              link ? 'group-hover:text-blue-600 sm:text-blue-500' : undefined
            }
            inverse={variant === 'dark'}
          >
            {title}
          </H5>
        </div>
        <Paragraph
          textColorClassName={clsx({
            'text-gray-100': variant === 'dark',
            'group-hover:text-gray-800': variant === 'dark' && link,
          })}
        >
          {children}
        </Paragraph>
        {link ? (
          <div className="absolute -bottom-[18px] left-0 right-0 m-auto inline-flex max-w-[180px] translate-y-4 items-center justify-center rounded-[48px] bg-gray-900 px-6 py-4 font-bold text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            {link.text}
          </div>
        ) : null}
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
          className={clsx(
            rootClassName,
            'transition-all hover:border-transparent hover:bg-white hover:shadow-card',
          )}
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
