import { z } from 'zod'

// TODO: find a way to translate these messages
export const NameSchema = z
  .string({ required_error: 'Dit veld is verplicht.' })
  .min(2, { message: 'Naam moet minimaal 2 tekens lang zijn.' })
  .max(40, { message: 'Naam mag maximaal 40 tekens lang zijn.' })
  // eslint-disable-next-line no-useless-escape
  .regex(/[\p{L} '\-]+/u, {
    message: 'Naam mag alleen letters bevatten.',
  })

export const EmailSchema = z
  .string({ required_error: 'Dit veld is verplicht.' })
  .email({ message: 'Voer een geldig geldig e-mailadres.' })
  .min(5, { message: 'E-mailadres moet minimaal 5 tekens lang zijn.' })
  .max(100, { message: 'E-mailadres mag maximaal 100 tekens lang zijn.' })
  // Make sure email is always lowercase
  .transform(value => value.toLowerCase())

export const PhoneSchema = z
  .string({ required_error: 'Dit veld is verplicht.' })
  .min(7, {
    message: 'Telefoonnummer moet minimaal 7 tekens lang zijn.',
  })
  .max(13, {
    message: 'Telefoonnummer mag maximaal 13 tekens lang zijn.',
  })
  .regex(/^(\+\d{2,3}|0)\d{9}$/, {
    message: 'Voer een geldig telefoonnummer in.',
  })

export const MessageSchema = z
  .string({ required_error: 'Dit veld is verplicht.' })
  .min(10, { message: 'Bericht moet minimaal 10 tekens lang zijn.' })
  .max(1000, { message: 'Bericht mag niet langer dan 1000 tekens zijn.' })
