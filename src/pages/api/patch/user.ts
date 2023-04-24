import { NextApiRequest, NextApiResponse } from 'next'

import { parseRequest } from '@/api/Api'
import { withPatchApi } from '@/api/withPatchApi'
import { mongoClient } from '@/dao/mongoClient'
import { User } from '@/model/usersModel'

type RequestParams = Partial<User> & { is_admin?: boolean }

export default withPatchApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)
  const token = req.session.token
  let user = null
  if (token) {
    const userByToken = await mongoClient.getUserByToken(token, true)
    if (userByToken) {
      const filterData = (['name', 'email', 'about', 'about_profit', 'about_grow'] as Array<keyof User>).reduce(
        (accum, cur) => {
          return { ...accum, [cur]: params[cur] ?? '' }
        },
        {} as RequestParams,
      )

      await mongoClient.updateUser({ wallet: userByToken.wallet }, filterData)

      user = await mongoClient.getUserByWallet(userByToken.wallet, true)

      /* Change user status */
      if (user && user.status !== 'verified' && user.status !== 'blocked') {
        const userStatus: User['status'] = mongoClient.isUserHasRequiredFields(user) ? 'verified' : 'not_registered'

        await mongoClient.updateUser(
          { wallet: user.wallet },
          { status: userStatus, scope: params.is_admin ? 'admin' : '' },
        )
        user.status = userStatus
      }
    }
  }

  res.status(200).json({
    data: user,
  })
})
