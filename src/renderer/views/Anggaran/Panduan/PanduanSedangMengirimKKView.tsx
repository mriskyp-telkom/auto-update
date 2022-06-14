import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import CekStatusKKView from 'renderer/views/Anggaran/CekStatus/CekStatusKKView'

import { Icon } from '@wartek-id/icon'
import { copyKertasKerja } from 'renderer/utils/copy-writing'

export interface PanduanSedangMengirimKKProps {
  idAnggaran: string
}

const PanduanSedangMengirimKKView: FC<PanduanSedangMengirimKKProps> = (
  props: PanduanSedangMengirimKKProps
) => {
  return (
    <PanduanCardComponent type="warning">
      <>
        <div className="mb-2 font-semibold">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px' }}
            className="mr-[10px]"
          >
            schedule
          </Icon>
          Mengirim Kertas Kerja
        </div>
        <div>
          <span className="font-normal text-base text-gray-900 ml-6">
            {copyKertasKerja()} Anda sedang dalam pengiriman menuju sistem
            pengecekan dinas. Silakan cek status secara berkala.
          </span>
        </div>
        <div className="flex mt-2 items-center ml-6">
          <CekStatusKKView idAnggaran={props.idAnggaran} page="banner" />
          <span className="text-blue-700 text-[12px] text-right">
            <b>“Cek Status”</b> membutuhkan koneksi internet
          </span>
        </div>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanSedangMengirimKKView
