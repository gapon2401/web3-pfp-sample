import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token
  let signature = ''

  if (token) {
    const user = await mongoClient.getUserByToken(token, true)
    if (user?.wallet && user.status === 'verified') {
      const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY!)
      // Compute hash of the address
      const addressHash = ethers.utils.solidityKeccak256(['address'], [user.wallet.toLowerCase()])
      // Sign the hashed address
      const messageBytes = ethers.utils.arrayify(addressHash)
      signature = await signer.signMessage(messageBytes)
    }
  }

  res.status(200).json({
    data: signature,
  })
})
