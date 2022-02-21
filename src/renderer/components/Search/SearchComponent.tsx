import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import styles from './SearchComponent.module.css'

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

interface InputSearchProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputSearch: FC<InputSearchProps> = (props: InputSearchProps) => {
  return (
    <InputGroup>
      <InputLeftAddon>
        <Icon as="i" color="default" fontSize="default">
          search
        </Icon>
      </InputLeftAddon>
      <Input
        type="text"
        placeholder="Apa kegiatan yang ingin Anda anggarkan?"
        onClick={() => props.setOpen(true)}
        onChange={(e) => props.handleChange(e)}
        className={props.open ? 'border-none' : ''}
      />
    </InputGroup>
  )
}

const SearchComponent: FC = () => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (open && ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <div className="w-[888px] bg-white">
      {!open && (
        <InputSearch
          open={open}
          setOpen={setOpen}
          handleChange={handleChange}
        />
      )}
      {open && (
        <table className={clsx(styles.searchTable, 'w-full text-left')}>
          <thead ref={ref} className="text-[14px] font-semibold bg-gray-5">
            <tr>
              <th colSpan={3}>
                <InputSearch
                  open={open}
                  setOpen={setOpen}
                  handleChange={handleChange}
                />
              </th>
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
      )}
    </div>
  )
}

export default SearchComponent
