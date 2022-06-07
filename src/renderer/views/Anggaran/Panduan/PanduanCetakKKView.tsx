import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

const PanduanCetakKKView: FC = () => {
  return (
    <PanduanCardComponent type="info">
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
              Di halaman ini Anda bisa mencetak atau menyimpan RKAS dalam format
              PDF sebagai pelengkap laporan.
            </span>
          </li>
          <li>
            <span>
              Format laporan yang tertera di bawah sudah sesuai dengan peraturan
              terbaru.
            </span>
          </li>
        </ul>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanCetakKKView
