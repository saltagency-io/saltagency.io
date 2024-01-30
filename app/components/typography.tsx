import * as React from 'react'

import clsx from 'clsx'

type TitleProps = {
  variant?: 'primary' | 'secondary'
  as?: React.ElementType
  className?: string
  id?: string
  bold?: boolean
  inverse?: boolean
  body?: boolean
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
)

const fontSize = {
  h1: 'text-4xl leading-[1.2] md:text-6xl',
  h2: 'text-3xl leading-[1.16] md:text-5xl',
  h3: 'text-2xl leading-[1.2] md:text-4xl',
  h4: 'text-xl leading-[1.25] md:text-3xl',
  h5: 'text-base leading-[1.33] md:text-2xl',
  h6: 'text-base',
}

export function Title({
  variant = 'primary',
  size,
  as,
  className,
  inverse = false,
  body = false,
  bold = true,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  const isBold = !body || bold
  const textColor =
    variant === 'secondary'
      ? 'text-purple-400'
      : inverse
        ? 'text-white'
        : 'text-gray-800'
  return (
    <Tag
      className={clsx(
        'tracking-tight',
        textColor,
        body ? 'font-sans' : 'font-display',
        isBold && 'font-bold',
        fontSize[size],
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
  size?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
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
  responsive = true,
  ...rest
}: ParagraphProps) {
  return React.createElement(as, {
    className: clsx('max-w-full', textColorClassName, className, {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-lg': size === 'lg',
      'text-2xl': size === 'xl' && !responsive,
      'text-lg md:text-2xl': size === 'xl' && responsive,
    }),
    ...rest,
  })
}

type SubtitleProps = {
  children: React.ReactNode
  variant?: 'blue' | 'pink' | 'gray'
  className?: string
}

export function Subtitle({
  children,
  variant = 'blue',
  className,
}: SubtitleProps) {
  return (
    <span
      className={clsx(
        'block text-xl font-bold leading-normal tracking-tight lg:text-2xl',
        {
          'text-blue-500': variant === 'blue',
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
type IntroProps = {
  className?: string
}
export function Intro({
  children,
  className,
}: React.PropsWithChildren<IntroProps>) {
  return (
    <span className={clsx('text-2xl text-gray-600', className)}>
      {children}
    </span>
  )
}
