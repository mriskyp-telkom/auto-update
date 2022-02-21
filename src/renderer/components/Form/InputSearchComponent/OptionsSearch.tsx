import React, { FC, useEffect, useRef } from 'react'

import styles from './index.module.css'

import clsx from 'clsx'

const datas = [
  {
    id: 1,
    kode: '03.02.01',
    program: 'Pengembangan Standar Proses',
    kegiatan: 'Pelaksanaan Pendaftaran Peserta Didik Baru (PPDB)',
  },
  {
    id: 2,
    kode: '02.02.01',
    program: 'Pengembangan Standar Isi',
    kegiatan: 'Penyusunan Kompetensi Ketuntasan Minimum',
  },
  {
    id: 3,
    kode: '01.02.01',
    program: 'Pengembangan Kompetensi Lulusan Pengajar/Guru',
    kegiatan: 'Pelaksanaan Uji Coba UASBN Tk.kecamatan',
  },
  {
    id: 4,
    kode: '01.03.01',
    program: 'Pengembangan Kompetensi Lulusan Pengajar/Guru',
    kegiatan: 'Pemantapan Persiapan Ujian/Try Out',
  },
  {
    id: 5,
    kode: '01.04.01',
    program: 'Pengembangan Kompetensi Lulusan Pengajar/Guru',
    kegiatan: 'Pelaksanaan Ujian Nasional',
  },
  {
    id: 6,
    kode: '03.02.02',
    program: 'Pengembangan Standar Proses',
    kegiatan: 'Pelaksanaan Ujian Sekolah Berstandar Nasional',
  },
  {
    id: 7,
    kode: '03.02.03',
    program: 'Pengembangan Standar Proses',
    kegiatan: 'Pemugaran Sarana Prasarana',
  },
]

interface OptionsSearchProps {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

const OptionsSearch: FC<OptionsSearchProps> = (props: OptionsSearchProps) => {
  const ref = useRef(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (props.open && ref.current && !ref.current.contains(event.target)) {
      props.setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <table className={clsx(styles.searchTable, 'w-full text-left')}>
      <thead ref={ref} className="text-[14px] font-semibold bg-gray-5">
        <tr>
          <th colSpan={3}>{props.children}</th>
        </tr>
        <tr>
          <th>Kode</th>
          <th>Program</th>
          <th>Kegiatan</th>
        </tr>
      </thead>
      <tbody className="text-[14px] font-normal truncate">
        {datas.map((data) => (
          <tr key={data.id} className="hover:bg-gray-5 cursor-pointer">
            <td>{data.kode}</td>
            <td>{data.program}</td>
            <td>{data.kegiatan}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OptionsSearch
