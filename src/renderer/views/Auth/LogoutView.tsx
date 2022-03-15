import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import syncToIPCMain from 'renderer/configs/ipc'

const LogoutView: FC = () => {
  const navigate = useNavigate()

  const closeModal = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    const logout = syncToIPCMain('user:logout')
    if (logout) {
      navigate('/login')
    } else {
      closeModal()
    }
  }

  return (
    <AlertDialogComponent
      type="failed"
      icon="logout"
      title="Keluar dari ARKAS?"
      desc="Setelah keluar, Anda perlu mengisi email dan password kembali untuk masuk ke ARKAS."
      isOpen={true}
      btnCancelText="Batal"
      btnActionText="Ya, Keluar"
      onCancel={closeModal}
      onSubmit={handleLogout}
    />
  )
}

export default LogoutView
