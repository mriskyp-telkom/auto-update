import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_POST_SYNC_INIT } from 'renderer/constants/api'
import { ParamSyncType } from 'renderer/types/apis/SyncType'

export function useAPISync(
  params: ParamSyncType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['sync', params],
    () =>
      api().post(
        API_POST_SYNC_INIT,
        {
          date_time_local: params.date_time_local,
          versi: params.versi,
          type_session: params.type_session,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}
