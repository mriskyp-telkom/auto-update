import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

const PanduanMengulasKKView: FC = () => {
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
              Di halaman ini Anda bisa memeriksa kembali anggaran belanja
              sekolah yang telah dibuat.
            </span>
          </li>
          <li>
            <span>
              Jika ada yang ingin diganti, klik tombol <b>“Edit”</b> untuk
              melakukan edit.
            </span>
          </li>
          <li>
            <span>
              Jika sudah sesuai, klik tombol <b>“Ajukan Pengesahan”</b>
              untuk mengajukan pengesahan.
            </span>
          </li>
        </ul>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanMengulasKKView
