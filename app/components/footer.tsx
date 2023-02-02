import type * as React from 'react'

import { Link } from '@remix-run/react'

import { Container } from '~/components/container'
import type { LinkType } from '~/types'

type Props = {
  children: React.ReactNode
  logoUrl: string
  logoAlt: string
  legalLinks: LinkType[]
  disclaimer: string
}

export function Footer({
  children,
  logoUrl,
  logoAlt,
  legalLinks,
  disclaimer,
}: Props) {
  return (
    <Container as="footer" className="py-8">
      <div className="flex flex-col items-end justify-between md:flex-row pb-8 border-b border-solid border-transparent">
        <Link prefetch="intent" to="/">
          <img className="w-[150]" src={logoUrl} alt={logoAlt} />
        </Link>
        {children}
        <div className="flex gap-x-4">
          <Link to="/" className="text-white">
            Mail
          </Link>
          <Link to="/" className="text-white">
            LinkedIn
          </Link>
        </div>
      </div>
      <div className="pt-8 flex gap-x-4">
        <>
          {legalLinks.map((link, idx) => (
            <Link
              key={idx}
              prefetch="intent"
              to={link.url}
              className="text-transparent text-xs hover:underline"
            >
              {link.text}
            </Link>
          ))}
          <div className="text-transparent text-xs ml-4">{disclaimer}</div>
        </>
      </div>
    </Container>
  )
}
