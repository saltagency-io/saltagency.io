import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { Avatar } from '#app/components/ui/avatar.tsx'
import { H3, H5 } from '#app/components/ui/typography.tsx'
import { type Image } from '#app/types.ts'
import { useGroup } from '#app/utils/providers.tsx'

type Props = {
  subtitle?: string
  text: string
  author: string
  avatar: Image
  variant?: 'basic' | 'extended'
}

export function Quote({
  subtitle,
  text,
  author,
  avatar,
  variant = 'basic',
}: Props) {
  const { theme } = useGroup()
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Grid>
      <motion.div
        className="col-span-full"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, margin: '-75px 0px' }}
        variants={{
          initial: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div variants={childVariants}>
          {variant === 'extended' && subtitle ? (
            <H5 variant="secondary" as="h2" className="mb-6 text-center">
              {subtitle}
            </H5>
          ) : null}
          <Avatar
            className={clsx('mx-auto mb-6', {
              'block lg:hidden': variant === 'basic',
            })}
            url={avatar.url}
            alt={avatar.alt}
            theme={theme}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <H3
            as="p"
            className={clsx('mb-8', {
              'text-center': variant === 'extended',
              'text-center lg:text-left': variant === 'basic',
              'text-inverse': theme.startsWith('dark'),
            })}
          >
            “{text}”
          </H3>
        </motion.div>

        <motion.div variants={childVariants}>
          {variant === 'basic' ? (
            <div className="flex items-center justify-center gap-x-4 lg:justify-start">
              <Avatar
                className="hidden lg:block"
                url={avatar.url}
                alt={avatar.alt}
                theme={theme}
              />
              <span
                className={clsx(
                  'block',
                  theme.startsWith('dark') && 'text-gray-100',
                )}
              >
                {author}
              </span>
            </div>
          ) : (
            <span
              className={clsx(
                'block text-center',
                theme.startsWith('dark') && 'text-gray-100',
              )}
            >
              {author}
            </span>
          )}
        </motion.div>
      </motion.div>
    </Grid>
  )
}
