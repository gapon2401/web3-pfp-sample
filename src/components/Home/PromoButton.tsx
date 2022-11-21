import React from 'react'

import { useUser } from '@/api/userApi'
import Web3Provider from '@/components/web3/Web3Provider'
import styles from '@/css/home.module.css'
import { useWallet } from '@/lib/useWallet'

const PromoButton = () => {
  const Button = () => {
    const [user, isUserLoading] = useUser()

    const { connect } = useWallet()
    return !user && !isUserLoading ? (
      <a title={'Become a member'} className={styles.button} onClick={connect}>
        Become a member
      </a>
    ) : null
  }

  return (
    <Web3Provider>
      <Button />
    </Web3Provider>
  )
}

export default PromoButton
