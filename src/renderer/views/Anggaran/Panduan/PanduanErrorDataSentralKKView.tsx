import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

const PanduanErrorDataSentralKKView: FC = () => {
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
          {copyKertasKerja()} Butuh Disesuaikan
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
          <li>
            <span>
              Setelah {copyKertasKerja()} disesuaikan, pastikan Anda ajukan
              pengesahan kembali.
            </span>
          </li>
        </ul>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanErrorDataSentralKKView
