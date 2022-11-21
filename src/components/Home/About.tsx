import React from 'react'
import clsx from 'clsx'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const About = () => {
  return (
    <section className={clsx(public_styles.block, 'smooth-scroll-section', 'pt-0')}>
      <div className={clsx('container relative')}>
        <div className={clsx(public_styles.h2, styles.cols__title)}>The Sample NFT value</div>
        <p className={'mb-sm'}>Each NFT is not just PFP – it is access to the club of like-minded people.</p>
        <p>All initial holders will get special benefits:</p>
        <ul>
          <li>
            <p>
              Access to the <b>Land presale</b> and all future <b>rewards</b> from this land.
            </p>
            <p>
              Land - is a place, where investors can increase the land value and earn on building of the future
              Metaverse
            </p>
            <p>Land - is a place, where you can trade their NFT assets and engage people into their brands.</p>
          </li>
          <li>
            <p>
              <b>Rewards for NFT holders</b>: airdrops, access to private land events and spaces, merch, etc
            </p>
          </li>
          <li>
            <p>
              <b>Referral program</b> for future blockchain projects
            </p>
          </li>
          <li>
            <p>
              Ability of <b>making decisions</b> of The Sample growing
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default About
