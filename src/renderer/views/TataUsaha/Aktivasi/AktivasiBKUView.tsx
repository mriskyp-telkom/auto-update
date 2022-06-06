import React, { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import AlertNoConnection from 'renderer/views/AlertNoConnection'
import AlertLostConnection from 'renderer/views/AlertLostConnection'

import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'

import { Button } from '@wartek-id/button'

import { AppStates, useAppStore } from 'renderer/stores/app'
import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import syncToIPCMain from 'renderer/configs/ipc'

import { STATUS_KERTAS_KERJA } from 'global/constants'
import { IPC_ANGGARAN } from 'global/ipc'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

import includes from 'lodash/includes'
import AlertMultipleDevice from 'renderer/views/AlertMultipleDevice'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'

interface AktivasiBKUViewProps {
  sumberDana: number
  idAnggaran: string
  isAnggaranApproved: boolean
}

const AktivasiBKUView: FC<AktivasiBKUViewProps> = (
  props: AktivasiBKUViewProps
) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { sumberDana, idAnggaran } = props

  const [openModalWarning, setOpenModalWarning] = useState(false)

  const isActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.isActivationBKUFailed
  )

  const setIsActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsActivationBKUFailed
  )

  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )

  const setAlertLostConnection = useAppStore(
    (state: AppStates) => state.setAlertLostConnection
  )

  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )

  const setMultipleDevice = useAuthStore(
    (state: AuthStates) => state.setMultipleDevice
  )

  const alertDesc =
    'Berdasarkan website BOS Salur, sekolah Anda belum menerima \
   dana BOS Reguler tahap ini sehingga belum bisa mengaktifkan BKU. \
   Silakan periksa website BOS Salur secara berkala untuk melihat status penerimaan dana.'

  const setDefaultAktivasiBKUAlert = () => {
    setAlertNoConnection(false)
    setAlertLostConnection(false)
    setAlertFailedSyncData(false)
  }

  const handleClickAktivasi = () => {
    if (
      idAnggaran === undefined ||
      idAnggaran === null ||
      !props.isAnggaranApproved
    ) {
      setOpenModalWarning(true)
      return
    }

    setOpenModalWarning(false)
    setDefaultAktivasiBKUAlert()
    if (navigator.onLine) {
      navigate(
        `/sync/tata-usaha/aktivasi/${sumberDana}/${encodeURIComponent(
          idAnggaran
        )}`,
        {
          state: { backgroundLocation: location },
        }
      )
    } else {
      setAlertNoConnection(true)
    }
  }

  const handleClickMultipleDevice = () => {
    setMultipleDevice(false)
    navigate('/registration')
  }
  const handleBtnAlertSubmit = () => {
    const dataAnggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, idAnggaran)

    const directToDashboard = [
      STATUS_KERTAS_KERJA.not_created,
      STATUS_KERTAS_KERJA.waiting_approval,
      STATUS_KERTAS_KERJA.disabled,
    ]

    const directToMenyusun = [
      STATUS_KERTAS_KERJA.not_approved,
      STATUS_KERTAS_KERJA.draft,
    ]

    if (
      dataAnggaran == null ||
      includes(directToDashboard, dataAnggaran?.status)
    ) {
      navigate('/anggaran')
    }

    if (includes(directToMenyusun, dataAnggaran?.status)) {
      navigate(`/anggaran/menyusun/update/${encodeURIComponent(idAnggaran)}`)
    }
  }

  return (
    <>
      <Button
        color="black"
        size="md"
        variant="solid"
        onClick={handleClickAktivasi}
      >
        Aktivasi BKU
      </Button>
      <AlertDialogComponent
        type="warning"
        icon="priority_high"
        title="BKU Belum Dapat Diaktifkan"
        desc={`Untuk mengaktifkan BKU, ${copyKertasKerja()} Anda harus sudah disahkan dinas.`}
        isOpen={openModalWarning}
        hideBtnCancel={true}
        btnActionText={`Lihat ${copyKertasKerja()}`}
        onSubmit={handleBtnAlertSubmit}
      />
      <AlertDialogComponent
        type="failed"
        icon="close"
        title="Dana BOS Reguler Belum Diterima"
        desc={alertDesc}
        isOpen={isActivationBKUFailed}
        hideBtnCancel={true}
        btnActionText="Tutup"
        onSubmit={() => setIsActivationBKUFailed(false)}
      />
      <AlertNoConnection
        onSubmit={handleClickAktivasi}
        onCancel={() => setAlertNoConnection(false)}
      />
      <AlertLostConnection
        onSubmit={handleClickAktivasi}
        onCancel={() => setAlertLostConnection(false)}
      />
      <AlertFailedSyncData
        onSubmit={handleClickAktivasi}
        onCancel={() => setAlertFailedSyncData(false)}
      />
      <AlertMultipleDevice
        onSubmit={handleClickMultipleDevice}
        onCancel={() => setMultipleDevice(false)}
      />
    </>
  )
}

export default AktivasiBKUView
