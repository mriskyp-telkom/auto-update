import React, { FC, useEffect, useState } from 'react'

import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import syncToIpcMain from 'renderer/configs/ipc'
import { IPC_TATA_USAHA } from 'global/ipc'
import { GetTotalAnggaranRequest } from 'global/types/TataUsaha'

interface CardDanaPembelanjaanViewData {
  idAnggaran: string
  idPeriode: number
}
interface CardDanaPembelanjaanViewProps {
  data: CardDanaPembelanjaanViewData
}

interface Card {
  title: string
  tooltip: string
  amount: number
}

const CardDanaPembelanjaanView: FC<CardDanaPembelanjaanViewProps> = (
  props: CardDanaPembelanjaanViewProps
) => {
  const [list, setList] = useState([] as Card[])
  const [bisaDibelanjakan, setBisaDibelanjakan] = useState(null)
  const [sudahDibelanjakan, setSudahDibelanjakan] = useState(null)
  const [perluDianggarkanUlang, setPerluDianggarkanUlang] = useState(null)
  const request = {
    idAnggaran: props.data.idAnggaran,
    idPeriode: props.data.idPeriode,
  } as GetTotalAnggaranRequest

  const bisaDibelanjakanCard = {
    title: 'Bisa Dibelanjakan',
    tooltip: 'Total sisa anggaran yang bisa dibelanjakan sampai bulan ini.',
    amount: 0,
  }

  const sudahDibelanjakanCard = {
    title: 'Dana Dibelanjakan',
    tooltip: 'Total harga barang/jasa yang dibelanjakan bulan ini.',
    amount: 0,
  }

  const perluDianggarkanUlangCard = {
    title: 'Perlu Dianggarkan Ulang',
    tooltip:
      'Sisa dana dari selisih harga barang/jasa yang dianggarkan dengan harga yang dibelanjakan setelah semua kuota habis selama setahun.',
    amount: 0,
  }

  useEffect(() => {
    if (bisaDibelanjakan === null) {
      const res = syncToIpcMain(
        IPC_TATA_USAHA.getTotalBisaDibelanjakan,
        request
      )

      if (!res?.error) {
        setBisaDibelanjakan(res.value)
        bisaDibelanjakanCard.amount = res.value
      }

      list.push(bisaDibelanjakanCard)
      setList(list)
    }

    if (sudahDibelanjakan === null) {
      const res = syncToIpcMain(
        IPC_TATA_USAHA.getTotalSudahDibelanjakan,
        request
      )

      if (!res?.error) {
        setSudahDibelanjakan(res.value)
        sudahDibelanjakanCard.amount = res.value
      }

      list.push(sudahDibelanjakanCard)
      setList(list)
    }

    if (perluDianggarkanUlang === null) {
      const res = syncToIpcMain(
        IPC_TATA_USAHA.getTotalPerluDianggarkanUlang,
        request
      )

      if (!res?.error) {
        setPerluDianggarkanUlang(res.value)
        perluDianggarkanUlangCard.amount = res.value
      }

      list.push(perluDianggarkanUlangCard)
      setList(list)
    }
  }, [])

  return (
    <div className="border w-min px-6 pb-6 pt-5 rounded grid place-content-end">
      <div className="flex content-end">
        {list.map((data, index) => (
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
