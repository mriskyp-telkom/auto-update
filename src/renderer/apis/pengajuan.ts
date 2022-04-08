import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_POST_ANGGARAN, API_POST_PENJAB, API_POST_RKAS, API_POST_RKAS_DETAIL, API_POST_RKAS_PTK } from 'renderer/constants/api'
import { ParamPengajuanAnggaran } from 'renderer/types/AnggaranType'
import { ParamPengajuanPenjab } from 'renderer/types/PenjabType'
import { ParamPengajuanRkasDetail } from 'renderer/types/RkasDetailType'
import { ParamPengajuanRkasPtk } from 'renderer/types/RkasPtkType'
import { ParamPengajuanRkas } from 'renderer/types/RkasType'

export function useAPIPostAnggaran(
  params: ParamPengajuanAnggaran[],
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  const payload = {
    'data': params
  }
  return useQuery<AxiosResponse<number>>(
    ['pengajuanAnggaran', params[0].id_anggaran, params[0].last_update],
    () =>
      api().post(
        API_POST_ANGGARAN,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}


export function useAPIPostPenjab(
  params: ParamPengajuanPenjab,
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['pengajuanPenjab', params],
    () =>
      api().post(
        API_POST_PENJAB,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}

export function useAPIPostRkas(
  params: ParamPengajuanRkas,
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['pengajuanRkas', params],
    () =>
      api().post(
        API_POST_RKAS,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}

export function useAPIPostRkasDetail(
  params: ParamPengajuanRkasDetail,
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['pengajuanRkasDetail', params],
    () =>
      api().post(
        API_POST_RKAS_DETAIL,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}

export function useAPIPostRkasPtk(
  params: ParamPengajuanRkasPtk,
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['pengajuanRkasPtk', params],
    () =>
      api().post(
        API_POST_RKAS_PTK,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}

export function useAPIPostRkasFinal(
  queryOpts?: UseQueryOptions<AxiosResponse<number>>
) {
  return useQuery<AxiosResponse<number>>(
    ['pengajuanRkasFinal', ''],
    () =>
      api().post(
        API_POST_RKAS_PTK,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}
