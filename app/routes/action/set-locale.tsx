import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import { isSupportedLocale } from '~/utils/i18n'
import { getI18nSession } from '~/utils/i18n.server'

export const action: ActionFunction = async ({ request }) => {
  const i18nSession = await getI18nSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const locale = form.get('locale')
  const redirectTo = form.get('redirectTo') ?? '/'

  if (!isSupportedLocale(locale)) {
    return json({
      success: false,
      message: `locale value of ${locale} is not a valid locale`,
    })
  }

  i18nSession.setLocale(locale)

  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await i18nSession.commit() },
  })

  // return json(
  //   { success: true },
  //   {
  //     headers: { 'Set-Cookie': await i18nSession.commit() },
  //   },
  // )
}

export default function Screen() {
  return <div>Oops.. you should not be seeing this.</div>
}
