import React from 'react'

import Web3Provider from '@/components/web3/Web3Provider'
import { LoaderSpin } from '@/lib/svg'
import { useWallet } from '@/lib/useWallet'

const LoginPure = () => {
  const { isAuthorizing, isConnecting, connected, connect } = useWallet()
  return (
    <div>
      {connected ? (
        <button disabled className={'button'}>
          Wait, please... <LoaderSpin />
        </button>
      ) : isConnecting || isAuthorizing ? (
        <button disabled className={'button'}>
          Connecting, check your wallet to sign in... <LoaderSpin />
        </button>
      ) : (
        <button onClick={connect} title={'Connect wallet'} className={'button'}>
          Log in
        </button>
      )}
    </div>
  )
}

const Login = () => {
  return (
    <Web3Provider>
      <LoginPure />
    </Web3Provider>
  )
}

export default Login
