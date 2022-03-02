import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'

import { api } from 'renderer/configs/api'
import {
  API_CHECK_ACTIVATION,
  API_CHECK_HDD_VOL,
  API_INFO_CONNECTION,
} from 'renderer/constants/api'

import {
  HDDVolData,
  ParamCheckActivation,
  ParamHDDVolType,
} from 'renderer/types/UtilType'

export function useAPICheckHDDVol(
  params: ParamHDDVolType,
  queryOpts?: UseQueryOptions<AxiosResponse<HDDVolData>>
) {
  return useQuery<AxiosResponse<HDDVolData>>(
    ['check-hdd-vol', params],
    () =>
      api().get(API_CHECK_HDD_VOL(params.hdd_vol, params.hdd_vol_old), {
        params,
      }),
    queryOpts
  )
}

export function useAPIInfoConnection(
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['check-hdd-vol', 'info-connection'],
    () => api().get(API_INFO_CONNECTION),
    queryOpts
  )
}

export function useAPICheckActivation(
  params: ParamCheckActivation,
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['check-hdd-vol', params],
    () =>
      api().get(
        API_CHECK_ACTIVATION(params.npsn, params.koreg, params.hdd_vol)
      ),
    queryOpts
  )
}
