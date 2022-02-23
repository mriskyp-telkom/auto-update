import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPICheckHDDVol } from 'renderer/apis/utils'

const stepAPi = ['getToken', 'checkHDDVol']

const SyncLoginView: FC = () => {
  const navigate = useNavigate()

  const [api, setApi] = useState('getToken')

  const syncLogin = useAuthStore((state: AuthStates) => state.syncLogin)
  const setSyncLogin = useAuthStore((state: AuthStates) => state.setSyncLogin)

  const setToken = useAppStore((state: AppStates) => state.setToken)

  const { data: dataToken } = useAPIGetToken(
    {
      username: '103019252021',
      password: 'E2TS',
    },
    { enabled: api === stepAPi[0] }
  )

  const { data: dataHDDVol } = useAPICheckHDDVol(
    {
      hdd_vol: '9C01-B824',
      hdd_vol_old: '9C01-B824',
    },
    { enabled: api === stepAPi[1] }
  )

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepAPi[1])
    }
  }, [dataToken])

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      console.log(dataHDDVol)
      setSyncLogin(false)
      navigate('/dashboard')
    }
  }, [dataHDDVol])

  return (
    <SyncDialogComponent
      title="Mencoba masuk ke ARKAS..."
      percentage={50}
      isOpen={syncLogin}
      setIsOpen={setSyncLogin}
    />
  )
}

export default SyncLoginView
