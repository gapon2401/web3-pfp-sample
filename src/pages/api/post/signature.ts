import { NextApiRequest, NextApiResponse } from 'next'

import { parseRequest } from '@/api/Api'
import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'
import { getMessage, getNonce } from '@/lib/walletController'

type RequestParams = {
  wallet: string
}

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)

  const nonce = getNonce()

  if (params.wallet) {
    if (await mongoClient.userExists({ wallet: params.wallet })) {
      await mongoClient.updateUser({ wallet: params.wallet }, { nonce })
    } else {
      await mongoClient.addUser({ wallet: params.wallet, nonce })
    }
  }

  res.status(200).json({
    data: {
      nonce,
      message: getMessage(nonce),
    },
  })
})
