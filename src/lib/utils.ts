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
