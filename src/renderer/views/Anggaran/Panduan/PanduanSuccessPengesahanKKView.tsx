import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanSuccessPengesahanKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="success">
      <>
        <div className="mb-2 font-semibold">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px', color: '#4ca375' }}
            className="mr-[10px]"
          >
            check_circle
          </Icon>
          RKAS Berhasil Disahkan!
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Sekarang Anda bisa langsung melakukan pembelanjaan setelah
              menerima penyaluran dana.
            </span>
          </li>
          <li>
            <span>
              Jika Anda perlu mengubah anggaran dalam satu jenis belanja, Anda
              boleh melakukan pergeseran dengan klik <b>“Geser”</b>.
            </span>
          </li>
          <li>
            <span>
              Jika Anda perlu mengubah anggaran lintas jenis belanja, Anda boleh
              melakukan perubahan dengan klik <b>“Ubah”</b>.
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanSuccessPengesahanKKView
