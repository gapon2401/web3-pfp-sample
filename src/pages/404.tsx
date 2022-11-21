import React from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'
import { FC } from '@/model/commonModel'

const Error404: FC = () => {
  return (
    <>
      <Head>
        <title>Not found</title>
        <meta name='robots' content='noindex, nofollow' />
        <meta name='googlebot' content='noindex,nofollow' />
      </Head>

      <div className='block container mt-1 align-center' style={{ paddingBottom: '15rem' }}>
        <h1 className={'align-center'}>Page not found</h1>
        <div className={clsx('second-black', styles.error_page_description)}>
          The page you&apos;ve requested didn&apos;t exist
        </div>
        <div className='mt-1'>
          <Link href={'/'}>
            <a className={clsx('button')} title={'Go to homepage'}>
              Go to homepage
            </a>
          </Link>
        </div>
        <style global jsx>{`
          .${public_styles.footer} {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
            body {
              position: relative;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default Error404
