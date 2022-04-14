import React, { FC, useState } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import {
  ERROR_REQUIRED,
  PASSWORD_ERROR_MINLENGTH,
  PASSWORD_ERROR_WRONG,
} from 'renderer/constants/errorForm'

import isEmpty from 'lodash/isEmpty'

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

  const [isFocus, setIsFocus] = useState(false)
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
        return
      }
      setIsFocus(false)
      props.handleClearError(name)
    },
    onChange: (e: any) => {
      const value = e.target.value
      if (value !== '' && errors[name]?.message === ERROR_REQUIRED) {
        props.handleClearError(name)
        return
      }
      if (
        value.length > 7 &&
        errors[name]?.message === PASSWORD_ERROR_MINLENGTH
      ) {
        props.handleClearError(name)
        return
      }
      if (value !== '' && errors[name]?.message === PASSWORD_ERROR_WRONG) {
        props.handleClearError(name)
        return
      }
    },
  }

  const showInfoLength = isFocus && isEmpty(errors[name]) && name === 'password'

  return (
    <>
      <InputGroup>
        <Input
          type={visibilityPassword ? 'text' : 'password'}
          placeholder="Masukkan password"
          id={name}
          name={name}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message}
          onClick={() => setIsFocus(true)}
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
      {showInfoLength && (
        <div className="text-tiny font-normal text-gray-600 pt-1">
          {PASSWORD_ERROR_MINLENGTH}
        </div>
      )}
    </>
  )
}

export default InputPasswordComponent
