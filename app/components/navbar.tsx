import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Link, useLocation, useNavigation } from '@remix-run/react'

import clsx from 'clsx'
import FocusTrap from 'focus-trap-react'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { createPortal } from 'react-dom'
import { useHydrated } from 'remix-utils'

import type { LinkType } from '~/types'
import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks,
} from '~/utils/bodyScrollLock'
import { defaultLanguage } from '~/utils/i18n'
import { useI18n } from '~/utils/i18n-provider'

function NavLink({
  to,
  children,
  scrollY,
  ...rest
}: Omit<Parameters<typeof Link>['0'], 'to'> & {
  to: string
  scrollY: MotionValue<number>
}) {
  const textColor = useTransform(scrollY, [60, 120], ['#16151F', '#FFFFFF'])
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

  return (
    <motion.li
      style={{ color: textColor }}
      animate={{
        opacity: isSelected ? 1 : 0.7,
      }}
    >
      <Link
        to={to}
        prefetch="intent"
        className={clsx(
          'underlined flex h-full items-center px-4 focus:outline-none ',
          'select-none whitespace-nowrap font-bold leading-6 tracking-tight',
          isSelected && 'active text-blue-400',
        )}
        {...rest}
      >
        {children}
      </Link>
    </motion.li>
  )
}

function MobileMenuList({
  menu,
  expanded,
}: {
  menu: LinkType[]
  expanded: boolean
}) {
  const menuRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!menuRef.current) {
      return
    }
    if (expanded) {
      disableBodyScroll(menuRef.current)
      return
    }
    enableBodyScroll(menuRef.current)
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [expanded])

  return (
    <AnimatePresence>
      {expanded ? (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <motion.nav
            key="mobile-menu"
            initial="initial"
            animate="visible"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            transition={{
              duration: 0.4,
              type: 'spring',
              delayChildren: 0.2,
            }}
            className={clsx(
              'bg-mobile-menu',
              'fixed top-0 z-40 flex h-100vh w-100vw items-center justify-center backdrop-blur-lg',
            )}
            ref={menuRef}
          >
            <motion.ul
              className="flex grow flex-col items-center gap-4 px-14 md:max-w-sm md:gap-6"
              variants={{
                initial: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0 },
              }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              {menu.map((link) => {
                const active =
                  link.url === location.pathname ||
                  location.pathname.startsWith(`${link.url}/`)
                return (
                  <Link
                    key={link.id}
                    to={link.url}
                    className={clsx(
                      'flex h-18 items-center justify-center self-stretch border-b px-4 font-display text-2xl font-bold transition',
                      active
                        ? 'border-b-current opacity-100'
                        : 'border-b-transparent opacity-70',
                      'hover:border-b-current',
                    )}
                  >
                    {link.text}
                  </Link>
                )
              })}
            </motion.ul>
          </motion.nav>
        </FocusTrap>
      ) : null}
    </AnimatePresence>
  )
}

const topVariants = {
  open: { rotate: 45, y: 6 },
  closed: { rotate: 0, y: 0 },
}

const centerVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
}

const bottomVariants = {
  open: { rotate: -45, y: -6 },
  closed: { rotate: 0, y: 0 },
}

function MobileMenu({
  menu,
  scrollY,
  expanded,
  setExpanded,
}: {
  menu: LinkType[]
  scrollY: MotionValue<number>
  expanded: boolean
  setExpanded: (newVal: boolean) => void
}) {
  const isHydrated = useHydrated()
  const state = expanded ? 'open' : 'closed'
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? { duration: 0 } : {}

  const iconColor = useTransform(scrollY, [60, 120], ['#16151F', '#FFFFFF'])
  const iconColorWithExpand = expanded ? '#16151F' : iconColor

  if (!isHydrated) {
    return null
  }

  return (
    <>
      <button
        onClick={() => {
          setExpanded(!expanded)
        }}
        className={clsx(
          '-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-lg p-1 text-gray-700 transition',
        )}
      >
        <span className="sr-only">{expanded ? 'Close menu' : 'Open menu'}</span>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <motion.rect
            animate={state}
            variants={topVariants}
            transition={transition}
            x="6"
            y="10"
            width="20"
            height="2"
            rx="1"
            fill={iconColorWithExpand}
          />
          <motion.rect
            animate={state}
            variants={centerVariants}
            transition={transition}
            x="6"
            y="16"
            width="20"
            height="2"
            rx="1"
            fill={iconColorWithExpand}
          />
          <motion.rect
            animate={state}
            variants={bottomVariants}
            transition={transition}
            x="6"
            y="22"
            width="20"
            height="2"
            rx="1"
            fill={iconColorWithExpand}
          />
        </svg>
      </button>
      {createPortal(
        <MobileMenuList expanded={expanded} menu={menu} />,
        document.getElementById('menuPortal') ?? document.body,
      )}
    </>
  )
}

type Props = {
  menu: LinkType[]
}

export function Navbar({ menu }: Props) {
  const { language } = useI18n()

  const [expanded, setExpanded] = useState(false)

  const navigation = useNavigation()
  const prevNavState = useRef(navigation.state)

  const { scrollY } = useScroll()
  const bgColor = useTransform(
    scrollY,
    [60, 120],
    ['rgba(22, 21, 31, 0)', 'rgba(22, 21, 31, 0.9)'],
  )
  const logoTextColor = useTransform(scrollY, [60, 120], ['#16151F', '#fff'])
  const logoTextColorWithExpand = expanded ? '#16151F' : logoTextColor
  const backgroundWithExpand = expanded ? 'transparent' : bgColor

  useLayoutEffect(() => {
    if (prevNavState.current === 'idle' && navigation.state === 'loading') {
      clearAllBodyScrollLocks()
    }
    if (prevNavState.current === 'loading' && navigation.state === 'idle') {
      setExpanded(false)
      clearAllBodyScrollLocks()
    }
    scrollY.stop()
    scrollY.jump(0)
    prevNavState.current = navigation.state
  }, [navigation.state])

  return (
    <motion.div
      className="sticky top-0 left-0 right-0 z-50 mt-12 px-8vw backdrop-blur"
      style={{ background: backgroundWithExpand }}
    >
      <nav className="mx-auto flex h-18 max-w-5xl items-center justify-between">
        <Link
          to={language !== defaultLanguage ? `/${language}` : '/'}
          prefetch="intent"
          title="home"
        >
          <span className="sr-only">Koodin</span>
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
              <motion.path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M104.17 28.5001C98.7878 28.5001 95.3119 24.6311 95.3119 18.6381C95.3119 12.6072 98.8626 8.4348 104.544 8.4348C106.861 8.4348 109.066 9.38307 110.15 10.7865V0H115.906V28.007H110.486L110.187 25.5794C109.178 27.3242 106.861 28.5001 104.17 28.5001ZM105.553 23.1518C108.244 23.1518 110.112 21.2553 110.112 18.4105C110.112 15.5657 108.244 13.6692 105.553 13.6692C102.824 13.6692 101.105 15.6037 101.105 18.4105C101.105 21.2174 102.824 23.1518 105.553 23.1518Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                d="M121.823 6.51931C120.188 6.51931 118.887 5.19851 118.887 3.53905C118.887 1.87959 120.188 0.592664 121.823 0.592664C123.425 0.592664 124.726 1.87959 124.726 3.53905C124.726 5.19851 123.425 6.51931 121.823 6.51931Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                d="M133.218 28.0071H127.462V9.04179H132.881L133.255 11.0142C134.414 9.38317 136.544 8.4349 138.974 8.4349C143.421 8.4349 146 11.3176 146 16.2865V28.0071H140.244V17.69C140.244 15.3003 138.936 13.7452 136.955 13.7452C134.675 13.7452 133.218 15.2624 133.218 17.6141V28.0071Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                d="M118.887 27.8552V8.88997H124.726V27.8552H118.887Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M83.8355 8.42079C77.8555 8.42079 73.5199 12.4414 73.5199 18.4345C73.5199 24.4275 77.8555 28.4102 83.8355 28.4102C89.7781 28.4102 94.1137 24.4275 94.1137 18.4345C94.1137 12.4414 89.7781 8.42079 83.8355 8.42079ZM83.8355 23.1758C81.1445 23.1758 79.3131 21.2792 79.3131 18.3965C79.3131 15.5517 81.1445 13.6552 83.8355 13.6552C86.4891 13.6552 88.3205 15.5517 88.3205 18.3965C88.3205 21.2792 86.4891 23.1758 83.8355 23.1758Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M51.9124 18.4345C51.9124 12.4414 56.2479 8.42079 62.2279 8.42079C68.1706 8.42079 72.5061 12.4414 72.5061 18.4345C72.5061 24.4275 68.1706 28.4102 62.2279 28.4102C56.2479 28.4102 51.9124 24.4275 51.9124 18.4345ZM57.7055 18.3965C57.7055 21.2792 59.5369 23.1758 62.2279 23.1758C64.8816 23.1758 66.7129 21.2792 66.7129 18.3965C66.7129 15.5517 64.8816 13.6552 62.2279 13.6552C59.5369 13.6552 57.7055 15.5517 57.7055 18.3965Z"
                fill={logoTextColorWithExpand}
              />
              <motion.path
                d="M34.1467 27.8552H39.9866V23.7066L42.1076 21.0657L46.4104 27.8552H52.8343L46.1441 16.7037L52.8343 8.29725H45.8264L40.5706 16.0019V4.14865H34.1467V27.8552Z"
                fill={logoTextColorWithExpand}
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
        </Link>

        <ul className="hidden gap-x-2 lg:flex lg:self-stretch">
          {menu.map((link) => (
            <NavLink key={link.id} to={link.url} scrollY={scrollY}>
              {link.text}
            </NavLink>
          ))}
        </ul>

        <div className="block lg:hidden">
          <MobileMenu
            menu={menu}
            scrollY={scrollY}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </div>
      </nav>
    </motion.div>
  )
}
