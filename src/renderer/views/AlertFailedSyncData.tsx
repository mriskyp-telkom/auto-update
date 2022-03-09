import React, { FC } from 'react'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import { AppStates, useAppStore } from 'renderer/stores/app'

interface AlertFailedSyncDataProps {
  onSubmit: () => void
  onCancel: () => void
}

const AlertFailedSyncData: FC<AlertFailedSyncDataProps> = (
  props: AlertFailedSyncDataProps
) => {
  const alertFailedSyncData = useAppStore(
    (state: AppStates) => state.alertFailedSyncData
  )
  return (
    <AlertDialogComponent
      type="failed"
      icon="close"
      title="Gagal Sinkronisasi Data"
      desc="Maaf, terjadi gangguan di sistem kami. Silakan coba lagi dalam beberapa saat."
      isOpen={alertFailedSyncData}
      hideBtnCancel={false}
      btnCancelText="Tutup"
      btnActionText="Sinkronisasi Ulang"
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
    />
  )
}

export default AlertFailedSyncData
