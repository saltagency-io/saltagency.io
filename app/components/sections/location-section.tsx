import clsx from 'clsx'

import { ButtonLink } from '../button'
import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import type { Image as ImageType, LinkType } from '~/types'
import { getImgProps } from '~/utils/images'
import { Markdown } from '~/utils/markdown'

function Image({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      className={className}
      {...getImgProps(src, alt, {
        widths: [375, 508, 1016],
        sizes: [
          '(max-width: 1023px) 84vw',
          '(min-width: 1024px) 35vw',
          '375px',
        ],
      })}
    />
  )
}

type Props = {
  subtitle: string
  title: string
  address: string
  image: ImageType
  imageMobile: ImageType
  officeImage: ImageType
  link?: LinkType
}

export function LocationSection({
  subtitle,
  title,
  address,
  image,
  imageMobile,
  officeImage,
  link,
}: Props) {
  return (
    <div className="relative -my-20 py-20 lg:-my-40 lg:py-40">
      {/*Mobile*/}
      <div className="absolute inset-0 z-0 block mix-blend-multiply lg:hidden">
        <Image src={image.url} alt={image.alt} className="h-full w-auto" />
      </div>
      {/*Desktop*/}
      <div className="absolute inset-0 z-0 hidden mix-blend-multiply lg:block">
        <Image src={image.url} alt={image.alt} className="h-full w-auto" />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-gray-800"></div>

      <Grid className="overflow-visible">
        <div className="relative z-10 col-span-full row-start-1 lg:col-span-5">
          <H5 as="h2" variant="secondary" className="mb-4">
            {subtitle}
          </H5>
          <H3 className="mb-4" inverse>
            {title}
          </H3>
          <address className="mb-12">
            <Markdown margins={false} textColor="inverse" bodyTextSize="xl">
              {address}
            </Markdown>
          </address>
          {link ? (
            <ButtonLink
              to={link.url}
              rel="noopener"
              target="_blank"
              variant="outline-inverse"
            >
              {link.text}
            </ButtonLink>
          ) : null}
        </div>
        <div
          className={clsx(
            'relative z-10 col-span-full col-start-6 row-start-1 hidden h-full overflow-visible',
            'lg:block',
          )}
        >
          <Image
            className={clsx(
              'absolute left-0 bottom-1/2 block h-[calc(100%+theme(spacing.72))] w-auto max-w-none translate-y-[calc(50%-theme(spacing.20))]',
            )}
            alt={officeImage.alt}
            src={officeImage.url}
          />
        </div>
      </Grid>
    </div>
  )
}
