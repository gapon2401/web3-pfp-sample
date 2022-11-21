import React, { useEffect, useState } from 'react'
import { Checkbox, Form, Input, Modal } from 'antd'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { doRequest } from '@/api/Api'
import AntdDefaultStyles from '@/components/modal/AntdDefaultStyles'
import styles from '@/css/home.module.css'
import { LoaderSpin } from '@/lib/svg'
import { StoreState } from '@/lib/useStore'
import { FC } from '@/model/commonModel'
import { User } from '@/model/usersModel'

import 'antd/es/form/style/index.css'
import 'antd/es/input/style/index.css'
import 'antd/es/modal/style/index.css'
import 'antd/es/grid/style/index.css'

type Props = {
  children: React.ReactElement
  show?: boolean
  setUser?: StoreState['setUser']
}
const ModalRegister: FC<Props> = ({ show = false, children, setUser }) => {
  const [errors, setErrors] = useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(show)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const requiredField = {
    required: true,
    message: 'The field is required!',
  }

  const handleOnClick = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalVisible(true)
  }

  const hideDialog = async () => {
    await setIsModalVisible(false)
  }

  const handleOnOk = async (values: {
    email: string
    name: string
    about: string
    about_profit: string
    about_grow: string
    is_admin: boolean
  }) => {
    if (isLoading) {
      return
    }

    setErrors([])
    setLoading(true)

    try {
      const response = await doRequest<User>({
        method: 'PATCH',
        endpoint: '/api/patch/user',
        body: { ...values },
      })
      if (response.error || !response.data) {
        setErrors([response.error || 'User not registered'])
      } else {
        if (setUser) {
          setUser(response.data)

          if (response.data.status === 'pending' || response.data.status === 'verified') {
            location.href = process.env.NEXT_PUBLIC_API_PATH + '/dashboard'
          }
        }
        await hideDialog()
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrors([e.message])
      }
      console.log(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    setIsModalVisible(show)
  }, [show])

  return (
    <>
      {React.cloneElement(children, { onClick: handleOnClick })}
      <Modal
        destroyOnClose={true}
        open={isModalVisible}
        onCancel={hideDialog}
        title={<div className='align-center'>Register</div>}
        footer={[
          <button key='submit' className={clsx(styles.button, 'w100')} form='user_reg'>
            Continue
            {isLoading && <LoaderSpin width={'24px'} height={'24px'} color={'#fff'} style={{ marginLeft: 'auto' }} />}
          </button>,
        ]}
      >
        <p>
          Fill in the form to get access to your dashboard. It&apos;s important for us who will become a Sample holder
        </p>
        <Form name='user_reg' labelAlign='left' onFinish={handleOnOk} form={form} layout='vertical'>
          <Form.Item
            style={{ background: '#ffe8ba', padding: '5px' }}
            label='Register as admin'
            name='is_admin'
            valuePropName='checked'
            extra={`This field is only for demo purpose. Try dashboard as admin or as a regular user. Use different wallets for different accounts`}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            name='email'
            label={'Your email'}
            rules={[requiredField]}
            extra={'We will use it to notify you, when the presale starts'}
          >
            <Input type={'email'} />
          </Form.Item>
          <Form.Item name='name' label={'Full name'} rules={[requiredField]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='about'
            label={'Describe yourself'}
            extra={'Few sentences describing you as a person, your skills and interests'}
            rules={[requiredField]}
          >
            <Input.TextArea rows={4} maxLength={500} showCount />
          </Form.Item>
          <Form.Item
            name='about_profit'
            label={'What do you want to get out of the project?'}
            extra={'Please describe the final goal you want to get from participation in the Sample project'}
            rules={[requiredField]}
          >
            <Input.TextArea rows={4} maxLength={500} showCount />
          </Form.Item>
          <Form.Item
            name='about_grow'
            label={'How can you help the project to grow?'}
            extra={'You can describe how you can attract someone, help with SMM, make investment, etc.'}
            rules={[requiredField]}
          >
            <Input.TextArea rows={4} maxLength={500} showCount />
          </Form.Item>
        </Form>
        {errors.length > 0 && (
          <div className={clsx('mt-1 error_text')} dangerouslySetInnerHTML={{ __html: errors.join('<br />') }} />
        )}
      </Modal>
      <AntdDefaultStyles />
    </>
  )
}

ModalRegister.propTypes = {
  show: PropTypes.bool,
  onSuccess: PropTypes.func,
}

export default ModalRegister
