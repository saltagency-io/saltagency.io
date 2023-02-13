import * as React from 'react'

import clsx from 'clsx'

type TitleProps = {
  variant?: 'primary' | 'secondary'
  as?: React.ElementType
  className?: string
  id?: string
  bold?: boolean
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
)

const fontSize = {
  h1: 'leading-tight font-medium text-4xl md:text-7xl',
  h2: 'leading-tight font-medium text-3xl md:text-5xl',
  h3: 'text-2xl font-medium md:text-3xl',
  h4: 'text-xl font-medium md:text-2xl',
  h5: 'text-lg font-medium md:text-xl',
  h6: 'text-lg font-medium',
}

const titleColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
}

export function Title({
  variant = 'primary',
  size,
  as,
  className,
  bold = false,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  return (
    <Tag
      className={clsx(
        fontSize[size],
        titleColors[variant],
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
  size?: 'default' | 'lg'
} & (
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } }
)

export function Paragraph({
  className,
  prose = true,
  as = 'p',
  size = 'default',
  textColorClassName = 'text-primary',
  ...rest
}: ParagraphProps) {
  return React.createElement(as, {
    className: clsx(
      'max-w-full font-medium text-2xl',
      textColorClassName,
      className,
      {
        'text-3xl': size === 'lg'
      },
    ),
    ...rest,
  })
}
