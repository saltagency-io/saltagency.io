import * as React from 'react'

import {
  storyblokEditable,
  type SbBlokData,
  type StoryData,
} from '@storyblok/react'

import {
  GIconCalendar,
  GIconCommunity,
  GIconDraw,
  GIconEye,
  GIconHandHeart,
  GIconMoney,
  GIconShield,
  GIconSpeech,
  GIconStar,
  GIconTag,
  GIconTeam,
  type IconProps as GradientIconProps,
} from '#app/components/gradient-icons.tsx'
import {
  IconBankNotes,
  IconChatBubble,
  IconChatBubbleLeftRight,
  IconCode,
  IconDocument,
  IconEnvelope,
  IconEye,
  IconFingerPrint,
  IconHeart,
  IconScale,
  IconShield,
  IconUserGroup,
  IconUsers,
  type IconProps,
} from '#app/components/icons.tsx'
import {
  type PageStoryContent,
  type TranslatedSlug,
  type VacancyStoryContent,
} from '#app/types.ts'
import { defaultLanguage } from '#app/utils/i18n.ts'
import { usePreviewState } from '#app/utils/providers.tsx'

export function isPreview(request: Request) {
  const { searchParams } = new URL(request.url)
  return !!searchParams.get('_storyblok')
}

function mapHomeToRoot(slug: TranslatedSlug) {
  return { ...slug, path: slug.path === 'home' ? '' : slug.path }
}

export function getTranslatedSlugsFromStory(
  story: StoryData<PageStoryContent | VacancyStoryContent> | undefined,
): TranslatedSlug[] {
  if (!story) return []

  if (story.lang === defaultLanguage) {
    return (story.translated_slugs || [])
      .filter(story => story.lang === defaultLanguage)
      .map(mapHomeToRoot)
  } else {
    return [
      {
        lang: defaultLanguage,
        name: story.name,
        path: story.default_full_slug ?? '',
      },
      ...(story.translated_slugs || []).filter(
        slug => slug.lang !== story.lang,
      ),
    ].map(mapHomeToRoot)
  }
}

export function StoryBlokWrapper({
  children,
  blok,
}: {
  children: React.ReactNode
  blok: SbBlokData
}) {
  const { preview } = usePreviewState()

  if (preview) {
    return (
      <div {...storyblokEditable(blok)} key={blok._uid}>
        {children}
      </div>
    )
  }

  return <>{children}</>
}

// Maps names in Storyblok to our icon components
export const sbIconMap: Record<string, React.ComponentType<IconProps>> = {
  eye: IconEye,
  users: IconUsers,
  heart: IconHeart,
  banknotes: IconBankNotes,
  shield: IconShield,
  'finger-print': IconFingerPrint,
  document: IconDocument,
  scale: IconScale,
  'user-group': IconUserGroup,
  'chat-bubble': IconChatBubble,
  'chat-bubble-left-right': IconChatBubbleLeftRight,
  code: IconCode,
  envelope: IconEnvelope,
}

export const sbGradientIconMap: Record<
  string,
  React.ComponentType<GradientIconProps>
> = {
  star: GIconStar,
  eye: GIconEye,
  handHeart: GIconHandHeart,
  calendar: GIconCalendar,
  community: GIconCommunity,
  draw: GIconDraw,
  money: GIconMoney,
  shield: GIconShield,
  speechBubble: GIconSpeech,
  tag: GIconTag,
  team: GIconTeam,
}
