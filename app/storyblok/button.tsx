import { ButtonLink } from '~/components/button'
import type { ButtonBlok } from '~/types'
import { sbIconMap, StoryBlokWrapper } from '~/utils/storyblok'

export function SbButton({
  blok,
  ringOffsetColor,
}: {
  blok: ButtonBlok
  ringOffsetColor: 'white' | 'black'
}) {
  let to =
    blok.link.cached_url.startsWith('/') || blok.link.cached_url.includes(':')
      ? blok.link.cached_url
      : `/${blok.link.cached_url}`

  to = blok.anchor
    ? blok.anchor.startsWith('#')
      ? `${to}${blok.anchor}`
      : `${to}#${blok.anchor}`
    : to

  const Icon = sbIconMap[blok.icon ?? '']

  return (
    <StoryBlokWrapper blok={blok}>
      <ButtonLink
        prefetch="intent"
        to={to}
        variant={blok.variant}
        ringOffsetColor={ringOffsetColor}
      >
        {Icon ? <Icon /> : null}
        {blok.text}
      </ButtonLink>
    </StoryBlokWrapper>
  )
}
