import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import {
  RESPONSE_CEK_STATUS,
  ALERT_CEK_STATUS,
} from 'renderer/constants/anggaran'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { Anggaran } from 'renderer/types/AnggaranType'
import { AlertType } from 'renderer/types/ComponentType'

import { IPC_ANGGARAN, IPC_SEKOLAH } from 'global/ipc'

import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIGetAnggaran } from 'renderer/apis/anggaran'

const ipcRenderer = window.require('electron').ipcRenderer
const stepApi = ['infoConnection', 'getToken', 'getAnggaran']

const SyncCekStatusKKView: FC = () => {
  const { q_id_anggaran } = useParams()
  const navigate = useNavigate()

  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const [api, setApi] = useState('')
  const [isSync, setIsSync] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [statusKK, setStatusKK] = useState(null)

  const npsnState = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktifState = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koregState = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const setToken = useAppStore((state: AppStates) => state.setToken)
  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )
  const uuidAnggaran = ipcRenderer.sendSync('utils:decodeUUID', idAnggaran)

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi[0],
  })

  const {
    data: dataToken,
    isError: isTokenError,
    remove: removeToken,
  } = useAPIGetToken(
    {
      username: `${npsnState}${tahunAktifState}`,
      password: koregState,
    },
    {
      retry: 0,
      enabled:
        api === stepApi[1] &&
        npsnState !== '' &&
        tahunAktifState !== '' &&
        koregState !== '',
    }
  )

  const {
    data: dataAnggaran,
    isError: isAnggaranError,
    remove: removeAnggaran,
  } = useAPIGetAnggaran(uuidAnggaran, {
    retry: 0,
    enabled: api === stepApi[2],
  })

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeAnggaran()
  }

  const failedSyncData = () => {
    setApi('')
    setIsSync(false)
    removeCacheData()
    setAlertFailedSyncData(true)
  }

  const closeModal = () => {
    navigate(-1)
  }

  const handleSync = () => {
    setIsAlert(false)
    setIsSync(true)
    setApi(stepApi[0])
  }

  const handleBtnSubmitAlert = () => {
    if (statusKK === RESPONSE_CEK_STATUS.in_progress) {
      navigate(`/anggaran/mengulas/${encodeURIComponent(q_id_anggaran)}`)
    }
    if (statusKK === RESPONSE_CEK_STATUS.declined) {
      navigate(`/anggaran/menyusun/update/${encodeURIComponent(q_id_anggaran)}`)
    }
  }

  const handleBtnCancelAlert = () => {
    if (statusKK === RESPONSE_CEK_STATUS.approved) {
      navigate(`/anggaran/mengulas/${encodeURIComponent(q_id_anggaran)}`)
      return
    }
    closeModal()
  }

  useEffect(() => {
    if (infoConnection !== undefined) {
      setApi(stepApi[1])
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepApi[2])
    }
  }, [dataToken])

  useEffect(() => {
    if (dataAnggaran !== undefined) {
      let status = ''
      if (dataAnggaran.data.length > 0) {
        const anggaran = dataAnggaran.data[0] as Anggaran

        if (anggaran.id_anggaran === uuidAnggaran) {
          const updateData = Object.assign({} as Anggaran, anggaran)
          updateData.id_anggaran = idAnggaran
          updateData.sekolah_id = ipcRenderer.sendSync(
            'utils:encodeUUID',
            updateData.sekolah_id
          )
          updateData.updater_id = ipcRenderer.sendSync(
            'utils:encodeUUID',
            updateData.updater_id
          )
          updateData.id_penjab = ipcRenderer.sendSync(
            'utils:encodeUUID',
            updateData.id_penjab
          )

          ipcRenderer.sendSync(IPC_ANGGARAN.upsertAnggaran, updateData)

          if (anggaran.is_approve === 0 || anggaran.tanggal_pengajuan !== '') {
            status = RESPONSE_CEK_STATUS.in_progress
          }

          if (anggaran.is_approve === 1 || anggaran.tanggal_pengesahan !== '') {
            status = RESPONSE_CEK_STATUS.approved
          }

          if (anggaran.alasan_penolakan !== '') {
            status = RESPONSE_CEK_STATUS.declined
          }
        }
      } else {
        /*
         sementara set status menunggu pengesahan
         harusnya munculin error data anggaran gagal di insert
         */
        status = RESPONSE_CEK_STATUS.in_progress
      }
      if (status !== '') {
        removeCacheData()
        setStatusKK(status)
        setIsSync(false)
        setIsAlert(true)
      }
    }
  }, [dataAnggaran])

  useEffect(() => {
    if (isInfoConnError || isTokenError || isAnggaranError) {
      failedSyncData()
    }
  }, [isInfoConnError, isTokenError, isAnggaranError])

  useEffect(() => {
    handleSync()
    const sekolah = ipcRenderer.sendSync(IPC_SEKOLAH.getSekolah)
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
  }, [])

  return (
    <div>
      <SyncDialogComponent
        title="Cek Status Terbaru..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={() => setIsSync(false)}
      />
      {statusKK !== null && (
        <AlertDialogComponent
          type={ALERT_CEK_STATUS[statusKK].type as AlertType}
          icon={ALERT_CEK_STATUS[statusKK].icon}
          title={ALERT_CEK_STATUS[statusKK].title}
          desc={ALERT_CEK_STATUS[statusKK].desc}
          isOpen={isAlert}
          btnCancelText={ALERT_CEK_STATUS[statusKK].btnCancelText}
          btnActionText={ALERT_CEK_STATUS[statusKK].btnActionText}
          onCancel={handleBtnCancelAlert}
          onSubmit={handleBtnSubmitAlert}
        />
      )}
      <AlertFailedSyncData onSubmit={handleSync} onCancel={closeModal} />
    </div>
  )
}

export default SyncCekStatusKKView
