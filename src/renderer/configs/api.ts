import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { stringify } from 'query-string'
import { API_URL } from 'renderer/constants/app'

import { useAppStore } from 'renderer/stores/app'

const paramsSerializer = (params?: Record<string, any>): any => {
  stringify(params ?? {}, { arrayFormat: 'none' })
}

export const api = (opts?: AxiosRequestConfig): AxiosInstance => {
  const token = useAppStore.getState().token
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}`,
    },
    paramsSerializer,
    ...opts,
  })
}
