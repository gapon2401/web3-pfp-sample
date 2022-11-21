import { NextApiRequest, NextApiResponse } from 'next'

import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token || ''
  const user = (await mongoClient.getUserByToken(token)) || null
  if (user) {
    await mongoClient.logout(token)
  }
  req.session.destroy()

  res.status(200).json({
    data: true,
  })
})
