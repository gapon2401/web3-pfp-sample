import Cookies from 'universal-cookie'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { Web3ProviderContext } from '@/model/cryptoModel'
import { User } from '@/model/usersModel'

export interface StoreState {
  token: string | null
  user: User | null
  isUserLoading: boolean
  useUserLoaded: boolean
  wallet: {
    isDisconnecting: boolean
    isUserConnected: boolean
    isAuthorizing: boolean
    connected: boolean
  }
  setUseUserLoaded: () => void
  setWallet: (state: Partial<StoreState['wallet']>) => void
  setIsUserLoading: (state: StoreState['useUserLoaded']) => void
  setUser: (user: StoreState['user']) => void
  setToken: (token: StoreState['token']) => void
  clearToken: () => void
  web3Provider: Web3ProviderContext | null
  setWeb3Provider: (web3: StoreState['web3Provider']) => void
}

const cookies = new Cookies()

export const useStore = create(
  subscribeWithSelector<StoreState>((set) => ({
    token: cookies.get('token'),
    user: null,
    isUserLoading: true,
    useUserLoaded: false,
    wallet: {
      isDisconnecting: false,
      isUserConnected: false,
      isAuthorizing: false,
      connected: false,
    },
    setWallet: (wallet2: Partial<StoreState['wallet']>) =>
      set((state) => ({
        wallet: { ...state.wallet, ...wallet2 },
      })),
    setUseUserLoaded: () => {
      set({ useUserLoaded: true })
    },
    setIsUserLoading: (state: StoreState['useUserLoaded']) => {
      set({ isUserLoading: state })
    },
    setUser: (user: StoreState['user']) => {
      set({ user })
    },
    setToken: (token: StoreState['token']) => {
      cookies.set('token', token, {
        path: '/',
      })
      set({ token })
    },
    clearToken: () => {
      set({ token: null, user: null })
      cookies.remove('token', {
        path: '/',
      })
    },
    web3Provider: null,
    setWeb3Provider: (web3: StoreState['web3Provider']) =>
      set({
        web3Provider: web3,
      }),
  })),
)
