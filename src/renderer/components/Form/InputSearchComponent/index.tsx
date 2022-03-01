import React, { FC, useState, ChangeEvent, useRef } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import OptionsSearch from './OptionsSearch'

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
  const ref = useRef()

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
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
    setFilter(value)
    setData(
      props.dataOptions.filter((item: any) => {
        const res = Object.keys(item).some((key) =>
          `${item[key]}`.toLowerCase().includes(lowercasedFilter)
        )
        return res
      })
    )
  }

  const InputSearch = React.memo(() => {
    return (
      <InputGroup>
        <InputLeftAddon>
          <Icon as="i" color="default" fontSize="default">
            search
          </Icon>
        </InputLeftAddon>
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          id={name}
          name={name}
          onClick={() => setOpen(true)}
          className={clsx(open ? 'border-none rounded-none' : '', 'text-base')}
          isDisabled={isDisabled}
          isInvalid={open ? false : !!errors[name]}
          errorMessage={open ? '' : errors[name]?.message}
          {...register(name, validation)}
        />
      </InputGroup>
    )
  })

  return (
    <>
      {!open && <InputSearch />}
      {open && (
        <OptionsSearch
          name={props.name}
          width={props.width}
          open={open}
          setOpen={setOpen}
          headerShow={props.headerShow}
          headers={props.headers}
          dataOptions={data}
          filter={filter}
          onClick={props.onClick}
        >
          <InputSearch />
        </OptionsSearch>
      )}
    </>
  )
}

export default InputSearchComponent
