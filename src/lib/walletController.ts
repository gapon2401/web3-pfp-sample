import uuid4 from 'uuid4'

export const getNonce = () => {
  return uuid4()
}
export const getMessage = (nonce: string) => {
  return `Connect my wallet with The Sample account. Nonce: ${nonce}`
}
