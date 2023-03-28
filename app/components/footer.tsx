import type * as React from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'

import type { LinkType } from '../../types'
import { Grid } from '~/components/grid'
import { LanguageSwitch } from '~/components/language-switch'
import { Paragraph } from '~/components/typography'
import { Markdown } from '~/utils/markdown'

type Props = {
  menu: LinkType[]
  additionalLinks: LinkType[]
  address: string
  directionsLink: LinkType
  disclaimer: string
  socialText: string
}

function Logo() {
  return (
    <svg
      width="77"
      height="32"
      viewBox="0 0 77 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99452 32C7.80353 32 5.85264 31.6433 4.14187 30.93C2.4311 30.2166 1.05047 29.2061 0 27.8982L3.87175 24.6436C4.77216 25.6244 5.79262 26.3378 6.93314 26.7836C8.07365 27.1998 9.22918 27.4078 10.3997 27.4078C11.3301 27.4078 12.0805 27.1998 12.6507 26.7836C13.221 26.3675 13.5061 25.7879 13.5061 25.0449C13.5061 24.391 13.236 23.8708 12.6957 23.4844C12.1555 23.1277 10.8649 22.6819 8.82399 22.1469C5.79263 21.3741 3.64664 20.3189 2.38608 18.9814C1.27558 17.7925 0.720326 16.3212 0.720326 14.5676C0.720326 13.1706 1.14052 11.9519 1.98089 10.9116C2.82127 9.84162 3.93178 9.00938 5.31241 8.41492C6.69303 7.82046 8.19371 7.52323 9.81444 7.52323C11.6753 7.52323 13.4311 7.85019 15.0818 8.50409C16.7326 9.15799 18.1132 10.0497 19.2237 11.1791L15.8922 14.7905C15.0518 14.0177 14.0764 13.3786 12.9659 12.8733C11.8854 12.3383 10.8799 12.0708 9.9495 12.0708C7.78853 12.0708 6.70804 12.8139 6.70804 14.3C6.73805 15.0134 7.0682 15.5781 7.69849 15.9942C8.29876 16.4104 9.66437 16.9008 11.7953 17.4655C14.6466 18.2086 16.6575 19.1895 17.8281 20.4081C18.8485 21.4484 19.3587 22.8305 19.3587 24.5544C19.3587 25.9811 18.9386 27.2592 18.0982 28.3887C17.2878 29.5181 16.1773 30.4098 14.7667 31.0637C13.356 31.6879 11.7653 32 9.99452 32Z"
        fill="white"
      />
      <path
        d="M31.1072 32C29.1263 32 27.3405 31.465 25.7498 30.395C24.1591 29.3249 22.8835 27.8685 21.923 26.0257C20.9926 24.1829 20.5274 22.0874 20.5274 19.7393C20.5274 17.3318 20.9926 15.2215 21.923 13.4084C22.8835 11.5655 24.1741 10.124 25.7948 9.08369C27.4455 8.04339 29.3064 7.52323 31.3773 7.52323C33.0581 7.52323 34.5287 7.86505 35.7893 8.54867C37.0499 9.20258 38.0553 10.0645 38.8057 11.1346V8.01366H44.9284V31.5542H38.7606V28.3887C37.9203 29.429 36.8248 30.2909 35.4742 30.9746C34.1536 31.6582 32.6979 32 31.1072 32ZM32.7729 26.6945C34.6038 26.6945 36.0894 26.0554 37.2299 24.7773C38.3705 23.4993 38.9407 21.8199 38.9407 19.7393C38.9407 17.6587 38.3705 15.9794 37.2299 14.7013C36.0894 13.4232 34.6038 12.7842 32.7729 12.7842C30.9721 12.7842 29.5015 13.4232 28.3609 14.7013C27.2504 15.9794 26.6952 17.6587 26.6952 19.7393C26.6952 21.8199 27.2504 23.4993 28.3609 24.7773C29.5015 26.0554 30.9721 26.6945 32.7729 26.6945Z"
        fill="white"
      />
      <path
        d="M48.5265 31.5542V0H54.4601L54.6493 31.5542H48.5265Z"
        fill="white"
      />
      <path
        d="M61.2182 31.5542V13.4975H56.7161V8.01366H61.2182V1.99479L67.3409 0V8.01366H71.7057L74.1535 13.4975H67.3409V31.5542H61.2182Z"
        fill="white"
      />
      <ellipse
        cx="73.5872"
        cy="28.441"
        rx="3.4114"
        ry="3.37436"
        fill="#EB596E"
      />
    </svg>
  )
}

const textClassName =
  'text-inverse-secondary font-medium tracking-tight leading-normal hover:text-white focus:text-white transition'

export function Footer({
  menu,
  address,
  directionsLink,
  additionalLinks,
  disclaimer,
  socialText,
}: Props) {
  return (
    <footer className="bg-gray-900 py-14">
      <Grid>
        <div className="border-secondary col-span-full border-b pb-12 lg:border-0 lg:pb-10">
          <Logo />
        </div>
        <ul className="border-secondary col-span-full border-b py-8 lg:col-span-3 lg:mb-3 lg:border-0 lg:py-0">
          {menu.map((link) => (
            <li key={link.id} className="mb-6 last:mb-0 lg:mb-3">
              <Link
                to={link.url}
                prefetch="intent"
                className={`${textClassName} underlined text-2xl`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-secondary col-span-full border-b py-8 lg:col-span-5 lg:border-0 lg:py-0">
          <address className="mb-6 opacity-60">
            <Markdown
              margins={false}
              textColor="inverse"
              bodyTextSize="xl"
              responsive={false}
            >
              {address}
            </Markdown>
          </address>
          <Link
            to={directionsLink.url}
            target="_blank"
            rel="noopener"
            className={`${textClassName} underlined active text-2xl`}
          >
            {directionsLink.text}
          </Link>
        </div>
        <div className="col-span-full py-8 lg:col-span-4 lg:py-0">
          <Markdown
            bodyTextSize="xl"
            textColor="inverse-secondary"
            linksInNewTab
            margins={false}
            responsive={false}
          >
            {socialText}
          </Markdown>
        </div>
        <div
          className={clsx(
            'border-secondary border-t pt-8 lg:mt-12',
            'col-span-full flex flex-col-reverse justify-between',
            'lg:flex-row lg:items-center',
          )}
        >
          <Paragraph
            className="mt-8 opacity-60 lg:mt-0"
            textColorClassName="text-white"
            size="lg"
          >
            {disclaimer}
          </Paragraph>

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <ul className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-4">
              {additionalLinks.map((link) => (
                <li key={link.id} className="mb-4 last:mb-0 lg:mb-0">
                  <Link
                    to={link.url}
                    prefetch="intent"
                    className={`${textClassName} text-lg`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitch />
          </div>
        </div>
      </Grid>
    </footer>
  )
}
