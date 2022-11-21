import { ethers } from 'ethers'
import moment from 'moment/moment'
import { NextApiRequest, NextApiResponse } from 'next'
import uuid4 from 'uuid4'

import { parseRequest } from '@/api/Api'
import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'
import { getMessage } from '@/lib/walletController'

type RequestParams = {
  wallet: string
  signature: string
  message: string
}

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)

  let result: null | string = null

  if (params.wallet) {
    /* Register new user */
    if (!(await mongoClient.userExists({ wallet: params.wallet }))) {
      await mongoClient.addUser({ wallet: params.wallet })
    }

    const user = await mongoClient.getUserByWallet(params.wallet)

    if (user && user.nonce) {
      /* Verify signature */
      if (getMessage(user.nonce) !== params.message) {
        return res.status(200).json({ data: { error: 'Invalid message' } })
      }

      try {
        const verifiedMessage = ethers.utils.verifyMessage(getMessage(user.nonce), params.signature)
        if (verifiedMessage.toLowerCase() !== user.wallet.toLowerCase()) {
          return res.status(200).json({ data: { error: 'Verification failed' } })
        }
      } catch (e) {
        return res.status(200).json({ data: { error: 'Verification failed' } })
      }

      /* Set user access token */
      let userToken = uuid4()
      while (await mongoClient.userExists({ token: userToken })) {
        userToken = uuid4()
      }

      await mongoClient.updateUser(
        { wallet: params.wallet },
        { token: userToken, token_expired: moment().unix() + 86400 * 2 },
      )

      req.session.token = userToken
      await req.session.save()
      result = userToken
    }
  }
  res.status(200).json({
    data: result,
  })
})
