export async function sendCaptcha(token: string | null): Promise<
  | {
      success: true
      challenge_ts: string
      hostname: string
      'error-codes': never
    }
  | {
      success: false
      challenge_ts: never
      hostname: never
      'error-codes': string[]
    }
> {
  const payload = new URLSearchParams({
    secret: process.env.GOOGLE_CAPTCHA_SECRET ?? '',
    response: token ?? '',
  })

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'post',
      body: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  return response.json()
}
