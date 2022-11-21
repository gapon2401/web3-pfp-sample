import React from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'

import PublicLayout from '@/components/layout/PublicLayout'
import type { FC } from '@/model/commonModel'

import '@/css/reset.css'
import '@/css/global.css'

type PageWithLayout = NextPage & {
  getLayout: React.ComponentType
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const PageLayout = (Component as PageWithLayout).getLayout || PublicLayout

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default App
