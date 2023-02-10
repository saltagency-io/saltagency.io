import { isString } from '@reach/utils'

export type ValidateFn = (value: string | undefined | null) => boolean

const PATTERNS = {
  NUMERIC: /[0-9]/,
  ALPHA_NUMERIC_EXTENDED: /^[a-zA-Z0-9\u00C0-\u00ff '.-]*$/,
  TEXT: /^[a-zA-Z\u00C0-\u00ff .'-]*$/,
  EMAIL: /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(\+31)|(0)\d{9}$/,
}

const isMinLength = (length: number) => (val: string) => {
  return val.length >= length
}

const isMaxLength = (length: number) => (val: string) => {
  return val.length <= length
}

const isExactLength = (length: number) => (val: string) => {
  return val.length === length
}

const isPattern = (pattern: RegExp) => (val: string) => {
  return pattern.test(val)
}

type ValidateOpts = {
  min?: number
  max?: number
  exact?: number
  pattern?: RegExp
}

function validate(
  val: string | number | null | undefined,
  { min, max, exact, pattern }: ValidateOpts,
) {
  if (!isString(val)) return false

  const validators = []
  if (min) validators.push(isMinLength(min))
  if (max) validators.push(isMaxLength(max))
  if (exact) validators.push(isExactLength(exact))
  if (pattern) validators.push(isPattern(pattern))

  return validators.reduce(
    (isValid, validator) => validator(val) && isValid,
    true,
  )
}

export const isValidEmail: ValidateFn = (val) => {
  return validate(val, { min: 6, pattern: PATTERNS.EMAIL })
}

export const isValidName: ValidateFn = (val) => {
  return validate(val, { min: 2, pattern: PATTERNS.TEXT })
}

export const isValidBody: ValidateFn = (val) => {
  return validate(val, { min: 20, max: 10001 })
}

export const isValidPhoneNumber: ValidateFn = (val) => {
  return validate(val, { min: 5, pattern: PATTERNS.PHONE_NUMBER })
}

export const isValidString: ValidateFn = (val) => {
  return isString(val) && val !== ''
}
