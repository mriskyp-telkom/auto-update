import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'
import { copyKertasKerja } from 'renderer/utils/copy-writing'

const PanduanPengajuanUlangKKView: FC = () => {
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
          {copyKertasKerja()} Perlu Diajukan Ulang
        </div>
        <div>
          <span className="font-normal text-base text-gray-900 ml-6">
            {copyKertasKerja()} gagal terkirim karena kegagalan sistem. Silakan
            ajukan pengesahan ulang.
          </span>
        </div>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanPengajuanUlangKKView
