import React, { FC } from 'react'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import { AppStates, useAppStore } from 'renderer/stores/app'

interface AlertLostConnectionProps {
  onSubmit: () => void
  onCancel: () => void
}

const AlertLostConnection: FC<AlertLostConnectionProps> = (
  props: AlertLostConnectionProps
) => {
  const alertLostConnection = useAppStore(
    (state: AppStates) => state.alertLostConnection
  )
  return (
    <AlertDialogComponent
      type="info"
      icon="wifi_off"
      title="Koneksi Internet Terputus"
      desc="Periksa kembali koneksi internet Anda lalu sinkronisasi ulang."
      isOpen={alertLostConnection}
      hideBtnCancel={false}
      btnCancelText="Kembali"
      btnActionText="Sinkronisasi Ulang"
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
    />
  )
}

export default AlertLostConnection
