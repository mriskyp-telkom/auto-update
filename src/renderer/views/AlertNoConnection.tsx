import React, { FC } from 'react'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import { AppStates, useAppStore } from '../stores/app'

interface AlertNoConnectionProps {
  onSubmit: () => void
  onCancel: () => void
}

const AlertNoConnection: FC<AlertNoConnectionProps> = (
  props: AlertNoConnectionProps
) => {
  const alertNoConnection = useAppStore(
    (state: AppStates) => state.alertNoConnection
  )
  return (
    <AlertDialogComponent
      type="info"
      icon="wifi_off"
      title="Tidak Ada Koneksi Internet"
      desc="Koneksikan perangkat Anda lalu sinkronisasi ulang."
      isOpen={alertNoConnection}
      hideBtnCancel={false}
      btnCancelText="Kembali"
      btnActionText="Sinkronisasi Ulang"
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
    />
  )
}

export default AlertNoConnection
