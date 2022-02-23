import React, { FC, useState, ChangeEvent } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import OptionsSearch from './OptionsSearch'

const datas: Array<any> = [
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
  width: number
  required: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
}

const InputSearchComponent: FC<InputSearchProps> = (
  props: InputSearchProps
) => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [data, setData] = useState(datas)

  const { required, name, placeholder, isDisabled, errors, register } = props

  let validation = {}

  if (required) {
    validation = {
      ...validation,
      required: 'Wajib diisi',
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e),
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const lowercasedFilter = value.toLowerCase()
    setFilter(value)
    setData(
      datas.filter((item) => {
        const res = Object.keys(item).some((key) =>
          `${item[key]}`.toLowerCase().includes(lowercasedFilter)
        )
        return res
      })
    )
  }

  const InputSearch = () => {
    return (
      <InputGroup>
        <InputLeftAddon>
          <Icon as="i" color="default" fontSize="default">
            search
          </Icon>
        </InputLeftAddon>
        <Input
          type="text"
          placeholder={placeholder}
          id={name}
          name={name}
          onClick={() => setOpen(true)}
          className={open ? 'border-none rounded-none' : ''}
          isDisabled={isDisabled}
          isInvalid={open ? false : !!errors[name]}
          errorMessage={open ? '' : errors[name]?.message}
          {...register(name, validation)}
        />
      </InputGroup>
    )
  }

  return (
    <div className={`w-[${props.width}px] bg-white`}>
      {!open && InputSearch()}
      {open && (
        <OptionsSearch
          open={open}
          setOpen={setOpen}
          dataOptions={data}
          filter={filter}
        >
          {InputSearch()}
        </OptionsSearch>
      )}
    </div>
  )
}

export default InputSearchComponent
