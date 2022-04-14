import {
  API_POST_RKAS,
  API_POST_RKAS_PENJAB,
  API_POST_RKAS_DETAIL,
  API_POST_RKAS_PTK,
  API_POST_RKAS_FINAL,
} from 'renderer/constants/api'
import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import {
  ParamRkasType,
  ParamRkasPenjabType,
  ParamRkasPtkType,
  ParamRkasDetailType,
} from 'renderer/types/apis/RkasType'

export function useAPIRKASSync(
  params: ParamRkasType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['rkas', params],
    () =>
      api().post(API_POST_RKAS, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}

export function useAPIRKASPenjabSync(
  params: ParamRkasPenjabType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['rkas_penjab', params],
    () =>
      api().post(API_POST_RKAS_PENJAB, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}

export function useAPIRKASPtkSync(
  params: ParamRkasPtkType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['rkas_ptk', params],
    () =>
      api().post(API_POST_RKAS_PTK, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}

export function useAPIRKASDetailSync(
  params: ParamRkasDetailType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['rkas_detail', params],
    () =>
      api().post(API_POST_RKAS_DETAIL, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}

export function useAPIRKASFinalSync(
  params: null,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['rkas_final', params],
    () =>
      api().post(API_POST_RKAS_FINAL, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
}
