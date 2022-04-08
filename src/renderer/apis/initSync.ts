import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_INIT_SYNC } from 'renderer/constants/api'
import { ParamInitSync } from 'renderer/types/InitSyncType'

export function useAPIInitSync(
  // token: string,
  params: ParamInitSync,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['initSync', params],
    () =>
      api().post(
        API_INIT_SYNC,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `bearer ${token}`,
          },
        }
      ),
    queryOpts
  )
}
