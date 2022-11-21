import { useCallback } from 'react'

import { logout, useUser } from '@/api/userApi'
import { useWeb3 } from '@/components/web3/Web3Provider'
import { emitter, EmitterEvents } from '@/lib/emitter'
import { useAuth } from '@/lib/useAuth'
import { useStore } from '@/lib/useStore'

export const useWallet = () => {
  const { auth } = useAuth()
  const [user] = useUser()
  const { connect: pureConnect, disconnect: pureDisconnect, isConnecting, accountId } = useWeb3()

  const wallet = useStore((state) => state.wallet)
  const setWallet = useStore.getState().setWallet

  const connect = async (): Promise<null | string> => {
    return new Promise((res) => {
      ;(async () => {
        const connection = await pureConnect()
        if (connection?.connected && connection.accountId && connection.signer && !user) {
          auth(connection.accountId, connection.signer)
            .then(async (token) => {
              if (token) {
                useStore.getState().setToken(token)
                setWallet({ isUserConnected: true })
                res(token)
              } else {
                await disconnect()
              }
            })
            .catch(async () => {
              await disconnect()
            })
        }
      })()
    })
  }

  const disconnect = useCallback(
    async (eventName?: EmitterEvents) => {
      if (!wallet.isDisconnecting) {
        setWallet({ isDisconnecting: true })
        await pureDisconnect()
        await logout()
        if (eventName) {
          emitter.emit(eventName)
        }
      }
    },
    [pureDisconnect, setWallet, wallet.isDisconnecting],
  )

  return {
    connect,
    disconnect,
    isConnecting,
    accountId,
    isDisconnecting: wallet.isDisconnecting,
    connected: wallet.isUserConnected && user,
    isAuthorizing: wallet.isAuthorizing,
  }
}
