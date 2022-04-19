import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'
import { RESPONSE_CEK_STATUS } from 'renderer/constants/anggaran'
import {
  ResponseCekStatus,
  Anggaran,
  StatusAnggaran,
} from 'renderer/types/AnggaranType'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { IPC_ANGGARAN, IPC_SEKOLAH } from 'global/ipc'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIGetAnggaran } from 'renderer/apis/anggaran'

import { APP_CONFIG } from 'renderer/constants/appConfig'
import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'

const ipcRenderer = window.require('electron').ipcRenderer
const stepApi = ['infoConnection', 'getToken', 'getAnggaran']

const SyncCekStatusKKView: FC = () => {
  let { q_id_anggaran } = useParams()
  q_id_anggaran = decodeURIComponent(q_id_anggaran)
  const navigate = useNavigate()

  const setResponseCekStatus = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseCekStatus
  )

  const [api, setApi] = useState('')
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
  const uuidAnggaran = ipcRenderer.sendSync('utils:decodeUUID', q_id_anggaran)

  useEffect(() => {
    const sekolah = ipcRenderer.sendSync(IPC_SEKOLAH.getSekolah)
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
  }, [])

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
      if (dataAnggaran.data.length > 0) {
        const anggaran = dataAnggaran.data[0] as Anggaran

        if (anggaran.id_anggaran === uuidAnggaran) {
          const updateData = Object.assign({} as Anggaran, anggaran)
          updateData.id_anggaran = q_id_anggaran
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

          let sa: StatusAnggaran = StatusAnggaran.NotSubmited
          if (anggaran.is_approve === 0 || anggaran.tanggal_pengajuan !== '') {
            sa = StatusAnggaran.WaitingForApproval as StatusAnggaran
          }

          if (anggaran.is_approve === 1 || anggaran.tanggal_pengesahan !== '') {
            sa = StatusAnggaran.Approved as StatusAnggaran
          }

          if (anggaran.alasan_penolakan !== '') {
            sa = StatusAnggaran.Declined as StatusAnggaran
          }

          removeCacheData()
          closeModalLoading()
          switch (sa) {
            case StatusAnggaran.WaitingForApproval:
              setResponseCekStatus(
                RESPONSE_CEK_STATUS.in_progress as ResponseCekStatus
              )
              break
            case StatusAnggaran.Approved:
              setResponseCekStatus(
                RESPONSE_CEK_STATUS.approved as ResponseCekStatus
              )
              break
            case StatusAnggaran.Declined:
              setResponseCekStatus(
                RESPONSE_CEK_STATUS.declined as ResponseCekStatus
              )
              break
          }
        }
      }
    }
  }, [dataAnggaran])

  const failedSyncData = () => {
    setApi('')
    removeCacheData()
    setAlertFailedSyncData(true)
  }

  const closeModalLoading = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (isInfoConnError || isTokenError || isAnggaranError) {
      failedSyncData()
    }
  }, [isInfoConnError, isTokenError, isAnggaranError])

  const closeModal = () => {
    setApi(stepApi[0])
  }

  useEffect(() => {
    setTimeout(() => {
      closeModal()
    }, 3000)
  }, [])

  return (
    <div>
      <SyncDialogComponent
        title="Cek Status Terbaru..."
        percentage={50}
        isOpen={true}
        setIsOpen={closeModal}
      />
      <AlertFailedSyncData onSubmit={closeModal} onCancel={closeModalLoading} />
    </div>
  )
}

export default SyncCekStatusKKView
