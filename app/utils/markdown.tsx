import type * as React from 'react'

import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'

import { H1, H2, H3, H4, H5, H6, Paragraph } from '~/components/typography'
import { AnchorOrLink } from '~/utils/misc'

type Components = React.ComponentProps<typeof ReactMarkdown>['components']

function getComponents({
  theme,
  margins,
}: {
  theme: 'dark' | 'light'
  margins: boolean
}): Components {
  const headingClasses = clsx({
    'mb-4': margins,
    'text-primary': theme === 'dark',
    'text-inverse': theme === 'light',
  })

  const otherTextClasses = clsx({
    'mb-6': margins,
    'text-primary': theme === 'dark',
    'text-inverse': theme === 'light',
  })

  return {
    h1: (props) => <H1 className={headingClasses}>{props.children}</H1>,
    h2: (props) => <H2 className={headingClasses}>{props.children}</H2>,
    h3: (props) => <H3 className={headingClasses}>{props.children}</H3>,
    h4: (props) => <H4 className={headingClasses}>{props.children}</H4>,
    h5: (props) => <H5 className={headingClasses}>{props.children}</H5>,
    h6: (props) => <H6 className={headingClasses}>{props.children}</H6>,
    p: (props) => (
      <Paragraph className={otherTextClasses}>{props.children}</Paragraph>
    ),
    a: (props) => (
      <AnchorOrLink
        to={props.href}
        className={clsx('underline', {
          'text-primary': theme === 'dark',
          'text-inverse': theme === 'light',
        })}
      >
        {props.children}
      </AnchorOrLink>
    ),
    strong: (props) => (
      <strong
        className={clsx('font-bold', {
          'text-primary': theme === 'dark',
          'text-inverse': theme === 'light',
        })}
      >
        {props.children}
      </strong>
    ),
    ul: (props) =>
      props.ordered ? (
        <ol className={clsx(otherTextClasses, 'text-list')}>
          {props.children}
        </ol>
      ) : (
        <ul className={clsx(otherTextClasses, 'text-list')}>
          {props.children}
        </ul>
      ),
  }
}

type Props = {
  children: string
  theme?: 'dark' | 'light'
  margins?: boolean
}

export function Markdown({ children, margins = true, theme = 'dark' }: Props) {
  const components = getComponents({ margins, theme })
  return <ReactMarkdown children={children} components={components} />
}
