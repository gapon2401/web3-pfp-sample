import type { IronSessionOptions } from 'iron-session'

export const sessionOptions: IronSessionOptions = {
  password: process.env.PASSWORD!,
  cookieName: process.env.ADMIN_COOKIE_NAME!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    token?: string
  }
}
