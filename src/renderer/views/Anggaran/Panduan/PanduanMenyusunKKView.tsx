import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanMenyusunKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="info">
      <>
        <div className="mb-2">
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
              Anda harus menghabiskan seluruh anggaran untuk bisa mengajukan
              pengesahan.
            </span>
          </li>
          <li>
            <span>
              Pastikan Anda membuat anggaran berdasarkan juknis yang berlaku.
              <a>Lihat Juknis</a>
            </span>
          </li>
          <li>
            <span>
              Dalam membuat rencana anggaran sebaiknya juga memperhatikan
              prioritas kegiatan daerah. <a>Lihat Prioritas Daerah</a>
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanMenyusunKKView
