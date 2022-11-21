import React from 'react'

import MintForm from '@/components/web3/MintForm'
import styles from '@/dashboard/css/dashboard.module.css'
import NftCollection from '@/dashboard/pages/home/NftCollection'
import { truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

type Props = {
  user?: User
}
const Home: FC<Props> = () => {
  const smartcontractLink = `https://${
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK !== 'mainnet'
      ? `${process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK}.`
      : ``
  }etherscan.io/address/${process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}`

  return (
    <>
      <MintForm />

      <div className={styles.block}>
        <p>
          <b>The Sample</b> provides sample access to Metaverse, where investors, community builders, artists and web3
          enthusiasts can make sample projects. <br />
          The collection of 100 unique NFTs stored on Ethereum blockchain.
        </p>
      </div>

      <NftCollection />

      <div className={styles.block}>
        <h3 className={'align-center'}>Overview of NFT Collection</h3>
        <div className={styles.overview__text}>
          <p className={styles.overview__text_label}>Total Supply:</p>
          <p className={styles.overview__text_text}>100 of unique PFP Avatars</p>
          <p className={styles.overview__text_label}>NFT Private Mint Max Cap:</p>
          <p className={styles.overview__text_text}>1 NFT per 1 address</p>
          <p className={styles.overview__text_label}>NFT Mint Page:</p>
          <p className={styles.overview__text_text}>
            {`${process.env.NEXT_PUBLIC_API_PATH}/dashboard`} - Mint form will appear on this page
          </p>
          <p className={styles.overview__text_label}>Mint Price:</p>
          <p className={styles.overview__text_text}>0.1 ETH</p>
          <p className={styles.overview__text_label}>How to mint:</p>
          <p className={styles.overview__text_text}>
            The mint form will be displayed above, connect your wallet and mint the number of NFTs you need
          </p>
          <p className={styles.overview__text_label}>Smart contract:</p>
          <p className={styles.overview__text_text}>
            <a href={smartcontractLink} title={'Etherscan'} target={'_blank'} rel={'noreferrer'}>
              <span className={'d-sm-none'}>
                {truncateWalletAddress(process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS!)}
              </span>
              <span className={'d-none d-sm-block'}>{process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}</span>
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
