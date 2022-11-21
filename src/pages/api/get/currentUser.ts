import { NextApiRequest, NextApiResponse } from 'next'

import { withGetApi } from '@/api/withGetApi'
import { mongoClient } from '@/dao/mongoClient'

export default withGetApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const { token: storageToken } = req.query
  const token = req.session.token
  let isLoggedIn = !!token

  let user = null
  if (isLoggedIn && token && storageToken === token) {
    user = (await mongoClient.getUserByToken(token, true)) || null
    if (!user) {
      req.session.destroy()
      isLoggedIn = false
    }
  } else {
    req.session.destroy()
  }

  res.status(200).json({
    data: [user, isLoggedIn],
  })
})
