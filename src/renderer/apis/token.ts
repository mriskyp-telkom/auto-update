import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'

import { api } from 'renderer/configs/api'
import { API_GET_TOKEN } from 'renderer/constants/api'

import { TokenData, ParamTokenType } from 'renderer/types/TokenType'
import type { APIResponse } from 'renderer/types/Api'

export function useAPIGetToken(
  paramToken: ParamTokenType,
  queryOpts?: UseQueryOptions<AxiosResponse<APIResponse<TokenData>>>
) {
  const params = new URLSearchParams()
  params.append('username', paramToken.username)
  params.append('password', paramToken.password)
  params.append('grant_type', 'password')

  return useQuery<AxiosResponse<APIResponse<TokenData>>>(
    ['get-token', params],
    () => api().post(API_GET_TOKEN, params),
    queryOpts
  )
}
