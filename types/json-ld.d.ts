// Utilities
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Base types
 */
type URL = string
type Text = string
type Integer = number

// https://schema.org/Duration
// Quantity: Duration (use ISO 8601 duration format).
export type Duration = string

// https://schema.org/DateTime
// A combination of date and time of day in the form [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm] (see Chapter 5.4 of ISO 8601).
export type DateTime = string

// https://schema.org/Date
// A date value in ISO 8601 date format.
export type Date = string

// https://schema.org/Time
// A point in time recurring on multiple days in the form hh:mm:ss[Z|(+|-)hh:mm] (see XML schema for details).
export type Time = string

// https://schema.org/DayOfWeek
export type DayOfWeek = Omit<Enumeration, 'url'> & {
  url:
    | 'http://schema.org/Monday'
    | 'http://schema.org/Tuesday'
    | 'http://schema.org/Wednesday'
    | 'http://schema.org/Thursday'
    | 'http://schema.org/Friday'
    | 'http://schema.org/Saturday'
    | 'http://schema.org/Sunday'
}

type $TODO = never

export type AboutPage = $TODO
export type Action = $TODO
export type AdministrativeArea = $TODO
export type AggregateRating = $TODO
export type AlignmentObject = $TODO
export type Article = $TODO
export type Audience = $TODO
export type AudioObject = $TODO
export type Brand = $TODO
export type Comment = $TODO
export type CorrectionComment = $TODO
export type Demand = $TODO
export type Distance = $TODO
export type Event = $TODO
export type GeoCoordinates = $TODO
export type GeoShape = $TODO
export type GeospatialGeometry = $TODO
export type ImageObject = $TODO
export type InteractionCounter = $TODO
export type Language = $TODO
export type LocationFeatureSpecification = $TODO
export type Map = $TODO
export type MediaObject = $TODO
export type OfferItemCondition = $TODO
export type Order = $TODO
export type OrderItem = $TODO
export type OwnershipInfo = $TODO
export type ParcelDelivery = $TODO
export type Person = $TODO
export type Photograph = $TODO
export type PhysicalActivityCategory = $TODO
export type ProductModel = $TODO
export type PublicationEvent = $TODO
export type QualitativeValue = $TODO
export type QuantitativeValue = $TODO
export type Rating = $TODO
export type Review = $TODO
export type Service = $TODO
export type SpeakableSpecification = $TODO
export type Specialty = $TODO
export type StructuredValue = $TODO
export type Trip = $TODO
export type TypeAndQuantityNode = $TODO
export type VideoObject = $TODO
export type WebPageElement = $TODO

/**
 * Extended types inheriting from Thing
 */

// https://schema.org/PropertyValue
export interface PropertyValue<T = 'PropertyValue'> extends CreativeWork<T> {
  maxValue: number
  measurementTechnique: Text | URL
  minValue: number
  propertyID?: Text | URL
  unitCode: Text | URL
  unitText: Text
  value: boolean | number | StructuredValue | Text
  valueReference:
    | Enumeration
    | PropertyValue
    | QualitativeValue
    | QuantitativeValue
}

// https://schema.org/ContactPointOption
export type ContactPointOption = 'TollFree' | 'HearingImpairedSupported'

// https://meta.schema.org/Property
export interface Property<T = 'Property'> extends Thing<T> {
  domainIncludes?: Class
  inverseOf?: Property
  rangeIncludes?: Class
  supersededBy?: Class | Enumeration | Property
}

// https://meta.schema.org/Class
export interface Class<T = 'Class'> extends Thing<T> {
  supersededBy?: Class | Enumeration | Property
}

// https://schema.org/Enumeration
export interface Enumeration<T = 'Enumeration'> extends Thing<T> {
  supersededBy?: Class | Enumeration | Property
}

// https://schema.org/OpeningHoursSpecification
export interface OpeningHoursSpecification<T = 'OpeningHoursSpecification'>
  extends Thing<T> {
  closes?: Time
  dayOfWeek?: DayOfWeek | Text | Text[]
  opens?: Time
  validFrom?: DateTime
  validThrough?: DateTime
}

export type Country = Place<'Country'>

export interface Place<T = 'Place'> extends Thing<T> {
  additionalProperty?: PropertyValue
  address?: PostalAddress | PostalAddress[] | Text
  aggregateRating?: AggregateRating
  amenityFeature?: LocationFeatureSpecification
  branchCode?: Text
  openingHoursSpecification?:
    | OpeningHoursSpecification
    | OpeningHoursSpecification[]
}

// https://schema.org/PostalAddress
export interface PostalAddress<T = 'PostalAddress'> extends ContactPoint<T> {
  addressCountry?: Country | Text
  addressLocality?: Text
  addressRegion?: Text
  postOfficeBoxNumber?: Text
  postalCode?: Text
  streetAddress?: Text
  containedInPlace?: Place
  containsPlace?: Place
  event?: Event
  faxNumber?: Text
  geo?: GeoCoordinates | GeoShape
  geospatiallyContains?: GeospatialGeometry | Place
  geospatiallyCoveredBy?: GeospatialGeometry | Place
  geospatiallyCovers?: GeospatialGeometry | Place
  geospatiallyCrosses?: GeospatialGeometry | Place
  geospatiallyDisjoint?: GeospatialGeometry | Place
  geospatiallyEquals?: GeospatialGeometry | Place
  geospatiallyIntersects?: GeospatialGeometry | Place
  geospatiallyOverlaps?: GeospatialGeometry | Place
  geospatiallyTouches?: GeospatialGeometry | Place
  geospatiallyWithin?: GeospatialGeometry | Place
  globalLocationNumber?: Text
  hasMap?: Map | URL
  isAccessibleForFree?: boolean
  isicv4?: Text
  logo?: ImageObject | URL
  maximumAttendeeCapacity?: Integer
  openingHoursSpecification?: OpeningHoursSpecification
  photo?: ImageObject | Photograph
  publicAccess?: boolean
  review?: Review
  smokingAllowed?: boolean
  specialOpeningHoursSpecification?: OpeningHoursSpecification
  telephone?: Text
}

// https://schema.org/ContactPoint
export interface ContactPoint<T = 'ContactPoint'> extends Thing<T> {
  areaServed?: AdministrativeArea | GeoShape | Place | Text
  availableLanguage?: Language | Text
  contactOption?: ContactPointOption | ContactPoint[]
  contactType?: Text
  email?: Text
  faxNumber?: Text
  hoursAvailable?: OpeningHoursSpecification
  productSupported?: Product | Text
  telephone?: Text
}

// https://schema.org/WebPage
export interface WebPage<T = 'WebPage'> extends CreativeWork<T> {
  breadcrumb?: BreadcrumbList | Text
  lastReviewed?: Date
  mainContentOfPage?: WebPageElement
  primaryImageOfPage?: ImageObject
  relatedLink?: URL
  reviewedBy?: Organization | Person
  significantLink?: URL
  speakable?: SpeakableSpecification | URL
  specialty?: Specialty
}

// https://schema.org/Organization
export interface Organization<T = 'Organization'> extends Thing<T> {
  actionableFeedbackPolicy?: CreativeWork | URL
  address?: PostalAddress | PostalAddress[] | Text
  aggregateRating?: AggregateRating
  alumni?: Person
  areaServed?: AdministrativeArea | GeoShape | Place | Text
  award?: Text
  brand?: Brand | Organization
  contactPoint?: ContactPoint
  correctionsPolicy?: CreativeWork | URL
  department?: Organization
  dissolutionDate?: Date
  diversityPolicy?: CreativeWork | URL
  diversityStaffingReport?: Article | URL
  duns?: Text
  email?: Text
  employee?: Person
  ethicsPolicy?: CreativeWork | URL
  event?: Event
  faxNumber?: Text
  founder?: Person
  foundingDate?: Date
  foundingLocation?: Place
  funder?: Organization | Person
  globalLocationNumber?: Text
  hasOfferCatalog?: OfferCatalog
  hasPOS?: Place
  isicV4?: Text
  knowsAbout?: Text | Thing | URL
  knowsLanguage?: Language | Text
  legalName?: Text
  leiCode?: Text
  location?: Place | PostalAddress | Text
  logo?: ImageObject | URL
  makesOffer?: Offer
  member?: Organization | Person
  memberOf?: Organization | Person
  naics?: Text
  numberOfEmployees?: QuantitativeValue
  ownershipFundingInfo?: AboutPage | CreativeWork | Text | URL
  owns?: OwnershipInfo | Product
  parentOrganization?: Organization
  publishingPrinciples?: CreativeWork | URL
  review?: Review
  seeks?: Demand
  sponsor?: Organization | Person
  subOrganization?: Organization
  taxID?: Text
  telephone?: Text
  unnamedSourcesPolicy?: CreativeWork | URL
  vatID?: Text
}

//https://schema.org/LocalBusiness
export interface LocalBusiness<T = 'LocalBusiness'>
  extends Organization<T>,
    Place<T> {
  currenciesAccepted?: Text
  openingHours?: Text | Text[]
  paymentAccepted?: Text
  priceRange?: Text
}

//https://schema.org/Store
export interface Store<T = 'Store'> extends LocalBusiness<T> {
  name?: Text
}

// https://schema.org/CreativeWork
export interface CreativeWork<T = 'CreativeWork'> extends Thing<T> {
  about?: Thing
  accessMode?: Text
  accessModeSufficient?: Text
  accessibilityAPI?: Text
  accessibilityControl?: Text
  accessibilityFeature?: Text
  accessibilityHazard?: Text
  accessibilitySummary?: Text
  accountablePerson?: Person
  aggregateRating?: AggregateRating
  alternativeHeadline?: Text
  associatedMedia?: MediaObject
  audience?: Audience
  audio?: AudioObject
  author?: Organization | Person
  award?: Text
  character?: Person
  citation?: CreativeWork | Text
  comment?: Comment
  commentCount?: Integer
  contentLocation?: Place
  contentRating?: Rating | Text
  contentReferenceTime?: DateTime
  contributor?: Organization | Person
  copyrightHolder?: Organization | Person
  copyrightYear?: number
  correction?: CorrectionComment | Text | URL
  creator?: Organization | Person
  dateCreated?: Date | DateTime
  dateModified?: Date | DateTime
  datePublished?: Date
  discussionUrl?: URL
  editor?: Person
  educationalAlignment?: AlignmentObject
  educationalUse?: Text
  encoding?: MediaObject
  encodingFormat?: Text | URL
  exampleOfWork?: CreativeWork
  expires?: Date
  funder?: Organization | Person
  genre?: Text | URL
  hasPart?: CreativeWork | Trip
  headline?: Text
  inLanguage?: Language | Text
  interactionStatistic?: InteractionCounter
  interactivityType?: Text
  isAccessibleForFree?: boolean
  isBasedOn?: CreativeWork | Product | URL
  isFamilyFriendly?: boolean
  isPartOf?: CreativeWork | Trip
  keywords?: Text
  learningResourceType?: Text
  license?: CreativeWork | URL
  locationCreated?: Place
  mainEntity?: Thing
  material?: Product | Text | URL
  mentions?: Thing
  offers?: Offer
  position?: Integer | Text
  producer?: Organization | Person
  provider?: Organization | Person
  publication?: PublicationEvent
  publisher?: Organization | Person
  publisherImprint?: Organization
  publishingPrinciples?: CreativeWork | URL
  recordedAt?: Event
  releasedEvent?: PublicationEvent
  review?: Review
  schemaVersion?: Text | URL
  sdDatePublished?: Date
  sdLicense?: CreativeWork | URL
  sdPublisher?: Organization | Person
  sourceOrganization?: Organization
  spatialCoverage?: Place
  sponsor?: Organization | Person
  temporalCoverage?: DateTime | Text | URL
  text?: Text
  thumbnailUrl?: URL
  timeRequired?: Duration
  translationOfWork?: CreativeWork
  translator?: Organization | Person
  typicalAgeRange?: Text
  version?: number | Text
  video?: VideoObject
  workExample?: CreativeWork
  workTranslation?: CreativeWork
}

// https://schema.org/Thing
export interface Thing<T = 'Thing'> {
  '@type'?: T
  '@id'?: Text
  additionalType?: URL
  alternateName?: Text
  description?: Text
  disambiguatingDescription?: Text
  identifier?: PropertyValue | Text | URL
  image?: ImageObject | URL
  mainEntityOfPage?: CreativeWork | URL
  name?: Text
  potentialAction?: Action
  sameAs?: URL
  subjectOf?: CreativeWork | Event
  url?: URL
}

export interface Product<T = 'Product'> extends Thing<T> {
  additionalProperty?: PropertyValue
  aggregateRating?: AggregateRating
  audience?: Audience
  award?: Text
  brand?: Brand | Organization
  category?: PhysicalActivityCategory | Text | Thing
  color?: Text
  depth?: Distance | QuantitativeValue
  gtin12?: Text
  gtin13?: Text
  gtin14?: Text
  gtin8?: Text
  height?: Distance | QuantitativeValue
  isAccessoryOrSparePartFor?: Product
  isConsumableFor?: Product
  isRelatedTo?: Product | Service
  isSimilarTo?: Product | Service
  itemCondition?: OfferItemCondition
  logo?: ImageObject | URL
  manufacturer?: Organization
  material?: CreativeWork | Product
  model?: ProductModel | Text
  mpn?: Text
  offers?: Offer
  productID?: Text
  productionDate?: Date
  purchaseDate?: Date
  releaseDate?: Date
  review?: Review
  sku?: Text
  weight?: QuantitativeValue
  width?: Distance | QuantitativeValue
  additionalType?: URL
  alternateName?: Text
  description?: Text
  disambiguatingDescription?: Text
  identifier?: PropertyValue | Text | URL
  image?: ImageObject | URL
  mainEntityOfPage?: CreativeWork | URL
  name?: Text
  potentialAction?: Action
  sameAs?: URL
  subjectOf?: CreativeWork | Event
  url?: URL
  isBasedOn?: CreativeWork
  itemOffered?: Demand | Offer
  itemShipped?: ParcelDelivery
  orderedItem?: Order | OrderItem
  owns?: Organization | Person
  productSupported?: ContactPoint
  typeOfGood?: OwnershipInfo | TypeAndQuantityNode
}

// https://schema.org/ItemListOrderType
export type ItemListOrderType = Enumeration<'ItemListOrderType'>

// https://schema.org/ListItem
export interface ListItem<T = 'ListItem'> extends Thing<T> {
  item?: Product | Store | Text
  position?: Integer | Text
  nextItem?: ListItem
  previousItem?: ListItem
}

// https://schema.org/ItemList
export interface ItemList<T = 'ItemList'> extends Thing<T> {
  itemListElement?: ListItem[] | Thing[] | Text[]
  itemListOrder?: ItemListOrderType
  numberOfItems?: number
}

// https://schema.org/hasOfferCatalog
export interface OfferCatalog<T = 'OfferCatalog'> extends Thing<T> {
  itemListElement?: ListItem[] | Thing[] | Text[] | Offer[]
  itemListOrder?: ItemListOrderType
  numberOfItems?: number
}

export interface Offer<T = 'Offer'> extends Thing<T> {
  priceSpecification?: any
}

// https://schema.org/BreadcrumbList
export interface BreadcrumbList extends Thing<'BreadcrumbList'> {
  itemListElement?: ListItem[]
}

export type LdData =
  | Product
  | Organization
  | WebPage
  | ItemList
  | Offer
  | Store
  | BreadcrumbList
