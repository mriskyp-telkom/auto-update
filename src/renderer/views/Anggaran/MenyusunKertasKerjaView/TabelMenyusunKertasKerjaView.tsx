import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import { numberUtils } from '@wartek-id/fe-toolbox'

import filter from 'lodash/filter'

import { FormIsiKertasKerjaData } from 'renderer/types/AnggaranType'

import { headerKertasKerja } from 'renderer/constants/table'
import { RESPONSE_PENGESAHAN } from 'renderer/constants/anggaran'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import styles from './index.module.css'

import clsx from 'clsx'

interface TabelMenyusunKertasKerjaProps {
  bulan: string
  idAnggaran: string
}

const data = [
  {
    id: 1,
    program_kegiatan: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    anggaran_bulan: [
      { jumlah: 2, satuan: 'Botol', bulan: 'januari', id: 81 },
      { jumlah: 1, satuan: 'Box', bulan: 'februari', id: 82 },
    ],
    harga_satuan: 'Rp 12.000',
    kegiatan: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    rekening_belanja: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    uraian: 'Pengembangan Standar Proses',
  },
  {
    id: 2,
    program_kegiatan: ' Pendaftaran Peserta Didik Baru (PPDB)',
    anggaran_bulan: [
      { jumlah: 2, satuan: 'Botol', bulan: 'januari', id: 81 },
      { jumlah: 1, satuan: 'Box', bulan: 'maret', id: 83 },
    ],
    harga_satuan: 'Rp 12.000',
    kegiatan: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    rekening_belanja: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    uraian: 'Pengembangan Standar Proses',
  },
]

const TabelMenyusunKertasKerjaView: FC<TabelMenyusunKertasKerjaProps> = (
  props: TabelMenyusunKertasKerjaProps
) => {
  const location = useLocation()
  const navigate = useNavigate()

  const responseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.responseMengulas
  )

  const setTempDetailKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setTempDetailKertasKerja
  )

  const handleClickRow = (event: any, row: FormIsiKertasKerjaData) => {
    if (!event.target.id.includes('headlessui-popover-button')) {
      setTempDetailKertasKerja(row)
      const link = `/form/kertas-kerja/update/${encodeURIComponent(
        props.idAnggaran
      )}`
      navigate(link, {
        state: { backgroundLocation: location },
      })
    }
  }

  const TDTable = (props: { text: string; width: string }) => {
    return (
      <td style={{ width: props.width }}>
        <Tooltip
          content={props.text}
          placement="top"
          strategy="fixed"
          trigger="hover"
        >
          <span className="cursor-pointer">{props.text}</span>
        </Tooltip>
      </td>
    )
  }

  return (
    <table
      key={props.bulan}
      className={clsx(styles.tableKertasKerja, 'w-full text-left')}
    >
      <thead>
        <tr className="text-base font-semibold text-gray-900">
          {headerKertasKerja.map((col) => (
            <th key={col.key} style={{ width: col.width }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, indexRow) => {
          const harga = filter(row.anggaran_bulan, ['bulan', props.bulan])
          if (harga.length === 0) {
            if (indexRow < 5) return <tr></tr>
          }
          const total_harga =
            parseInt(row.harga_satuan.replace(/[^,\d]/g, '')) * harga[0].jumlah
          return (
            <tr
              key={indexRow}
              onClick={(e) => handleClickRow(e, row)}
              className={
                responseMengulas === RESPONSE_PENGESAHAN.error_data_sentral
                  ? 'text-red-600'
                  : ''
              }
            >
              {headerKertasKerja.map((col) => {
                if (col.key === 'no') {
                  return (
                    <TDTable
                      key={col.key}
                      text={(indexRow + 1).toString()}
                      width={col.width}
                    />
                  )
                } else if (col.key === 'total') {
                  return (
                    <TDTable
                      key={col.key}
                      text={`Rp ${numberUtils.delimit(total_harga, '.')}`}
                      width={col.width}
                    />
                  )
                } else if (col.key === 'jumlah' || col.key === 'satuan') {
                  return (
                    <TDTable
                      key={col.key}
                      text={harga[0][col.key]?.toString()}
                      width={col.width}
                    />
                  )
                } else {
                  return (
                    <TDTable
                      key={col.key}
                      text={
                        row[col.key as keyof FormIsiKertasKerjaData] as string
                      }
                      width={col.width}
                    />
                  )
                }
              })}
            </tr>
          )
        })}
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelMenyusunKertasKerjaView
