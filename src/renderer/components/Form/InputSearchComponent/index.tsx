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
  height?: number
  required: boolean
  isDisabled?: boolean
  name: string
  defaultValue: string
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
  const [data, setData] = useState([])

  const {
    required,
    name,
    placeholder,
    isDisabled,
    errors,
    defaultValue,
    register,
  } = props

  let validation = {}

  if (required) {
    validation = {
      ...validation,
      required: 'Wajib diisi',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e)
      },
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!open) {
      setOpen(true)
    }
    setQuery(value)
  }

  const filterOptions = (query: string) => {
    const lowercasedFilter = query.toLowerCase()
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
    const begin = item?.toLowerCase().indexOf(query.toLowerCase())
    const end = query.length
    const tempItem = item
    const textReplace = tempItem?.substr(begin, end)
    if (begin > -1) {
      return item.replace(textReplace, '<b>' + textReplace + '</b>')
    }
    return item
  }

  const handleClickOutside = (event: any) => {
    if (open && ref.current && !ref.current.contains(event.target)) {
      const inputValue = ref.current.children[0].children[1].children[0].value
      handleSendData('', name, inputValue, defaultValue)
    }
  }

  const handleClick = (event: any) => {
    const id = event.target.dataset.id
    const value = event.target.dataset.value
    handleSendData(id, name, value, defaultValue)
  }

  const getValueDisplay = (data: any) => {
    const fieldShow = filter(props.headers, ['show', true])[0].key
    return data[fieldShow]
  }

  const handleSendData = (
    id: string | number,
    name: string,
    value: string,
    defaultValue: string
  ) => {
    setQuery(value)
    const sendData = {
      id: id,
      name: name,
      value: value,
      defaultValue: defaultValue,
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

  useEffect(() => {
    filterOptions(query)
  }, [query])

  useEffect(() => {
    setData(props.dataOptions)
  }, [props.dataOptions])

  return (
    <div ref={ref} className="relative">
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
          className={clsx(
            open
              ? 'border-none rounded-none focus:rounded-t focus:border-solid focus:border focus:border-b-0'
              : '',
            'text-base'
          )}
          isDisabled={isDisabled}
          isInvalid={open ? false : !!errors[name]}
          errorMessage={open ? '' : errors[name]?.message}
          {...register(name, validation)}
        />
      </InputGroup>
      {open && (
        <table
          className={clsx(
            styles.searchTable,
            'grid text-left absolute z-10 bg-white'
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
          <tbody
            className="text-[14px] font-normal"
            style={{ height: `${props.height}px` }}
          >
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
                    data-id={data.id}
                    data-value={getValueDisplay(data)}
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
  height: 100,
}

export default InputSearchComponent
