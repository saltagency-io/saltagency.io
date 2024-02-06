import * as React from 'react'

import clsx from 'clsx'

import { Icon } from '#app/components/ui/icon.tsx'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors
  id?: string
}) {
  const errorsToRender = errors?.filter(Boolean)
  if (!errorsToRender?.length) return null
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map(e => (
        <li key={e} className="text-[12px] font-bold text-[#8A0020]">
          {e}
        </li>
      ))}
    </ul>
  )
}

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
  'px-6 py-4 bg-white w-full rounded-xl border border-transparent transition',
  'focus-visible:border-purple-500 outline-none aria-[invalid]:border-[#8A0020]',
  'placeholder:opacity-70 placeholder:text-base placeholder:font-bold',
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
  errors?: ListOfErrors
  description?: React.ReactNode
}

export const Field = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof Input> & FieldProps
>(function Field(
  { defaultValue, errors, name, label, className, description, id, ...props },
  ref,
) {
  return (
    <FieldContainer
      id={id}
      label={label}
      className={className}
      errors={errors}
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
  errors,
  label,
  className,
  description,
  id,
  children,
}: {
  id?: string
  label: string
  className?: string
  errors?: ListOfErrors
  description?: React.ReactNode
  children: FieldContainerRenderProp
}) {
  const defaultId = React.useId()
  const inputId = id ?? defaultId
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx('mb-4', className)}>
      <div className="mb-2">
        <Label htmlFor={inputId}>{label}</Label>
      </div>

      {children({
        inputProps: {
          id: inputId,
          'aria-describedby': errors
            ? errorId
            : description
              ? descriptionId
              : undefined,
        },
      })}

      <div className="pt-2">
        {errors ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
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
      errors,
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
        errors={errors}
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
            <div className="pointer-events-none absolute bottom-0 right-4 top-0 m-auto h-6 w-6 text-gray-500">
              <Icon name="chevron-down" size="lg" />
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
