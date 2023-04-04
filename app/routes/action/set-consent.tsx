import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { Consent, isConsent } from '~/components/cookie-bar'
import { getConsentSession } from '~/utils/consent.server'

export const action: ActionFunction = async ({ request }) => {
  const consentSession = await getConsentSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const consent = form.get('consent')
  const path = form.get('path')

  consentSession.setConsent(isConsent(consent) ? consent : Consent.Rejected)

  return redirect(path ?? '/', {
    headers: { 'Set-Cookie': await consentSession.commit() },
  })
}

export const loader = () => redirect('/', { status: 404 })

export default function MarkRead() {
  return <div>Oops... you should not be seeing this</div>
}
