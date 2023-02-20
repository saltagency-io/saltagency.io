import * as React from 'react'

import clsx from 'clsx'

import { Avatar } from '~/components/avatar'
import { Grid } from '~/components/grid'
import { H3, H5, Subtitle } from '~/components/typography'
import type { Image } from '~/types'

type Props = {
  subtitle?: string
  text: string
  author: string
  avatar: Image
  theme?: 'dark' | 'light'
  variant?: 'basic' | 'extended'
}

export function Quote({
  subtitle,
  text,
  author,
  avatar,
  theme = 'light',
  variant = 'basic',
}: Props) {
  return (
    <div
      className={clsx({
        'bg-primary': theme === 'light',
        'bg-inverse': theme === 'dark',
        'py-20 lg:py-32': variant === 'extended',
        'py-20 lg:py-40': variant === 'basic',
      })}
    >
      <Grid>
        <div
          className={clsx({
            'col-span-full': variant === 'extended',
            'col-span-4 md:col-span-8 lg:col-start-3': variant === 'basic',
          })}
        >
          {variant === 'extended' && subtitle ? (
            <Subtitle
              className="mb-6 text-center"
              variant={theme === 'dark' ? 'pink' : 'purple'}
            >
              {subtitle}
            </Subtitle>
          ) : null}
          <Avatar
            className={clsx('mx-auto mb-6', {
              'block lg:hidden': variant === 'basic',
            })}
            url={avatar.url}
            alt={avatar.alt}
            theme={theme}
          />
          <H3
            as="p"
            className={clsx('mb-8', {
              'text-center': variant === 'extended',
              'text-center lg:text-left': variant === 'basic',
              'text-inverse': theme === 'dark',
            })}
          >
            “{text}”
          </H3>
          {variant === 'basic' ? (
            <div className="flex items-center gap-x-4">
              <Avatar
                className="hidden lg:block"
                url={avatar.url}
                alt={avatar.alt}
                theme={theme}
              />
              <H5
                className="block text-center"
                as="span"
                variant="secondary"
                inverse={theme === 'dark'}
              >
                {author}
              </H5>
            </div>
          ) : (
            <H5
              className="block text-center"
              as="span"
              variant="secondary"
              inverse={theme === 'dark'}
            >
              {author}
            </H5>
          )}
        </div>
      </Grid>
    </div>
  )
}
