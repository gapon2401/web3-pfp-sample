import React from 'react'
import clsx from 'clsx'
import Head from 'next/head'

import About from '@/components/Home/About'
import Faq from '@/components/Home/Faq'
import Mission from '@/components/Home/Mission'
import Promo from '@/components/Home/Promo'
import Roadmap from '@/components/Home/Roadmap'
import Team from '@/components/Home/Team'
import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'
import { truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'

const Home: FC = () => {
  const title = 'Sample web3 project for community builders (100 unique NFTs)'
  const description =
    'You will get an overview page, provenance hash page, dashboard for admins and users with minting form. Use that sample for your projects'

  const smartcontractLink = `https://${
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK !== 'mainnet'
      ? `${process.env.NEXT_PUBLIC_SMARTCONTRACT_NETWORK}.`
      : ``
  }etherscan.io/address/${process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>

      <div className={clsx(styles.home_page)}>
        <Promo />
        <Mission />
        <About />
        <Roadmap />
        <Faq />
        <Team />

        <section className={clsx(public_styles.block, 'align-center pt-0')}>
          <div className='d-flex gutter-05 flex-flow-wrap justify-content-center'>
            SMART CONTRACT ADDRESS:
            <a href={smartcontractLink} title={'Smart contract address'} target={'_blank'} rel={'noreferrer'}>
              <span className={'d-sm-none'}>
                {truncateWalletAddress(process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS!)}
              </span>
              <span className={'d-none d-sm-block'}>{process.env.NEXT_PUBLIC_SMARTCONTRACT_ADDRESS}</span>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
