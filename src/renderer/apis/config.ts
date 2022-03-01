import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_GET_CONFIG, API_GET_CONFIG_ALL } from 'renderer/constants/api'

export function useAPIGetConfigAll(queryOpts?: UseQueryOptions<AxiosResponse>) {
  return useQuery<AxiosResponse>(
    'get-config-all',
    async () => {
      return await api().get(API_GET_CONFIG_ALL)
    },
    queryOpts
  )
}

export function useAPIGetConfig(
  varname: string,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['get-config', varname],
    async () => {
      return await api().get(API_GET_CONFIG(varname))
    },
    queryOpts
  )
}
