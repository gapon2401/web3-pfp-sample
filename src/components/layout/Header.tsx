import React, { useEffect } from 'react'
import clsx from 'clsx'
import throttle from 'lodash.throttle'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import styles from '@/css/home.module.css'

const Header = () => {
  const handleScroll = throttle(() => {
    if (window.scrollY > 500) {
      document.querySelector(`.${styles.header}`)!.classList.add('header--sticky')
    } else {
      document.querySelector(`.${styles.header}`)!.classList.remove('header--sticky')
    }
  }, 300)

  const Pages = () => {
    const DynamicHeaderWallet = dynamic(() => import('@/components/layout/HeaderWallet'), {
      ssr: false,
    })
    return (
      <div className={styles.header_pages}>
        <div className={styles.header_pages_list}>
          <Link href={'/provenance'}>
            <a title={'Provenance'}>Provenance</a>
          </Link>
        </div>
        <DynamicHeaderWallet />
      </div>
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header className={clsx(styles.promo, styles.header)}>
      <div className={clsx('container d-flex w100 justify-content-between align-items-center gutter-05')}>
        <Link href={'/'}>
          <a title={'The Sample'} className={styles.header_logo}>
            <div className={styles.promo__title}>
              <span>The Sample</span>
            </div>
          </a>
        </Link>
        <div className={clsx('header__wrapper')}>
          <div className={clsx('header__body')}>
            <Pages />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
