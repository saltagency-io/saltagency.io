import { Link } from '@remix-run/react'

import type * as React from 'react'

import { Container } from '~/components/container'

type Props = {
  children: React.ReactNode
  logoUrl: string
  logoAlt: string
}

export function Header({ children, logoUrl, logoAlt }: Props) {
  return (
    <Container className="py-24 flex justify-between items-center">
      <Link prefetch="intent" to="/" className="col-span-4">
        <img className="w-16" src={logoUrl} alt={logoAlt} />
      </Link>
      <div className="col-span-8">{children}</div>
    </Container>
  )
}
