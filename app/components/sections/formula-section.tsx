import * as React from 'react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { H3, H4, Paragraph, Subtitle } from '~/components/typography'
import type { Section } from '~/types'
import { sbIconMap } from '~/utils/storyblok'

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function FormulaSection({ subtitle, title, sections }: Props) {
  return (
    <div className="bg-secondary py-20 lg:py-40" id="formula">
      <Grid className="gap-x-0 md:gap-x-0 lg:gap-x-0">
        <div className="col-span-full">
          <Subtitle className="mb-4" variant="purple">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="pb-10 lg:pb-24">
            {title}
          </H3>
        </div>
        {sections.map((section, i) => {
          const Icon = sbIconMap[section.icon ?? '']
          return (
            <div
              key={section.id}
              className={clsx(
                'border-primary col-span-full border-b last:border-b-0 lg:col-span-4 lg:border-r lg:px-4',
                {
                  'lg:pl-0': i === 0 || i === 3,
                  'lg:pr-0': i === 2 || i === 5,
                  'lg:border-r-0': i === 2 || i === 5,
                  'lg:border-b-0': i > 2,
                },
              )}
            >
              <div className="py-6 lg:px-6 lg:py-12">
                <div className="mb-4 text-gray-600">
                  {Icon ? (
                    <Icon height={32} width={32} />
                  ) : (
                    `Unknown icon: ${section.icon}`
                  )}
                </div>
                <H4 as="h3" className="mb-4">
                  {section.title}
                </H4>
                <Paragraph size="xl" textColorClassName="text-secondary">
                  {section.text}
                </Paragraph>
              </div>
            </div>
          )
        })}
      </Grid>
    </div>
  )
}
