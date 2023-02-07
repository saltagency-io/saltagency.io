import React from 'react'

import { StoryblokComponent } from '@storyblok/react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { StoryBlokWrapper } from '~/utils/storyblok'

export function SbGrid({ blok }: { blok: any }) {
  const cols = 12 / blok.columns

  return (
    <StoryBlokWrapper blok={blok}>
      <Grid className="py-8 gap-y-4 md:gap-y-6 lg:gap-y-8">
        {blok.components.map((component: any) => (
          <div
            key={component._uid}
            className={clsx('col-span-4 md:col-span-8', {
              'lg:col-span-6': cols === 6,
              'lg:col-span-4': cols === 4,
              'lg:col-span-3': cols === 3,
            })}
          >
            <StoryBlokWrapper blok={component}>
              <StoryblokComponent blok={component} />
            </StoryBlokWrapper>
          </div>
        ))}
      </Grid>
    </StoryBlokWrapper>
  )
}
