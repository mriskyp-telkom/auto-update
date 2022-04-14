import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import {
  API_GET_REFERENSI,
  API_GET_REFERENSI_WILAYAH,
} from 'renderer/constants/api'
import {
  ParamsReferensiType,
  ParamsReferensiWilayahType,
} from 'renderer/types/apis/ReferensiType'

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

export function useAPIGetReferensiWilayah(
  params: ParamsReferensiWilayahType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['get-referensi-wilayah', params],
    async () => {
      return await api().get(API_GET_REFERENSI_WILAYAH(params.kodeWilayah))
    },
    queryOpts
  )
}
