import * as React from 'react'

import clsx from 'clsx'

type TitleProps = {
  variant?: 'primary' | 'secondary'
  as?: React.ElementType
  className?: string
  id?: string
  bold?: boolean
  inverse?: boolean
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
)

const fontSize = {
  h1: 'tracking-tight font-medium leading-normal md:leading-none text-4xl md:text-6xl',
  h2: 'tracking-tight font-medium leading-normal text-3xl md:text-5xl',
  h3: 'tracking-tight font-medium leading-normal text-2xl md:text-4xl',
  h4: 'tracking-tight font-medium leading-normal text-2xl md:text-3xl',
  h5: 'tracking-tight font-medium leading-normal text-xl md:text-2xl',
  h6: 'tracking-tight font-medium leading-normal text-lg',
}

const titleColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
}

const titleColorsInverse = {
  primary: 'text-inverse',
  secondary: 'text-inverse-secondary',
}

export function Title({
  variant = 'primary',
  size,
  as,
  className,
  bold = false,
  inverse = false,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  return (
    <Tag
      className={clsx(
        fontSize[size],
        inverse ? titleColorsInverse[variant] : titleColors[variant],
        { 'font-bold': bold },
        className,
      )}
      {...rest}
    />
  )
}

export function H1(props: TitleProps) {
  return <Title {...props} size="h1" />
}

export function H2(props: TitleProps) {
  return <Title {...props} size="h2" />
}

export function H3(props: TitleProps) {
  return <Title {...props} size="h3" />
}

export function H4(props: TitleProps) {
  return <Title {...props} size="h4" />
}

export function H5(props: TitleProps) {
  return <Title {...props} size="h5" />
}

export function H6(props: TitleProps) {
  return <Title {...props} size="h6" />
}

type ParagraphProps = {
  className?: string
  prose?: boolean
  textColorClassName?: string
  as?: React.ElementType
  size?: 'sm' | 'lg' | 'xl'
} & (
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } }
)

export function Paragraph({
  className,
  prose = true,
  as = 'p',
  size = 'lg',
  textColorClassName = 'text-primary',
  ...rest
}: ParagraphProps) {
  return React.createElement(as, {
    className: clsx(
      'max-w-full font-medium tracking-tight',
      textColorClassName,
      className,
      {
        'text-sm leading-6': size === 'sm',
        'text-lg leading-6': size === 'lg',
        'text-lg leading-6 md:text-2xl md:leading-9': size === 'xl',
      },
    ),
    ...rest,
  })
}

type SubtitleProps = {
  children: React.ReactNode
  variant?: 'purple' | 'pink' | 'gray'
  className?: string
}

export function Subtitle({
  children,
  variant = 'purple',
  className,
}: SubtitleProps) {
  return (
    <span
      className={clsx(
        'block text-2xl font-bold leading-normal tracking-tight',
        {
          'text-purple-500': variant === 'purple',
          'text-pink-500': variant === 'pink',
          'text-gray-400': variant === 'gray',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
