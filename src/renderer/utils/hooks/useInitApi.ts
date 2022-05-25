import { useEffect, useState } from 'react'

import { useAPIInfoConnection, useAPICheckHDDVol } from 'renderer/apis/utils'
import { useAPIGetToken } from 'renderer/apis/token'

import { AppStates, useAppStore } from 'renderer/stores/app'

import { APP_CONFIG } from 'renderer/constants/appConfig'

import { IPC_CONFIG, IPC_SEKOLAH } from 'global/ipc'

import syncToIPCMain from 'renderer/configs/ipc'

const useInitApi = () => {
  const [npsn, setNpsn] = useState('')
  const [tahunAktif, setTahunAktif] = useState('')
  const [koreg, setKoreg] = useState('')
  const [hddVol, setHddVol] = useState('')
  const [hddVolOld, setHddVolOld] = useState('')
  const [tokenTemp, setTokenTemp] = useState('')

  const setToken = useAppStore((state: AppStates) => state.setToken)

  const {
    data: infoConnection,
    isSuccess: isInfoConnSuccess,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({ retry: 0 })

  const {
    data: dataToken,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    remove: removeToken,
  } = useAPIGetToken(
    {
      username: `${npsn}${tahunAktif}`,
      password: koreg,
    },
    {
      retry: 0,
      enabled: npsn !== '' && tahunAktif !== '' && koreg !== '',
    }
  )

  const {
    data: dataHDDVol,
    isSuccess: isCheckHddVolSuccess,
    isError: isCheckHddVolError,
    remove: removeCheckHddVol,
  } = useAPICheckHDDVol(
    {
      hdd_vol: hddVol,
      hdd_vol_old: hddVolOld,
    },
    {
      retry: 0,
      enabled: hddVol !== '' && hddVolOld !== '' && tokenTemp !== '',
    }
  )

  useEffect(() => {
    if (dataToken !== undefined) {
      setTokenTemp(dataToken?.data.access_token)
      setToken(dataToken?.data.access_token)
    }
  }, [dataToken])

  useEffect(() => {
    const tahunAktif = syncToIPCMain(
      IPC_CONFIG.getConfig,
      APP_CONFIG.tahunAktif
    )
    const hddVol = syncToIPCMain(IPC_CONFIG.getConfig, APP_CONFIG.hddVol)
    const hddVolOld = syncToIPCMain(IPC_CONFIG.getConfig, APP_CONFIG.hddVolOld)
    const sekolah = syncToIPCMain(IPC_SEKOLAH.getSekolah)
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
    setHddVol(hddVol)
    setHddVolOld(hddVolOld)
  }, [])

  return {
    isSuccess: isInfoConnSuccess && isTokenSuccess && isCheckHddVolSuccess,
    data: {
      infoConnection,
      isInfoConnError,
      isInfoConnSuccess,
      removeInfoConnection,
      dataToken,
      isTokenError,
      isTokenSuccess,
      removeToken,
      dataHDDVol,
      isCheckHddVolError,
      isCheckHddVolSuccess,
      removeCheckHddVol,
    },
  }
}

export default useInitApi
