import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_POST_ANGGARAN } from 'renderer/constants/api'
import { ParamAnggaranType } from 'renderer/types/apis/AnggaranType'

export function useAPISync(
  params: ParamAnggaranType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['sync', params],
    () =>
      api().post(API_POST_ANGGARAN, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}
