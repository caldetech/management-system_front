import ky from 'ky'
import type { CookiesFn } from 'cookies-next' 
import cookiesNext from 'cookies-next'

export const api = ky.create({
  prefixUrl: 'http://localhost:4444',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookieStore = serverCookies
        }

        const token = await cookiesNext.getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    ]
  }
})
