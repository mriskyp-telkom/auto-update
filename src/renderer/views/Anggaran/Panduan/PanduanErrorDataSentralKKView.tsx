import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanErrorDataSentralKKView: FC = () => {
  return (
    <CardPanduanAnggaranView type="failed">
      <>
        <div className="mb-2">
          <Icon
            as="i"
            color="default"
            fontSize="small"
            style={{ fontSize: '14px', color: '#e02d38' }}
            className="mr-[10px]"
          >
            cancel
          </Icon>
          RKAS Butuh Disesuaikan
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Anda belum dapat mengajukan pengesahan karena ada perubahan data
              referensi barang/jasa yang Anda gunakan.
            </span>
          </li>
          <li>
            <span>
              Silakan sesuaikan pembelian Anda berdasarkan data referensi
              terbaru.
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanErrorDataSentralKKView
