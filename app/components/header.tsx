import type * as React from 'react'

import { Link } from '@remix-run/react'

import { Container } from '~/components/container'

type Props = {
  children: React.ReactNode
  logoUrl: string
  logoAlt: string
}

export function Header({ children, logoUrl, logoAlt }: Props) {
  return (
    <Container as="nav" className="py-24 flex justify-between items-center">
      <Link prefetch="intent" to="/">
        <img className="w-16" src={logoUrl} alt={logoAlt} />
      </Link>
      <div>{children}</div>
    </Container>
  )
}
