import { createCookieSessionStorage } from '@remix-run/node'

import { Consent, isConsent } from '~/components/cookie-bar'
import { getRequiredServerEnvVar } from '~/utils/misc'

const consentStorage = createCookieSessionStorage({
  cookie: {
    name: 'Salt_consent',
    secure: true,
    secrets: [getRequiredServerEnvVar('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

export async function getConsentSession(request: Request) {
  const session = await consentStorage.getSession(request.headers.get('Cookie'))
  return {
    getConsent: () => {
      const consent = session.get('consent')
      return isConsent(consent) ? consent : null
    },
    setConsent: (consent: Consent) => {
      session.set('consent', consent)
    },
    commit: () => {
      return consentStorage.commitSession(session, {
        expires: new Date('2033-04-03'),
      })
    },
  }
}
