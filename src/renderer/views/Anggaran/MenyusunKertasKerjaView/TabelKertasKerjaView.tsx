import React, { FC } from 'react'

import styles from './index.module.css'

import clsx from 'clsx'

const TabelKertasKerjaView: FC = () => {
  return (
    <table className={clsx(styles.tableKertasKerja, 'w-full')}>
      <thead>
        <tr className="text-base font-semibold text-gray-900">
          <th>No</th>
          <th>Program Kegiatan</th>
          <th>Kegiatan</th>
          <th>Rekening Belanja</th>
          <th>Uraian</th>
          <th>Jumlah</th>
          <th>Satuan</th>
          <th>Harga Satuan</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Pengembangan standar kompetensi</td>
          <td>Pelaksanaan pendaftaran pe..</td>
          <td>Belanja makanan dan min..</td>
          <td>Makan makan ppdp bos</td>
          <td>5</td>
          <td>Box</td>
          <td>Rp 20.000</td>
          <td>Rp 100.000</td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelKertasKerjaView
