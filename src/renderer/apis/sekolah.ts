import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_GET_SEKOLAH } from 'renderer/constants/api'

export function useAPIGetSekolah(queryOpts?: UseQueryOptions<AxiosResponse>) {
  return useQuery<AxiosResponse>(
    'get-sekolah',
    async () => {
      return await api().get(API_GET_SEKOLAH)
    },
    queryOpts
  )
}
