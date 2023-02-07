import * as React from 'react'

import { Link } from '@remix-run/react'

import { storyblokEditable } from '@storyblok/react'

import { Header } from '~/components/header'
import { Menu } from '~/components/menu'
import type { HeaderBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeader({ blok }: { blok: HeaderBlok }) {
  console.log({blok})
  return (
    <StoryBlokWrapper blok={blok}>
      <Header logoUrl={blok.logo.filename} logoAlt={blok.logo.alt}>
        <Menu>
          {blok.menu.map((link) => (
            <Link
              key={link._uid}
              prefetch="intent"
              to={
                link.target.cached_url === 'home'
                  ? '/'
                  : link.target.cached_url
              }
              {...storyblokEditable(link)}
            >
              {link.text}
            </Link>
          ))}
        </Menu>
      </Header>
    </StoryBlokWrapper>
  )
}
