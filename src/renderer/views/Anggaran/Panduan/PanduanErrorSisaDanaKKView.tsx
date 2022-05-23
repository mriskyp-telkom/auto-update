import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

const PanduanErrorSisaDanaKKView: FC = () => {
  return (
    <PanduanCardComponent type="failed">
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
          {copyKertasKerja()} Belum Memenuhi Syarat
        </div>
        <ul className="list font-normal text-base text-gray-900 ml-7">
          <li>
            <span>
              Anda belum dapat mengajukan pengesahan karena masih memiliki
              kekurangan atau kelebihan sisa dana.
            </span>
          </li>
          <li>
            <span>
              Silakan sesuaikan kembali anggaran pembelanjaan Anda hingga sisa
              dana habis.
            </span>
          </li>
          <li>
            <span>
              Setelah Kertas Kerja disesuaikan, pastikan Anda ajukan pengesahan
              kembali.
            </span>
          </li>
        </ul>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanErrorSisaDanaKKView
