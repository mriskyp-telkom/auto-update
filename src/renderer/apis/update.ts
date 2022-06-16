import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_GET_CHECK_UPDATE } from 'renderer/constants/api'

export function useAPICheckUpdate(queryOpts?: UseQueryOptions<AxiosResponse>) {
  return useQuery<AxiosResponse>(
    ['checkUpdate'],
    async () =>
      await api().get(API_GET_CHECK_UPDATE, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}
