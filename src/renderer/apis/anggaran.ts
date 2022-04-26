import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_ANGGARAN, API_POST_ANGGARAN } from 'renderer/constants/api'
import { ParamAnggaranType } from 'renderer/types/apis/AnggaranType'

export function useAPIAnggaranSync(
  params: ParamAnggaranType[],
  queryOpts?: UseQueryOptions<AxiosResponse<any>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['anggaran', params],
    () =>
      api().post(API_POST_ANGGARAN, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  // console.log('anggaran axios ', result)
  return result
}

export function useAPIGetAnggaran(
  id: string,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    [],
    async () => {
      return await api().get(API_ANGGARAN + '/' + id)
    },
    queryOpts
  )
}
