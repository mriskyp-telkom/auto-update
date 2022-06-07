import { useEffect, useState } from 'react'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIGetConfigAll } from 'renderer/apis/config'
import { useAPIInfoConnection, useAPICheckHDDVol } from 'renderer/apis/utils'

import { AppStates, useAppStore } from 'renderer/stores/app'

import { APP_CONFIG } from 'renderer/constants/appConfig'

import { IPC_CONFIG, IPC_SEKOLAH } from 'global/ipc'

import syncToIPCMain from 'renderer/configs/ipc'

const stepApi = {
  infoConnection: 'infoConnection',
  getToken: 'getToken',
  checkHddVol: 'checkHddVol',
  getConfigAll: 'getConfigAll',
}

const useInitApi = () => {
  const [api, setApi] = useState('')

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
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi.infoConnection,
  })

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
      enabled:
        api === stepApi.getToken &&
        npsn !== '' &&
        tahunAktif !== '' &&
        koreg !== '',
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
      enabled:
        api === stepApi.checkHddVol &&
        hddVol !== '' &&
        hddVolOld !== '' &&
        tokenTemp !== '',
    }
  )

  const {
    data: dataConfigAll,
    isSuccess: isGetConfigSuccess,
    isError: isGetConfigError,
    remove: removeConfigAll,
  } = useAPIGetConfigAll({
    retry: 0,
    enabled: api === stepApi.getConfigAll,
  })

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeCheckHddVol()
    removeConfigAll()
  }

  useEffect(() => {
    if (isCheckHddVolSuccess) {
      setApi(stepApi.getConfigAll)
    }
  }, [isCheckHddVolSuccess])

  useEffect(() => {
    if (isTokenSuccess) {
      setTokenTemp(dataToken?.data.access_token)
      setToken(dataToken?.data.access_token)
      setApi(stepApi.checkHddVol)
    }
  }, [isTokenSuccess])

  useEffect(() => {
    if (isInfoConnSuccess) {
      setApi(stepApi.getToken)
    }
  }, [isInfoConnSuccess])

  useEffect(() => {
    setApi('')
    removeCacheData()
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

    setApi(stepApi.infoConnection)
  }, [])

  useEffect(() => {
    if (
      isInfoConnError ||
      isTokenError ||
      isCheckHddVolError ||
      isGetConfigError
    ) {
      removeCacheData()
    }
  }, [isInfoConnError, isTokenError, isCheckHddVolError, isGetConfigError])

  const returnValue = {
    isSuccess:
      isInfoConnSuccess &&
      isTokenSuccess &&
      isCheckHddVolSuccess &&
      isGetConfigSuccess,
    isError:
      isInfoConnError || isTokenError || isCheckHddVolError || isGetConfigError,
    stepApi: api,
    data: {
      infoConnection,
      isInfoConnError,
      isInfoConnSuccess,
      dataToken,
      isTokenError,
      isTokenSuccess,
      dataHDDVol,
      isCheckHddVolError,
      isCheckHddVolSuccess,
      dataConfigAll,
      isGetConfigError,
      isGetConfigSuccess,
    },
  }

  return returnValue
}

export default useInitApi
