import React from 'react'
import clsx from 'clsx'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const Faq = () => {
  const faq = [
    {
      title: 'What is NFT (Non Fungible Token)?',
      body: 'A non-fungible token (NFT) is a financial security consisting of digital data stored in a blockchain, a form of distributed ledger. The ownership of an NFT is recorded in the blockchain, and can be transferred by the owner, allowing NFTs to be sold and traded.',
    },
    {
      title: 'How to buy The Sample NFT?',
      body: 'Connect your wallet and register to get access.',
    },
    {
      title: 'What can I do with my NFT?',
      body: 'Access to the exclusive perks, particular services, and products, rewards, and benefits that will be unlocked via roadmap activation.',
    },
    {
      title: 'I have more questions',
      body: 'Connect your wallet and you will get an access to the private chat',
    },
  ]

  return (
    <section className={clsx(public_styles.block, 'smooth-scroll-section', 'pt-0')}>
      <div className={clsx('container relative')}>
        <div className={clsx(public_styles.h2, styles.cols__title)}>FAQ</div>
        <div className={styles.faq}>
          {faq.map((text, index) => (
            <DropdownItem title={text.title} body={text.body} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const DropdownItem = ({ title, body }: { title: string; body: string }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const handleFunc = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      if (ref.current) {
        ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
      }
    } else {
      if (ref.current) {
        ref.current.style.maxHeight = ''
      }
    }
  }

  return (
    <div className={styles.faq__dropdown} onClick={() => handleFunc()}>
      <div className={styles.faq__dropdown_header}>
        <h3 className={styles.faq__dropdown_title}>{title}</h3>
        <button
          className={clsx(styles.faq__dropdown_btn, isOpen ? styles.faq__dropdown_btn_open : '')}
          onClick={handleFunc}
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect y='11.5' width='24' height='1.5' fill='var(--first-black)' />
            <rect x='11.5' y='24' width='24' height='1.5' transform='rotate(-90 11.5 24)' fill='var(--first-black)' />
          </svg>
        </button>
      </div>
      <div ref={ref} className={clsx(styles.faq__dropdown_body, isOpen ? styles.faq__dropdown_body_active : '')}>
        <p dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  )
}

export default Faq
