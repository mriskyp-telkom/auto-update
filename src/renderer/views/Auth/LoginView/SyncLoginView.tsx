import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPICheckHDDVol, useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetConfigAll } from 'renderer/apis/config'
import { useAPIGetReferensi } from 'renderer/apis/referensi'

import { APP_CONFIG } from 'renderer/constants/appConfig'

import { sendEventLogin } from 'renderer/utils/analytic/auth-util'

const stepAPi = [
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
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')

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
    enabled: api === stepAPi[0],
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
        api === stepAPi[1] && npsn !== '' && tahunAktif !== '' && koreg !== '',
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
      enabled: api === stepAPi[2] && hddVol !== '' && hddVolOld !== '',
    }
  )

  const { data: configAll, isError: isGetConfigError } = useAPIGetConfigAll({
    enabled: api === stepAPi[3],
    retry: 0,
  })

  const { data: refKode, isError: isGetRefKodeError } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    { enabled: api === stepAPi[4] && lastUpdateKode !== '', retry: 0 }
  )
  const { data: refRekening, isError: isGetRefRekeningError } =
    useAPIGetReferensi(
      { referensi: 'rekening', lastUpdate: lastUpdateRekening },
      { enabled: api === stepAPi[5] && lastUpdateRekening !== '' }
    )
  const { data: refBarang, isError: isGetRefBarangError } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepAPi[6] && lastUpdateBarang !== '' }
  )
  const redirectToDashboard = () => {
    ipcRenderer.sendSync('token:createSession', email)
    setSyncLogin(false)
    sendEventLogin(email, 'sukses')
    navigate('/anggaran')
  }
  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepAPi[1])
      } else {
        redirectToDashboard()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      const hddVol = ipcRenderer.sendSync('config:getConfig', APP_CONFIG.hddVol)
      const hddVolOld = ipcRenderer.sendSync(
        'config:getConfig',
        APP_CONFIG.hddVolOld
      )
      setHddVol(hddVol)
      setHddVolOld(hddVolOld)
      setApi(stepAPi[2])
    }
  }, [dataToken])

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      if (Number(dataHDDVol.data) === 1) {
        ipcRenderer.send('config:setConfig', APP_CONFIG.hddVolOld, hddVol)
        ipcRenderer.send('config:setConfig', APP_CONFIG.koregInvalid, '0')
        setApi(stepAPi[3])
      } else {
        removeInfoConnection()
        removeToken()
        removeCheckHddVol()
        setSyncLogin(false)
        ipcRenderer.send('config:setConfig', APP_CONFIG.koregInvalid, '1')
        setMultipleDevice(true)
      }
    }
  }, [dataHDDVol])
  useEffect(() => {
    if (configAll !== undefined) {
      ipcRenderer.send('config:setBulkConfig', configAll?.data)
      const kodeLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefKodeLastUpdate'
      )
      setLastUpdateKode(kodeLastUpdate)
      setApi(stepAPi[4])
    }
  }, [configAll])

  useEffect(() => {
    if (refKode !== undefined) {
      const rekeningLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefRekeningLastUpdate'
      )
      ipcRenderer.send('referensi:addBulkRefKode', refKode?.data)
      setLastUpdateRekening(rekeningLastUpdate)
      setApi(stepAPi[5])
    }
  }, [refKode])

  useEffect(() => {
    if (refRekening !== undefined) {
      ipcRenderer.send('referensi:addBulkRefRekening', refRekening?.data)
      const barangLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefBarangLastUpdate'
      )
      setLastUpdateBarang(barangLastUpdate)
      setApi(stepAPi[6])
    }
  }, [refRekening])

  useEffect(() => {
    if (refBarang !== undefined) {
      ipcRenderer.send('referensi:addBulkRefBarang', refBarang?.data)
      redirectToDashboard()
    }
  }, [refBarang])

  useEffect(() => {
    if (
      isInfoConnError ||
      isTokenError ||
      isCheckHddVolError ||
      isGetConfigError ||
      isGetRefKodeError ||
      isGetRefRekeningError ||
      isGetRefBarangError
    ) {
      redirectToDashboard()
    }
  }, [
    isInfoConnError,
    isTokenError,
    isCheckHddVolError,
    isGetConfigError,
    isGetRefKodeError,
    isGetRefRekeningError,
    isGetRefBarangError,
  ])

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
