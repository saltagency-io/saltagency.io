import { type TFunction } from 'i18next'
import { z } from 'zod'

export function getNameSchema(t: TFunction<'common'>, locale: string) {
  return (
    z
      .string({ required_error: t('form.errors.required', { lng: locale }) })
      .min(2, { message: t('form.name.errors.length.min', { lng: locale }) })
      .max(40, { message: t('form.name.errors.length.max', { lng: locale }) })
      // eslint-disable-next-line no-useless-escape
      .regex(/[\p{L} '\-]+/u, {
        message: t('form.name.errors.characters'),
      })
  )
}

export function getEmailSchema(t: TFunction, locale: string) {
  return (
    z
      .string({ required_error: t('form.errors.required', { lng: locale }) })
      .email({ message: t('form.email.errors.invalid', { lng: locale }) })
      .min(5, { message: t('form.email.errors.length.min', { lng: locale }) })
      .max(100, { message: t('form.email.errors.length.max', { lng: locale }) })
      // Make sure email is always lowercase
      .transform(value => value.toLowerCase())
  )
}

export function getPhoneSchema(t: TFunction, locale: string) {
  return z
    .string({ required_error: t('form.errors.required', { lng: locale }) })
    .min(7, { message: t('form.phone.errors.length.min', { lng: locale }) })
    .max(13, { message: t('form.phone.errors.length.max', { lng: locale }) })
    .regex(/^(\+\d{2,3}|0)\d{9}$/, {
      message: t('form.phone.errors.invalid', { lng: locale }),
    })
}

export function getMessageSchema(t: TFunction, locale: string) {
  return z
    .string({ required_error: t('form.errors.required', { lng: locale }) })
    .min(10, { message: t('form.message.errors.length.min', { lng: locale }) })
    .max(1000, {
      message: t('form.message.errors.length.max', { lng: locale }),
    })
}
