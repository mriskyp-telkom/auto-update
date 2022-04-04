import React, { FC, useState } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

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
    required: 'Wajib diisi',
    minLength: {
      value: 8,
      message: 'Minimal 8 karakter',
    },
    onBlur: (e: any) => {
      if (e.target.value.length < 8) {
        setError('password', {
          type: 'manual',
          message: 'Minimal 8 karakter',
        })
      } else {
        props.handleClearError('password')
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
