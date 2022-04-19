import { IPC_CONFIG } from 'global/ipc'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIInfoConnection, useAPISalur } from 'renderer/apis/utils'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import { APP_CONFIG } from 'renderer/constants/appConfig'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = {
  infoConnection: 'infoConnection',
  getToken: 'getToken',
  salur: 'salur',
}

const SyncAktivasiBKUView: FC = () => {
  const navigate = useNavigate()
  const { q_sumber_dana } = useParams()
  const [api, setApi] = useState('')
  const [tahunAktif, setTahunAktif] = useState(null)
  const [npsn, setNpsn] = useState('')
  const [koreg, setKoreg] = useState('')
  const [percentage, setPercentage] = useState(0)

  const setToken = useAppStore((state: AppStates) => state.setToken)

  const setIsActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsActivationBKUFailed
  )

  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )

  const closeModal = () => {
    navigate(-1)
  }

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi.infoConnection,
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
        api === stepApi.getToken &&
        npsn !== '' &&
        tahunAktif !== '' &&
        koreg !== '',
    }
  )

  const {
    data: dataSalur,
    isError: isSalurError,
    remove: removeSalur,
  } = useAPISalur(
    {
      tahun: 2020,
      sumberDana: parseInt(q_sumber_dana),
    },
    {
      enabled:
        tahunAktif != null && q_sumber_dana != null && api == stepApi.salur,
      retry: 0,
    }
  )

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeSalur()
  }

  const failedSyncData = () => {
    setApi('')
    removeCacheData()
    setAlertFailedSyncData(true)
    closeModal()
  }

  const calculatePercentage = (api: string) => {
    if (api !== '') {
      const idx = Object.keys(stepApi).findIndex((x) => x === api)
      const percent = Math.floor((idx / Object.keys(stepApi).length) * 100)
      setPercentage(percent)
    } else {
      setPercentage(0)
    }
  }

  useEffect(() => {
    const tahunAktif = ipcRenderer.sendSync(
      IPC_CONFIG.getConfig,
      APP_CONFIG.tahunAktif
    )
    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
    setApi(stepApi.infoConnection)
    calculatePercentage(stepApi.infoConnection)
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi.getToken)
        calculatePercentage(stepApi.getToken)
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepApi.salur)
      calculatePercentage(stepApi.salur)
    }
  }, [dataToken])

  useEffect(() => {
    if (dataSalur !== undefined) {
      if (
        dataSalur?.data?.penerimaan != null &&
        dataSalur?.data?.penerimaan.length > 0
      ) {
        //TODO save data into store and use it in another page ( form salur)
      } else {
        setIsActivationBKUFailed(true)
        closeModal()
      }
    }
  }, [dataSalur])

  useEffect(() => {
    if (isInfoConnError || isTokenError || isSalurError) {
      failedSyncData()
    }
  }, [isInfoConnError, isTokenError, isSalurError])

  return (
    <SyncDialogComponent
      title="Sinkronisasi Data..."
      percentage={percentage}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncAktivasiBKUView
