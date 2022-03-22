import React, { FC } from 'react'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

const PanduanErrorSisaDanaKKView: FC = () => {
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
          RKAS Belum Memenuhi Syarat
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Anda belum dapat mengajukan pengesahan karena RKAS Anda masih
              memiliki sisa dana.
            </span>
          </li>
          <li>
            <span>
              Silakan sesuaikan kembali anggaran pembelanjaan Anda hingga sisa
              dana habis.
            </span>
          </li>
        </ul>
      </>
    </CardPanduanAnggaranView>
  )
}

export default PanduanErrorSisaDanaKKView
