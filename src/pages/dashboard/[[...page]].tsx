import React, { useEffect } from 'react'
import clsx from 'clsx'
import { withIronSessionSsr } from 'iron-session/next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import PropTypes from 'prop-types'

import DashboardController from '@/components/dashboard/DashboardController'
import { mongoClient } from '@/dao/mongoClient'
import styles from '@/dashboard/css/dashboard.module.css'
import { emitter } from '@/lib/emitter'
import { sessionOptions } from '@/lib/session'
import { User } from '@/model/usersModel'

import 'antd/dist/antd.css'

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const token = req.session.token
  const isLoggedIn = !!token

  let user = null
  if (isLoggedIn && token) {
    const userByToken = (await mongoClient.getUserByToken(token, true)) || null
    if (!userByToken) {
      req.session.destroy()
    } else {
      user = { ...userByToken } as Partial<typeof userByToken>
      user.id_str = user?._id?.toString()
      delete user._id
    }
  } else {
    req.session.destroy()
  }

  return {
    props: {
      user,
    },
  }
}, sessionOptions)

type Props = {
  user: User
}
const Dashboard = ({ user }: Props) => {
  const DynamicLogin = dynamic(() => import('@/components/dashboard/Login'), {
    ssr: false,
    suspense: true,
  })

  useEffect(() => {
    const handler = () => location.reload()
    emitter.on('disconnect', handler)

    return () => {
      emitter.off('disconnect', handler)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name='robots' content='noindex, nofollow' />
        <meta name='googlebot' content='noindex,nofollow' />
      </Head>
      <div className={clsx(styles.dashboard, 'container')}>
        {user && (user.status === 'verified' || user.status === 'pending') ? (
          <DashboardController user={user} />
        ) : (
          <div className={styles.block}>
            <p>Please, register and log in to get access to your dashboard</p>
            <React.Suspense fallback={'LOADING'}>
              <DynamicLogin />
            </React.Suspense>
          </div>
        )}
      </div>
    </>
  )
}
Dashboard.propTypes = {
  user: PropTypes.object,
}

export default Dashboard
