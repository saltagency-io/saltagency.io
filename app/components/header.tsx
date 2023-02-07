import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from '@reach/menu-button'

import * as React from 'react'

import { Link, useLocation } from '@remix-run/react'

import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import type { LinkType } from '~/types'

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
          'underlined block whitespace-nowrap text-lg font-medium hover:text-white focus:outline-none',
          {
            'active text-white': isSelected,
            'text-gray-400': !isSelected,
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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: 'linear',
            }}
            className="bg-primary flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12"
          >
            <MenuItems className="border-none bg-transparent p-0">
              {menu.map((link) => (
                <MenuLink
                  className="text-primary border-b border-gray-200 px-10vw py-9 hover:bg-gray-700 focus:bg-gray-700"
                  key={link.id}
                  as={Link}
                  to={link.url}
                >
                  {link.text}
                </MenuLink>
              ))}
            </MenuItems>
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
            <MenuButton className="text-primary inline-flex h-14 w-14 items-center justify-center rounded-full p-1 transition focus:outline-none">
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

type Props = {
  logoUrl: string
  logoAlt: string
  menu: LinkType[]
}

export function Header({ logoUrl, logoAlt, menu }: Props) {
  return (
    <nav className="mx-10vw">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-8 lg:py-24">
        <Link prefetch="intent" to="/">
          <img className="w-16" src={logoUrl} alt={logoAlt} />
        </Link>

        <ul className="hidden gap-x-8 lg:flex">
          {menu.map((link) => (
            <NavLink key={link.id} to={link.url}>
              {link.text}
            </NavLink>
          ))}
        </ul>

        <div className="block lg:hidden">
          <MobileMenu menu={menu} />
        </div>
      </div>
    </nav>
  )
}
