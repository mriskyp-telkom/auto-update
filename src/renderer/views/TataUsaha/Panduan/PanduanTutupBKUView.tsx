import React, { FC } from 'react'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

const PanduanTutupBKUView: FC = () => {
  return (
    <PanduanCardComponent type="info">
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
              Anda harus mencatat pembelanjaan baik secara tunai maupun nontunai
              secara kronologis.
            </span>
          </li>
          <li>
            <span>
              Pastikan Anda telah mencatat penarikan tunai sebelum memasukkan
              pembelanjaan tunai.
            </span>
          </li>
          <li>
            <span>
              Untuk menutup BKU, Anda akan diminta untuk memasukkan bunga dan
              pajak bunga bank/giro di bulan terkait.
            </span>
          </li>
        </ul>
      </>
    </PanduanCardComponent>
  )
}

export default PanduanTutupBKUView
