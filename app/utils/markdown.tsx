import type * as React from 'react'

import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'

import { H1, H2, H3, H4, H5, H6, Paragraph } from '~/components/typography'
import { AnchorOrLink } from '~/utils/misc'

type Props = {
  children: string
  textAlign?: 'left' | 'right' | 'center'
  textColor?: 'primary' | 'secondary' | 'inverse' | 'inverse-secondary'
  bodyTextSize?: 'sm' | 'lg' | 'xl'
  margins?: boolean
  responsive?: boolean
  linksInNewTab?: boolean
}

export function Markdown({ children, ...props }: Props) {
  return <ReactMarkdown children={children} components={getComponents(props)} />
}

type Components = React.ComponentProps<typeof ReactMarkdown>['components']

function getComponents({
  textAlign = 'left',
  textColor = 'primary',
  bodyTextSize = 'lg',
  margins = true,
  responsive = true,
  linksInNewTab = false,
}: Omit<Props, 'children'>): Components {
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
        size={bodyTextSize}
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
        target={linksInNewTab ? '_blank' : undefined}
        rel={linksInNewTab ? 'noopener' : undefined}
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
        'text-sm leading-6': bodyTextSize === 'sm',
        'text-lg leading-6': bodyTextSize === 'lg',
        'text-2xl leading-9': bodyTextSize === 'xl' && !responsive,
        'text-lg leading-7 md:text-2xl md:leading-9':
          bodyTextSize === 'xl' && responsive,
      })
      return props.ordered ? (
        <ol className={className}>{props.children}</ol>
      ) : (
        <ul className={className}>{props.children}</ul>
      )
    },
  }
}
