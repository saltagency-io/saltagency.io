import { motion } from 'framer-motion'

import { Grid } from '#app/components/grid.tsx'
import { H3, H5, Paragraph } from '#app/components/ui/typography.tsx'
import { Markdown } from '#app/utils/markdown.tsx'
import { useGroup } from '#app/utils/providers.tsx'

type Props = {
  content: string
  subtitle?: string
  title?: string
  text?: string
  theme: 'dark' | 'light'
}

export function RichText({ content, title, subtitle, text }: Props) {
  const { theme } = useGroup()
  const isDark = theme.startsWith('dark')

  const textVariant = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } },
  }

  const viewPort = { once: true, margin: '-115px 0px' }
  return (
    <Grid className="max-w-6xl">
      <div className="px-16 lg:col-span-10 lg:col-start-2">
        <motion.div
          className="mb-8 space-y-4"
          initial="initial"
          whileInView="visible"
          viewport={viewPort}
          variants={textVariant}
        >
          {subtitle ? (
            <H5 as="h2" variant="secondary" className="mb-4">
              {subtitle}
            </H5>
          ) : null}

          {title ? (
            <H3 as="span" inverse={isDark} className="mb-12">
              {title}
            </H3>
          ) : null}

          {text ? (
            <Paragraph
              textColorClassName={isDark ? 'text-inverse' : 'text-primary'}
            >
              {text}
            </Paragraph>
          ) : null}
        </motion.div>

        {content ? (
          <Markdown textColor={isDark ? 'inverse' : 'primary'}>
            {content}
          </Markdown>
        ) : null}
      </div>
    </Grid>
  )
}
