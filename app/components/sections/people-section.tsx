import * as React from 'react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Image } from '~/types'

type Props = {
  subtitle: string
  title: string
  people: Image[]
}

export function PeopleSection({ subtitle, title, people }: Props) {
  return (
    <div className="bg-secondary py-40">
      <Grid>
        <div className="col-span-5">
          <Subtitle variant="gray" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="opacity-80">
            {title}
          </H3>
        </div>
        <div className="col-span-6 col-start-7">
          <Grid nested className="grid-rows-12 h-[754px] gap-y-6 pt-8">
            {people.map((person, i) => (
              <div
                key={person.id}
                style={{
                  backgroundImage: `url(${person.url})`,
                }}
                className={clsx(
                  'col-span-6 row-span-6 overflow-hidden rounded-lg',
                  'bg-cover bg-bottom',
                  {
                    'row-start-1': i === 0,
                    'row-start-2': i === 1,
                  },
                )}
              />
            ))}
          </Grid>
        </div>
      </Grid>
    </div>
  )
}
