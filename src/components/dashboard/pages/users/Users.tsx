import React, { useEffect, useMemo, useState } from 'react'
import {
  CheckCircleTwoTone,
  DownOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  LockOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Col, Dropdown, Form, FormInstance, Input, MenuProps, Select, Tag, Tooltip } from 'antd'
import clsx from 'clsx'
import { WithId } from 'mongodb'

import { doRequest } from '@/api/Api'
import { getUsers, useUsers } from '@/api/userApi'
import styles from '@/dashboard/css/dashboard.module.css'
import { Loader } from '@/lib/svg'
import { checkAccess, truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

type FilterValues = {
  name: User['name']
  email: User['email']
  wallet: User['wallet']
  status: User['status']
}

type Props = {
  admin: User
  hasPending: boolean
  allUsersTotal: number
}
const Users: FC<Props> = ({ admin, hasPending, allUsersTotal }) => {
  const limit = 200
  const initialFilter: Partial<FilterValues> = useMemo(
    () =>
      hasPending
        ? {
            status: 'pending',
          }
        : {},
    [hasPending],
  )
  const [usersFilter, setFilter] = useState<Partial<FilterValues>>(initialFilter)
  const [users, isLoading, setUsers, usersTotal, usersLastValue] = useUsers(limit, usersFilter)

  const [isTableLoading, setTableLoading] = useState<boolean>(false)
  const [lastValue, setLastValue] = useState<number | null>(usersLastValue)
  const [total, setTotal] = useState<number>(0)

  const [form] = Form.useForm()

  const updateTableUsers = async (filter = {}, lastId = 0, replaceAll = false) => {
    setTableLoading(true)

    const r = await getUsers(limit, filter ?? usersFilter, lastId)
    setTableLoading(false)
    if (!r.error && r.data?.items) {
      const updatedUsers = r.data.items
      // Replace old users to new
      if (!replaceAll) {
        setUsers((prevValue) => {
          const newData = [...prevValue]
          updatedUsers.forEach((userItem) => {
            const index = newData.findIndex((item) => userItem._id === item._id)
            if (index > -1) {
              newData.splice(index, 1, {
                ...userItem,
              })
            }
          })
          return newData
        })
      }
      // Replace all users
      else {
        if (!lastId) {
          setUsers(updatedUsers)
        }
        // Add users to existing, if we have lastId
        else {
          setLastValue(r.data.lastValue)
          setUsers((prevValue) => [...prevValue, ...updatedUsers])
        }
      }
      setTotal(r.data.total)
    }
  }

  const onFilter = async (values: FilterValues) => {
    setFilter(values)
    await updateTableUsers(values, 0, true)
  }

  const onFilterReset = async () => {
    setFilter({})
    form.resetFields()
    await updateTableUsers({}, 0, true)
  }

  /* Lazy load */
  const onLoadMore = async () => {
    await updateTableUsers(usersFilter, lastValue || 0, true)
  }

  const Actions = ({ user }: { user: WithId<User> }) => {
    const onActionClick: MenuProps['onClick'] = async ({ key }) => {
      const [action, wallet] = key.split('_')
      setTableLoading(true)
      const response = await doRequest<WithId<User>>({
        method: 'PATCH',
        endpoint: '/api/patch/users',
        body: {
          wallet,
          action,
        },
      })
      if (response.data) {
        const updatedUser = response.data
        setUsers((prevValue) => {
          const newData = [...prevValue]
          const index = newData.findIndex((item) => updatedUser._id === item._id)
          newData.splice(index, 1, {
            ...updatedUser,
          })
          return newData
        })
      }
      setTableLoading(false)
    }

    return (
      <div className={styles.users__action}>
        {(!checkAccess(user.scope, 'admin') || checkAccess(admin.scope, 'superadmin')) &&
        admin.id_str !== user._id.toString() ? (
          user.status !== 'not_registered' ? (
            <Dropdown
              menu={{
                onClick: onActionClick,
                items: [
                  checkAccess(admin.scope, 'superadmin')
                    ? checkAccess(user.scope, 'admin')
                      ? {
                          label: 'Remove admin rights',
                          danger: true,
                          key: `unadmin_${user.wallet}`,
                        }
                      : {
                          label: 'Add admin rights',
                          danger: true,
                          key: `admin_${user.wallet}`,
                        }
                    : null,
                  user.status !== 'verified'
                    ? {
                        label: 'Verify',
                        key: `verified_${user.wallet}`,
                        icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
                      }
                    : null,
                  user.status !== 'pending'
                    ? {
                        label: 'To pending',
                        key: `pending_${user.wallet}`,
                        icon: (
                          <ExclamationCircleOutlined
                            style={{
                              color: '#096dd9',
                            }}
                          />
                        ),
                      }
                    : null,
                  user.status !== 'blocked'
                    ? {
                        label: 'Block',
                        key: `blocked_${user.wallet}`,
                        icon: <LockOutlined color='#ff4d4f' />,
                      }
                    : null,
                ],
              }}
              overlayClassName={styles.dropdown_action}
              placement='bottomRight'
            >
              <Button className='d-flex align-items-center'>
                <SettingOutlined />
                <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <>In process</>
          )
        ) : null}
      </div>
    )
  }

  useEffect(() => {
    setLastValue(usersLastValue)
    setTotal(usersTotal)
  }, [usersLastValue, usersTotal])

  return (
    <>
      <div className={styles.block}>
        <p>This is the list of all registered users. You can make them verified, blocked or pending</p>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isTableLoading ? styles['is-loading'] : ''}>
          <div className={styles.block}>
            <FilterBlock
              isLoading={isTableLoading}
              form={form}
              onFilterReset={onFilterReset}
              onFilter={onFilter}
              initialFilter={initialFilter}
            />
          </div>
          <div className={styles.block}>
            {users.length ? (
              <div className={styles.users}>
                <div className={clsx('d-flex justify-content-between mb-1', styles.p)}>
                  <div>
                    Total: {total} of {allUsersTotal}
                  </div>
                  <div>
                    <em>Found: {users.length}</em>
                  </div>
                </div>
                <div className={styles.tr}>
                  <div className={clsx(styles.th, styles.users__expand)}>&nbsp;</div>
                  <div className={clsx(styles.th, 'd-sm-block d-none')}>Name</div>
                  <div className={clsx(styles.th)}>Email</div>
                  <div className={clsx(styles.th, 'd-sm-block d-none')}>Wallet</div>
                  <div className={clsx(styles.th, styles.users__action)}>Action</div>
                </div>
                {users.map((user) => (
                  <div className={styles.tr_wrap} key={user._id.toString()}>
                    <div className={clsx(styles.tr, styles.users_row)}>
                      <div className={styles.users__expand}>
                        <button className={styles.users__expand_button} onClick={toggleAdditionalInfo}>
                          <PlusOutlined className={'users-expand-plus'} />
                          <MinusOutlined className={'users-expand-minus'} />
                        </button>
                        <div className={'mt-1'}>
                          <Tags user={user} />
                        </div>
                      </div>
                      <div className={'d-sm-block d-none'}>{user.name}</div>
                      <div>{user.email}</div>
                      <div className={'d-sm-block d-none'}>
                        <Tooltip title={user.wallet}>{truncateWalletAddress(user.wallet)}</Tooltip>
                      </div>
                      <Actions user={user} />
                    </div>
                    <div className={clsx(styles.users__additional, styles.tr)}>
                      <div className={'d-sm-none'}>
                        <b>Name</b>
                        <div>{user.name}</div>
                      </div>
                      <div className={'d-sm-none'}>
                        <b>Wallet</b>
                        <div>{truncateWalletAddress(user.wallet)}</div>
                      </div>
                      <div>
                        <b>About</b>
                        <div>{user.about}</div>
                      </div>
                      <div>
                        <b>I want to get</b>
                        <div>{user.about_profit}</div>
                      </div>
                      <div>
                        <b>I can give</b>
                        <div>{user.about_grow}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {total > limit && total !== users.length && (
                  <Button className={'mt-1'} onClick={onLoadMore}>
                    Load more
                  </Button>
                )}
              </div>
            ) : (
              <p>Users not found</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const toggleAdditionalInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  const tr = (e.target as HTMLButtonElement).closest(`.${styles.tr_wrap}`)!
  const additionalBlock = tr.querySelector(`.${styles.users__additional}`)! as HTMLDivElement
  const displayValue = additionalBlock.offsetParent !== null ? 'hide' : 'show'
  if (displayValue === 'show') {
    tr.classList.add(styles.expanded)
    additionalBlock.style.display = 'flex'
  } else {
    tr.classList.remove(styles.expanded)
    additionalBlock.style.display = 'none'
  }
}

const Tags = ({ user }: { user: WithId<User> }) => {
  return (
    <>
      {checkAccess(user.scope, 'admin') && (
        <Tag color='warning' className={'mb-05'}>
          Admin
        </Tag>
      )}
      {user.status === 'pending' ? (
        <Tag color='blue'>Wait</Tag>
      ) : user.status === 'verified' ? (
        <Tag color='#52c41a'>Ok</Tag>
      ) : user.status === 'blocked' ? (
        <Tag color='red'>Fail</Tag>
      ) : (
        <Tag color='default'>Temp</Tag>
      )}
    </>
  )
}

type FilterProps = {
  form: FormInstance
  initialFilter: Partial<FilterValues>
  onFilter: (values: FilterValues) => void
  onFilterReset: () => void
  isLoading: boolean
}
const FilterBlock = ({ form, onFilter, onFilterReset, isLoading, initialFilter }: FilterProps) => {
  useEffect(() => {
    form.setFieldsValue(initialFilter)
  }, [form, initialFilter])

  return (
    <div className={'my-2'}>
      <div className={clsx(styles.p, 'd-flex align-items-center')}>
        <FilterOutlined /> Filter
      </div>
      <Form name='filter' labelAlign='left' onFinish={onFilter} layout='inline' form={form}>
        <Form.Item name='name'>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name='wallet'>
          <Input placeholder='Wallet' />
        </Form.Item>
        <Form.Item name='email'>
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item name='status'>
          <Select placeholder='Select state'>
            <Select.Option value='verified'>Verified</Select.Option>
            <Select.Option value='pending'>Waiting</Select.Option>
            <Select.Option value='blocked'>Blocked</Select.Option>
            <Select.Option value='not_registered'>Not registered</Select.Option>
          </Select>
        </Form.Item>
        <Col span={24}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Search
          </Button>
          <Button htmlType='button' onClick={onFilterReset} className={'ml-1'}>
            Reset filter
          </Button>
        </Col>
      </Form>
    </div>
  )
}

export default Users
