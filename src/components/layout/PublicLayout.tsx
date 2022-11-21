import React, { ReactNode } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import Header from '@/components/layout/Header'
import public_styles from '@/css/public.module.css'
import { isDevelopment } from '@/lib/utils'
import { FC } from '@/model/commonModel'

type Props = {
  children: ReactNode
}
const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        {isDevelopment && (
          <>
            <meta name='robots' content='noindex, nofollow' />
            <meta name='googlebot' content='noindex,nofollow' />
          </>
        )}

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/mask-icon.svg' color='#5bbad5' />

        <title>Sample web3 project for community builders (100 unique NFTs)</title>
        <meta property='og:image' content='/img/thesample-main@1024.png' key={'ogimage'} />
        <meta property='og:image:type' content='image/png' key={'ogimagetype'} />
        <meta property='og:image:width' content='1028' key={'ogimagew'} />
        <meta property='og:image:height' content='235' key={'ogimageh'} />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_API_PATH} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content='/img/thesample-main@1024.png' />
      </Head>
      <main className={public_styles.page__wrap}>
        <Header />
        {children}
      </main>
      <style global jsx>{`
        @font-face {
          font-family: 'Proxima Nova';
          src: url('/font/ProximaNova-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Proxima Nova';
          font-weight: bold;
          src: url('/font/ProximaNova-Bold.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Proxima Nova';
          font-weight: 900;
          src: url('/font/ProximaNova-Black.woff2') format('woff2');
        }
        :root {
          --link-color: #74a3f5;
          --link-color-hover: #0a0528;
          --first-black: rgba(10, 5, 40, 1);
          --second-black: rgba(10, 5, 40, 0.8);
          --third-black: rgba(10, 5, 40, 0.6);
        }
        body {
          background: #f9f9f9;
          font-family: 'Proxima Nova', 'Helvetica', serif;
        }
        p {
          color: var(--second-black);
        }
        h1 {
          font-weight: 900;
        }
        header.header {
          margin-bottom: 6rem;
        }
        ul,
        ol {
          font-size: 1.6rem;
        }
      `}</style>
    </div>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.element,
}

export default PublicLayout
