import React, { FC, useState, useEffect, useRef } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { Input } from '@wartek-id/input'

import styles from './index.module.css'

import clsx from 'clsx'

interface InputWithInfoProps {
  width: number
  headers?: Array<any>
  dataOptions?: Array<any>
  headerShow?: boolean
  required: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  registerOption?: RegisterOptions
}

const InputWithInfoComponent: FC<InputWithInfoProps> = (
  props: InputWithInfoProps
) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const { required, name, placeholder, isDisabled, errors, register } = props

  let validation = {
    ...props.registerOption,
  }

  if (required) {
    validation = {
      ...validation,
      required: 'Wajib diisi',
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (open && ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <div ref={ref}>
      <Input
        type="text"
        placeholder={placeholder}
        id={name}
        name={name}
        onClick={() => setOpen(true)}
        className={clsx(open ? 'border-none rounded-none' : '', 'text-base')}
        isDisabled={isDisabled}
        isInvalid={open ? false : !!errors[name]}
        errorMessage={open ? '' : errors[name]?.message}
        style={
          open
            ? {
                boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)',
                borderRadius: '4px 4px 0px 0px',
              }
            : {}
        }
        {...register(name, validation)}
      />
      {open && (
        <table
          className={clsx(
            styles.searchTable,
            'text-left absolute z-10 bg-white'
          )}
          style={{ width: `${props.width}px` }}
        >
          <thead className="text-[14px] font-semibold bg-gray-5">
            <tr className={styles.headerTable} style={{ display: 'flex' }}>
              {props.headers?.map((header: any) => (
                <th key={header.key} style={{ width: header.width }}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`text-[14px] font-normal`}>
            {props.dataOptions?.map((data: any, indexData) => (
              <tr key={indexData} style={{ display: 'flex' }}>
                {props.headers?.map((header: any) => (
                  <td key={header.key} style={{ width: header.width }}>
                    {data[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default InputWithInfoComponent
