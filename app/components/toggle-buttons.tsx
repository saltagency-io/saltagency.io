import * as React from 'react'

import clsx from 'clsx'

type OnChange = (
  event: React.MouseEvent<HTMLButtonElement>,
  value: string | null,
) => void

type ButtonProps = {
  children: React.ReactNode
  value: string
  selected?: boolean
  className?: string
  onChange?: OnChange
} & JSX.IntrinsicElements['button']

export function ToggleButton({
  value,
  className,
  selected,
  onChange,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      value={value}
      className={clsx(
        'group flex-grow rounded-lg p-4 focus:outline-none',
        className,
        {
          'bg-white': selected,
        },
      )}
      aria-pressed={selected}
      tabIndex={selected ? -1 : 0}
      onClick={onChange}
      disabled={selected}
    >
      <span
        className={clsx('text-lg font-bold leading-6', {
          'bg-clip-text text-transparent': selected,
          'text-white opacity-40 group-hover:opacity-100 group-focus:underline group-focus:opacity-100':
            !selected,
        })}
        style={
          selected
            ? {
                backgroundImage:
                  'linear-gradient(0deg, rgba(15, 14, 23, 0.3), rgba(15, 14, 23, 0.3)), linear-gradient(100.69deg, #4353FF -93.24%, #EB596E 169.01%)',
              }
            : {}
        }
      >
        {children}
      </span>
    </button>
  )
}

type Props = {
  children: React.ReactNode
  id?: string
  value: string
  label?: string
  className?: string
  onChange: (value: string) => void
}

export function ToggleButtonGroup({
  children,
  id,
  label,
  value,
  className,
  onChange,
}: Props) {
  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChange(event.currentTarget.value)
  }

  return (
    <div
      id={id}
      role="group"
      aria-label={label}
      className={clsx('flex rounded-lg bg-transparent p-1', className)}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child, {
          ...child.props,
          onChange: handleChange,
          selected: value === child.props.value,
        })
      })}
    </div>
  )
}
