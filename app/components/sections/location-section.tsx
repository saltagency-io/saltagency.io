import { ButtonLink } from '../button'
import { Grid } from '~/components/grid'
import { H3, H5 } from '~/components/typography'
import type { Image as ImageType, LinkType } from '~/types'
import { getImgProps } from '~/utils/images'
import { Markdown } from '~/utils/markdown'

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className="w-full object-cover"
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
    <div className="relative -my-20 overflow-hidden py-20 lg:-my-40 lg:py-40">
      {/*Mobile*/}
      <div className="absolute inset-0 z-0 block mix-blend-multiply lg:hidden">
        <Image src={imageMobile.url} alt={imageMobile.alt} />
      </div>
      {/*Desktop*/}
      <div className="absolute inset-0 z-0 hidden mix-blend-multiply lg:block">
        <Image src={image.url} alt={image.alt} />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-gray-800"></div>

      <Grid>
        <div className="relative z-10 col-span-full lg:col-span-5">
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
        <div className="col-span-full -mx-8vw mt-10 flex h-full w-100vw items-stretch lg:col-start-7 lg:m-0 lg:w-auto">
          <Image src={officeImage.url} alt={officeImage.alt} />
        </div>
      </Grid>
    </div>
  )
}
