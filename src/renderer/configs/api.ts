import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { stringify } from 'query-string'
import { API_URL } from 'renderer/constants/app'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

const paramsSerializer = (params?: Record<string, any>): any => {
  stringify(params ?? {}, { arrayFormat: 'none' })
}

export const api = (opts?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: API_URL,
    headers,
    paramsSerializer,
    ...opts,
  })
}
