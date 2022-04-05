import React, { FC, useState } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import {
  ERROR_REQUIRED,
  PASSWORD_ERROR_MINLENGTH,
} from 'renderer/constants/errorForm'

interface InputPasswordProps {
  name: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  setError?: (name: string, error: FieldError) => void
  handleClearError?: (name: string) => void
}

const InputPasswordComponent: FC<InputPasswordProps> = (
  props: InputPasswordProps
) => {
  const { name, errors, register, setError } = props
  const [visibilityPassword, setVisibilityPassword] = useState(false)

  const validation = {
    required: ERROR_REQUIRED,
    minLength: {
      value: 8,
      message: PASSWORD_ERROR_MINLENGTH,
    },
    onBlur: (e: any) => {
      const value = e.target.value
      if (value.length > 0 && value.length < 8) {
        setError(name, {
          type: 'manual',
          message: PASSWORD_ERROR_MINLENGTH,
        })
      } else {
        props.handleClearError(name)
      }
    },
    onChange: (e: any) => {
      const value = e.target.value
      if (errors[name]?.message === ERROR_REQUIRED) {
        if (value !== '') {
          props.handleClearError(name)
          return
        }
      }
      if (errors[name]?.message === PASSWORD_ERROR_MINLENGTH) {
        if (value.length > 7) {
          props.handleClearError(name)
          return
        }
      }
    },
  }

  return (
    <InputGroup>
      <Input
        type={visibilityPassword ? 'text' : 'password'}
        placeholder="Masukkan password"
        id={name}
        name={name}
        isInvalid={!!errors[name]}
        errorMessage={errors[name]?.message}
        {...register(name, validation)}
      />
      <InputRightAddon>
        <Icon
          as="i"
          color="default"
          fontSize="default"
          onClick={() => setVisibilityPassword(!visibilityPassword)}
          className="pointer-events-initial"
        >
          {visibilityPassword ? 'visibility' : 'visibility_off'}
        </Icon>
      </InputRightAddon>
    </InputGroup>
  )
}

export default InputPasswordComponent
