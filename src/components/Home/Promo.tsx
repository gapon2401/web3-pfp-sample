import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const Promo = () => {
  const DynamicPromoButton = dynamic(() => import('@/components/Home/PromoButton'), {
    ssr: false,
  })
  return (
    <section className={clsx(styles.first_block, 'smooth-scroll-section')}>
      <div className={clsx(styles.cols, 'container relative')}>
        <div className={styles.cols__col_left}>
          <h1 className={clsx(public_styles.h1, styles.cols__title)}>{'Welcome to The Sample'}</h1>
          <p>
            <b>The Sample</b> provides membership access to Metaverse, where <b>investors</b>, community builders, can{' '}
            <b>make money</b> on their brands.
          </p>
          <p>
            Holders will get an <b>exclusive access</b> to members-only benefits, such as drops of new collections, land
            and more
          </p>
          <p style={{ fontSize: '1em' }}>The collection of 100 unique NFTs stored on Ethereum blockchain.</p>
          <DynamicPromoButton />
        </div>
        <div className={styles.cols__col_right}>
          <div className={styles.cols__pfp}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.pfp_asset}>
                <Image src={`/img/home/assets/${i}.jpg`} width={550} height={550} quality={100} alt={`asset-${i}`} />
              </div>
            ))}
          </div>
          <a href='https://www.freepik.com' style={{ fontSize: '14px', color: '#ccc' }}>
            Avatars designed by rawpixel.com / Freepik
          </a>
        </div>
      </div>
    </section>
  )
}

export default Promo
