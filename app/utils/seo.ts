export function getSocialMetas({
  url,
  title = 'Salt Agency',
  description = 'We provide lead consultants',
  image = 'https://a.storyblok.com/f/180005/x/b54e9e47ed/logo.svg',
  keywords,
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
})  {
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
