import type * as React from 'react'

import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'

import { H1, H2, H3, H4, H5, H6, Paragraph } from '~/components/typography'
import { AnchorOrLink } from '~/utils/misc'

type Components = React.ComponentProps<typeof ReactMarkdown>['components']

function getComponents({
  textAlign,
  textColor,
  textSize,
  margins,
  responsive,
}: {
  textAlign: Props['textAlign']
  textColor: Props['textColor']
  textSize: Props['bodyTextSize']
  responsive: boolean
  margins: boolean
}): Components {
  const alignClassName = `text-${textAlign}`
  const colorClassName = `text-${textColor}`

  const headingClassName = clsx(alignClassName, colorClassName, {
    'mb-4': margins,
  })

  return {
    h1: (props) => <H1 className={headingClassName}>{props.children}</H1>,
    h2: (props) => <H2 className={headingClassName}>{props.children}</H2>,
    h3: (props) => <H3 className={headingClassName}>{props.children}</H3>,
    h4: (props) => <H4 className={headingClassName}>{props.children}</H4>,
    h5: (props) => <H5 className={headingClassName}>{props.children}</H5>,
    h6: (props) => <H6 className={headingClassName}>{props.children}</H6>,
    p: (props) => (
      <Paragraph
        size={textSize}
        responsive={responsive}
        className={clsx(alignClassName, colorClassName, {
          'mb-6': margins,
        })}
      >
        {props.children}
      </Paragraph>
    ),
    a: (props) => (
      <AnchorOrLink
        to={props.href}
        className={clsx('underlined active', colorClassName, {
          'transition hover:text-white focus:text-white':
            textColor === 'inverse-secondary',
        })}
      >
        {props.children}
      </AnchorOrLink>
    ),
    strong: (props) => (
      <strong className={clsx('font-bold', colorClassName)}>
        {props.children}
      </strong>
    ),
    ul: (props) => {
      const className = clsx('text-list tracking-tight', colorClassName, {
        'text-sm leading-6': textSize === 'sm',
        'text-lg leading-6': textSize === 'lg',
        'text-2xl leading-9': textSize === 'xl' && !responsive,
        'text-lg leading-7 md:text-2xl md:leading-9':
          textSize === 'xl' && responsive,
      })
      return props.ordered ? (
        <ol className={className}>{props.children}</ol>
      ) : (
        <ul className={className}>{props.children}</ul>
      )
    },
  }
}

type Props = {
  children: string
  textAlign?: 'left' | 'right' | 'center'
  textColor?: 'primary' | 'secondary' | 'inverse' | 'inverse-secondary'
  bodyTextSize?: 'sm' | 'lg' | 'xl'
  margins?: boolean
  responsive?: boolean
}

export function Markdown({
  children,
  margins = true,
  textAlign = 'left',
  textColor = 'primary',
  bodyTextSize = 'lg',
  responsive = true,
}: Props) {
  const components = getComponents({
    textAlign,
    textColor,
    textSize: bodyTextSize,
    margins,
    responsive,
  })
  return <ReactMarkdown children={children} components={components} />
}
