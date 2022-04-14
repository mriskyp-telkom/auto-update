import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'

import { api } from 'renderer/configs/api'
import { API_GET_TOKEN } from 'renderer/constants/api'

import { ParamTokenType } from 'renderer/types/apis/TokenType'
import { TokenData } from 'renderer/types/datas/TokenType'

export function useAPIGetToken(
  paramToken: ParamTokenType,
  queryOpts?: UseQueryOptions<AxiosResponse<TokenData>>
) {
  const params = new URLSearchParams()
  params.append('username', paramToken.username)
  params.append('password', paramToken.password)
  params.append('grant_type', 'password')

  return useQuery<AxiosResponse<TokenData>>(
    ['get-token', params],
    () => api().post(API_GET_TOKEN, params),
    queryOpts
  )
}
