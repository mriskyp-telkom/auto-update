import React, { FC } from 'react'

import AuthLayout from 'views/Layout/AuthLayout'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

const StatusAccountView: FC = () => {
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
        <Button color="white" size="sm" variant="solid">
          Cek Status
        </Button>
        <div className="font-normal text-[12px] text-blue-700 mt-3">
          Status diperbarui 2 hari yang lalu
        </div>
      </div>
      <div className="text-blue-700 text-[12px] text-right">
        <b>“Cek Status”</b> membutuhkan koneksi internet
      </div>
    </AuthLayout>
  )
}

export default StatusAccountView
