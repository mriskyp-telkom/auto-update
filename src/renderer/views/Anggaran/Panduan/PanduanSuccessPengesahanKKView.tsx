import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanMenyusunKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="info">
      <>
        <div className="mb-2 font-semibold">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px' }}
            className="mr-[10px]"
          >
            info
          </Icon>
          Panduan
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Sebelum membuat anggaran, ketahui daftar kode barang dan SSH yang
              ada di daerah Anda. <a>Lihat Daftar Barang</a>
            </span>
          </li>
          <li>
            <span>
              Pastikan Anda membuat anggaran berdasarkan juknis yang berlaku.{' '}
              <a>Lihat Juknis</a>
            </span>
          </li>
          <li>
            <span>
              Anda harus menghabiskan seluruh anggaran untuk bisa mengajukan
              pengesahan.
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanMenyusunKKView
