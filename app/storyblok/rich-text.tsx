import { RichText } from '#app/components/rich-text.tsx'
import { type RichTextBlok } from '#app/types.ts'
import { StoryBlokWrapper } from '#app/utils/storyblok.tsx'

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
