import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { BigNumberish, ethers } from 'ethers'
import Image from 'next/image'

import { doRequest } from '@/api/Api'
import { useUser } from '@/api/userApi'
import Web3Provider, { useWeb3 } from '@/components/web3/Web3Provider'
import styles from '@/dashboard/css/dashboard.module.css'
import { Loader, LoaderSpin } from '@/lib/svg'
import { truncateWalletAddress } from '@/lib/utils'
import { FC } from '@/model/commonModel'
import { Smartcontract } from '@/model/cryptoModel'

const Content: FC<{ smartContract: Smartcontract }> = ({ smartContract }) => {
  const { connect, reconnect, connected, provider, chainId, accountId, isConnecting } = useWeb3()
  const [balanceOf, setBalanceOf] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingState, setLoadingState] = useState('')
  const [loadingTimeouts, setLoadingTimeouts] = useState<ReturnType<typeof setTimeout>[]>([])
  const [isPayable, setIsPayable] = useState(false)
  const [price, setPrice] = useState<BigNumberish>(0)
  const [isBalanceIsLoading, setBalanceIsLoading] = useState(true)
  const [isSaleActive, setIsSaleActive] = useState(false)

  const [user] = useUser()

  const mint = async () => {
    if (!isLoading && isPayable) {
      const networkStatus = await prepareNetwork()

      if (networkStatus) {
        try {
          const Contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider?.getSigner())
          setIsLoading(true)
          const response = await doRequest<string>({
            method: 'POST',
            endpoint: '/api/post/sign-wallet',
          })
          const signature = response.data || ''

          const transactionResponse = await Contract.mint(signature, {
            value: price,
          })

          startLoadingTimeouts()

          const receipt = await transactionResponse.wait()
          if (receipt.status) {
            setTimeout(() => {
              location.reload()
            }, 5000)
          } else {
            setIsLoading(false)
            resetLoadingTimeouts()
          }
        } catch (e) {
          resetLoadingTimeouts()
          setIsLoading(false)
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
            setPrice(0)
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
              setBalanceIsLoading(false)
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

  const getBalanceOf = useCallback(
    async (isChange = true) => {
      const networkStatus = await prepareNetwork(isChange)
      let balance = 0
      let price: BigNumberish = 0
      if (connected && networkStatus) {
        try {
          const Contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider?.getSigner())
          const balanceOf = await Contract.balanceOf(accountId)
          balance = balanceOf.toNumber()
          const num = 1
          price = ethers.utils.parseEther(String((0.1 * num).toFixed(2)))
          setPrice(price)
        } catch (e) {
          console.log(e)
        }
      }
      const userWalletBalance = connected && networkStatus ? await provider?.getSigner().getBalance() : 0
      if (userWalletBalance && price && userWalletBalance >= price) {
        setIsPayable(true)
      } else {
        setIsPayable(false)
      }
      setBalanceOf(balance || 0)
    },
    [accountId, connected, prepareNetwork, provider, smartContract.abi, smartContract.contractAddress],
  )

  const getSaleActive = async () => {
    const networkStatus = await prepareNetwork()

    if (connected && networkStatus) {
      try {
        const Contract = new ethers.Contract(smartContract.contractAddress, smartContract.abi, provider?.getSigner())
        const isActive = await Contract.saleActive()
        setIsSaleActive(isActive)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const resetLoadingTimeouts = () => {
    loadingTimeouts.forEach((t) => t && clearTimeout(t))
    setLoadingState('')
  }

  const startLoadingTimeouts = () => {
    resetLoadingTimeouts()
    setLoadingState('Wait, please, transaction is processing...')
    setLoadingTimeouts([
      setTimeout(() => {
        setLoadingState('It may takes about 15 seconds to finish the transaction...')
      }, 7000),
      setTimeout(() => {
        setLoadingState('Transaction is processing...')
      }, 15000),
      setTimeout(() => {
        setLoadingState('Almost done...')
      }, 25000),
      setTimeout(() => {
        setLoadingState('Page will refresh automatically, when everything will be done...')
      }, 45000),
    ])
  }

  /* Check tha balance, when the network or account were changed */
  useEffect(() => {
    getBalanceOf(false).then()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, accountId])

  /* Change network on first page load */
  useEffect(() => {
    if (connected) {
      getBalanceOf().then(() => {
        setBalanceIsLoading(false)
      })
      getSaleActive().then()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  /* Reconnect to the wallet */
  useEffect(() => {
    ;(async () => {
      await reconnect()
    })()
  }, [reconnect])

  return isSaleActive ? (
    <div className={clsx(styles.block, styles.highlighted_with_shadow)}>
      <h2 className={'align-center'}>Sale is opened!</h2>
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
            {isBalanceIsLoading ? (
              <Loader />
            ) : (
              <>
                {accountId?.toLowerCase() !== user.wallet ? (
                  <div>Switch your wallet to {truncateWalletAddress(user.wallet)} in order to proceed</div>
                ) : (
                  <>
                    {balanceOf < 1 ? (
                      <div className={styles.mint_block}>
                        <button onClick={mint} className={'button'} title={'Mint'} disabled={isLoading || !isPayable}>
                          Mint
                          {isLoading && <LoaderSpin color={'#fff'} className={'ml-1'} />}
                        </button>
                        {isLoading && loadingState !== '' && (
                          <p className={'mt-2 mb-0'} style={{ color: 'gray' }}>
                            {loadingState} <LoaderSpin className={'ml-1'} />
                            <br />
                            Do not close or update this page
                          </p>
                        )}
                        {price ? (
                          <div className={'d-flex justify-content-center align-items-center gutter-05 mt-1'}>
                            <Image
                              src='/img/svg/ethereum.svg'
                              width={24}
                              height={24}
                              alt={`${ethers.utils.formatEther(price)} ETH`}
                            />
                            <div>
                              <b>{`${ethers.utils.formatEther(price)} ETH`}</b>
                            </div>
                          </div>
                        ) : null}
                        {!isPayable && (
                          <div className={clsx('mt-1', 'error_text')}>
                            Not enough ETH in your wallet or wrong network
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={'align-center'}>You have maximum number of available NFTs</div>
                    )}
                    <div className={clsx('second-black', 'align-center')}>
                      {accountId && (
                        <>
                          Wallet: {truncateWalletAddress(accountId)}{' '}
                          <div className={'font-sm'}>
                            <b>
                              You have {balanceOf} NFT
                              {balanceOf > 1 || balanceOf === 0 ? 's' : ''}
                            </b>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}

const MintForm: FC = () => {
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

    if (user?.status === 'verified') {
      getSmartcontract().then()
    }
  }, [user?.status])

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
export default MintForm
