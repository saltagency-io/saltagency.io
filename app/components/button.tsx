import * as React from 'react'

import clsx from 'clsx'

import { IconCheckCircle, IconPhone, IconSquareStack } from '~/components/icons'
import { Paragraph } from '~/components/typography'
import { AnchorOrLink } from '~/utils/misc'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-inverse'
  size?: 'small' | 'medium' | 'large'
  ringOffsetColor?: 'white' | 'black'
  children: React.ReactNode | React.ReactNode[]
}

function getClassName({ className }: { className?: string }) {
  return clsx(
    'group relative inline-flex text-lg font-bold focus:outline-none opacity-100 disabled:opacity:50 transition',
    className,
  )
}

function ButtonInner({
  children,
  variant,
  size = 'large',
  ringOffsetColor = 'white',
}: ButtonProps) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 transform rounded-lg font-bold opacity-100 transition disabled:opacity-50',
          {
            'focus-ring-blue bg-blue-500': variant === 'primary',
            'focus-ring-black bg-gray-900': variant === 'secondary',
            'focus-ring-black border-black': variant === 'outline',
            'border-secondary focus-ring-inverse':
              variant === 'outline-inverse',
            'border-2 bg-transparent':
              variant === 'outline' || variant === 'outline-inverse',
            'ring-offset-black': ringOffsetColor === 'black',
            'ring-offset-white': ringOffsetColor === 'white',
          },
        )}
      />
      <div
        className={clsx(
          'relative flex w-full items-center justify-center gap-x-2 whitespace-nowrap text-center text-lg leading-6 text-white',
          {
            'text-black': variant === 'outline',
            'px-6 py-4': size === 'large',
            'px-6 py-2': size === 'medium',
            'px-4 py-1 text-sm': size === 'small',
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
  ringOffsetColor,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({ className })}>
      <ButtonInner
        variant={variant}
        size={size}
        ringOffsetColor={ringOffsetColor}
      >
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

type ButtonLinkProps = React.ComponentPropsWithRef<typeof AnchorOrLink> &
  ButtonProps

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    { children, variant = 'primary', className, ringOffsetColor, ...rest },
    ref,
  ) {
    return (
      <AnchorOrLink ref={ref} className={getClassName({ className })} {...rest}>
        <ButtonInner variant={variant} ringOffsetColor={ringOffsetColor}>
          {children}
        </ButtonInner>
      </AnchorOrLink>
    )
  },
)

export function PhoneButton({
  children,
  variant,
  ringOffsetColor,
  ...rest
}: ButtonLinkProps & { children: string }) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const onCopy = async () => {
    if (hasCopied) return

    await navigator.clipboard.writeText(children)
    setHasCopied(true)
  }

  React.useEffect(() => {
    let timeout: number

    if (hasCopied) {
      timeout = window.setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }

    return () => {
      window.clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <>
      {/*Mobile*/}
      <ButtonLink
        className="inline-block lg:hidden"
        variant={variant}
        href={`tel:${children}`}
        {...rest}
      >
        <IconPhone />
        {children}
      </ButtonLink>

      {/*Desktop*/}
      <Button
        className="hidden lg:inline-block"
        variant={variant}
        onClick={onCopy}
        ringOffsetColor={ringOffsetColor}
      >
        <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center gap-4 overflow-hidden">
          <div
            className={clsx(
              `-translate-y-12 transition group-hover:translate-y-4 group-focus:translate-y-4`,
              {
                hidden: hasCopied,
              },
            )}
          >
            <IconSquareStack />
          </div>
          <div
            className={clsx(
              `-translate-y-6 transition group-hover:translate-y-12 group-focus:translate-y-12`,
              {
                hidden: hasCopied,
              },
            )}
          >
            <IconPhone />
          </div>
          <div
            className={clsx('translate-y-4', {
              'text-inverse-secondary': variant === 'outline-inverse',
              hidden: !hasCopied,
              block: hasCopied,
            })}
          >
            <IconCheckCircle />
          </div>
        </div>

        {hasCopied ? (
          <Paragraph
            as="div"
            size="lg"
            className="pl-8 lg:font-bold"
            textColorClassName={
              variant === 'outline-inverse'
                ? 'text-inverse-secondary'
                : 'text-primary'
            }
          >
            Copied
          </Paragraph>
        ) : (
          <div className="pl-8">{children}</div>
        )}
      </Button>
    </>
  )
}
