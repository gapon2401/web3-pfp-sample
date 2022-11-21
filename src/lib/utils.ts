export const isDevelopment =
  (process && process.env.NODE_ENV === 'development') || parseInt(process.env.NEXT_PUBLIC_NO_INDEX!) > 0

export const truncateWalletAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const addAccess = (userScope: string, access: string) => {
  const scope = (userScope && userScope.split(' ')) || []
  if (!scope.includes(access)) {
    scope.push(access)
  }
  return scope.join(' ')
}

export const removeAccess = (userScope: string, access: string) => {
  const scope = (userScope && userScope.split(' ')) || []
  return scope.filter((el) => el !== access).join(' ')
}

export const checkAccess = (userScope: string, access: string) => {
  const scope: string[] = (userScope && userScope.split(' ')) || []
  return scope.includes(access)
}

export const VALID_WALLETS = [
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
  '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
]
