import mitt from 'next/dist/shared/lib/mitt'

export type EmitterEvents = 'disconnect'
export const emitter = mitt()
