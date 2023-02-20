import * as React from 'react'

import { Grid } from '~/components/grid'
import { H3, H4, Subtitle } from '~/components/typography'
import type { Section } from '~/types'

type Props = {
  subtitle: string
  title: string
  sections: Section[]
}

export function PropositionSection({ subtitle, title, sections }: Props) {
  return (
    <div className="bg-inverse py-40">
      <Grid>
        <div className="col-span-full">
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="text-inverse mb-14">
            {title}
          </H3>
        </div>
        <div className="col-span-full">
          {sections.map((section) => (
            <Grid
              nested
              key={section.id}
              className="border-light border-b py-14"
            >
              <div className="col-span-6">
                <H4 as="h3" className="text-inverse">
                  {section.title}
                </H4>
              </div>
              <div className="col-span-6">
                <H4 as="p" className="text-inverse-secondary">
                  {section.text}
                </H4>
              </div>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  )
}
