import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthLayout from 'views/Layout/AuthLayout'

import AlertDialogComponent from 'components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

const StatusAccountView: FC = () => {
  const navigate = useNavigate()

  const [isSync, setIsSync] = useState(false)
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)

  const onCheckStatus = () => {
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
      // setOpenModalInfo(true)
      setOpenModalSuccess(true)
    }, 3000)
  }

  const onSubmitModalSuccess = () => {
    setOpenModalSuccess(false)
    navigate('/create-account/reset')
  }

  const onSubmitModalInfo = () => {
    setOpenModalInfo(false)
  }

  return (
    <AuthLayout>
      <div className="border border-warning border-solid rounded bg-[#FFF2DB] p-[24px] mt-[5px] mb-[20px]">
        <div
          className={clsx(
            'flex items-center',
            'font-semibold text-gray-900 text-[17px]'
          )}
        >
          <Icon
            as="i"
            color="default"
            fontSize="small"
            className="text-[14px] mr-[4px]"
            style={{ fontSize: '14px' }}
          >
            schedule
          </Icon>
          Pengajuan Reset Akun Masih Diproses
        </div>
        <div className="font-normal	text-[14px] text-gray-900 my-3">
          Silakan cek status pengajuan Anda secara berkala untuk melihat update.
        </div>
        <Button color="white" size="sm" variant="solid" onClick={onCheckStatus}>
          Cek Status
        </Button>
        <div className="font-normal text-[12px] text-blue-700 mt-3">
          Status diperbarui 2 hari yang lalu
        </div>
      </div>
      <div className="text-blue-700 text-[12px] text-right">
        <b>“Cek Status”</b> membutuhkan koneksi internet
      </div>
      <AlertDialogComponent
        type="success"
        icon="done"
        title="Pengajuan Diterima!"
        desc="Anda sudah bisa membuat password baru untuk akun Anda."
        isOpen={openModalSuccess}
        hideBtnCancel={true}
        btnActionText="Buat Password Baru"
        onSubmit={onSubmitModalSuccess}
      />
      <AlertDialogComponent
        type="warning"
        icon="hourglass_bottom"
        title="Pengajuan Masih Diproses"
        desc="Mohon menunggu beberapa waktu atau hubungi dinas setempat jika sudah lebih dari 7 hari."
        isOpen={openModalInfo}
        hideBtnCancel={true}
        btnActionText="Saya Mengerti"
        onSubmit={onSubmitModalInfo}
      />
      <SyncDialogComponent
        title="Sinkronisasi Data..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
    </AuthLayout>
  )
}

export default StatusAccountView
