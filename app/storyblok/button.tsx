import { ButtonLink } from '#app/components/ui/button'
import { Icon, type IconName } from '#app/components/ui/icon.tsx'
import { type ButtonBlok } from '#app/types.ts'
import { useI18n } from '#app/utils/i18n-provider.tsx'
import { formatUrl } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbButton({
  blok,
  ringOffsetColor,
}: {
  blok: ButtonBlok
  ringOffsetColor: 'white' | 'black'
}) {
  const { language } = useI18n()
  const { link, anchor, icon, text, variant } = blok

  const urlTarget =
    link.linktype === 'story' && link.story?.full_slug
      ? link.story?.full_slug
      : link.cached_url

  const url = formatUrl(urlTarget, language, anchor)

  return (
    <StoryBlokWrapper blok={blok}>
      <ButtonLink
        prefetch="intent"
        to={url}
        variant={variant}
        ringOffsetColor={ringOffsetColor}
      >
        {icon ? <Icon name={icon as IconName}>{text}</Icon> : text}
      </ButtonLink>
    </StoryBlokWrapper>
  )
}
