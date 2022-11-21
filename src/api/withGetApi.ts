import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@/lib/session'

export function withGetApi(handler: NextApiHandler): NextApiHandler {
  return async function nextApiFunctionWrappedWithPostCheck(req, res) {
    if (req.method?.toUpperCase() === 'GET') {
      const ironSessionResult = withIronSessionApiRoute(handler, sessionOptions)
      return await ironSessionResult(req, res)
    } else {
      return res.status(500).json({ data: { error: 'Method is wrong' } })
    }
  }
}
