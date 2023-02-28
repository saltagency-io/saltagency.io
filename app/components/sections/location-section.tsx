import * as React from 'react'

import { Link } from '@remix-run/react'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Image, LinkType } from '~/types'
import { Markdown } from '~/utils/markdown'

type Props = {
  subtitle: string
  title: string
  address: string
  image: Image
  imageMobile: Image
  link?: LinkType
}

export function LocationSection({
  subtitle,
  title,
  address,
  image,
  imageMobile,
  link,
}: Props) {
  return (
    <div className="relative bg-gray-900">
      <Grid>
        <div className="col-span-full py-20 lg:col-span-5 lg:pt-36 lg:pb-8">
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 className="mb-16 lg:mb-24" inverse>
            {title}
          </H3>
          <address className="mb-6">
            <Markdown margins={false} textColor="inverse" bodyTextSize="xl">
              {address}
            </Markdown>
          </address>
          {link ? (
            <Link
              to={link?.url}
              target="_blank"
              rel="noopener"
              className="text-xl leading-normal tracking-tight text-white underline lg:text-2xl"
            >
              {link.text}
            </Link>
          ) : null}
        </div>
      </Grid>
      {/*Mobile*/}
      <div className="block lg:hidden">
        <img src={imageMobile.url} alt={imageMobile.alt} />
      </div>
      {/*Desktop*/}
      <div className="b-0 absolute right-0 top-0 m-auto hidden h-full w-[55%] lg:block">
        <img src={image.url} alt={image.alt} />
      </div>
    </div>
  )
}
