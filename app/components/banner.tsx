import * as React from 'react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'
import { useGroup } from '~/utils/providers'

type Props = {
  subtitle: string
  text: string
  image: Image
  imagePosition: 'left' | 'right'
}
export function Banner({ subtitle, text, image, imagePosition }: Props) {
  const { theme } = useGroup()
  return (
    <div className="py-20 lg:py-40">
      <Grid className="gap-y-10 lg:gap-y-0">
        <div
          className={clsx('col-span-full lg:col-span-5 lg:row-start-1', {
            'lg:col-start-8': imagePosition === 'left',
          })}
        >
          <H5 as="h2" variant="secondary" className="mb-2">
            {subtitle}
          </H5>
          <H3 as="p" inverse={theme.startsWith('dark')}>
            {text}
          </H3>
        </div>
        <div
          className={clsx(
            'col-span-full lg:row-start-1 lg:flex lg:flex-col lg:justify-center',
            {
              'lg:col-span-6 lg:col-start-7': imagePosition === 'right',
              'lg:col-span-5 lg:col-start-1': imagePosition === 'left',
            },
          )}
        >
          <img
            className="w-full object-cover"
            {...getImgProps(image.url, image.alt, {
              widths: [375, 508, 1016],
              sizes: [
                '(max-width: 1023px) 84vw',
                '(min-width: 1024px) 35vw',
                '375px',
              ],
            })}
          />
        </div>
      </Grid>
    </div>
  )
}
