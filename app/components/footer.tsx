import { Link } from '@remix-run/react'
import clsx from 'clsx'

import { Grid } from '#app/components/grid.tsx'
import { Paragraph } from '#app/components/ui/typography.tsx'
import { type LinkType } from '#app/types.ts'
import { Markdown } from '#app/utils/markdown.tsx'

type Props = {
  menu: LinkType[]
  additionalLinks: LinkType[]
  address: string
  directionsLink: LinkType
  socialText: string
}

function Logo() {
  return (
    <svg
      width={146}
      viewBox="0 0 146 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_772_114"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="147"
        height="30"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.17 28.5001C98.7878 28.5001 95.3119 24.6311 95.3119 18.6381C95.3119 12.6072 98.8625 8.4348 104.544 8.4348C106.861 8.4348 109.066 9.38307 110.15 10.7865V0H115.906V28.007H110.486L110.187 25.5794C109.178 27.3242 106.861 28.5001 104.17 28.5001ZM105.553 23.1518C108.244 23.1518 110.112 21.2553 110.112 18.4105C110.112 15.5657 108.244 13.6692 105.553 13.6692C102.824 13.6692 101.105 15.6037 101.105 18.4105C101.105 21.2174 102.824 23.1518 105.553 23.1518ZM121.823 6.51931C120.188 6.51931 118.887 5.19851 118.887 3.53905C118.887 1.87959 120.188 0.592664 121.823 0.592664C123.425 0.592664 124.726 1.87959 124.726 3.53905C124.726 5.19851 123.425 6.51931 121.823 6.51931ZM127.462 28.0071H133.218V17.6141C133.218 15.2624 134.675 13.7452 136.955 13.7452C138.936 13.7452 140.244 15.3003 140.244 17.69V28.0071H146V16.2865C146 11.3176 143.421 8.4349 138.974 8.4349C136.544 8.4349 134.414 9.38317 133.255 11.0142L132.881 9.04179H127.462V28.0071ZM118.887 27.8552V8.88997H124.726V27.8552H118.887ZM73.5199 18.4345C73.5199 12.4414 77.8554 8.42079 83.8355 8.42079C89.7781 8.42079 94.1136 12.4414 94.1136 18.4345C94.1136 24.4275 89.7781 28.4102 83.8355 28.4102C77.8554 28.4102 73.5199 24.4275 73.5199 18.4345ZM79.3131 18.3965C79.3131 21.2792 81.1444 23.1758 83.8355 23.1758C86.4891 23.1758 88.3205 21.2792 88.3205 18.3965C88.3205 15.5517 86.4891 13.6552 83.8355 13.6552C81.1444 13.6552 79.3131 15.5517 79.3131 18.3965ZM51.9123 18.4345C51.9123 12.4414 56.2479 8.42079 62.2279 8.42079C68.1705 8.42079 72.5061 12.4414 72.5061 18.4345C72.5061 24.4275 68.1705 28.4102 62.2279 28.4102C56.2479 28.4102 51.9123 24.4275 51.9123 18.4345ZM57.7055 18.3965C57.7055 21.2792 59.5369 23.1758 62.2279 23.1758C64.8815 23.1758 66.7129 21.2792 66.7129 18.3965C66.7129 15.5517 64.8815 13.6552 62.2279 13.6552C59.5369 13.6552 57.7055 15.5517 57.7055 18.3965ZM39.9865 27.8552H34.1467V4.14865H40.5705V16.0019L45.8264 8.29725H52.8343L46.1441 16.7037L52.8343 27.8552H46.4104L42.1076 21.0657L39.9865 23.7066V27.8552ZM18.3742 2.97403C18.783 3.69482 18.7566 4.58886 18.3062 5.28341L8.20857 20.8529C7.25493 22.3233 5.1147 22.2579 4.24932 20.732L0.312313 13.7899C-0.330611 12.6562 0.0509287 11.2066 1.16451 10.5521L15.4258 2.16975C16.4581 1.56298 17.7782 1.92307 18.3742 2.97403ZM9.12769 28.901C8.71892 28.1802 8.74525 27.2861 9.1957 26.5916L19.2933 11.0221C20.247 9.55172 22.3872 9.61706 23.2526 11.143L27.1896 18.0851C27.8325 19.2188 27.451 20.6684 26.3374 21.3229L12.0761 29.7052C11.0438 30.312 9.72371 29.9519 9.12769 28.901Z"
          fill="#4353FF"
        />
      </mask>
      <g mask="url(#mask0_772_114)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.17 28.5001C98.7878 28.5001 95.3119 24.6311 95.3119 18.6381C95.3119 12.6072 98.8626 8.4348 104.544 8.4348C106.861 8.4348 109.066 9.38307 110.15 10.7865V0H115.906V28.007H110.486L110.187 25.5794C109.178 27.3242 106.861 28.5001 104.17 28.5001ZM105.553 23.1518C108.244 23.1518 110.112 21.2553 110.112 18.4105C110.112 15.5657 108.244 13.6692 105.553 13.6692C102.824 13.6692 101.105 15.6037 101.105 18.4105C101.105 21.2174 102.824 23.1518 105.553 23.1518Z"
          fill="#FFFFFF"
        />
        <path
          d="M121.823 6.51931C120.188 6.51931 118.887 5.19851 118.887 3.53905C118.887 1.87959 120.188 0.592664 121.823 0.592664C123.425 0.592664 124.726 1.87959 124.726 3.53905C124.726 5.19851 123.425 6.51931 121.823 6.51931Z"
          fill="#FFFFFF"
        />
        <path
          d="M133.218 28.0071H127.462V9.04179H132.881L133.255 11.0142C134.414 9.38317 136.544 8.4349 138.974 8.4349C143.421 8.4349 146 11.3176 146 16.2865V28.0071H140.244V17.69C140.244 15.3003 138.936 13.7452 136.955 13.7452C134.675 13.7452 133.218 15.2624 133.218 17.6141V28.0071Z"
          fill="#FFFFFF"
        />
        <path
          d="M118.887 27.8552V8.88997H124.726V27.8552H118.887Z"
          fill="#FFFFFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M83.8355 8.42079C77.8555 8.42079 73.5199 12.4414 73.5199 18.4345C73.5199 24.4275 77.8555 28.4102 83.8355 28.4102C89.7781 28.4102 94.1137 24.4275 94.1137 18.4345C94.1137 12.4414 89.7781 8.42079 83.8355 8.42079ZM83.8355 23.1758C81.1445 23.1758 79.3131 21.2792 79.3131 18.3965C79.3131 15.5517 81.1445 13.6552 83.8355 13.6552C86.4891 13.6552 88.3205 15.5517 88.3205 18.3965C88.3205 21.2792 86.4891 23.1758 83.8355 23.1758Z"
          fill="#FFFFFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M51.9124 18.4345C51.9124 12.4414 56.2479 8.42079 62.2279 8.42079C68.1706 8.42079 72.5061 12.4414 72.5061 18.4345C72.5061 24.4275 68.1706 28.4102 62.2279 28.4102C56.2479 28.4102 51.9124 24.4275 51.9124 18.4345ZM57.7055 18.3965C57.7055 21.2792 59.5369 23.1758 62.2279 23.1758C64.8816 23.1758 66.7129 21.2792 66.7129 18.3965C66.7129 15.5517 64.8816 13.6552 62.2279 13.6552C59.5369 13.6552 57.7055 15.5517 57.7055 18.3965Z"
          fill="#FFFFFF"
        />
        <path
          d="M34.1467 27.8552H39.9866V23.7066L42.1076 21.0657L46.4104 27.8552H52.8343L46.1441 16.7037L52.8343 8.29725H45.8264L40.5706 16.0019V4.14865H34.1467V27.8552Z"
          fill="#FFFFFF"
        />
        <path
          d="M18.3062 5.28341C18.7566 4.58886 18.783 3.69482 18.3742 2.97403C17.7782 1.92307 16.4581 1.56298 15.4258 2.16975L1.16451 10.5521C0.0509287 11.2066 -0.330611 12.6562 0.312313 13.7899L4.24932 20.732C5.1147 22.2579 7.25493 22.3233 8.20857 20.8529L18.3062 5.28341Z"
          fill="#4353FF"
        />
        <path
          d="M9.1957 26.5916C8.74525 27.2861 8.71892 28.1802 9.12769 28.901C9.72371 29.9519 11.0438 30.312 12.0761 29.7052L26.3374 21.3229C27.451 20.6684 27.8325 19.2188 27.1896 18.0851L23.2526 11.143C22.3872 9.61706 20.247 9.55172 19.2933 11.0221L9.1957 26.5916Z"
          fill="#4353FF"
        />
      </g>
    </svg>
  )
}

const textClassName = 'leading-6 hover:opacity-80 focus:opacity-80 transition'

export function Footer({
  menu,
  address,
  directionsLink,
  additionalLinks,
  socialText,
}: Props) {
  return (
    <footer className="bg-gray-800 py-16">
      <Grid>
        <div className="border-secondary col-span-full mb-8 border-b lg:border-0 lg:pb-9">
          <Logo />
        </div>
        <ul className="border-secondary col-span-full flex flex-col justify-center gap-6 border-b py-8 lg:col-span-3 lg:mb-3 lg:border-0 lg:py-0">
          {menu.map(link => (
            <li key={link.id}>
              <Link
                to={link.url}
                prefetch="intent"
                className={`${textClassName} block w-min whitespace-nowrap font-bold text-white hover:underline`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-secondary col-span-full flex flex-col justify-center border-b py-8 lg:col-span-5 lg:border-0 lg:py-0">
          <address className="mb-8">
            <Markdown margins={false} textColor="gray" responsive={false}>
              {address}
            </Markdown>
          </address>
          <div>
            <Link
              to={directionsLink.url}
              target="_blank"
              rel="noopener"
              className={`${textClassName} active font-bold text-gray-300 underline`}
            >
              {directionsLink.text}
            </Link>
          </div>
        </div>
        <div className="col-span-full flex flex-col justify-center py-8 lg:col-span-4 lg:py-0">
          <Markdown
            textColor="gray"
            linksInNewTab
            margins={false}
            responsive={false}
          >
            {socialText}
          </Markdown>
        </div>
        <div
          className={clsx(
            'border-secondary border-t pb-4 pt-12 lg:mt-8',
            'col-span-full flex flex-col-reverse justify-between',
            'lg:flex-row lg:items-center',
          )}
        >
          <Paragraph
            className="mt-8 lg:mt-0"
            textColorClassName="text-gray-300"
            size="sm"
          >
            <span>
              © {new Date().getFullYear() - 1} - {new Date().getFullYear()}{' '}
              Koodin
            </span>
          </Paragraph>

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <ul className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-4">
              {additionalLinks.map(link => (
                <li key={link.id} className="mb-4 last:mb-0 lg:mb-0">
                  <Link
                    to={link.url}
                    prefetch="intent"
                    className={`${textClassName} text-gray-300`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            {/*<LanguageSwitch />*/}
          </div>
        </div>
      </Grid>
    </footer>
  )
}
