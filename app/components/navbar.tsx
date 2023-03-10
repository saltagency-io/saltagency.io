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
          'underlined hover:text-primary focus:text-primary block focus:outline-none',
          'select-none whitespace-nowrap text-2xl font-medium tracking-tight',
          {
            'active text-primary': isSelected,
            'text-gray-600': !isSelected,
          },
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
                <MenuLink className={linkClassName} as={Link} to="/">
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
      width={size === 'large' ? 107 : 58}
      height={size === 'large' ? 45 : 24}
      viewBox="0 0 107 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8885 45C10.8439 45 8.1329 44.4984 5.75559 43.4953C3.37828 42.4921 1.45975 41.071 0 39.2319L5.38022 34.6551C6.63144 36.0344 8.04949 37.0375 9.63436 37.6645C11.2192 38.2497 12.825 38.5422 14.4515 38.5422C15.7445 38.5422 16.7871 38.2497 17.5796 37.6645C18.372 37.0793 18.7682 36.2643 18.7682 35.2193C18.7682 34.2998 18.3929 33.5683 17.6421 33.0249C16.8914 32.5234 15.098 31.8964 12.2619 31.144C8.04949 30.0573 5.06742 28.5735 3.31572 26.6926C1.77255 25.0207 1.00097 22.9517 1.00097 20.4856C1.00097 18.5211 1.58487 16.8074 2.75267 15.3445C3.92047 13.8398 5.46365 12.6694 7.38217 11.8335C9.3007 10.9975 11.3861 10.5795 13.6383 10.5795C16.2241 10.5795 18.664 11.0393 20.9578 11.9589C23.2517 12.8784 25.1703 14.1324 26.7134 15.7207L22.0839 20.7991C20.9161 19.7124 19.5607 18.8137 18.0175 18.1031C16.516 17.3508 15.1189 16.9746 13.8259 16.9746C10.823 16.9746 9.32156 18.0195 9.32156 20.1094C9.36327 21.1126 9.82205 21.9067 10.6979 22.4919C11.532 23.0771 13.4297 23.7667 16.3909 24.5609C20.3531 25.6058 23.1475 26.9852 24.7741 28.6989C26.1921 30.1618 26.9011 32.1054 26.9011 34.5297C26.9011 36.536 26.3172 38.3333 25.1494 39.9216C24.0233 41.5099 22.4802 42.7638 20.5199 43.6834C18.5597 44.5611 16.3492 45 13.8885 45Z"
        fill="#020109"
        fillOpacity="0.95"
      />
      <path
        d="M43.2269 45C40.4742 45 37.9926 44.2476 35.7822 42.7429C33.5717 41.2382 31.7991 39.1901 30.4645 36.5987C29.1716 34.0072 28.5251 31.0605 28.5251 27.7584C28.5251 24.3728 29.1716 21.4052 30.4645 18.8555C31.7991 16.264 33.5925 14.2369 35.8447 12.7739C38.1386 11.311 40.7244 10.5795 43.6022 10.5795C45.9378 10.5795 47.9815 11.0602 49.7332 12.0216C51.4849 12.9411 52.8821 14.1533 53.9247 15.658V11.2692H62.433V44.373H53.8622V39.9216C52.6944 41.3845 51.1721 42.5966 49.2953 43.558C47.4601 44.5193 45.4374 45 43.2269 45ZM45.5416 37.5391C48.0858 37.5391 50.1503 36.6404 51.7351 34.8431C53.32 33.0458 54.1124 30.6843 54.1124 27.7584C54.1124 24.8326 53.32 22.471 51.7351 20.6737C50.1503 18.8764 48.0858 17.9778 45.5416 17.9778C43.0392 17.9778 40.9955 18.8764 39.4107 20.6737C37.8675 22.471 37.0959 24.8326 37.0959 27.7584C37.0959 30.6843 37.8675 33.0458 39.4107 34.8431C40.9955 36.6404 43.0392 37.5391 45.5416 37.5391Z"
        fill="#020109"
        fillOpacity="0.95"
      />
      <path
        d="M67.4329 44.373V0H75.6783L75.9412 44.373H67.4329Z"
        fill="#020109"
        fillOpacity="0.95"
      />
      <path
        d="M85.0694 44.373V18.9809H78.8133V11.2692H85.0694V2.80517L93.5776 0V11.2692H99.643L103.044 18.9809H93.5776V44.373H85.0694Z"
        fill="#020109"
        fillOpacity="0.95"
      />
      <ellipse
        cx="102.259"
        cy="39.9952"
        rx="4.74052"
        ry="4.74519"
        fill="#EB596E"
      />
    </svg>
  )
}

type Props = {
  menu: LinkType[]
}

export function Navbar({ menu }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 mx-8vw py-8 lg:mt-12 lg:py-8">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Link prefetch="intent" to="/" title="home">
          <span className="sr-only">Salt Agency</span>
          {/*Mobile*/}
          <Logo size="small" className="block lg:hidden" />
          {/*Desktop*/}
          <Logo size="large" className="hidden lg:block" />
        </Link>

        <ul className="hidden gap-x-10 lg:flex">
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
