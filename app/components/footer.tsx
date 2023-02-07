import type * as React from 'react'

import { Link } from '@remix-run/react'

import type { LinkType } from '~/types'

type Props = {
  logoUrl: string
  logoAlt: string
  menu: LinkType[]
  legalLinks: LinkType[]
  disclaimer: string
}

export function Footer({
  logoUrl,
  logoAlt,
  menu,
  legalLinks,
  disclaimer,
}: Props) {
  return (
    <footer className="mx-10vw pt-8 pb-8 lg:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between border-b border-solid border-transparent pb-8 lg:flex-row lg:items-end">
        <Link prefetch="intent" to="/" className="mb-6 lg:mb-0">
          <img className="w-[65px] lg:w-[150px]" src={logoUrl} alt={logoAlt} />
        </Link>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
          {menu.map((link) => (
            <Link
              className="text-bold text-white hover:underline"
              key={link.id}
              prefetch="intent"
              to={link.url}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="flex gap-x-4 pt-8">
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
          {legalLinks.map((link) => (
            <Link
              key={link.id}
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
    </footer>
  )
}
