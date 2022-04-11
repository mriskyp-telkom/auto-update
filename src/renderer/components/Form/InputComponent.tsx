import React, { FC } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input } from '@wartek-id/input'

import {
  isFormatEmailValid,
  isEmailValid,
  isOnlyAlphabet,
} from 'renderer/utils/form-validation'

import {
  ERROR_REQUIRED,
  EMAIL_ERROR_FORMAT,
  EMAIL_ERROR_VALIDATION,
  ERROR_ALPHABET_ONLY,
} from 'renderer/constants/errorForm'

interface InputProps {
  type: 'text' | 'email' | 'alphabet'
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
      required: ERROR_REQUIRED,
    }
  }

  if (type === 'email') {
    validation = {
      ...validation,
      validate: {
        allowChar: (v) => isEmailValid(v) || EMAIL_ERROR_VALIDATION,
        format: (v) => isFormatEmailValid(v) || EMAIL_ERROR_FORMAT,
      },
      onBlur: (e) => {
        const value = e.target.value
        if (value !== '' && !isEmailValid(value)) {
          setError(name, {
            type: 'manual',
            message: EMAIL_ERROR_VALIDATION,
          })
          return
        }
        if (value !== '' && !isFormatEmailValid(value)) {
          setError(name, {
            type: 'manual',
            message: EMAIL_ERROR_FORMAT,
          })
          return
        }

        props.handleClearError(name)
      },
      onChange: (e) => {
        const value = e.target.value
        if (
          required &&
          value !== '' &&
          errors[name]?.message === ERROR_REQUIRED
        ) {
          props.handleClearError(name)
          return
        }
        if (errors[name]?.message === EMAIL_ERROR_VALIDATION) {
          if (value !== '' && isEmailValid(value)) {
            props.handleClearError(name)
            return
          }
        }
        if (errors[name]?.message === EMAIL_ERROR_FORMAT) {
          if (value !== '' && isFormatEmailValid(value)) {
            props.handleClearError(name)
            return
          }
        }
      },
    }
  }

  if (type === 'alphabet') {
    validation = {
      ...validation,
      validate: {
        onlyAlphabet: (v) => isOnlyAlphabet(v) || ERROR_ALPHABET_ONLY,
      },
      onBlur: (e) => {
        const value = e.target.value
        if (value !== '' && !isOnlyAlphabet(value)) {
          setError(name, {
            type: 'manual',
            message: ERROR_ALPHABET_ONLY,
          })
          return
        }

        props.handleClearError(name)
      },
      onChange: (e) => {
        const value = e.target.value
        if (required && errors[name]?.message === ERROR_REQUIRED) {
          if (value !== '') {
            props.handleClearError(name)
            return
          }
        }
        if (errors[name]?.message === ERROR_ALPHABET_ONLY) {
          if (value !== '' && isOnlyAlphabet(value)) {
            props.handleClearError(name)
            return
          }
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
