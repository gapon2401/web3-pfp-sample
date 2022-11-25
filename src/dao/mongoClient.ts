import moment from 'moment'
import { Db, InsertOneResult, MongoClient as MongoClientPool, UpdateOptions, WithId } from 'mongodb'

import { addAccess } from '@/lib/utils'
import { FilterType, User } from '@/model/usersModel'

class MongoClient {
  private dbPool: MongoClientPool
  private db: Db | undefined

  private initialUser: User = {
    name: '',
    email: '',
    about: '',
    about_profit: '',
    about_grow: '',
    wallet: '',
    scope: '',
    token: '',
    nonce: '',
    token_expired: 0,
    created_at: 0,
    verified_by: '',
    blocked_by: '',
    status: 'not_registered',
  }

  constructor() {
    this.dbPool = new MongoClientPool(process.env.MONGO_URI!)
  }

  async connect() {
    if (!this.db) {
      await this.dbPool.connect()
      this.db = this.dbPool.db(process.env.MONGO_DB)
      await this.db.command({ ping: 1 })
    }
    return this.db
  }

  async close() {
    await this.dbPool.close()
    this.db = undefined
  }

  isUserHasRequiredFields(user: User): boolean {
    return (['name', 'email', 'about', 'about_profit', 'about_grow', 'wallet'] as Array<keyof User>).every(
      (field) => user[field],
    )
  }

  async setupIndexes() {
    try {
      const db = await this.connect()

      await db.collection('users').createIndex(
        {
          wallet: 1,
        },
        {
          unique: true,
        },
      )
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async getUsers(
    filter: Partial<FilterType> = {},
    offset = 0,
    limit = 30,
  ): Promise<[WithId<User>[], number, number | null]> {
    try {
      const db = await this.connect()

      const filterBy: Record<string, any> = {}
      if (Object.keys(filter).length) {
        const availableFilters = ['name', 'email', 'wallet', 'status']
        Object.keys(filter).forEach((name) => {
          const value = filter[name as keyof FilterType]?.trim()
          if (availableFilters.includes(name) && value) {
            filterBy[name] = { $regex: `^${value}` }
          }
        })
      }

      const total = await db.collection<User>('users').countDocuments(filterBy)
      const users = await db.collection<User>('users').find(filterBy).limit(limit).skip(offset).toArray()
      const lastValue = users.length + offset
      return [users, total, lastValue < total ? lastValue : null]
    } catch (e) {
      console.error(e)
      return [[], 0, null]
    }
  }

  async getUserByToken(token: string, isFrontend = false): Promise<WithId<User> | null> {
    try {
      const db = await this.connect()

      if (!token) {
        return null
      }

      const user = await db.collection<User>('users').findOne({ token })

      if (!user || moment().unix() - (user.token_expired || 0) >= 86400 * 2) {
        return null
      }

      if (user && isFrontend) {
        delete user.nonce
        delete user.token_expired
      }

      if (process.env.ADMIN && user.wallet === process.env.ADMIN.toLowerCase()) {
        user.scope = addAccess(user.scope, 'superadmin')
        user.scope = addAccess(user.scope, 'admin')
      }

      return user
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async logout(token: string): Promise<void> {
    try {
      const db = await this.connect()
      await db.collection<User>('users').updateOne(
        { token },
        {
          $set: {
            nonce: '',
            token_expired: 0,
            token: '',
          },
        },
      )
      await this.close()
    } catch (e) {
      console.error(e)
    }
  }

  async getUserByWallet(wallet: string, isFrontend = false): Promise<User | null> {
    try {
      const db = await this.connect()

      if (!wallet) {
        return null
      }
      const user = await db.collection<User>('users').findOne({ wallet: wallet.toLowerCase() })

      if (!user) {
        return null
      }

      if (user && isFrontend) {
        delete user.nonce
        delete user.token_expired
      }

      if (process.env.ADMIN && user.wallet === process.env.ADMIN.toLowerCase()) {
        user.scope = addAccess(user.scope, 'superadmin')
      }

      return user
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async userExists(data: Partial<User>): Promise<boolean> {
    try {
      const db = await this.connect()

      if (data.wallet) {
        data.wallet = data.wallet.toLowerCase()
      }
      const exists = await db.collection<User>('users').findOne(data)

      return exists !== null
    } catch (e) {
      console.error(e)
    }
    return false
  }

  async addUser(data: Partial<User>): Promise<InsertOneResult<User> | null> {
    try {
      const db = await this.connect()
      const newData = { ...this.initialUser, ...data }

      newData.wallet = newData.wallet.toLowerCase()
      newData.created_at = moment().unix()
      ;(
        ['about', 'about_profit', 'about_grow'] as Array<keyof Pick<User, 'about' | 'about_grow' | 'about_profit'>>
      ).forEach((key) => {
        newData[key] = newData[key].substring(0, 500)
      })

      return await db.collection<User>('users').insertOne(newData)
    } catch (e) {
      console.error(e)
    }
    return null
  }

  async updateUser(updateBy: Partial<WithId<User>>, data: Partial<User>, options: UpdateOptions = {}): Promise<void> {
    if (Object.keys(updateBy).length > 0) {
      try {
        const db = await this.connect()

        if (updateBy.wallet) {
          updateBy.wallet = updateBy.wallet.toLowerCase()
        }
        if (data.wallet) {
          data.wallet = data.wallet.toLowerCase()
        }
        ;(
          ['about', 'about_profit', 'about_grow'] as Array<keyof Pick<User, 'about' | 'about_grow' | 'about_profit'>>
        ).forEach((key) => {
          if (data[key]) {
            data[key] = data[key]!.substring(0, 500)
          }
        })
        await db.collection<User>('users').updateOne(updateBy, { $set: data }, options)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
export const mongoClient = new MongoClient()
