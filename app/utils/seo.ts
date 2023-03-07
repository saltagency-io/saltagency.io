import { LOGO_URL } from '~/utils/misc'

export function getSocialMetas({
  url,
  title = 'Salt Agency',
  description = 'We provide lead consultants',
  image = LOGO_URL,
  keywords,
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return {
    title,
    description,
    keywords,
    image,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@saltagency',
    'twitter:site': '@saltagency',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': title,
  }
}
