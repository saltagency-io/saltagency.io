import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Story } from '#app/components/story.js'
import { type StoryBlok } from '#app/types.ts'
import { mapAsset } from '#app/utils/mappers.js'
import { GroupProvider } from '#app/utils/providers.tsx'

type Props = {
  blok: StoryBlok
}

export function SbStory({ blok }: Props) {
  return (
    <div {...storyblokEditable(blok)}>
      <GroupProvider value={{ theme: 'light-white' }}>
        <Story
          title={blok.title}
          category={blok.category}
          image={mapAsset(blok.image)}
          publishedAt={blok.published_at}
          readTime={blok.read_time}
        >
          {blok.body.map(nestedBlok => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </Story>
      </GroupProvider>
    </div>
  )
}
