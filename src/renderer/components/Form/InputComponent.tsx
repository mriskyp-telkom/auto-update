import React, { FC } from 'react'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

import { Input } from '@wartek-id/input'
import { numberUtils } from '@wartek-id/fe-toolbox'

import { InputType } from 'renderer/types/ComponentType'

import {
  isFormatEmailValid,
  isEmailValid,
  isOnlyAlphabet,
  isNameValid,
} from 'renderer/utils/form-validation'

import {
  NAMA_ERROR_VALIDATION,
  EMAIL_ERROR_FORMAT,
  EMAIL_ERROR_NOT_REGISTERED,
  EMAIL_ERROR_REGISTERED,
  EMAIL_ERROR_VALIDATION,
  ERROR_ALPHABET_ONLY,
  ERROR_REQUIRED,
  KODE_AKTIVASI_ERROR_WRONG,
  NPSN_ERROR_LENGTH,
  NPSN_ERROR_NOT_REGISTERED,
  ERROR_NOMINAL_MINLENGTH,
} from 'renderer/constants/errorForm'

import includes from 'lodash/includes'

import clsx from 'clsx'

interface InputProps {
  type: InputType
  required?: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  setError?: (name: string, error: FieldError) => void
  handleClearError?: (name: string) => void
  setValue?: (name: string, value: string) => void
  registerOption?: RegisterOptions
  className?: string
}

const error_server = [
  KODE_AKTIVASI_ERROR_WRONG,
  NPSN_ERROR_NOT_REGISTERED,
  EMAIL_ERROR_REGISTERED,
  EMAIL_ERROR_NOT_REGISTERED,
]

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
    setValue,
  } = props

  const clearErrorRequired = (value: string) => {
    if (required && value !== '' && errors[name]?.message === ERROR_REQUIRED) {
      props.handleClearError(name)
      return
    }
  }

  const clearErrorServer = (value: string) => {
    if (value !== '' && includes(error_server, errors[name]?.message)) {
      props.handleClearError(name)
      return
    }
  }

  let validation = {
    ...props.registerOption,
    onChange: (e: any) => {
      const value = e.target.value
      clearErrorServer(value)
      props.registerOption?.onChange(e)
    },
  }

  if (required) {
    validation = {
      ...validation,
      required: ERROR_REQUIRED,
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
      },
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
        if (value !== '') {
          if (!isEmailValid(value)) {
            setError(name, {
              type: 'manual',
              message: EMAIL_ERROR_VALIDATION,
            })
            return
          }

          if (!isFormatEmailValid(value)) {
            setError(name, {
              type: 'manual',
              message: EMAIL_ERROR_FORMAT,
            })
            return
          }
        }
        props.handleClearError(name)
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (value !== '') {
          if (
            isEmailValid(value) &&
            errors[name]?.message === EMAIL_ERROR_VALIDATION
          ) {
            props.handleClearError(name)
            return
          }
          if (
            isFormatEmailValid(value) &&
            errors[name]?.message === EMAIL_ERROR_FORMAT
          ) {
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
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (errors[name]?.message === ERROR_ALPHABET_ONLY) {
          if (value !== '' && isOnlyAlphabet(value)) {
            props.handleClearError(name)
            return
          }
        }
      },
    }
  }

  if (type === 'name') {
    validation = {
      ...validation,
      validate: {
        allowChar: (v) => isNameValid(v) || NAMA_ERROR_VALIDATION,
      },
      onBlur: (e) => {
        const value = e.target.value
        if (value !== '' && !isNameValid(value)) {
          setError(name, {
            type: 'manual',
            message: NAMA_ERROR_VALIDATION,
          })
          return
        }
        props.handleClearError(name)
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (errors[name]?.message === NAMA_ERROR_VALIDATION) {
          if (value !== '' && isNameValid(value)) {
            props.handleClearError(name)
            return
          }
        }
      },
    }
  }

  if (type === 'nominal') {
    validation = {
      ...validation,
      validate: {
        ...props.registerOption?.validate,
        minLength: (v: any) => {
          const value = v.replace(/[^,\d]/g, '').toString()
          return value >= 10 || ERROR_NOMINAL_MINLENGTH
        },
      },
      onBlur: (e) => {
        const value = e.target.value.replace(/[^,\d]/g, '').toString()

        if (value < 10) {
          setError(name, {
            type: 'manual',
            message: ERROR_NOMINAL_MINLENGTH,
          })
          return
        }
        props.handleClearError(name)
        props.registerOption?.onBlur(e)
      },
      onChange: (e) => {
        const value = e.target.value.replace(/[^,\d]/g, '').toString()
        const maxDigit = value.replace(/\D/g, '').replace(/(\d{12})(\d)/, '$1')
        const format = `Rp ${numberUtils.delimit(maxDigit, '.')}`

        if (value !== null) {
          setValue(name, format)
        }

        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (value >= 10 && errors[name]?.message === ERROR_NOMINAL_MINLENGTH) {
          props.handleClearError(name)
          return
        }
      },
    }
  }

  if (name === 'npsn') {
    validation = {
      ...validation,
      validate: {
        minMaxLength: (v) => v.length === 8 || NPSN_ERROR_LENGTH,
      },
      onBlur: (e) => {
        const value = e.target.value
        if (value !== '' && value.length !== 8) {
          setError(name, {
            type: 'manual',
            message: NPSN_ERROR_LENGTH,
          })
          return
        }
        props.handleClearError(name)
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (value.length === 8 && errors.npsn?.message === NPSN_ERROR_LENGTH) {
          props.handleClearError(name)
          return
        }
      },
    }
  }

  return (
    <Input
      type="text"
      className={clsx(
        props.isDisabled && 'cursor-not-allowed',
        props.className
      )}
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

InputComponent.defaultProps = {
  required: false,
}

export default InputComponent
