import React from 'react'
import clsx from 'clsx'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const Roadmap = () => {
  return (
    <section className={clsx(public_styles.block, 'smooth-scroll-section', 'pt-0')}>
      <div className={clsx('container relative')}>
        <div className={clsx(public_styles.h2, styles.cols__title)}>Roadmap</div>
        <div className={clsx(styles.roadmap, 'mb-sm')}>
          <div className={styles.roadmap__section}>
            <p className={clsx(styles.roadmap__list_item, styles.empty)}>Contest announcement</p>
            <p className={clsx(styles.roadmap__list_item, styles.empty)}>
              Create strategy and roadmap of the Sample NFT project + Blockchain
            </p>
            <p className={clsx(styles.roadmap__list_item, styles.empty)}>Launch the website</p>
          </div>
          <div className={styles.roadmap__section}>
            <p className={clsx(styles.roadmap__list_item, styles.empty)}>
              Create The Sample NFT Collection: 100 unique NFTs
            </p>
            <p className={styles.roadmap__list_item}>Launch public sale of The Sample NFT Collection</p>
          </div>
          <div className={styles.roadmap__section}>
            <p className={styles.roadmap__list_item}>Launch The Sample DAO</p>
          </div>
          <div className={styles.roadmap__section}>
            <p className={styles.roadmap__list_item}>Land presale in The Sample Metaverse</p>
            <p className={styles.roadmap__list_item}>Create DAO for landowners</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap
