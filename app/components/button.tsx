import * as React from 'react'

import clsx from 'clsx'

import { AnchorOrLink } from '~/utils/misc'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode | React.ReactNode[]
}

function getClassName({ className }: { className?: string }) {
  return clsx(
    'group relative inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity:50 transition',
    className,
  )
}

function ButtonInner({ children, variant, size = 'large' }: ButtonProps) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 transform rounded-full bg-purple-500 opacity-100 transition disabled:opacity-50',
          {
            'border-2 border-white bg-transparent group-hover:border-transparent group-focus:border-transparent':
              variant === 'secondary',
          },
        )}
      />
      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center whitespace-nowrap text-primary',
          {
            'space-x-5 px-11 py-3': size === 'large',
            'space-x-3 px-8 py-2': size === 'medium',
            'space-x-1 px-5 py-1 text-sm': size === 'small',
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'large',
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({ className })}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </button>
  )
}

export function LinkButton({
  className,
  underlined,
  ...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined
          ? 'underlined whitespace-nowrap focus:outline-none'
          : 'underline',
        'text-primary inline-block',
      )}
    />
  )
}

export const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink(
  { children, variant = 'primary', className, ...rest },
  ref,
) {
  return (
    <AnchorOrLink ref={ref} className={getClassName({ className })} {...rest}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </AnchorOrLink>
  )
})
