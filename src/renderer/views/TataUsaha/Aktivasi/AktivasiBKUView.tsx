import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import { Button } from '@wartek-id/button'

const AktivasiBKUView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.isActivationBKUFailed
  )

  const setIsActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsActivationBKUFailed
  )

  const alertDesc =
    'Berdasarkan website BOS Salur, sekolah Anda belum menerima \
   dana BOS Reguler tahap ini sehingga belum bisa mengaktifkan BKU. \
   Silakan periksa website BOS Salur secara berkala untuk melihat status penerimaan dana.'

  const handleClickAktivasi = () => {
    navigate('/sync/tata-usaha/aktivasi', {
      state: { backgroundLocation: location },
    })
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
        type="failed"
        icon="close"
        title="Dana BOS Reguler Belum Diterima"
        desc={alertDesc}
        isOpen={isActivationBKUFailed}
        hideBtnCancel={true}
        btnActionText="Tutup"
        onSubmit={() => setIsActivationBKUFailed(false)}
      />
    </>
  )
}

export default AktivasiBKUView