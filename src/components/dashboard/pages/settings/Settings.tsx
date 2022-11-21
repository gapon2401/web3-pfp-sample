import React, { useCallback, useEffect, useState } from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Button, Checkbox, Form, Row } from 'antd'
import clsx from 'clsx'
import { ethers } from 'ethers'

import { doRequest } from '@/api/Api'
import { useUser } from '@/api/userApi'
import Web3Provider, { useWeb3 } from '@/components/web3/Web3Provider'
import styles from '@/dashboard/css/dashboard.module.css'
import { Loader } from '@/lib/svg'
import { truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'
import { Smartcontract } from '@/model/cryptoModel'
import { Settings } from '@/model/settingsModel'
import { User } from '@/model/usersModel'

type Props = {
  user?: User
}

const Settings: FC<Props> = () => {
  const [smartcontract, setSmartcontract] = useState<Smartcontract | null>(null)
  const [user] = useUser()

  /* Get contract ABI */
  useEffect(() => {
    const getSmartcontract = async () => {
      const response = await doRequest<Smartcontract>({
        endpoint: '/api/get/smartcontract',
      })
      setSmartcontract(response.data || null)
    }

    getSmartcontract().then()
  }, [])

  return user?.status === 'verified' ? (
    <>
      {smartcontract === null ? (
        <Loader />
      ) : (
        <Web3Provider infuraUrl={smartcontract.infuraUrl}>
          <Content smartContract={smartcontract} />
        </Web3Provider>
      )}
    </>
  ) : (
    <></>
  )
}

const Content: FC<{ smartContract: Smartcontract }> = ({ smartContract }) => {
  const { connect, reconnect, connected, provider, accountId, isConnecting } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaleActive, setIsSaleActive] = useState<boolean | null>(null)

  const [user] = useUser()

  const [isFormLoading, setFormLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successText, setSuccessText] = useState<string>('')

  const [form] = Form.useForm()

  const handleOnOk = async (values: Settings) => {
    if (isFormLoading) {
      return
    }

    const data: Settings = {
      sale_active: values.sale_active ?? false,
    }

    setSuccessText('')
    setFormLoading(true)
    setErrors([])

    if (data.sale_active !== isSaleActive) {
      const status = await changeSale(data.sale_active)
      if (status) {
        setSuccessText('Saved successfully!')
      } else {
        setErrors(['Form not saved. Check console'])
      }
    } else {
      setSuccessText('Status has not changed. Request will not be sent to blockchain')
    }

    setFormLoading(false)
  }

  const changeSale = async (isActive: boolean) => {
    if (!isLoading) {
      const networkStatus = await prepareNetwork()

      if (networkStatus) {
        try {
          const Contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider?.getSigner())
          setIsLoading(true)

          const transactionResponse = isActive ? await Contract.startPublicSale() : await Contract.pausePublicSale()

          const receipt = await transactionResponse.wait()

          setIsLoading(false)
          if (receipt.status) {
            setIsSaleActive(isActive)
            return true
          } else {
            return false
          }
        } catch (e) {
          console.log(e)
          return false
        }
      }
    }
  }

  const prepareNetwork = useCallback(
    async (isChange = true) => {
      if (connected) {
        const network = await provider?.getNetwork()
        if (network) {
          const networkName = network.name === 'homestead' ? 'mainnet' : network.name
          if (smartContract.network !== networkName && typeof window?.ethereum !== 'undefined') {
            try {
              isChange &&
                (await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      chainId: `0x${process.env.NEXT_PUBLIC_SMARTCONTRACT_CHAIN_ID}`,
                    },
                  ],
                }))
            } catch (e) {
              console.log(e)
            }
          } else {
            return true
          }
        }
      }
      return false
    },
    [connected, provider, smartContract.network],
  )

  const getSaleActive = async () => {
    const networkStatus = await prepareNetwork()

    if (connected && networkStatus) {
      try {
        const Contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider?.getSigner())
        const isActive = await Contract.saleActive()
        setIsSaleActive(isActive)
        form.setFieldsValue({ sale_active: isActive })
      } catch (e) {
        console.log(e)
      }
    }
  }

  /* Reconnect to the wallet */
  useEffect(() => {
    ;(async () => {
      await reconnect()
    })()
  }, [reconnect])

  useEffect(() => {
    if (connected) {
      getSaleActive().then()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  return (
    <div className={'align-center'}>
      {!connected && !isConnecting ? (
        <button onClick={connect} className={'button'} title={'Connect wallet'}>
          Connect wallet
        </button>
      ) : (
        isConnecting && (
          <button disabled className={'button'} title={'Connect wallet'}>
            Authorizing..
          </button>
        )
      )}
      {connected && user && (
        <>
          {accountId?.toLowerCase() !== user.wallet ? (
            <div>Switch your wallet to {truncateWalletAddress(user.wallet)} in order to proceed</div>
          ) : (
            <>
              <div className={styles.block}>
                <Form
                  name='settings'
                  labelAlign='left'
                  onFinish={handleOnOk}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 16 }}
                  form={form}
                >
                  <Form.Item label='Start sale' name='sale_active' valuePropName='checked'>
                    <Checkbox disabled={isSaleActive === null} />
                  </Form.Item>

                  <div className={'align-left'}>
                    <Button type='primary' htmlType='submit' loading={isFormLoading}>
                      Submit
                    </Button>

                    {successText.length > 0 && (
                      <span className={styles.success_text}>
                        <CheckCircleTwoTone twoToneColor='#52c41a' /> {successText}
                      </span>
                    )}
                    {errors.length > 0 && (
                      <Row className={styles.error_text} dangerouslySetInnerHTML={{ __html: errors.join('<br />') }} />
                    )}
                  </div>
                </Form>
              </div>
              <div className={clsx('second-black', 'align-center')}>
                {accountId && <>Wallet: {truncateWalletAddress(accountId)} </>}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Settings
