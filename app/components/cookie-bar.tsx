import * as React from 'react'

import { Form, useLocation } from '@remix-run/react'

import clsx from 'clsx'

import { Button } from '~/components/button'
import { Paragraph } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

export enum Consent {
  Accepted = 'accepted',
  Rejected = 'rejected',
}

const consents = Object.values(Consent)

export const isConsent = (consent: unknown): consent is Consent => {
  return typeof consent === 'string' && consents.includes(consent as Consent)
}

export function CookieBar() {
  const location = useLocation()
  const { t } = useLabels()

  return (
    <Form
      method="post"
      action="action/set-consent"
      reloadDocument
      className={clsx(
        'fixed bottom-14 left-0 right-0 mx-auto flex max-w-5xl items-center justify-between gap-x-4 py-8 px-10',
        'z-10 rounded-lg border-2 border-gray-100 bg-[rgba(255,255,255,0.85)] backdrop-blur',
      )}
    >
      <input type="hidden" name="path" value={location.pathname} />
      <Paragraph
        className="pr-8"
        dangerouslySetInnerHTML={{
          __html: t('cookies.text', { replace: true }),
        }}
      />
      <div className="flex gap-x-4">
        <Button
          name="consent"
          value={Consent.Rejected}
          type="submit"
          size="medium"
          variant="outline"
        >
          {t('cookies.reject')}
        </Button>
        <Button
          name="consent"
          value={Consent.Accepted}
          type="submit"
          size="medium"
          variant="secondary"
        >
          {t('cookies.accept')}
        </Button>
      </div>
    </Form>
  )
}
