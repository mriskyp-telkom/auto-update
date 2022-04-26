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
import { AnyKindOfDictionary } from 'lodash'

export function useAPIRKASSync(
  params: ParamRkasType[],
  queryOpts?: UseQueryOptions<AxiosResponse<any>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['rkas', params],
    () =>
      api().post(API_POST_RKAS, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  //  do not delete this
  // console.log('rkas axios ', result)
  return result
}

export function useAPIRKASPenjabSync(
  params: ParamRkasPenjabType[],
  queryOpts?: UseQueryOptions<AxiosResponse<any>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['rkas_penjab', params],
    () =>
      api().post(API_POST_RKAS_PENJAB, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  //  do not delete this
  // console.log('rkas penjab axios ', result)
  return result
}

export function useAPIRKASPtkSync(
  params: ParamRkasPtkType[],
  queryOpts?: UseQueryOptions<AxiosResponse<AnyKindOfDictionary>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['rkas_ptk', params],
    () =>
      api().post(API_POST_RKAS_PTK, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  //  do not delete this
  // console.log('rkas ptk axios ', result)
  return result
}

export function useAPIRKASDetailSync(
  params: ParamRkasDetailType[],
  queryOpts?: UseQueryOptions<AxiosResponse<any>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['rkas_detail', params],
    () =>
      api().post(API_POST_RKAS_DETAIL, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  //  do not delete this
  // console.log('rkas detail axios ', result)
  return result
}

export function useAPIRKASFinalSync(
  params: null,
  queryOpts?: UseQueryOptions<AxiosResponse<any>>
) {
  const result = useQuery<AxiosResponse<any>>(
    ['rkas_final', params],
    () =>
      api().post(API_POST_RKAS_FINAL, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    queryOpts
  )
  //  do not delete this
  // console.log('rkas final axios ', result)
  return result
}
