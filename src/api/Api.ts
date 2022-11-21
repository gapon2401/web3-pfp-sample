import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { NextApiRequest } from 'next'

import flattenInput from '@/lib/flattenInput'
import { Params } from '@/model/commonModel'

type MethodType = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE'

export interface Request<T> {
  endpoint: string
  external?: boolean
  method?: MethodType
  params?: Params
  body?: string | T | File | null | Params
}

export interface RestResponse<T> {
  readonly data?: T
  readonly error?: string
  readonly code?: number
}

export const doRequest = async <T, R = unknown>(request: Request<R>): Promise<RestResponse<T>> => {
  try {
    let body: string | R | File | null | Params = request.body ?? null
    if (!body) body = null

    let url = `${!request.external ? process.env.NEXT_PUBLIC_API_PATH : ''}${request.endpoint}`
    const method = request.method ?? 'GET'
    if (method === 'GET' && typeof body === 'object' && body !== null && Object.keys(body).length > 0) {
      url += (url.includes('?') ? '&' : '?') + new URLSearchParams(body).toString()
    }

    const response = await axios(
      Object.assign(
        {},
        {
          url,
          method,
          data: body,
        },
        request.params || {},
      ),
    )
    if (response.data === '') return { error: 'emptyResponse' }
    let code = -1
    const json = !request.external ? response.data.data : response.data
    if (json?.error) {
      console.log('HttpClient.error', json.error, JSON.stringify(request), JSON.stringify(response))
      return { error: json.error, code: json.code ?? -1 }
    }
    code = response.status
    return { data: json as T, code }
  } catch (e) {
    console.error(e)
  }
  return { error: 'unknownError', code: -1 }
}

export const parseRequest = <R>(req: NextApiRequest): R => {
  return typeof req.body === 'string'
    ? JSON.parse(req.body)
    : typeof req.body === 'object' && req.body !== null
    ? req.body
    : {}
}

export const useApi = <T, R = unknown>(
  request: Request<R>,
): [T | null, string | undefined, boolean, Dispatch<SetStateAction<T | null>>] => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const getData = useCallback(async () => {
    const response = await doRequest<T, R>(request)
    if (response.error) {
      setError(response.error)
    } else {
      setData(response.data ?? null)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, flattenInput(request))

  useEffect(() => {
    getData().then()
  }, [getData])

  return [data, error, isLoading, setData]
}
