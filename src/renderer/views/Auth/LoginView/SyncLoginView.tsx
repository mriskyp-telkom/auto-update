import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPICheckHDDVol, useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetConfigAll } from 'renderer/apis/config'

import { APP_CONFIG } from 'renderer/constants/appConfig'

import { sendEventLogin } from 'renderer/utils/analytic/auth-util'
import { SetConfigRequest } from 'global/types/Config'

const stepApi = [
  'infoConnection',
  'getToken',
  'checkHDDVol',
  'configAll',
  'referensiKode',
  'referensiRekening',
  'referensiBarang',
]
const ipcRenderer = window.require('electron').ipcRenderer

const SyncLoginView: FC = () => {
  const navigate = useNavigate()
  const [api, setApi] = useState('infoConnection')
  const [hddVol, setHddVol] = useState('')
  const [hddVolOld, setHddVolOld] = useState('')

  const syncLogin = useAuthStore((state: AuthStates) => state.syncLogin)
  const setSyncLogin = useAuthStore((state: AuthStates) => state.setSyncLogin)
  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)
  const email = useAuthStore((state: AuthStates) => state.email)
  const setToken = useAppStore((state: AppStates) => state.setToken)
  const setMultipleDevice = useAuthStore(
    (state: AuthStates) => state.setMultipleDevice
  )

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    // condition true, auto run
    enabled: api === stepApi[0],
  })
  const {
    data: dataToken,
    isError: isTokenError,
    remove: removeToken,
  } = useAPIGetToken(
    {
      username: `${npsn}${tahunAktif}`,
      password: koreg,
    },
    {
      retry: 0,
      enabled:
        api === stepApi[1] && npsn !== '' && tahunAktif !== '' && koreg !== '',
    }
  )

  const {
    data: dataHDDVol,
    isError: isCheckHddVolError,
    remove: removeCheckHddVol,
  } = useAPICheckHDDVol(
    {
      hdd_vol: hddVol,
      hdd_vol_old: hddVolOld,
    },
    {
      retry: 0,
      enabled: api === stepApi[2] && hddVol !== '' && hddVolOld !== '',
    }
  )

  const {
    data: configAll,
    isError: isGetConfigError,
    remove: removeConfigAll,
  } = useAPIGetConfigAll({
    enabled: api === stepApi[3],
    retry: 0,
  })

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeCheckHddVol()
    removeConfigAll()
  }
  const redirectToDashboard = () => {
    ipcRenderer.sendSync('token:createSession', email)
    removeCacheData()
    setSyncLogin(false)
    sendEventLogin(email, 'sukses')
    navigate('/anggaran')
  }
  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi[1])
      } else {
        redirectToDashboard()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      const hddVol = ipcRenderer.sendSync('config:getConfig', APP_CONFIG.hddVol)
      let hddVolOld = ipcRenderer.sendSync(
        'config:getConfig',
        APP_CONFIG.hddVolOld
      )
      if (hddVolOld === '') {
        hddVolOld = hddVol
        const data: SetConfigRequest = {
          varname: APP_CONFIG.hddVolOld,
          varvalue: hddVolOld,
        }
        ipcRenderer.sendSync('config:setConfig', data)
      }
      setHddVol(hddVol)
      setHddVolOld(hddVolOld)
      setApi(stepApi[2])
    }
  }, [dataToken])

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      if (Number(dataHDDVol.data) === 1) {
        const configHddVolRequest: SetConfigRequest = {
          varname: APP_CONFIG.hddVolOld,
          varvalue: hddVol,
        }
        const dataKoreg: SetConfigRequest = {
          varname: APP_CONFIG.koregInvalid,
          varvalue: '0',
        }
        ipcRenderer.send('config:setConfig', configHddVolRequest)
        ipcRenderer.send('config:setConfig', dataKoreg)
        setApi(stepApi[3])
      } else {
        removeCacheData()
        setSyncLogin(false)
        const dataKoregInvalid: SetConfigRequest = {
          varname: APP_CONFIG.koregInvalid,
          varvalue: '1',
        }
        ipcRenderer.send('config:setConfig', dataKoregInvalid)
        setMultipleDevice(true)
      }
    }
  }, [dataHDDVol])

  useEffect(() => {
    if (configAll !== undefined) {
      ipcRenderer.send('config:setBulkConfig', configAll?.data)
      redirectToDashboard()
    }
  }, [configAll])

  useEffect(() => {
    if (
      isInfoConnError ||
      isTokenError ||
      isCheckHddVolError ||
      isGetConfigError
    ) {
      redirectToDashboard()
    }
  }, [isInfoConnError, isTokenError, isCheckHddVolError, isGetConfigError])

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
