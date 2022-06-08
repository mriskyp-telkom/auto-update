import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

const DialogUpdate: FC = () => {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    navigate(-1)
  }

  return (
    <AlertDialogComponent
      type="success"
      icon="update"
      title="Versi terbaru sudah tersedia!"
      desc="Silahkan perbarui aplikasi untuk penggunaan yang lebih nyaman. Pembaruan aplikasi membutuhkan [X] dari memori perangkat."
      isOpen={true}
      btnCancelText="Kembali"
      btnActionText="Perbarui Aplikasi"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  )
}

export default DialogUpdate
