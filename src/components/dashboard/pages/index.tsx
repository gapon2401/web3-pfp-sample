import React from 'react'
import { Button, Tabs } from 'antd'
import clsx from 'clsx'

import { doRequest } from '@/api/Api'
import { useApi } from '@/api/Api'
import { useUsers } from '@/api/userApi'
import styles from '@/dashboard/css/dashboard.module.css'
import Home from '@/dashboard/pages/home/Home'
import Private from '@/dashboard/pages/private/Private'
import Settings from '@/dashboard/pages/settings/Settings'
import Users from '@/dashboard/pages/users/Users'
import { Loader } from '@/lib/svg'
import { checkAccess } from '@/lib/utils'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

type Props = {
  user: User
}
const DashboardHome: FC<Props> = ({ user }) => {
  const isAdmin = checkAccess(user.scope, 'admin') || checkAccess(user.scope, 'superadmin')
  const [userTotalTokens, , isTokensLoading] = useApi<number>({
    endpoint: '/api/get/balanceof',
  })

  const AdminTabs = () => {
    const [, isTotalLoading, , total] = useUsers(1)
    const [, isPendingTotalLoading, , pendingTotal] = useUsers(1, { status: 'pending' })
    const items = [
      {
        label: (
          <>
            Users ({total})
            {pendingTotal ? (
              <sup title={'Pending users'} className={styles.indicator}>
                {pendingTotal}
              </sup>
            ) : null}
          </>
        ),
        key: '1',
        children: <Users admin={user} hasPending={pendingTotal > 0} allUsersTotal={total} />,
      },
      {
        label: 'Home',
        key: '2',
        children: <Home />,
      },

      {
        label: 'Settings',
        key: '3',
        children: <Settings />,
      },
    ]

    if (!isTokensLoading && userTotalTokens !== null && userTotalTokens > 0) {
      items.push({
        label: 'Private page ★',
        key: '4',
        children: <Private />,
      })
    }

    const onSetupIndexes = async () => {
      await doRequest({
        method: 'POST',
        endpoint: '/api/post/setupdb',
      })
    }

    return !isTotalLoading && !isPendingTotalLoading && !isTokensLoading ? (
      <Tabs
        defaultActiveKey={'1'}
        items={items}
        tabBarExtraContent={
          checkAccess(user.scope, 'superadmin')
            ? {
                right: <Button onClick={onSetupIndexes}>Setup indexes</Button>,
              }
            : null
        }
      />
    ) : (
      <Loader />
    )
  }

  const UserTabs = () => {
    const items = [
      {
        label: 'Home',
        key: '1',
        children: <Home user={user} />,
      },
    ]
    if (!isTokensLoading && userTotalTokens !== null && userTotalTokens > 0) {
      items.push({
        label: 'Private page ★',
        key: '2',
        children: <Private />,
      })
    }
    return !isTokensLoading ? <Tabs defaultActiveKey={'1'} items={items} /> : <Loader />
  }

  return (
    <>
      {user.status === 'pending' && !isAdmin && (
        <div className={clsx(styles.attention_block, 'mt-1')}>
          You have been registered to sale list. When your data will be processed, you will get a message on your email:{' '}
          {user.email}. <br />
          Only verified accounts can participate in the sale
        </div>
      )}
      {isAdmin ? <AdminTabs /> : <UserTabs />}
    </>
  )
}

export default DashboardHome
