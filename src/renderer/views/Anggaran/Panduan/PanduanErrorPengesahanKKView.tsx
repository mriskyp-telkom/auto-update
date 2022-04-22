import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanErrorPengesahanKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="failed">
      <>
        <div className="mb-2 font-semibold">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px', color: '#e02d38' }}
            className="mr-[10px]"
          >
            cancel
          </Icon>
          RKAS Belum Disetujui
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              RKAS Anda belum bisa disetujui karena ada beberapa revisi yang
              perlu dilakukan.
            </span>
          </li>
          <li>
            <span>
              Silakan lihat catatan dari dinas dan lakukan revisi. Lihat Catatan
              Revisi.
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanErrorPengesahanKKView