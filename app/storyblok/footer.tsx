import * as React from 'react'

import { Link } from '@remix-run/react'

import { storyblokEditable } from '@storyblok/react'

import { Footer } from '~/components/footer'
import { Menu } from '~/components/menu'
import type { FooterBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbFooter({ blok }: { blok: FooterBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <Footer
        logoUrl={blok.logo.filename}
        logoAlt={blok.logo.alt}
        disclaimer={blok.disclaimer}
        legalLinks={blok.legalLinks.map((link) => ({
          id: link._uid,
          url: link.target.cached_url,
          text: link.text,
        }))}
      >
        <Menu>
          {blok.menu.map((link) => (
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
      </Footer>
    </StoryBlokWrapper>
  )
}
