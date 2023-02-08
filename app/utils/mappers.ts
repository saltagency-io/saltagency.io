import type { Asset, Image, LinkBlok, LinkType } from '~/types'

function formatUrl(url: string) {
  let formatted = url
  if (url === 'home') {
    formatted = `/`
  }
  if (!formatted.startsWith('/')) {
    formatted = `/${formatted}`
  }
  return formatted
}

export function mapLink(link: LinkBlok): LinkType {
  return {
    id: link._uid,
    url: formatUrl(link.target.cached_url),
    text: link.text,
  }
}

export function mapAsset(asset: Asset): Image {
  return {
    id: asset.id.toString(),
    url: asset.filename,
    alt: asset.alt,
  }
}
