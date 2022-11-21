import React from 'react'
import { Image as ImageAntd } from 'antd'
import Image from 'next/image'

import { useApi } from '@/api/Api'
import styles from '@/dashboard/css/dashboard.module.css'
import { Loader } from '@/lib/svg'
import { NftWithId } from '@/model/cryptoModel'

const NftCollection = () => {
  const [nfts, , isLoading] = useApi<NftWithId[]>({
    endpoint: '/api/get/collection',
  })

  return (
    <div className={styles.block}>
      <h3 className={'align-center'}>Your NFT collection</h3>

      {isLoading ? (
        <div className={'align-center'}>
          <Loader />
        </div>
      ) : (
        <div className={styles.nft_collection}>
          {nfts && nfts?.length ? (
            <>
              {nfts.map((nft, index) => (
                <div className={styles.nft_collection_item} key={index}>
                  <ImageAntd src={nft.image} width={200} height={200} alt={nft.name} />
                  <div>
                    <a
                      title={'Etherscan'}
                      className={'d-flex gutter-05 align-items-center'}
                      target={'_blank'}
                      rel={'noreferrer'}
                      href={
                        process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK === 'mainnet'
                          ? `https://etherscan.io/nft/${process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}/${nft.id}`
                          : `https://${process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK}.etherscan.io/token/${process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}?a=${nft.id}`
                      }
                    >
                      <Image src={'/img/svg/etherscan.svg'} width={16} height={16} alt={'etherscan'} />
                      {nft.name}
                    </a>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>
              <p className={'align-center'}>&lt; Empty &gt;</p>
              <p>
                <em>
                  If you have just minted a token and do not see it, wait 5 minutes and refresh the page. We need time
                  to process it
                </em>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NftCollection
