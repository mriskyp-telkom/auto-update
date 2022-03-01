import React, { FC } from 'react'

import { Tooltip } from '@wartek-id/tooltip'

import { numberUtils } from '@wartek-id/fe-toolbox'

import filter from 'lodash/filter'

import styles from './index.module.css'

import clsx from 'clsx'

interface TabelKertasKerjaProps {
  bulan: string
}

const data = [
  {
    anggaran_bulan: [
      { jumlah: '2', satuan: 'Botol', bulan: 'januari' },
      { jumlah: '1', satuan: 'Box', bulan: 'februari' },
    ],
    harga_satuan: 'Rp 12.000',
    kegiatan: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    rekening_belanja: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
    uraian: 'Pengembangan Standar Proses',
  },
]

const TabelKertasKerjaView: FC<TabelKertasKerjaProps> = (
  props: TabelKertasKerjaProps
) => {
  const TDTable = (props: { text: string; width: string }) => {
    return (
      <td style={{ width: props.width }}>
        <Tooltip
          content={props.text}
          placement="top"
          strategy="fixed"
          trigger="hover"
        >
          <span>{props.text}</span>
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
          <th style={{ width: '5%' }}>No</th>
          <th style={{ width: '17%' }}>Program Kegiatan</th>
          <th style={{ width: '17%' }}>Kegiatan</th>
          <th style={{ width: '17%' }}>Rekening Belanja</th>
          <th style={{ width: '17%' }}>Uraian</th>
          <th style={{ width: '5%' }}>Jumlah</th>
          <th style={{ width: '6%' }}>Satuan</th>
          <th style={{ width: '8%' }}>Harga Satuan</th>
          <th style={{ width: '8%' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, indexRow) => {
          const harga = filter(row.anggaran_bulan, ['bulan', props.bulan])
          if (harga.length === 0) {
            if (indexRow < 5) return <tr></tr>
          }
          const total_harga =
            parseInt(row.harga_satuan.replace(/[^,\d]/g, '')) *
            parseInt(harga[0].jumlah)
          return (
            <tr key={indexRow}>
              <TDTable text={(indexRow + 1).toString()} width="5%" />
              <TDTable text={row.kegiatan} width="17%" />
              <TDTable text={row.kegiatan} width="17%" />
              <TDTable text={row.rekening_belanja} width="17%" />
              <TDTable text={row.uraian} width="17%" />
              <TDTable text={harga[0]?.jumlah.toString()} width="5%" />
              <TDTable text={harga[0]?.satuan.toString()} width="6%" />
              <TDTable text={row.harga_satuan} width="8%" />
              <TDTable
                text={`Rp ${numberUtils.delimit(total_harga, '.')}`}
                width="8%"
              />
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

export default TabelKertasKerjaView
