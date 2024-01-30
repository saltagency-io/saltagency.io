import { RichText } from '~/components/rich-text'
import type { RichTextBlok } from '~/types'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbRichText({ blok }: { blok: RichTextBlok }) {
  return (
    <StoryBlokWrapper blok={blok}>
      <RichText
        title={blok.title}
        subtitle={blok.subtitle}
        text={blok.text}
        content={blok.content}
        theme={blok.theme}
      />
    </StoryBlokWrapper>
  )
}
