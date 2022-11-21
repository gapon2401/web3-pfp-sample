import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { doRequest, useApi } from '@/api/Api'
import { StoreState, useStore } from '@/lib/useStore'
import { RespUsers, User } from '@/model/usersModel'

export const logout = async () => {
  const clearToken = useStore.getState().clearToken
  clearToken()
  await doRequest({
    endpoint: '/api/post/logout',
    method: 'POST',
  })
}

export const getUsers = async (limit = 20, filter = {}, lastValue = 0) => {
  return await doRequest<RespUsers>({
    method: 'POST',
    endpoint: '/api/post/users',
    body: {
      limit,
      offset: lastValue,
      filter,
    },
  })
}

export const useUsers = (
  limit = 20,
  filter = {},
  lastValue = 0,
): [
  RespUsers['items'],
  boolean,
  Dispatch<SetStateAction<RespUsers['items']>>,
  RespUsers['total'],
  RespUsers['lastValue'],
] => {
  const [data, setData] = useState<RespUsers['items']>([])
  const [response, , isLoading] = useApi<RespUsers>({
    method: 'POST',
    endpoint: '/api/post/users',
    body: {
      limit,
      offset: lastValue,
      filter,
    },
  })

  useEffect(() => {
    if (!isLoading && response) {
      setData(response.items)
    }
  }, [isLoading, response])

  return [data || [], isLoading, setData, response?.total || 0, response?.lastValue || 0]
}

export const useUser = (): [User | null, boolean, StoreState['setUser']] => {
  const clearToken = useStore.getState().clearToken
  const storageToken = useStore((state) => state.token)
  const user = useStore((state) => state.user)
  const setUser = useStore.getState().setUser
  const setIsLoading = useStore((state) => state.setIsUserLoading)
  const isLoading = useStore((state) => state.isUserLoading)

  useEffect(() => {
    let ignore = false

    const getUser = async () => {
      const isHookLoaded = useStore.getState().useUserLoaded
      const user2 = useStore.getState().user
      const userToken = user2?.token
      const isLoading = useStore.getState().isUserLoading
      if (storageToken) {
        if (storageToken !== userToken && (!isLoading || !isHookLoaded)) {
          useStore.getState().setUseUserLoaded()
          setIsLoading(true)
          const response = await doRequest<[User | null, boolean]>({
            endpoint: '/api/get/currentUser',
            body: {
              token: storageToken,
            },
          })
          if (!response.data || (Array.isArray(response.data) && !response.data[0])) {
            clearToken()
          } else {
            const [user2] = response.data

            setUser(user2)
          }
          setIsLoading(false)
        }
      } else {
        setUser(null)
        clearToken()

        if (!isHookLoaded) {
          setIsLoading(false)
        }
      }
    }

    if (!ignore) {
      getUser().then()
    }

    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageToken])

  return [user, isLoading, setUser]
}
