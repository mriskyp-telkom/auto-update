import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

const PanduanCekStatusKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="warning">
      <>
        <div className="mb-2">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px' }}
            className="mr-[10px]"
          >
            schedule
          </Icon>
          Menunggu Pengesahan
          <span className="text-tiny font-normal text-red-600 ml-3">
            Tanggal pengajuan: 09/11/2021
          </span>
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Proses pengesahan membutuhkan 7-14 hari kerja sejak pengajuan.
              Silakan cek status secara berkala.
            </span>
          </li>
          <li>
            <span>
              Jika setelah batas waktu tersebut Anda belum menerima hasil,
              silakan hubungi dinas setempat.
            </span>
          </li>
        </ul>
        <div className="flex mt-2 items-center">
          <Button
            color="white"
            size="sm"
            variant="solid"
            className="mr-3"
            style={{ backgroundColor: 'unset' }}
          >
            Cek Status
          </Button>
          <span className="text-blue-700 text-[12px] text-right">
            <b>“Cek Status”</b> membutuhkan koneksi internet
          </span>
        </div>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanCekStatusKKView
