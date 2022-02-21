import React, { FC, useState, ChangeEvent } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { InputGroup, InputLeftAddon, Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import OptionsSearch from './OptionsSearch'

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

  const { required, name, placeholder, isDisabled, errors, register } = props

  let validation = {}

  if (required) {
    validation = {
      ...validation,
      required: 'Wajib diisi',
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
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
          onChange={(e) => handleChange(e)}
          className={open ? 'border-none' : ''}
          isDisabled={isDisabled}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message}
          {...register(name, validation)}
        />
      </InputGroup>
    )
  }

  return (
    <div className={`w-[${props.width}px] bg-white`}>
      {!open && InputSearch()}
      {open && (
        <OptionsSearch open={open} setOpen={setOpen}>
          {InputSearch()}
        </OptionsSearch>
      )}
    </div>
  )
}

export default InputSearchComponent
