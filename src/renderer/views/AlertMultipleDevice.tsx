import React, { FC } from 'react'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'

interface AlertMultipleDeviceProps {
  onSubmit: () => void
  onCancel: () => void
}

const AlertMultipleDevice: FC<AlertMultipleDeviceProps> = (
  props: AlertMultipleDeviceProps
) => {
  const isMultipleDevice = useAuthStore(
    (state: AuthStates) => state.isMultipleDevice
  )

  return (
    <AlertDialogComponent
      type="failed"
      icon="priority_high"
      title="Akun anda teridentifikasi pada perangkat lain"
      desc="Silakan input ulang NPSN dan kode aktivasi untuk dapat melanjutkan menggunakan ARKAS pada komputer ini. Data yang sudah Anda masukkan tidak akan hilang."
      isOpen={isMultipleDevice}
      btnCancelText="Batal"
      btnActionText="Registrasi Ulang"
      onCancel={props.onCancel}
      onSubmit={props.onSubmit}
    />
  )
}

export default AlertMultipleDevice
