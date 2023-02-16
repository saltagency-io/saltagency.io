export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    GOOGLE_AW_TAG: process.env.GOOGLE_AW_TAG,
    GOOGLE_AW_CONVERSION_EVENT: process.env.GOOGLE_AW_CONVERSION_EVENT,
    GOOGLE_CAPTCHA_KEY: process.env.GOOGLE_CAPTCHA_KEY,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
