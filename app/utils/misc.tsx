import * as React from 'react'

import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const AnchorOrLink = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & {
    reload?: boolean
    to?: LinkProps['to']
    prefetch?: LinkProps['prefetch']
  }
>(function AnchorOrLink(props, ref) {
  const {
    to,
    href,
    download,
    reload = false,
    prefetch,
    children,
    ...rest
  } = props
  let toUrl = ''
  let shouldUserRegularAnchor = reload || download

  if (!shouldUserRegularAnchor && typeof href === 'string') {
    shouldUserRegularAnchor = href.includes(':') || href.startsWith('#')
  }

  if (!shouldUserRegularAnchor && typeof to === 'string') {
    toUrl = to
    shouldUserRegularAnchor = to.includes(':')
  }

  if (!shouldUserRegularAnchor && typeof to === 'object') {
    toUrl = `${to.pathname ?? ''}${to.hash ? `#${to.hash}` : ''}${
      to.search ? `?${to.search}` : ''
    }`
    shouldUserRegularAnchor = to.pathname?.includes(':')
  }

  if (shouldUserRegularAnchor) {
    return (
      <a {...rest} download={download} href={href ?? toUrl} ref={ref}>
        {children}
      </a>
    )
  } else {
    return (
      <Link prefetch={prefetch} to={to ?? href ?? ''} {...rest} ref={ref}>
        {children}
      </Link>
    )
  }
})

function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
  return removeTrailingSlash(
    `${requestInfo?.origin ?? 'https://saltagency.io'}${
      requestInfo?.path ?? ''
    }`,
  )
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}
