import * as React from 'react'

import clsx from 'clsx'

import { IconChevronDown } from '~/components/icons'

export function Label({
  className,
  ...labelProps
}: JSX.IntrinsicElements['label']) {
  return (
    <label
      {...labelProps}
      className={clsx(
        'text-primary inline-block text-base font-bold',
        className,
      )}
    />
  )
}

type TextAreaProps = { type: 'textarea' } & JSX.IntrinsicElements['textarea']

type InputProps = TextAreaProps | JSX.IntrinsicElements['input']

const isTextarea = (props: InputProps): props is TextAreaProps =>
  props.type === 'textarea'

export const inputClassName = clsx(
  'px-6 py-4 bg-white w-full rounded-xl border border-gray-800/10 transition',
  'hover:border-gray-800',
  'focus-visible:border-blue-500',
  '[&:not(:placeholder-shown,:focus-within)]:border-gray-800',
  'placeholder:opacity-50 placeholder:text-base placeholder:font-bold',
)

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const className = clsx(inputClassName, props.className)

    if (isTextarea(props)) {
      return <textarea {...props} className={className} />
    }

    return <input {...props} className={className} ref={ref} />
  },
)

interface InputErrorProps {
  id: string
  children?: string | null
}

export function InputError({ children, id }: InputErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p
      role="alert"
      id={id}
      className="mb-2 block text-sm font-medium text-red-500"
    >
      {children}
    </p>
  )
}

type FieldProps = {
  defaultValue?: string | null
  name: string
  label: string
  className?: string
  error?: string | null
  description?: React.ReactNode
}

export const Field = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof Input> & FieldProps
>(function Field(
  { defaultValue, error, name, label, className, description, id, ...props },
  ref,
) {
  return (
    <FieldContainer
      id={id}
      label={label}
      className={className}
      error={error}
      description={description}
    >
      {({ inputProps }) => (
        <Input
          ref={ref}
          required
          {...props}
          {...inputProps}
          name={name}
          autoComplete={name}
          defaultValue={defaultValue}
        />
      )}
    </FieldContainer>
  )
})

type FieldContainerRenderProp = (props: {
  inputProps: {
    id: string
    'aria-describedby'?: string
  }
}) => React.ReactNode

export function FieldContainer({
  error,
  label,
  className,
  description,
  id,
  children,
}: {
  id?: string
  label: string
  className?: string
  error?: string | null
  description?: React.ReactNode
  children: FieldContainerRenderProp
}) {
  const defaultId = React.useId()
  const inputId = id ?? defaultId
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx('mb-4', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label htmlFor={inputId}>{label}</Label>
        {error ? (
          <InputError id={errorId}>{error}</InputError>
        ) : description ? (
          <div id={descriptionId} className="text-primary text-lg">
            {description}
          </div>
        ) : null}
      </div>

      {children({
        inputProps: {
          id: inputId,
          'aria-describedby': error
            ? errorId
            : description
            ? descriptionId
            : undefined,
        },
      })}
    </div>
  )
}

export type SelectProps = React.PropsWithRef<
  JSX.IntrinsicElements['select'] & FieldProps
>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      className,
      id,
      label,
      name,
      error,
      children,
      defaultValue,
      description,
      ...props
    },
    ref,
  ) {
    return (
      <FieldContainer
        id={id}
        label={label}
        className={className}
        error={error}
        description={description}
      >
        {({ inputProps }) => (
          <div className="relative">
            <select
              className={`${inputClassName} appearance-none pr-10`}
              ref={ref}
              {...props}
              {...inputProps}
              name={name}
              defaultValue={defaultValue}
            >
              {children}
            </select>
            <div className="pointer-events-none absolute top-0 right-4 bottom-0 m-auto h-6 w-6 text-gray-500">
              <IconChevronDown />
            </div>
          </div>
        )}
      </FieldContainer>
    )
  },
)

export function ButtonGroup({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      {children}
    </div>
  )
}

export function ErrorPanel({
  children,
  id,
  className,
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <div
      role="alert"
      className={clsx('relative mt-8 px-11 py-8', className)}
      id={id}
    >
      <div className="absolute inset-0 rounded-lg bg-red-500 opacity-25" />
      <div className="text-primary relative text-lg font-medium">
        {children}
      </div>
    </div>
  )
}
