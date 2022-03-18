import React, { FC, useRef } from 'react'

import { Icon } from '@wartek-id/icon'

import { MODE_MENGULAS } from 'renderer/constants/anggaran'

import { amountFormatting } from 'renderer/utils/number-formatting'

import styles from './index.module.css'

import clsx from 'clsx'

const bulanTahapSatu = ['januari', 'februari', 'maret']

const data = [
  {
    program_kegiatan: {
      kode: '01',
      label: 'Pengembangan Standar Kompetensi Lulusan',
      total: 80000,
      kegiatan: [
        {
          kode: '01.02.03',
          label: 'Pelaksanaan Pendaftaran Peserta Didik Baru',
          total: 40000,
          rekening_belanja: [
            {
              kode: '5.1.2.21.002',
              label: 'Belanja Makanan dan Minuman pada Fasilitas Umum',
              total: 40000,
              bulan: {
                januari: {
                  total: 200,
                },
                februari: {
                  total: 200,
                },
                maret: {
                  total: 200,
                },
              },
              uraian: [
                {
                  label: 'Makan makan ppdp bos',
                  jumlah: 150,
                  total: 2000,
                  bulan: {
                    januari: {
                      jumlah: 2,
                      total: 200,
                    },
                    februari: {
                      jumlah: 2,
                      total: 200,
                    },
                    maret: {
                      jumlah: 2,
                      total: 200,
                    },
                  },
                },
                {
                  label: 'Nasi kotak biasa',
                  jumlah: 100,
                  total: 1500000,
                  bulan: {
                    januari: {
                      jumlah: 25,
                      total: 500000,
                    },
                    februari: {
                      jumlah: 25,
                      total: 500000,
                    },
                    maret: {
                      jumlah: 25,
                      total: 500000,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    program_kegiatan: {
      kode: '02',
      label: 'Pengembangan Standar Kompetensi Lulusan',
      total: 800000,
    },
  },
]

interface TabelMengulasKertasKerjaProps {
  mode: string
}

const TabelMengulasKertasKerjaView: FC<TabelMengulasKertasKerjaProps> = (
  props: TabelMengulasKertasKerjaProps
) => {
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
          <ProgramKegiatanRowTable data={item} key={index} />
        ))}
      </table>
    </div>
  )
}

const ProgramKegiatanRowTable = (props: any) => {
  const ref = useRef(null)

  const { data } = props

  const handleClickRow = () => {
    ref.current.children[1].hidden = !ref.current.children[1].hidden
  }

  return (
    <tbody ref={ref}>
      <tr className={styles.line} onClick={handleClickRow}>
        <td className={styles.code}>{data.program_kegiatan.kode}</td>
        <td>{data.program_kegiatan.label}</td>
        <td className={styles.price}>
          {amountFormatting(data.program_kegiatan.total)}
        </td>
        <td className={styles.expand}>
          <Icon as="i" color="default" fontSize="default">
            expand_more
          </Icon>
        </td>
      </tr>
      <tr hidden={true}>
        <td colSpan={4} style={{ padding: 'unset' }}>
          {data.program_kegiatan.kegiatan &&
            data.program_kegiatan.kegiatan.length > 0 &&
            data.program_kegiatan.kegiatan.map((item: any, index: number) => (
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
        <>
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
        </>
      )}
      {!props.isHeader && (
        <>
          <tr className={styles.line}>
            {bulanTahapSatu.map((bulan) => (
              <td colSpan={2} className="text-center capitalize-first">
                {bulan}
              </td>
            ))}
            <td
              className={clsx(styles.price, 'text-center')}
              style={{ borderRight: 'unset' }}
            ></td>
          </tr>
          <tr className={styles.line}>
            {bulanTahapSatu.map((bulan) => (
              <td colSpan={2} className="text-center capitalize-first">
                {amountFormatting(data.bulan[bulan].total)}
              </td>
            ))}
            <td
              className={clsx(styles.total, 'block')}
              style={{ borderRight: 'unset' }}
            >
              {amountFormatting(data.total)}
            </td>
          </tr>
        </>
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

  const classLine = props.index !== props.length - 1 && styles.line

  return (
    <>
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
                {amountFormatting(data.total)}
              </span>
            </div>
          </td>
        </tr>
      )}
      {!props.isHeader && (
        <tr className={classLine}>
          {bulanTahapSatu.map((bulan) => (
            <>
              <td className="text-center">{data.bulan[bulan].jumlah}</td>
              <td className={clsx(styles.priceMonth, 'block text-center')}>
                {amountFormatting(data.bulan[bulan].total)}
              </td>
            </>
          ))}
          <td className={styles.total} style={{ borderRight: 'unset' }}>
            {amountFormatting(data.total)}
          </td>
        </tr>
      )}
    </>
  )
}

export default TabelMengulasKertasKerjaView
