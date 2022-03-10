import React, { FC, useRef } from 'react'

import { Icon } from '@wartek-id/icon'

import styles from './index.module.css'

import clsx from 'clsx'

const TabelMengulasKertasKerjaView: FC = () => {
  const ref = useRef(null)

  const handleClickRow = () => {
    ref.current.children[1].hidden = !ref.current.children[1].hidden
  }

  return (
    <div className="w-full">
      <table
        className={clsx(
          styles.tableKertasKerja,
          'w-full text-left text-base cursor-pointer'
        )}
      >
        <thead>
          <tr className="text-base text-gray-600">
            <th className={styles.code}>Kode</th>
            <th colSpan={2}>Program Kegiatan</th>
            <th className={styles.price}>Total</th>
            <th className={styles.expand}></th>
          </tr>
        </thead>
        <tbody ref={ref}>
          <tr onClick={handleClickRow}>
            <td className={styles.code}>01</td>
            <td colSpan={2}>Program Kegiatan</td>
            <td className={styles.price}>Rp 80.000.000</td>
            <td className={styles.expand}>
              <Icon as="i" color="default" fontSize="default">
                expand_more
              </Icon>
            </td>
          </tr>
          <tr hidden={true}>
            <td colSpan={5} style={{ padding: 'unset' }}>
              <ExpandMoreRowTable />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const ExpandMoreRowTable = () => {
  return (
    <table
      className={clsx(styles.tableKertasKerja, 'w-full text-left text-base')}
    >
      <tr>
        <td className={styles.code}>01.02.03</td>
        <td colSpan={6}>Rekening Belanja</td>
        <td className={styles.price}>Rp 80.000.000</td>
        <td className={styles.expand}></td>
      </tr>
      <tr>
        <td className={styles.code}></td>
        <td colSpan={2}></td>
        <td
          colSpan={6}
          rowSpan={3}
          style={{ padding: 'unset', width: '723px' }}
        >
          <div style={{ overflowX: 'scroll' }}>
            <table className={styles.borderTable}>
              <tr>
                <td colSpan={2} className="text-center">
                  Januari
                </td>
                <td colSpan={2} className="text-center">
                  Februari
                </td>
                <td colSpan={2} className="text-center">
                  Maret
                </td>
                <td colSpan={2} className="text-center">
                  April
                </td>
                <td className={clsx(styles.price, 'text-center')}></td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center">
                  Rp 80.000.000
                </td>
                <td colSpan={2} className="text-center">
                  Rp 80.000.000
                </td>
                <td colSpan={2} className="text-center">
                  Rp 80.000.000
                </td>
                <td colSpan={2} className="text-center">
                  Rp 80.000.000
                </td>
                <td className={clsx(styles.total, 'block text-center')}>
                  Rp 80.000.000
                </td>
              </tr>
              <tr>
                <td className="text-center">10</td>
                <td className={clsx(styles.price, 'block text-center')}>
                  Rp 80.000.000
                </td>
                <td className="text-center">10</td>
                <td className={clsx(styles.price, 'block text-center')}>
                  Rp 80.000.000
                </td>
                <td className="text-center">10</td>
                <td className={clsx(styles.price, 'block text-center')}>
                  Rp 80.000.000
                </td>
                <td className="text-center">10</td>
                <td className={clsx(styles.price, 'block text-center')}>
                  Rp 80.000.000
                </td>
                <td className={clsx(styles.total, 'text-center')}>
                  Rp 80.000.000
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td className={styles.code}>5.1.2.21.002</td>
        <td colSpan={2}>
          Belanja Makanan dan Minuman pada Fasilitas Umum xxxxx
        </td>
      </tr>
      <tr>
        <td className={styles.code}></td>
        <td colSpan={2}>
          <div className="flex text-center">
            <span className="flex-1 text-left truncate">
              Makan makan ppdp bos
            </span>
            <span className="flex-none" style={{ width: '50px' }}>
              150
            </span>
            <span className="flex-none" style={{ width: '100px' }}>
              Rp 20.000
            </span>
          </div>
        </td>
      </tr>
    </table>
  )
}

export default TabelMengulasKertasKerjaView
