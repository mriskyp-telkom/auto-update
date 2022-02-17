import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AlertDialogComponent from '../../components/Dialog/AlertDialogComponent'

const ResetAccountLinkView: FC = () => {
  const navigate = useNavigate()

  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)

  const onSubmitConfirm = () => {
    setOpenModalConfirm(false)
    setOpenModalSuccess(true)
  }

  const onSubmitSuccess = () => {
    setOpenModalSuccess(false)
    navigate('/account-status')
  }

  return (
    <div>
      <div className="text-[16px] pt-[8px] pb-[50px] font-normal">
        Lupa Password?{' '}
        <span
          className="text-blue-700 cursor-pointer	"
          onClick={() => setOpenModalConfirm(true)}
        >
          Reset Akun
        </span>
      </div>
      <AlertDialogComponent
        type="warning"
        icon="send"
        title="Ajukan reset akun ke dinas?"
        desc="Pengajuan reset akun membutuhkan waktu untuk disetujui oleh dinas. Pengajuan ini tidak dapat dibatalkan dan akses ARKAS  Anda akan ditutup sampai proses pengajuan selesai."
        isOpen={openModalConfirm}
        btnCancelText="Batal"
        btnActionText="Ajukan Reset Akun"
        onCancel={() => setOpenModalConfirm(false)}
        onSubmit={onSubmitConfirm}
      />
      <AlertDialogComponent
        type="success"
        icon="done"
        title="Pengajuan Terkirim!"
        desc="Dinas memerlukan beberapa hari kerja untuk memproses pengajuan Anda. Silakan cek status terbaru secara berkala."
        isOpen={openModalSuccess}
        hideBtnCancel={true}
        btnActionText="Saya Mengerti"
        onSubmit={onSubmitSuccess}
      />
    </div>
  )
}

export default ResetAccountLinkView
