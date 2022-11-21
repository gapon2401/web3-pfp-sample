import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { Loader } from '@/lib/svg'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

type Props = {
  user: User
}
type DynamicComponentType = { args: string[]; user: User }

const DashboardController: FC<Props> = ({ user }: Props) => {
  const router = useRouter()
  const { page } = router.query

  let DynamicComponentWithNoSSR: React.ComponentType<DynamicComponentType> = () => (
    <div className='align-center'>
      <Loader />
    </div>
  )

  let args: string[] = []
  let module = ''

  /* Load internal pages */
  if (page?.length) {
    ;[module, ...args] = page as string[]
  }

  switch (module) {
    case '':
      DynamicComponentWithNoSSR = dynamic<DynamicComponentType>(() => import('@/components/dashboard/pages/index'), {
        ssr: false,
      })
      break
  }

  return <DynamicComponentWithNoSSR args={args} user={user} />
}

DashboardController.propTypes = {
  user: PropTypes.object,
}

export default DashboardController
