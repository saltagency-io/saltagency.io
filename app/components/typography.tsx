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
  h1: 'tracking-tight font-medium leading-none text-4xl md:text-6xl',
  h2: 'tracking-tight font-medium leading-none text-3xl md:text-5xl',
  h3: 'tracking-tight font-medium text-2xl md:text-4xl',
  h4: 'tracking-tight font-medium text-xl md:text-3xl',
  h5: 'tracking-tight font-medium text-lg md:text-2xl',
  h6: 'tracking-tight font-medium text-lg',
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
  size?: 'sm' | 'lg'
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
      'max-w-full font-medium text-xl',
      textColorClassName,
      className,
      {
        'text-sm': size === 'sm',
        'text-lg': size === 'lg',
      },
    ),
    ...rest,
  })
}
