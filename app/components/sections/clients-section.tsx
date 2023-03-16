import * as React from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '~/components/grid'
import type { Image } from '~/types'
import { getImgProps } from '~/utils/images'

function LogoGroup({ group, index }: { group: Image[]; index: number }) {
  const prefersReducedMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (group.length === 1) return

    const intervalDuration =
      (Math.floor(Math.random() * 2000) + 1) * index + 5000

    const interval = window.setInterval(() => {
      setActiveIndex((state) => (state === 0 ? 1 : 0))
    }, intervalDuration)

    return () => {
      window.clearInterval(interval)
    }
  }, [group.length, index])

  return (
    <div className="relative flex h-20 items-center justify-center">
      {group.map((logo, i) => (
        <motion.div
          key={logo.id}
          className="absolute"
          initial="initial"
          animate={activeIndex === i ? 'visible' : 'hidden'}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { duration: prefersReducedMotion ? 0 : 0.3 },
            },
          }}
        >
          <img
            className="w-full object-cover aspect-[3.1/1]"
            {...getImgProps(logo.url, logo.alt, {
              widths: [156, 312],
              sizes: ['156px 1x', '312px 2x'],
              transformations: { quality: 95 },
            })}
          />
        </motion.div>
      ))}
    </div>
  )
}

function groupLogos(logos: Image[]) {
  const base = logos.slice(0, 5)
  const remainder = logos.slice(5, logos.length)

  return base.map((firstLogo, i) => {
    const secondLogo = remainder[i]
    if (secondLogo) {
      return [firstLogo, secondLogo]
    }
    return [firstLogo]
  })
}

export function ClientsSection({ logos }: { logos: Image[] }) {
  const groups = groupLogos(logos)

  return (
    <Grid as="section" className="hidden py-16 lg:grid">
      <motion.div
        className="col-span-full grid grid-cols-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {groups.map((group, idx) => (
          <LogoGroup group={group} key={idx} index={idx + 1} />
        ))}
      </motion.div>
    </Grid>
  )
}
