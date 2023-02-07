import type * as React from 'react'

import ReactMarkdown from 'react-markdown'

import { H1, H2, H3, H4, H5, H6, Paragraph } from '~/components/typography'
import { AnchorOrLink } from '~/utils/misc'

type Components = React.ComponentProps<typeof ReactMarkdown>['components']

const components: Components = {
  p: (props) => <Paragraph className="mb-4">{props.children}</Paragraph>,
  h1: (props) => <H1 className="mb-4">{props.children}</H1>,
  h2: (props) => <H2 className="mb-4">{props.children}</H2>,
  h3: (props) => <H3 className="mb-4">{props.children}</H3>,
  h4: (props) => <H4 className="mb-4">{props.children}</H4>,
  h5: (props) => <H5 className="mb-4">{props.children}</H5>,
  h6: (props) => <H6 className="mb-4">{props.children}</H6>,
  a: (props) => (
    <AnchorOrLink to={props.href} className="text-purple-500">
      {props.children}
    </AnchorOrLink>
  ),
  strong: (props) => (
    <strong className="font-bold text-white">{props.children}</strong>
  ),
  ul: (props) =>
    props.ordered ? (
      <ol className="text-list">{props.children}</ol>
    ) : (
      <ul className="text-list">{props.children}</ul>
    ),
}

export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown children={children} components={components} />
}
