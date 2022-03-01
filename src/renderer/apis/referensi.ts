import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_GET_REFERENSI } from 'renderer/constants/api'
import { ParamsReferensiType } from '../types/ReferensiType'

export function useAPIGetReferensi(
  params: ParamsReferensiType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['get-referensi', params],
    async () => {
      return await api().get(
        API_GET_REFERENSI(params.referensi, params.lastUpdate)
      )
    },
    queryOpts
  )
}
