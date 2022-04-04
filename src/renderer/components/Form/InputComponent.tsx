import React, { FC } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input } from '@wartek-id/input'

import { isEmailValid } from 'renderer/utils/form-validation'
import { emailRegex } from 'renderer/constants/regex'

interface InputProps {
  type: 'text' | 'email'
  required: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  setError?: (name: string, error: FieldError) => void
  handleClearError?: (name: string) => void
  registerOption?: RegisterOptions
  className?: string
}

const InputComponent: FC<InputProps> = (props: InputProps) => {
  const {
    type,
    required,
    isDisabled,
    placeholder,
    name,
    errors,
    setError,
    register,
  } = props

  let validation = {
    ...props.registerOption,
  }

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
      onBlur: (e) => {
        if (!isEmailValid(e.target.value)) {
          setError('email', {
            type: 'manual',
            message: 'Masukkan email dengan contoh format arini@yahoo.com',
          })
        } else {
          props.handleClearError('email')
        }
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
