import React, { FC } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { Input } from '@wartek-id/input'

import { emailRegex } from '../../constants/regex'

interface InputProps {
  type: 'text' | 'email'
  required: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  registerOption?: RegisterOptions
  className?: string
}

const InputComponent: FC<InputProps> = (props: InputProps) => {
  const { type, required, isDisabled, placeholder, name, errors, register } =
    props

  let validation = {}

  if (required) {
    validation = {
      ...validation,
      required: 'Wajib diisi',
    }
  }

  if (type === 'email') {
    validation = {
      ...validation,
      pattern: {
        value: emailRegex,
        message: 'Masukkan email dengan contoh format arini@yahoo.com',
      },
    }
  }

  return (
    <Input
      type="text"
      className={props.className}
      placeholder={placeholder}
      isDisabled={isDisabled}
      id={name}
      name={name}
      isInvalid={!!errors[name]}
      errorMessage={errors[name]?.message}
      {...register(name, validation)}
    />
  )
}

export default InputComponent
