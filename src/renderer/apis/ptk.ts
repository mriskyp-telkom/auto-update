import { useQuery, UseQueryOptions } from 'react-query'
import { AxiosResponse } from 'axios'
import { api } from 'renderer/configs/api'
import { API_GET_PTK_LAST } from 'renderer/constants/api'

export function useAPIGetPtkLast(
  lastUpdate: string,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['get-ptk-last', lastUpdate],
    async () => {
      return await api().get(API_GET_PTK_LAST(lastUpdate))
    },
    queryOpts
  )
}
