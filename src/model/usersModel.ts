import { WithId } from 'mongodb'

export type User = {
  name: string
  email: string
  about: string
  about_profit: string
  about_grow: string
  wallet: string
  scope: string
  token: string
  created_at: number
  status: 'pending' | 'verified' | 'blocked' | 'not_registered'
  verified_by: string
  blocked_by: string
  nonce?: string
  token_expired?: number
  id_str?: string
}

export type FilterType = {
  name: string
  email: string
  wallet: string
  status: string
}

export type RespUsers = {
  items: WithId<User>[]
  lastValue: null | number
  total: number
}
