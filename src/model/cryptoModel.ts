import { JsonRpcSigner, Network, Web3Provider } from '@ethersproject/providers'
import { ContractInterface } from 'ethers'

export type Web3ProviderContext = {
  connected: boolean
  isConnecting: boolean
  connect: () => Promise<Omit<Web3ProviderContext, 'error' | 'reconnect' | 'connect'> | void>
  reconnect: () => Promise<void>
  disconnect: () => Promise<void>
  network?: Network
  provider?: Web3Provider
  signer?: JsonRpcSigner
  chainId?: number
  accountId?: string
  error: string
}

export type ProviderRpcError = Error & {
  code: number
  data?: unknown
}

export type SignatureResponse = {
  nonce: string
  message: string
}

export type AuthWallet = null | string

export type Smartcontract = {
  abi: ContractInterface
  contractAddress: string
  network: string
  infuraUrl: string
  maxTokenSupply: number
  totalSupply: number
}

export type Nft = {
  name: string
  image: string
  attributes: Array<{ trait_type: string; value: string }>
}

export type NftWithId = Nft & { id: string }
