import { useCallback, useEffect, useState } from 'react'
import { JsonRpcSigner } from '@ethersproject/providers'

import { doRequest } from '@/api/Api'
import { useStore } from '@/lib/useStore'
import { AuthWallet, SignatureResponse } from '@/model/cryptoModel'

export const useAuth = (): {
  isLoading: boolean
  isAuth: boolean
  auth: (accountId: string, signer: JsonRpcSigner) => Promise<string | null>
} => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const auth = useCallback(
    (accountId: string, signer: JsonRpcSigner): Promise<string | null> => {
      return new Promise((res, rej) => {
        const throwError = (message: string) => {
          setIsAuth(false)
          setIsLoading(false)
          rej(message)
        }
        ;(async () => {
          if (!isLoading && accountId && signer) {
            setIsLoading(true)
            /* Get message to sign */
            const response = await doRequest<SignatureResponse>({
              endpoint: '/api/post/signature',
              method: 'POST',
              body: { wallet: accountId },
            })

            response.error && throwError(response.error)

            if (response.data) {
              /* Sign message */
              const signature = await signer?.signMessage(response.data.message).catch((e: Error) => {
                throw new Error(e.message)
              })

              const response2 = await doRequest<AuthWallet>({
                endpoint: '/api/post/auth',
                method: 'POST',
                body: { signature: signature, wallet: accountId, message: response.data.message },
              })

              if (response2.error) {
                throw new Error(response2.error)
              }

              if (!response2.error && response2.data) {
                setIsAuth(true)
                setIsLoading(false)
                res(response2.data)
              }
            }
            setIsAuth(false)
            setIsLoading(false)
            res(null)
          }
        })().catch((e) => {
          throwError(e instanceof Error ? e.message : 'Error')
        })
      })
    },
    [isLoading],
  )

  useEffect(() => {
    useStore.getState().setWallet({ isAuthorizing: isLoading })
  }, [isLoading])

  return { auth, isLoading, isAuth }
}
