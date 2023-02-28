import React from 'react'

import type { Section } from '../../../types'
import { Grid } from '~/components/grid'
import { H3, H4, Paragraph, Subtitle } from '~/components/typography'
import { sbIconMap } from '~/utils/storyblok'

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function ApplicationProcessSection({
  subtitle,
  title,
  sections,
}: Props) {
  return (
    <div className="bg-inverse py-20 lg:py-40">
      <Grid>
        <div className="col-span-full lg:col-span-3">
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="mb-16 lg:mb-0" inverse>
            {title}
          </H3>
        </div>
        <div className="col-span-full lg:col-span-8 lg:col-start-5">
          {sections.map((section) => {
            const Icon = sbIconMap[section.icon ?? '']
            return (
              <div
                key={section.id}
                className="border-secondary border-b py-6 first:pt-0 lg:px-4 lg:py-8"
              >
                {Icon ? (
                  <div className="mb-3 text-white">
                    <Icon height={32} width={32} />
                  </div>
                ) : (
                  `Unknown icon: ${section.icon}`
                )}
                <H4 as="h3" className="mb-2" inverse>
                  {section.title}
                </H4>
                <Paragraph
                  textColorClassName="text-inverse-secondary"
                  size="xl"
                >
                  {section.text}
                </Paragraph>
              </div>
            )
          })}
        </div>
      </Grid>
    </div>
  )
}
