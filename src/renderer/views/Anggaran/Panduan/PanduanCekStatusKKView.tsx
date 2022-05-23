import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import CekStatusKKView from 'renderer/views/Anggaran/CekStatus/CekStatusKKView'

import { Icon } from '@wartek-id/icon'

export interface PanduanCekStatusProps {
  idAnggaran: string
  tanggalPengajuan: string
}

const PanduanCekStatusKKView: FC<PanduanCekStatusProps> = (
  props: PanduanCekStatusProps
) => {
  return (
    <PanduanCardComponent type="warning">
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
            Tanggal pengajuan: {props.tanggalPengajuan}
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
          <CekStatusKKView idAnggaran={props.idAnggaran} page="banner" />
          <span className="text-blue-700 text-[12px] text-right">
            <b>“Cek Status”</b> membutuhkan koneksi internet
          </span>
        </div>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanCekStatusKKView
