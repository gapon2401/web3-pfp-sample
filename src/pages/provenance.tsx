import React from 'react'
import clsx from 'clsx'
import Head from 'next/head'

import public_styles from '@/css/public.module.css'
import { FC } from '@/model/commonModel'

const Provenance: FC = () => {
  const title = 'Provenance hash'
  const description = 'This is the final provenance record stored on the smart contract'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>

      <div className={'container'}>
        <section className={clsx(public_styles.block)}>
          <h1>Provenance</h1>
          <p>
            The provenance hash for The Sample collection is{' '}
            <b style={{ overflowWrap: 'break-word' }}>{process.env.NEXT_PUBLIC_PROVENANCE}</b>.
          </p>
          <h3 className={'mt-4'}>What is the provenance?</h3>
          <p>
            Each token image from the collection was hashed using SHA-256 algorithm. Then hashes of the images was
            concatenated and this string was also hashed using SHA-256 algorithm.
          </p>
          <p>This is the final provenance record stored on the smart contract.</p>
          <h3 className={'mt-4'}>What does it mean?</h3>
          <p>
            It means, that all the images and metadata were loaded before the mint and <b>were not manipulated</b>.
          </p>
          <p>Each token ID is assigned to an image from the initial sequence randomly.</p>
          <p>If you try to replace or reorder at least 2 images, the hash will be different.</p>
        </section>
      </div>
    </>
  )
}

export default Provenance
