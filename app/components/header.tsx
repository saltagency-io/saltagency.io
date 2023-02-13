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
          'underlined hover:text-primary block whitespace-nowrap text-xl font-medium focus:outline-none',
          {
            'active text-primary': isSelected,
            'text-gray-500': !isSelected,
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

function Logo() {
  return (
    <svg
      width="95"
      height="40"
      viewBox="0 0 95 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3309 40C9.62771 40 7.22078 39.5542 5.11009 38.6625C2.9994 37.7708 1.29604 36.5076 0 34.8728L4.77682 30.8045C5.88771 32.0306 7.14672 32.9222 8.55385 33.4796C9.96097 33.9997 11.3866 34.2598 12.8308 34.2598C13.9787 34.2598 14.9044 33.9997 15.608 33.4796C16.3116 32.9594 16.6633 32.2349 16.6633 31.3061C16.6633 30.4887 16.3301 29.8385 15.6635 29.3555C14.997 28.9097 13.4047 28.3524 10.8867 27.6836C7.14673 26.7176 4.4991 25.3987 2.94385 23.7267C1.57376 22.2406 0.888712 20.4015 0.888712 18.2094C0.888712 16.4632 1.40713 14.9399 2.44395 13.6396C3.48078 12.302 4.85089 11.2617 6.55425 10.5187C8.25761 9.77558 10.1091 9.40404 12.1087 9.40404C14.4045 9.40404 16.5708 9.81273 18.6074 10.6301C20.644 11.4475 22.3474 12.5621 23.7175 13.9739L19.6072 18.4881C18.5704 17.5221 17.3669 16.7233 15.9968 16.0917C14.6637 15.4229 13.4232 15.0885 12.2753 15.0885C9.6092 15.0885 8.27613 16.0174 8.27613 17.8751C8.31316 18.7667 8.72049 19.4727 9.49811 19.9928C10.2387 20.513 11.9235 21.126 14.5526 21.8319C18.0705 22.7608 20.5514 23.9868 21.9956 25.5101C23.2546 26.8105 23.8841 28.5381 23.8841 30.693C23.8841 32.4764 23.3657 34.074 22.3289 35.4858C21.3291 36.8977 19.959 38.0123 18.2186 38.8297C16.4782 39.6099 14.5156 40 12.3309 40Z"
        fill="#0F0E17"
      />
      <path
        d="M38.3789 40C35.9349 40 33.7317 39.3312 31.7691 37.9937C29.8065 36.6562 28.2328 34.8357 27.0478 32.5321C25.8999 30.2286 25.326 27.6093 25.326 24.6742C25.326 21.6647 25.8999 19.0268 27.0478 16.7605C28.2328 14.4569 29.8251 12.655 31.8247 11.3546C33.8613 10.0542 36.1571 9.40404 38.7122 9.40404C40.7858 9.40404 42.6003 9.83131 44.1555 10.6858C45.7108 11.5032 46.9512 12.5807 47.877 13.9182V10.0171H55.431V39.4427H47.8214V35.4858C46.7846 36.7862 45.433 37.8637 43.7667 38.7182C42.1374 39.5727 40.3415 40 38.3789 40ZM40.434 33.3681C42.6928 33.3681 44.5258 32.5693 45.9329 30.9717C47.3401 29.3741 48.0436 27.2749 48.0436 24.6742C48.0436 22.0734 47.3401 19.9742 45.9329 18.3766C44.5258 16.779 42.6928 15.9802 40.434 15.9802C38.2123 15.9802 36.3978 16.779 34.9907 18.3766C33.6206 19.9742 32.9355 22.0734 32.9355 24.6742C32.9355 27.2749 33.6206 29.3741 34.9907 30.9717C36.3978 32.5693 38.2123 33.3681 40.434 33.3681Z"
        fill="#0F0E17"
      />
      <path
        d="M59.8702 39.4427V0H67.1908L67.4242 39.4427H59.8702Z"
        fill="#0F0E17"
      />
      <path
        d="M75.5287 39.4427V16.8719H69.9743V10.0171H75.5287V2.49348L83.0827 0V10.0171H88.4678L91.4878 16.8719H83.0827V39.4427H75.5287Z"
        fill="#0F0E17"
      />
      <ellipse
        cx="90.7909"
        cy="35.5513"
        rx="4.20886"
        ry="4.21795"
        fill="#EB596E"
      />
    </svg>
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
      <div className="mx-auto flex max-w-7xl items-center justify-between py-8 lg:py-16">
        <Link prefetch="intent" to="/">
          {/*<img className="w-16" src={logoUrl} alt={logoAlt} />*/}
          <Logo />
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
      </div>
    </nav>
  )
}
