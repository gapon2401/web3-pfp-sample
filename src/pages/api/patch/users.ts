import { NextApiRequest, NextApiResponse } from 'next'

import { parseRequest } from '@/api/Api'
import { withPatchApi } from '@/api/withPatchApi'
import { mongoClient } from '@/dao/mongoClient'
import { addAccess, checkAccess, removeAccess } from '@/lib/utils'
import { User } from '@/model/usersModel'

type RequestParams = {
  wallet: string
  action: User['status'] | 'admin' | 'unadmin'
}

export default withPatchApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)
  const token = req.session.token
  let user = null
  if (token) {
    const userByToken = await mongoClient.getUserByToken(token, true)

    /* Only admins */
    if (userByToken && checkAccess(userByToken.scope, 'admin')) {
      const userToChange = await mongoClient.getUserByWallet(params.wallet, true)
      if (userToChange) {
        const isSuperUser = checkAccess(userByToken.scope, 'superadmin')
        /* Change user status */
        if (
          ['verified', 'pending', 'blocked'].includes(params.action) &&
          (!checkAccess(userToChange.scope, 'admin') || isSuperUser)
        ) {
          const status = params.action as User['status']
          await mongoClient.updateUser(
            { wallet: userToChange.wallet },
            {
              status,
              verified_by: status === 'verified' ? userByToken.wallet : '',
              blocked_by: status === 'blocked' ? userByToken.wallet : '',
            },
          )
        }

        /* Only superadmin can make admins */
        if (isSuperUser && (params.action === 'admin' || params.action === 'unadmin')) {
          await mongoClient.updateUser(
            { wallet: userToChange.wallet },
            {
              scope:
                params.action === 'admin'
                  ? addAccess(userToChange.scope, 'admin')
                  : removeAccess(userToChange.scope, 'admin'),
            },
          )
        }
        user = await mongoClient.getUserByWallet(params.wallet, true)
      }
    }
  }

  res.status(200).json({
    data: user,
  })
})
