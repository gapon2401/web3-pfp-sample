import React from 'react'
import clsx from 'clsx'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const Mission = () => {
  return (
    <section className={clsx(public_styles.block, 'smooth-scroll-section', 'pt-0')}>
      <div className={clsx('container relative')}>
        <div className={clsx(public_styles.h2, styles.cols__title)}>Our mission</div>
        <p className={'mb-sm'}>
          Our mission is to make the community own by itself. The core of the community are people who wants to make
          money from NFT and blockchain projects.
        </p>
      </div>
    </section>
  )
}

export default Mission
