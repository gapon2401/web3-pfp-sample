import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import styles from '@/css/home.module.css'
import public_styles from '@/css/public.module.css'

const Team = () => {
  const team = [
    {
      imgSrc: '/img/home/team/avatar1.jpg',
      name: 'John Doe',
      role: 'Founder The Sample, Founder The Sample, ExFounder The Sample',
      link: '',
    },
    {
      imgSrc: '/img/home/team/avatar2.jpg',
      name: 'Jane Doe',
      role: 'CoFounder The Sample',
      link: '',
    },
    {
      imgSrc: '/img/home/team/avatar3.jpg',
      name: 'Jack Doe',
      role: 'CoFounder The Sample',
      link: '',
    },
    {
      imgSrc: '/img/home/team/avatar4.jpg',
      name: 'Joane Doe',
      role: 'CoFounder The Sample',
      link: '',
    },
  ]
  return (
    <section className={clsx(public_styles.block, 'smooth-scroll-section', 'pt-0')}>
      <div className={clsx('container relative')}>
        <div className={clsx(public_styles.h2, styles.cols__title)}>Team</div>
        <div className={styles.team__wrapper}>
          {team.map((member, index) => (
            <div className={styles.team__member} key={index}>
              <div className={styles.team_img}>
                <a href={member.link} title={member.name} target={'_blank'} rel={'noreferrer'}>
                  <Image src={member.imgSrc} width={256} height={256} quality={100} alt={member.name} />
                </a>
              </div>
              <div className={styles.team__name}>
                <a href={member.link} title={member.name} target={'_blank'} rel={'noreferrer'}>
                  {member.name}
                </a>
              </div>
              <div className={styles.team__role}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
