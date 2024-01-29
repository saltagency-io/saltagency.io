import * as React from 'react'

import { Link, type LinkProps } from '@remix-run/react'

import type { NonNullProperties, TranslatedSlug } from '#app/types.ts'
import type { getEnv } from '#app/utils/env.server.ts'
import { defaultLanguage } from '#app/utils/i18n.ts'
import type { ValidateFn } from '#app/utils/validators.ts'

export const LOGO_URL =
	'https://a.storyblok.com/f/180005/107x45/038e65a2bd/logo-salt.svg'

export function getRequiredEnvVarFromObj(
	obj: Record<string, string | undefined>,
	key: string,
	devValue: string = `${key}-dev-value`,
) {
	let value = devValue
	const envVal = obj[key]
	if (envVal) {
		value = envVal
	} else if (obj.NODE_ENV === 'production') {
		throw new Error(`${key} is a required env variable`)
	}
	return value
}

export function getRequiredServerEnvVar(key: string, devValue?: string) {
	return getRequiredEnvVarFromObj(process.env, key, devValue)
}

export function getRequiredGlobalEnvVar(
	key: keyof ReturnType<typeof getEnv>,
	devValue?: string,
) {
	return getRequiredEnvVarFromObj(ENV, key, devValue)
}

type AnchorProps = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>

export const AnchorOrLink = React.forwardRef<
	HTMLAnchorElement,
	AnchorProps & {
		reload?: boolean
		to?: LinkProps['to']
		prefetch?: LinkProps['prefetch']
	}
>(function AnchorOrLink(props, ref) {
	const {
		to,
		href,
		download,
		reload = false,
		prefetch,
		children,
		...rest
	} = props
	let toUrl = ''
	let shouldUserRegularAnchor = reload || download

	if (!shouldUserRegularAnchor && typeof href === 'string') {
		shouldUserRegularAnchor = href.includes(':') || href.startsWith('#')
	}

	if (!shouldUserRegularAnchor && typeof to === 'string') {
		toUrl = to
		shouldUserRegularAnchor = to.includes(':')
	}

	if (!shouldUserRegularAnchor && typeof to === 'object') {
		toUrl = `${to.pathname ?? ''}${to.hash ? `#${to.hash}` : ''}${
			to.search ? `?${to.search}` : ''
		}`
		shouldUserRegularAnchor = to.pathname?.includes(':')
	}

	if (shouldUserRegularAnchor) {
		return (
			<a {...rest} download={download} href={href ?? toUrl} ref={ref}>
				{children}
			</a>
		)
	} else {
		return (
			<Link prefetch={prefetch} to={to ?? href ?? ''} {...rest} ref={ref}>
				{children}
			</Link>
		)
	}
})

export function removeTrailingSlash(s: string) {
	return s.endsWith('/') ? s.slice(0, -1) : s
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
	return removeTrailingSlash(
		`${requestInfo?.origin ?? 'https://saltagency.io'}${
			requestInfo?.path ?? ''
		}`,
	)
}

export function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
	if (!host) {
		throw new Error('Could not determine domain URL.')
	}
	const protocol = host.includes('localhost') ? 'http' : 'https'
	return `${protocol}://${host}`
}

type ErrorWithMessage = {
	message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	)
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

export function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error).message
}

export function getNonNull<
	Type extends Record<string, null | undefined | unknown>,
>(obj: Type): NonNullProperties<Type> {
	for (const [key, val] of Object.entries(obj)) {
		assertNonNull(val, `The value of ${key} is null but it should not be.`)
	}
	return obj as NonNullProperties<Type>
}

function assertNonNull<PossibleNullType>(
	possibleNull: PossibleNullType,
	errorMessage: string,
): asserts possibleNull is Exclude<PossibleNullType, null | undefined> {
	if (possibleNull == null) throw new Error(errorMessage)
}

export function typedBoolean<T>(
	value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> {
	return Boolean(value)
}

export function capitalizeFirstChar(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getLabelKeyForError(validator: ValidateFn, errorKey: string) {
	return (val: string | null) => {
		const valid = validator(val)
		return valid ? null : errorKey
	}
}

export function unslugify(slug: string) {
	const words = slug.split('-')
	return words.map(capitalizeFirstChar).join(' ')
}

export function createAlternateLinks(slugs: TranslatedSlug[], origin: string) {
	return slugs.map(slug => ({
		rel: 'alternate',
		hrefLang: slug.lang,
		href: removeTrailingSlash(
			`${origin}${slug.lang === defaultLanguage ? '' : `/${slug.lang}`}/${
				slug.path
			}`,
		),
	}))
}

export function multilineToBreaks(text: string): React.ReactNode {
	const lines = text.split('\n')
	return lines.flatMap((line, i) =>
		// eslint-disable-next-line react/jsx-key
		i < lines.length - 1 ? [line, <br key={`break--${i}`} />] : [line],
	)
}
