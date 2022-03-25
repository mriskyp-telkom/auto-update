import React, { FC, useEffect, useRef, useState } from 'react'

import { Icon } from '@wartek-id/icon'

import { MODE_MENGULAS } from 'renderer/constants/anggaran'

import { amountFormatting } from 'renderer/utils/number-formatting'

import styles from './index.module.css'

import clsx from 'clsx'
import { IPC_KK } from 'global/ipc'

const ipcRenderer = window.require('electron').ipcRenderer

interface TabelMengulasKertasKerjaProps {
  mode: string
  tahap?: number
  idAnggaran: string
}

const TabelMengulasKertasKerjaView: FC<TabelMengulasKertasKerjaProps> = (
  props: TabelMengulasKertasKerjaProps
) => {
  const { tahap, idAnggaran } = props

  const [data, setData] = useState([])
  useEffect(() => {
    const data = {
      tahap,
      idAnggaran,
    }
    const rapbsSummary = ipcRenderer.sendSync(IPC_KK.getRapbsSummary, data)
    setData(rapbsSummary)
  }, [])
  return (
    <div
      className={clsx(
        props.mode === MODE_MENGULAS.tahun
          ? styles.heightTableTahun
          : styles.heightTableTahap,
        'w-full overflow-y-scroll scrollBar'
      )}
    >
      <table
        className={clsx(
          styles.tableKertasKerja,
          'w-full text-left text-base cursor-pointer z-10'
        )}
      >
        <thead>
          <tr className={clsx(styles.line, 'text-base text-gray-600')}>
            <th className={styles.code}>Kode</th>
            <th>Program Kegiatan</th>
            <th className={styles.price}>Total</th>
            <th className={styles.expand}></th>
          </tr>
        </thead>
        {data.map((item, index) => (
          <ProgramKegiatanRowTable
            data={item}
            key={index}
            tahap={tahap}
            idAnggaran={idAnggaran}
          />
        ))}
      </table>
    </div>
  )
}

const ProgramKegiatanRowTable = (props: any) => {
  const ref = useRef(null)

  const { data } = props
  const [detail, setDetail] = useState([])
  const isHaveDetail = data.total != null && data.total > 0
  const handleClickRow = () => {
    const rapbsDetail = ipcRenderer.sendSync(
      IPC_KK.anggaranDetailKegiatan,
      props.tahap,
      data.kode,
      props.idAnggaran
    )
    setDetail(rapbsDetail)
    if (rapbsDetail != null && rapbsDetail.length > 0) {
      ref.current.children[1].hidden = !ref.current.children[1].hidden
    }
  }

  return (
    <tbody ref={ref}>
      <tr className={styles.line} onClick={handleClickRow}>
        <td className={styles.code}>{data.kode}</td>
        <td>{data.label}</td>
        <td className={styles.price}>{amountFormatting(data.total)}</td>
        <td className={styles.expand}>
          {isHaveDetail && (
            <Icon as="i" color="default" fontSize="default">
              expand_more
            </Icon>
          )}
        </td>
      </tr>
      <tr hidden={true}>
        <td colSpan={4} style={{ padding: 'unset' }}>
          {detail &&
            detail.length > 0 &&
            detail.map((item: any, index: number) => (
              <KegiatanRowTable key={index} data={item} />
            ))}
        </td>
      </tr>
    </tbody>
  )
}

const KegiatanRowTable = (props: any) => {
  const { data } = props

  return (
    <table
      className={clsx(styles.tableKertasKerja, 'w-full text-left text-base')}
    >
      <tbody>
        <tr className={styles.line}>
          <td className={styles.code}>{data.kode}</td>
          <td>{data.label}</td>
          <td className={styles.price}>{amountFormatting(data.total)}</td>
          <td className={styles.expand}></td>
        </tr>
        <tr className={styles.line}>
          <table className={clsx(styles.tableRekeningBelanja, 'w-full')}>
            <tbody>
              <tr>
                <td
                  className="block"
                  style={{ padding: 'unset', paddingBottom: '8px' }}
                >
                  {data.rekening_belanja &&
                    data.rekening_belanja.length > 0 &&
                    data.rekening_belanja.map((item: any, index: number) => (
                      <RekeningBelanjaRowTable
                        key={index}
                        data={item}
                        isHeader={true}
                      />
                    ))}
                </td>
                <td style={{ padding: 'unset' }}>
                  <div
                    className="overflow-x-scroll scrollBarHor"
                    style={{ width: '750px' }}
                  >
                    {data.rekening_belanja &&
                      data.rekening_belanja.length > 0 &&
                      data.rekening_belanja.map((item: any, index: number) => (
                        <RekeningBelanjaRowTable
                          key={index}
                          data={item}
                          isHeader={false}
                        />
                      ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </tr>
      </tbody>
    </table>
  )
}

const RekeningBelanjaRowTable = (props: any) => {
  const { data } = props
  return (
    <table className={clsx(styles.borderRight, 'w-full')}>
      {props.isHeader && (
        <tbody>
          <tr className={styles.line}>
            <td className={styles.line}></td>
          </tr>
          <tr className={styles.line}>
            <td className={styles.line}>
              <div className="flex">
                <span className={styles.code}>{data.kode}</span>
                <span>{data.label}</span>
              </div>
            </td>
          </tr>
        </tbody>
      )}
      {!props.isHeader && (
        <tbody>
          <tr className={styles.line}>
            {data.bulan.map((bulan: any, index: number) => (
              <td
                key={index}
                colSpan={2}
                className="text-center capitalize-first"
              >
                {bulan.nama}
              </td>
            ))}
            <td
              className={clsx(styles.price, 'text-center')}
              style={{ borderRight: 'unset' }}
            ></td>
          </tr>
          <tr className={styles.line}>
            {data.bulan.map((bulan: any, index: number) => (
              <td
                key={index}
                colSpan={2}
                className="text-center capitalize-first"
              >
                {amountFormatting(bulan.total)}
              </td>
            ))}
            <td
              className={clsx(styles.total, 'block')}
              style={{ borderRight: 'unset' }}
            >
              {amountFormatting(data.total)}
            </td>
          </tr>
        </tbody>
      )}
      {data.uraian &&
        data.uraian.length > 0 &&
        data.uraian.map((item: any, index: number) => (
          <UraianRowTable
            key={index}
            index={index}
            data={item}
            length={data.uraian.length}
            isHeader={props.isHeader}
          />
        ))}
    </table>
  )
}

const UraianRowTable = (props: any) => {
  const { data } = props

  const classLine = props.index !== props.length - 1 ? styles.line : ''

  return (
    <tbody>
      {props.isHeader && (
        <tr className={classLine}>
          <td className={classLine}>
            <div className="flex text-center">
              <span
                className={styles.code}
                style={{ paddingRight: '32px' }}
              ></span>
              <span
                className="flex-1 text-left truncate"
                style={{ paddingRight: '32px' }}
              >
                {data.label}
              </span>
              <span className={clsx(styles.amount, 'flex-none')}>
                {data.jumlah}
              </span>
              <span
                className={clsx(styles.price, 'text-left')}
                style={{ paddingLeft: '32px' }}
              >
                {amountFormatting(data.harga_satuan)}
              </span>
            </div>
          </td>
        </tr>
      )}
      {!props.isHeader && (
        <tr className={classLine}>
          {data.bulan.map((bulan: any) => (
            <>
              <td className="text-center">{bulan.jumlah}</td>
              <td className={clsx(styles.priceMonth, 'block text-center')}>
                {amountFormatting(bulan.total)}
              </td>
            </>
          ))}
          <td className={styles.total} style={{ borderRight: 'unset' }}>
            {amountFormatting(data.total)}
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default TabelMengulasKertasKerjaView
