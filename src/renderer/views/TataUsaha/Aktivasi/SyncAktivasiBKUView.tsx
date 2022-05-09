import { IPC_CONFIG } from 'global/ipc'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
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
  const location = useLocation()

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
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi.getToken)
        setPercentage(30)
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepApi.salur)
      setPercentage(60)
    }
  }, [dataToken])

  useEffect(() => {
    if (dataSalur !== undefined) {
      if (
        dataSalur?.data?.penerimaan != null &&
        dataSalur?.data?.penerimaan.length > 0
      ) {
        //TODO save data into store and use it in another page ( form salur)
        setPercentage(100)
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

  useEffect(() => {
    if (percentage === 100) {
      //redirect to form penerimaan dana after 0.5s
      setTimeout(() => {
        navigate('/form/penerimaan-dana', {
          state: location.state,
        })
      }, 500)
    }
  }, [percentage])

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
