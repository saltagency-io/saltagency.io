import * as React from 'react'

import { Link } from '@remix-run/react'

import { Grid } from '~/components/grid'
import { H3, Subtitle } from '~/components/typography'
import type { Image, LinkType } from '~/types'
import { getImgProps } from '~/utils/images'
import { Markdown } from '~/utils/markdown'

function LocationImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className="h-full w-full"
      {...getImgProps(src, alt, {
        widths: [390, 600, 975, 1200],
        sizes: [
          '(max-width: 1023px) 100vw',
          '(min-width: 1024px) 58vw',
          '390px',
        ],
      })}
    />
  )
}

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
    <div className="relative overflow-hidden bg-gray-900">
      <Grid>
        <div className="relative z-10 col-span-full py-20 lg:col-span-5 lg:pt-36 lg:pb-8">
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
              to={link.url}
              target="_blank"
              rel="noopener"
              className="underlined active text-xl leading-normal tracking-tight text-white underline lg:text-2xl"
            >
              {link.text}
            </Link>
          ) : null}
        </div>
      </Grid>
      {/*Mobile*/}
      <div className="block lg:hidden">
        <LocationImage src={imageMobile.url} alt={imageMobile.alt} />
      </div>
      {/*Desktop*/}
      <div className="b-0 absolute right-0 top-0 z-0 m-auto hidden h-[103%] lg:block">
        <LocationImage src={image.url} alt={image.alt} />
      </div>
    </div>
  )
}
