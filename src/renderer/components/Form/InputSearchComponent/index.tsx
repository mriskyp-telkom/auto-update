import React, { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import filter from 'lodash/filter'

import styles from './index.module.css'

import clsx from 'clsx'

interface InputSearchProps {
  headers?: Array<any>
  dataOptions?: Array<any>
  headerShow?: boolean
  width: number
  required: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  onClick: (e: any) => void
}

const InputSearchComponent: FC<InputSearchProps> = (
  props: InputSearchProps
) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [data, setData] = useState(props.dataOptions)

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
    setQuery(value)
    setData(
      props.dataOptions.filter((item: any) => {
        const res = Object.keys(item).some((key) =>
          `${item[key]}`.toLowerCase().includes(lowercasedFilter)
        )
        return res
      })
    )
  }

  const makeBold = (item: string) => {
    const begin = item.toLowerCase().indexOf(query.toLowerCase())
    const end = query.length
    const tempItem = item
    const textReplace = tempItem.substr(begin, end)
    if (begin > -1) {
      return item.replace(textReplace, '<b>' + textReplace + '</b>')
    }
    return item
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (open && ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }

  const handleClick = (event: any) => {
    const id = event.target.dataset.id
    const name = event.target.dataset.name
    const fieldShow = filter(props.headers, ['show', true])[0].key
    const value = filter(props.dataOptions, ['id', parseInt(id)])[0][fieldShow]
    const sendData = {
      id: id,
      name: name,
      value: value,
    }
    setOpen(false)
    props.onClick(sendData)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <div ref={ref}>
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
      </InputGroup>
      {open && (
        <table
          className={clsx(
            styles.searchTable,
            'text-left absolute z-10 bg-white'
          )}
          style={{ width: `${props.width - 8}px` }}
        >
          <thead className="text-[14px] font-semibold bg-gray-5">
            {props.headerShow && (
              <tr className={styles.headerTable} style={{ display: 'flex' }}>
                {props.headers?.map((header: any) => (
                  <th key={header.key} style={{ width: header.width }}>
                    {header.label}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody className={`text-[14px] font-normal`}>
            {data?.map((data: any, indexData) => (
              <tr
                key={indexData}
                className="hover:bg-gray-5 cursor-pointer"
                onClick={handleClick}
                style={{ display: 'flex' }}
              >
                {props.headers?.map((header: any) => (
                  <td
                    key={header.key}
                    dangerouslySetInnerHTML={{
                      __html: makeBold(data[header.key]),
                    }}
                    data-name={props.name}
                    data-id={data.id}
                    style={{ width: header.width }}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

InputSearchComponent.defaultProps = {
  headerShow: true,
}

export default InputSearchComponent
