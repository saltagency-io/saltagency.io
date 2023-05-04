import { getRequiredServerEnvVar } from '~/utils/misc'

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
    secret: getRequiredServerEnvVar('HCAPTCHA_SECRET'),
    response: token ?? '',
  })

  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'post',
    body: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.json()
}
