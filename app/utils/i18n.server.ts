import { createCookieSessionStorage } from '@remix-run/node'

import { isSupportedLocale, SupportedLocale } from '~/utils/i18n'
import { getRequiredServerEnvVar } from '~/utils/misc'

const i18nStorage = createCookieSessionStorage({
  cookie: {
    name: 'Salt_i18n',
    secure: true,
    secrets: [getRequiredServerEnvVar('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

export async function getI18nSession(request: Request) {
  const session = await i18nStorage.getSession(request.headers.get('Cookie'))
  return {
    getLocale: () => {
      const locale = session.get('locale')
      return isSupportedLocale(locale) ? locale : null
    },
    setLocale: (locale: SupportedLocale) => {
      return session.set('locale', locale)
    },
    commit: () => {
      return i18nStorage.commitSession(session, {
        expires: new Date('2050-01-01'),
      })
    },
  }
}
