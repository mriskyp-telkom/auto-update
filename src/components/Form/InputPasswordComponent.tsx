import React, { FC, useState } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

interface InputPasswordProps {
  name: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
}

const InputPasswordComponent: FC<InputPasswordProps> = (
  props: InputPasswordProps
) => {
  const { name, errors, register } = props
  const [visibilityPassword, setVisibilityPassword] = useState(false)

  return (
    <InputGroup>
      <Input
        type={visibilityPassword ? 'text' : 'password'}
        placeholder="Masukkan password"
        id={name}
        name={name}
        isInvalid={!!errors[name]}
        errorMessage={errors[name]?.message}
        {...register(name, {
          required: 'Wajib diisi',
          minLength: {
            value: 8,
            message: 'Minimal 8 karakter',
          },
        })}
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
