import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { api } from 'renderer/configs/api'
import { API_REGISTRATION } from 'renderer/constants/api'
import { ParamRegistrationType } from 'renderer/types/apis/RegistrationType'

export function useAPIRegistration(
  params: ParamRegistrationType,
  queryOpts?: UseQueryOptions<AxiosResponse>
) {
  return useQuery<AxiosResponse>(
    ['registration', params],
    () =>
      api().post(
        API_REGISTRATION,
        {
          email: params.username,
          password: params.password,
          npsn: params.npsn,
          koreg: params.koreg,
          hdd_vol: params.hdd_vol,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    queryOpts
  )
}
