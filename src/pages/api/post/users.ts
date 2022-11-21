import { NextApiRequest, NextApiResponse } from 'next'

import { parseRequest } from '@/api/Api'
import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'
import { checkAccess } from '@/lib/utils'
import { FilterType, User } from '@/model/usersModel'

type RequestParams = {
  filter: Partial<FilterType>
  offset?: number
  limit?: number
}

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)
  const token = req.session.token
  let users: { items: User[]; lastValue: number | null; total: number } = {
    items: [],
    lastValue: null,
    total: 0,
  }
  if (token) {
    const user = await mongoClient.getUserByToken(token, true)
    if (user && checkAccess(user.scope, 'admin')) {
      const cleanNumber = (data?: string | string[] | number) =>
        Array.isArray(data) ? Number(data[0]) || 0 : Number(data) || 0
      const offsetClean = cleanNumber(params.offset)
      const limitClean = cleanNumber(params.limit)
      const result = await mongoClient.getUsers(params.filter, offsetClean, limitClean)
      users = {
        items: result[0],
        total: result[1],
        lastValue: result[2],
      }
    }
  }

  res.status(200).json({
    data: users,
  })
})
