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
    const isSuperAdmin = checkAccess(user.scope, 'superadmin')
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
        label: `Settings${!isSuperAdmin ? ` (only for superadmin from .env)` : ``}`,
        key: '3',
        disabled: !isSuperAdmin,
        children: isSuperAdmin ? <Settings /> : <></>,
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
      <>
        <div className={clsx(styles.attention_block, 'mt-1')}>
          This is demo of admin page. You can change only 5 users. <br />
          All admins by default go to &quot;Users&quot; page with prefiltered value of &quot;Waiting&quot; state. <br />
          In this demo all registered users become verified.
        </div>
        <Tabs
          defaultActiveKey={'1'}
          items={items}
          tabBarExtraContent={
            isSuperAdmin
              ? {
                  right: <Button onClick={onSetupIndexes}>Setup indexes</Button>,
                }
              : null
          }
        />
      </>
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
    return !isTokensLoading ? (
      <>
        <div className={clsx(styles.attention_block, 'mt-1')}>
          This is a demo of user&apos;s dashboard. <br />
          Mint token and you will open private page, available only for NFT holders
        </div>
        <Tabs defaultActiveKey={'1'} items={items} />
      </>
    ) : (
      <Loader />
    )
  }

  return isAdmin ? <AdminTabs /> : <UserTabs />
}

export default DashboardHome
