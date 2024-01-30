import { useRouteLoaderData } from '@remix-run/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'

import { Vacancy } from '#app/components/vacancy.tsx'
import { type LoaderData as RootLoaderData } from '#app/root.tsx'
import { type VacancyBlok } from '#app/types.ts'
import { GroupProvider } from '#app/utils/providers.tsx'
import { SdJobPosting } from '#app/utils/structured-data.tsx'

type Props = {
  blok: VacancyBlok
  slug: string
  publishDate: string
}

export function SbVacancy({ blok, publishDate }: Props) {
  const { requestInfo }: RootLoaderData = useRouteLoaderData('root')
  const jobDescription = blok.body.find(b => b.component === 'jobDescription')

  const date = new Date(publishDate ?? '')
  const datePosted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  return (
    <div {...storyblokEditable(blok)}>
      {/* Fallback group theme provider */}
      <GroupProvider value={{ theme: 'light-white' }}>
        <SdJobPosting
          title={blok.title}
          origin={requestInfo.origin}
          description={(jobDescription?.description as string) ?? ''}
          datePosted={datePosted}
        />

        <Vacancy title={blok.title} summary={blok.summary}>
          {blok.body.map(nestedBlok => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </Vacancy>
      </GroupProvider>
    </div>
  )
}
