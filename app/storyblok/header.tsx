import * as React from 'react'

import { Link } from '@remix-run/react'

import { storyblokEditable } from '@storyblok/react'

import { Header } from '~/components/header'
import { Menu } from '~/components/menu'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbHeader({ blok }: any) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Header logoUrl={blok.logo.filename} logoAlt={blok.logo.alt}>
        <Menu>
          {blok.menu.map((link: any) => (
            <Link
              key={link._uid}
              prefetch="intent"
              to={link.target.cached_url}
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
