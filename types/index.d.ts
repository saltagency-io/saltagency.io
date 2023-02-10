export type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

export type Image = {
  id: string
  url: string
  alt: string
}

export type LinkType = {
  id: string
  url: string
  text: string
}

export * from './storyblok'
