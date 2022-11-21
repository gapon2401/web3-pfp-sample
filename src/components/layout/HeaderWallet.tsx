import React, { useEffect, useState } from 'react'
import { WalletOutlined } from '@ant-design/icons'
import Link from 'next/link'

import { useUser } from '@/api/userApi'
import ModalRegister from '@/components/modal/ModalRegister'
import Web3Provider from '@/components/web3/Web3Provider'
import styles from '@/css/home.module.css'
import { DeleteCross, LoaderSpin } from '@/lib/svg'
import { useWallet } from '@/lib/useWallet'
import { truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'

const HeaderWalletPure = () => {
  const [user, isUserLoading, setUser] = useUser()

  const { isDisconnecting, disconnect, isAuthorizing, isConnecting, accountId, connected, connect } = useWallet()
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const WalletAddress: FC<{ address: string; href?: string; title?: string }> = ({ address, href, title }) => {
    const onDisconect = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      await disconnect('disconnect')
    }
    return (
      <div className={'d-flex gutter-05 align-items-center'}>
        {href ? (
          <Link href={href}>
            <a title={title} style={{ lineHeight: 1 }}>
              <div>Dashboard</div>
              <span className={styles.header_wallet}>
                <WalletOutlined /> {truncateWalletAddress(address)}
              </span>
            </a>
          </Link>
        ) : (
          truncateWalletAddress(address)
        )}
        {!isDisconnecting ? (
          <a href={'#'} onClick={onDisconect} title={'disconnect'}>
            <DeleteCross color={'#fff'} width={'20px'} height={'20px'} />
          </a>
        ) : (
          <LoaderSpin color={'#fff'} />
        )}
      </div>
    )
  }

  /* Redirect to dashboard after connection */
  useEffect(() => {
    if (connected && (user?.status === 'pending' || user?.status === 'verified')) {
      location.href = process.env.NEXT_PUBLIC_API_PATH + '/dashboard'
    }
  }, [connected, user?.status])

  /* Check register */
  useEffect(() => {
    if (user && user.status === 'not_registered' && !showRegisterModal) {
      setShowRegisterModal(true)
    }
  }, [showRegisterModal, user])

  return (
    <div className={'header_wallet'}>
      {!isUserLoading && (
        <>
          {user && (user.status === 'pending' || user.status === 'verified') ? (
            <WalletAddress address={user.wallet} href={'/dashboard'} title={'Dashboard'} />
          ) : isConnecting || isAuthorizing ? (
            <button disabled className={styles.promo__button} title={'Connect wallet'}>
              Authorizing...
            </button>
          ) : user && user.wallet && user.status === 'not_registered' ? (
            <>
              <ModalRegister show={showRegisterModal} setUser={setUser}>
                <button title={'Register'} className={styles.promo__button}>
                  Register
                </button>
              </ModalRegister>
              <WalletAddress address={user?.wallet ?? accountId ?? ''} />
            </>
          ) : (
            <button onClick={connect} title={'Connect wallet'} className={styles.promo__button}>
              Connect wallet
            </button>
          )}
        </>
      )}
    </div>
  )
}

const HeaderWallet = () => (
  <Web3Provider>
    <HeaderWalletPure />
  </Web3Provider>
)

export default HeaderWallet
