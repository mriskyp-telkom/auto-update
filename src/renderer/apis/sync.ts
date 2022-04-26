import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_POST_SYNC_INIT } from 'renderer/constants/api'
import { ParamSyncType } from 'renderer/types/apis/SyncType'
import CommonUtils from '../../main/utils/CommonUtils'

export function useAPISync(
  params: ParamSyncType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  const now = CommonUtils.formatDateToString(new Date(), 'YYYYMMDDHHmmss')

  const result = useQuery<AxiosResponse>(
    ['syncInit', params],
    () =>
      api()
        .post(
          API_POST_SYNC_INIT,
          {
            date_time_local: now,
            versi: params.versi,
            type_session: params.type_session,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .catch((err) => {
          throw err
        }),
    queryOpts
  )
  return result
}
