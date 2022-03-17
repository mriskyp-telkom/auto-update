import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import syncToIPCMain from 'renderer/configs/ipc'

import { sendEventLogout } from 'renderer/utils/analytic/auth-util'

const LogoutView: FC = () => {
  const navigate = useNavigate()

  const [emailPengguna, setEmailPengguna] = useState('')

  useEffect(() => {
    const dataPengguna = syncToIPCMain('pengguna:getPengguna')
    setEmailPengguna(dataPengguna?.email)
  }, [])

  const closeModal = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    let response_status = ''
    let next_route = ''

    const logout = syncToIPCMain('user:logout')

    if (logout) {
      next_route = '/login'
      response_status = 'sukses'
    } else {
      closeModal()
      response_status = 'gagal'
    }

    if (response_status !== '') {
      sendEventLogout(emailPengguna, response_status)
    }
    if (next_route !== '') {
      navigate(next_route)
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
