import type { Asset, Image, LinkBlok, LinkType } from '~/types'

export function mapLink(link: LinkBlok): LinkType {
  return {
    id: link._uid,
    url: link.target.cached_url,
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
