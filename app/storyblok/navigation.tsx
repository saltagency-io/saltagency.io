import { Navbar } from '#app/components/navbar.tsx'
import  { type NavigationBlok } from '#app/types.ts'
import { useLocalizedMappers } from '#app/utils/mappers.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

export function SbNavigation({ blok }: { blok: NavigationBlok }) {
	const { mapLink } = useLocalizedMappers()

	return (
		<StoryBlokWrapper blok={blok}>
			<Navbar menu={blok.menu.map(mapLink)} />
		</StoryBlokWrapper>
	)
}
