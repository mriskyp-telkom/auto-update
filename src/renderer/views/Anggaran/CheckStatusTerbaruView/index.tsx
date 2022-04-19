import React, { FC, useEffect, useState } from 'react'
import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { IPC_ANGGARAN, IPC_SEKOLAH } from 'global/ipc'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIGetAnggaran } from 'renderer/apis/anggaran'
import { Anggaran, StatusAnggaran } from 'renderer/types/AnggaranType'
import { APP_CONFIG } from 'renderer/constants/appConfig'

const ipcRenderer = window.require('electron').ipcRenderer
const stepApi = ['infoConnection', 'getToken', 'getAnggaran']

interface CheckStatusTerbaruProps {
  idAnggaran: string
}

const CheckStatusTerbaruView: FC<CheckStatusTerbaruProps> = (
  props: CheckStatusTerbaruProps
) => {
  const [api, setApi] = useState('')
  const [statusAnggaran, setStatusAnggaran] = useState(
    StatusAnggaran.NotSubmited
  )
  const npsnState = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktifState = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koregState = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const setToken = useAppStore((state: AppStates) => state.setToken)
  const uuidAnggaran = ipcRenderer.sendSync(
    'utils:decodeUUID',
    props.idAnggaran
  )

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

  function onClickCreate() {
    setApi(stepApi[0])
  }

  useEffect(() => {
    if (infoConnection !== undefined) {
      setApi(stepApi[1])
      removeCacheData()
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
          updateData.id_anggaran = props.idAnggaran
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
            setStatusAnggaran(StatusAnggaran.WaitingForApproval)
          }

          if (anggaran.is_approve === 1 || anggaran.tanggal_pengesahan !== '') {
            setStatusAnggaran(StatusAnggaran.Approved)
          }

          if (anggaran.alasan_penolakan !== '') {
            setStatusAnggaran(StatusAnggaran.Declined)
          }
        }
      }
    }

    statusAnggaran
    setApi('')
  }, [dataAnggaran])

  useEffect(() => {
    if (isInfoConnError || isTokenError || isAnggaranError) {
      // console.log("error while doing api calls")
    }
  }, [isInfoConnError, isTokenError, isAnggaranError])

  return (
    <Button
      color="white"
      size="sm"
      variant="solid"
      className="font-normal mr-10"
      style={{ fontSize: '12px' }}
      onClick={onClickCreate}
    >
      <Icon
        as="i"
        color="default"
        fontSize="small"
        className="mr-1"
        style={{ fontSize: '16px' }}
      >
        refresh
      </Icon>
      Cek Status Terbaru
    </Button>
  )
}

export default CheckStatusTerbaruView
