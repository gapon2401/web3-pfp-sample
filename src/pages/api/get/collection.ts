import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'
import * as path from 'path'

import { doRequest } from '@/api/Api'
import { withGetApi } from '@/api/withGetApi'
import { mongoClient } from '@/dao/mongoClient'
import { Nft, Smartcontract } from '@/model/cryptoModel'

export default withGetApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token
  const nfts = []

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
          const total = await contract.balanceOf(user.wallet)
          for (let i = 0; i < total.toNumber(); i++) {
            const nft = await contract.tokenOfOwnerByIndex(user.wallet, i)
            if (nft.toNumber()) {
              const file = await contract.tokenURI(nft.toNumber())
              const fileResponse = await doRequest<Nft>({
                external: true,
                endpoint: file,
              })
              if (fileResponse.data) {
                nfts.push({ id: path.basename(file).split('.')[0], ...fileResponse.data })
              }
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  res.status(200).json({
    data: nfts,
  })
})
