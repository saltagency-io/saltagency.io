import { ButtonLink } from '~/components/button'
import type { ButtonBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbButton({ blok }: { blok: ButtonBlok }) {
  let to = blok.link.cached_url.startsWith('/')
    ? blok.link.cached_url
    : `/${blok.link.cached_url}`

  to = blok.anchor
    ? blok.anchor.startsWith('#')
      ? `${to}${blok.anchor}`
      : `${to}#${blok.anchor}`
    : to

  return (
    <StoryBlokWrapper blok={blok}>
      <ButtonLink prefetch="intent" to={to} variant={blok.variant}>
        {blok.text}
      </ButtonLink>
    </StoryBlokWrapper>
  )
}
