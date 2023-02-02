import type { SbBlokData } from '@storyblok/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

type Blok = SbBlokData & {
  body: SbBlokData[] | undefined
}

type Props = {
  blok: Blok
}

export function SbPage({ blok }: Props) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}
