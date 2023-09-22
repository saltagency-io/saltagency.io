import * as React from 'react'

import { Link, useLocation } from '@remix-run/react'

import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from '@reach/menu-button'

import { GradientCircle } from '~/components/gradient-circle'
import type { LinkType } from '~/types'
import { defaultLanguage } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'
import { useLabels } from '~/utils/labels-provider'

function NavLink({
  to,
  children,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & { to: string }) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  return (
    <li>
      <Link
        to={to}
        prefetch="intent"
        className={clsx(
          'underlined hover:text-primary focus:text-primary flex h-full items-center px-4 focus:outline-none',
          'select-none whitespace-nowrap font-bold leading-6 tracking-tight',
          isSelected ? 'active text-primary' : 'text-gray-600',
        )}
        {...rest}
      >
        {children}
      </Link>
    </li>
  )
}

function MobileMenuList({ menu }: { menu: LinkType[] }) {
  const { isExpanded } = useMenuButtonContext()
  const { language, isDefaultLanguage } = useI18n()
  const { t } = useLabels()
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-auto')
      document.body.style.height = 'calc(100vh - env(safe-area-inset-bottom))'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-auto')
      document.body.style.removeProperty('height')
    }
  }, [isExpanded])

  const linkClassName = clsx(
    'text-primary text-2xl leading-normal tracking-tight',
    'mx-8vw border-b border-gray-200 py-6 px-0',
    'hover:bg-primary focus:bg-primary',
  )

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 2rem)`,
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: 'block' }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0, overflowY: 'hidden' }}
            animate={{ y: 0, opacity: 1, overflowY: 'scroll' }}
            exit={{ y: -50, opacity: 0, overflowY: 'hidden' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: 'linear',
            }}
            className="bg-primary flex h-full flex-col overflow-x-hidden py-12"
          >
            <MenuItems className="border-none bg-transparent p-0">
              <>
                <MenuLink
                  as={Link}
                  className={linkClassName}
                  to={isDefaultLanguage ? '/' : `/${language}`}
                >
                  {t('home')}
                </MenuLink>
                {menu.map((link) => (
                  <MenuLink
                    className={`${linkClassName} hover:text-gray-600 focus:text-gray-600`}
                    key={link.id}
                    as={Link}
                    to={link.url}
                  >
                    {link.text}
                  </MenuLink>
                ))}
              </>
            </MenuItems>
            <GradientCircle
              rotate={-75}
              height={758}
              width={758}
              top={140}
              right={-540}
              opacity={20}
            />
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  )
}

const topVariants = {
  open: { rotate: 45, y: 7 },
  closed: { rotate: 0, y: 0 },
}

const centerVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
}

const bottomVariants = {
  open: { rotate: -45, y: -5 },
  closed: { rotate: 0, y: 0 },
}

function MobileMenu({ menu }: { menu: LinkType[] }) {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? { duration: 0 } : {}

  return (
    <Menu>
      {({ isExpanded }) => {
        const state = isExpanded ? 'open' : 'closed'
        return (
          <>
            <MenuButton
              className={clsx(
                '-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-lg p-1 text-gray-700 transition focus:outline-none',
                {
                  'bg-gray-100': state === 'open',
                },
              )}
            >
              <span className="sr-only">
                {state === 'open' ? 'Close menu' : 'Open menu'}
              </span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  animate={state}
                  variants={topVariants}
                  transition={transition}
                  x="6"
                  y="9"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={centerVariants}
                  transition={transition}
                  x="6"
                  y="15"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={bottomVariants}
                  transition={transition}
                  x="6"
                  y="21"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </MenuButton>
            <MobileMenuList menu={menu} />
          </>
        )
      }}
    </Menu>
  )
}

function Logo({
  className,
  size = 'large',
}: {
  className?: string
  size?: 'small' | 'large'
}) {
  return (
    <svg
      className={className}
      width={size === 'large' ? 146 : 109}
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
          fill="#000002"
        />
        <path
          d="M121.823 6.51931C120.188 6.51931 118.887 5.19851 118.887 3.53905C118.887 1.87959 120.188 0.592664 121.823 0.592664C123.425 0.592664 124.726 1.87959 124.726 3.53905C124.726 5.19851 123.425 6.51931 121.823 6.51931Z"
          fill="#000002"
        />
        <path
          d="M133.218 28.0071H127.462V9.04179H132.881L133.255 11.0142C134.414 9.38317 136.544 8.4349 138.974 8.4349C143.421 8.4349 146 11.3176 146 16.2865V28.0071H140.244V17.69C140.244 15.3003 138.936 13.7452 136.955 13.7452C134.675 13.7452 133.218 15.2624 133.218 17.6141V28.0071Z"
          fill="#000002"
        />
        <path
          d="M118.887 27.8552V8.88997H124.726V27.8552H118.887Z"
          fill="#000002"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M83.8355 8.42079C77.8555 8.42079 73.5199 12.4414 73.5199 18.4345C73.5199 24.4275 77.8555 28.4102 83.8355 28.4102C89.7781 28.4102 94.1137 24.4275 94.1137 18.4345C94.1137 12.4414 89.7781 8.42079 83.8355 8.42079ZM83.8355 23.1758C81.1445 23.1758 79.3131 21.2792 79.3131 18.3965C79.3131 15.5517 81.1445 13.6552 83.8355 13.6552C86.4891 13.6552 88.3205 15.5517 88.3205 18.3965C88.3205 21.2792 86.4891 23.1758 83.8355 23.1758Z"
          fill="#000002"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M51.9124 18.4345C51.9124 12.4414 56.2479 8.42079 62.2279 8.42079C68.1706 8.42079 72.5061 12.4414 72.5061 18.4345C72.5061 24.4275 68.1706 28.4102 62.2279 28.4102C56.2479 28.4102 51.9124 24.4275 51.9124 18.4345ZM57.7055 18.3965C57.7055 21.2792 59.5369 23.1758 62.2279 23.1758C64.8816 23.1758 66.7129 21.2792 66.7129 18.3965C66.7129 15.5517 64.8816 13.6552 62.2279 13.6552C59.5369 13.6552 57.7055 15.5517 57.7055 18.3965Z"
          fill="#000002"
        />
        <path
          d="M34.1467 27.8552H39.9866V23.7066L42.1076 21.0657L46.4104 27.8552H52.8343L46.1441 16.7037L52.8343 8.29725H45.8264L40.5706 16.0019V4.14865H34.1467V27.8552Z"
          fill="#000002"
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

type Props = {
  menu: LinkType[]
}

export function Navbar({ menu }: Props) {
  const { language } = useI18n()

  return (
    <div className="absolute top-0 left-0 right-0 z-10 mx-8vw mt-12 lg:mt-16">
      <nav className="ml-auto flex h-12 max-w-5xl items-center justify-between lg:h-18">
        <Link
          to={language !== defaultLanguage ? `/${language}` : '/'}
          prefetch="intent"
          title="home"
        >
          <span className="sr-only">Koodin</span>
          {/*Mobile*/}
          <Logo size="small" className="block lg:hidden" />
          {/*Desktop*/}
          <Logo size="large" className="hidden lg:block" />
        </Link>

        <ul className="hidden gap-x-2 lg:flex lg:self-stretch">
          {menu.map((link) => (
            <NavLink key={link.id} to={link.url}>
              {link.text}
            </NavLink>
          ))}
        </ul>

        <div className="block lg:hidden">
          <MobileMenu menu={menu} />
        </div>
      </nav>
    </div>
  )
}
