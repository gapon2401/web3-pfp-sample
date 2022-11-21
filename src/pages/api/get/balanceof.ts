import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { doRequest } from '@/api/Api'
import { withGetApi } from '@/api/withGetApi'
import { mongoClient } from '@/dao/mongoClient'
import { Smartcontract } from '@/model/cryptoModel'

export default withGetApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token
  let total = 0

  if (token) {
    const user = await mongoClient.getUserByToken(token, true)
    if (user?.wallet && user.status === 'verified') {
      const response = await doRequest<Smartcontract>({
        endpoint: `/api/get/smartcontract`,
      })
      if (response.data) {
        const provider = new ethers.providers.InfuraProvider(
          process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK === 'mainnet'
            ? 'homestead'
            : process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK,
          process.env.NEXT_PUBLIC_INFURA_URL!,
        )
        const smartContract = response.data
        const contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider)
        try {
          const balanceof = await contract.balanceOf(user.wallet)
          total = Number(ethers.utils.formatEther(balanceof)) || 0
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  res.status(200).json({
    data: total,
  })
})
