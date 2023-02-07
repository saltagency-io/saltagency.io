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
    <Container as="footer" className="pt-16 pb-8">
      <div className="flex flex-col justify-between border-b border-solid border-transparent pb-8 lg:flex-row lg:items-end">
        <Link prefetch="intent" to="/">
          <img className="w-[65px] lg:w-[150px]" src={logoUrl} alt={logoAlt} />
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
      <div className="flex gap-x-4 pt-8">
        <>
          {legalLinks.map((link, idx) => (
            <Link
              key={idx}
              prefetch="intent"
              to={link.url}
              className="text-xs text-transparent hover:underline"
            >
              {link.text}
            </Link>
          ))}
          <div className="ml-4 text-xs text-transparent">{disclaimer}</div>
        </>
      </div>
    </Container>
  )
}
