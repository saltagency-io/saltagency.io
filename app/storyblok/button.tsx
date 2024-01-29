import { ButtonLink } from '~/components/button'
import type { ButtonBlok } from '~/types'
import { useI18n } from '~/utils/i18n-provider'
import { formatUrl } from '~/utils/mappers'
import { sbIconMap, StoryBlokWrapper } from '~/utils/storyblok'

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

	const Icon = sbIconMap[icon ?? '']

	return (
		<StoryBlokWrapper blok={blok}>
			<ButtonLink
				prefetch="intent"
				to={url}
				variant={variant}
				ringOffsetColor={ringOffsetColor}
			>
				{Icon ? <Icon /> : null}
				{text}
			</ButtonLink>
		</StoryBlokWrapper>
	)
}
