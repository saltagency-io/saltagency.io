import { type SVGProps } from 'react'

import { type IconName } from '@/icon-name'
import clsx from 'clsx'

import href from './icons/sprite.svg'

export { href }
export { IconName }

const sizeClassName = {
  font: 'w-[1em] h-[1em]',
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
  '2xl': 'w-8 h-8',
  '3xl': 'w-10 h-10',
} as const

type Size = keyof typeof sizeClassName

const childrenSizeClassName = {
  font: 'gap-1.5',
  xs: 'gap-1.5',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2',
  xl: 'gap-3',
  '2xl': 'gap-4',
  '3xl': 'gap-4',
} satisfies Record<Size, string>

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export function Icon({
  name,
  size = 'font',
  className,
  children,
  align = 'center',
  strokeWidth = '2',
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
  size?: Size
  align?: 'center' | 'start'
  strokeWidth?: '1' | '2'
}) {
  if (children) {
    return (
      <span
        className={`inline-flex items-center ${childrenSizeClassName[size]}`}
      >
        <Icon name={name} size={size} className={className} {...props} />
        {children}
      </span>
    )
  }
  return (
    <svg
      {...props}
      className={clsx(
        sizeClassName[size],
        'inline',
        {
          'self-start': align === 'start',
          'self-center': align === 'center',
          'stroke-1': strokeWidth === '1',
          'stroke-2': strokeWidth === '2',
        },
        className,
      )}
    >
      <use href={`${href}#${name}`} />
    </svg>
  )
}
