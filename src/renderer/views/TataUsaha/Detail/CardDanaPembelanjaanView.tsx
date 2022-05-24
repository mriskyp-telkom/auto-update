import React from 'react'

import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'

const CardDanaPembelanjaanView = () => {
  const detailDatas = [
    {
      title: 'Bisa Dibelanjakan',
      tooltip: 'Total sisa anggaran yang bisa dibelanjakan sampai bulan ini.',
      amount: 20000000,
    },
    {
      title: 'Dana Dibelanjakan',
      tooltip: 'Total harga barang/jasa yang dibelanjakan bulan ini.',
      amount: 0,
    },
    {
      title: 'Perlu Dianggarkan Ulang',
      tooltip:
        'Sisa dana dari selisih harga barang/jasa yang dianggarkan dengan harga yang dibelanjakan setelah semua kuota habis selama setahun.',
      amount: 20000000,
    },
  ]

  return (
    <div className="border w-min px-6 pb-6 pt-5 rounded grid place-content-end">
      <div className="flex content-end">
        {detailDatas.map((data, index) => (
          <span key={index} className="mr-6">
            <div className="flex items-center font-normal text-tiny text-gray-900 pb-1">
              {data.title}
              <Tooltip
                content={data.tooltip}
                maxWidth={362}
                placement="bottom"
                strategy="fixed"
                trigger="hover"
              >
                <Icon
                  as="i"
                  color="default"
                  fontSize="small"
                  style={{ fontSize: '14px' }}
                  className="ml-1"
                >
                  info
                </Icon>
              </Tooltip>
            </div>
            <AmountCardComponent
              type="default"
              width={201}
              amount={data.amount}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default CardDanaPembelanjaanView
