import { NextApiRequest, NextApiResponse } from 'next'

import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'
import { checkAccess } from '@/lib/utils'

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token
  if (token) {
    const user = await mongoClient.getUserByToken(token, true)
    if (user && checkAccess(user.scope, 'superadmin')) {
      await mongoClient.setupIndexes()
    }
  }

  res.status(200).json({
    data: true,
  })
})
