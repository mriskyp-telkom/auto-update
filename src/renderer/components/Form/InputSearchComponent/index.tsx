import React, { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { FieldErrors, RegisterOptions, useFormContext } from 'react-hook-form'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import filter from 'lodash/filter'

import styles from './index.module.css'

import clsx from 'clsx'

interface InputSearchProps {
  dataOptions?: Array<any>
  enableAdd?: boolean
  errors: FieldErrors
  headers?: Array<any>
  headerShow?: boolean
  maxHeight?: number
  isDisabled?: boolean
  name: string
  placeholder: string
  required: boolean
  width: number
  customNotFound?: (query: string) => React.ReactNode
  onClick: (e: any) => void
  register: (arg0: string, arg1: RegisterOptions) => void
}

const InputSearchComponent: FC<InputSearchProps> = (
  props: InputSearchProps
) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [isMatch, setIsMatch] = useState(false)

  const {
    enableAdd = false,
    errors,
    headerShow = true,
    maxHeight = 100,
    isDisabled,
    name,
    placeholder,
    required,
    register,
  } = props

  const { setValue, setFocus, clearErrors } = useFormContext()

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
    setIsMatch(false)
    setData(
      props.dataOptions.filter((item: any) => {
        const res = Object.keys(item).some((key) => {
          if (item[key].toLowerCase() === lowercasedFilter) {
            setIsMatch(true)
          }
          return `${item[key]}`.toLowerCase().includes(lowercasedFilter)
        })
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
      handleSendData('clickOutside', '', '')
    }
  }

  const handleClick = (event: any) => {
    const id = event.target.dataset.id
    const value = event.target.dataset.value
    handleSendData('clickRow', id, value)
  }

  const handleClickAdd = () => {
    setIsMatch(true)
    handleSendData('clickAdd', '', query)
  }

  const getValueDisplay = (data: any) => {
    const fieldShow = filter(props.headers, ['show', true])[0].key
    return data[fieldShow]
  }

  const handleSendData = (
    event: 'clickOutside' | 'clickRow' | 'clickAdd',
    id: string | number,
    value: string
  ) => {
    let sendData = false
    if (event === 'clickOutside') {
      if (query !== '') {
        setValue(name, selected, { shouldDirty: true })
      }
      if (query === '') {
        setValue(name, '', { shouldDirty: true })
        setSelected('')
      }
      setFocus(name)
      setQuery('')
    }
    if (event === 'clickRow' || event === 'clickAdd') {
      sendData = true
      clearErrors(name)
      setSelected(value)
      setValue(name, value, { shouldDirty: true })
      setQuery(value)
    }

    setOpen(false)

    if (sendData) {
      const sendData = {
        id: id,
        name: name,
        value: value,
      }
      props.onClick(sendData)
    }
  }

  const getDropdownView = () => {
    if (data.length === 0 && props.customNotFound !== undefined) {
      return (
        <div className={clsx(styles.dropdownOptions, 'absolute z-10')}>
          {props.customNotFound(query)}
        </div>
      )
    }

    return (
      <table
        className={clsx(
          styles.searchTable,
          'grid text-left absolute z-10 bg-white'
        )}
        style={{ width: `${props.width - 8}px` }}
      >
        <thead className="text-[14px] font-semibold bg-gray-5">
          {headerShow && (
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
          className="text-base font-normal"
          style={{ maxHeight: `${maxHeight}px` }}
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
        {!isMatch && query.length > 0 && enableAdd && (
          <tfoot className="text-base font-normal">
            <tr onClick={handleClickAdd}>
              <td>
                + Tambah <b>“{query}”</b>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    )
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
      {open && getDropdownView()}
    </div>
  )
}

export default InputSearchComponent
