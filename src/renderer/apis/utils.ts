import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'

import { api } from 'renderer/configs/api'
import { API_CHECK_HDD_VOL } from 'renderer/constants/api'

import { HDDVolData, ParamHDDVolType } from 'renderer/types/UtilType'

export function useAPICheckHDDVol(
  params: ParamHDDVolType,
  queryOpts?: UseQueryOptions<AxiosResponse<HDDVolData>>
) {
  return useQuery<AxiosResponse<HDDVolData>>(
    ['check-hdd-vol', params],
    () =>
      api().get(API_CHECK_HDD_VOL(params.hdd_vol), {
        params,
      }),
    queryOpts
  )
}
