import React, { FC } from 'react'
import {
  FieldErrors,
  FieldError,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'

import { Input } from '@wartek-id/input'
import { numberUtils } from '@wartek-id/fe-toolbox'

import { InputType } from 'renderer/types/ComponentType'

import {
  isFormatEmailValid,
  isEmailValid,
  isOnlyAlphabet,
  isNameValid,
} from 'renderer/utils/form-validation'
import { findValueDeep } from 'renderer/utils/array-util'

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
import isEmpty from 'lodash/isEmpty'

import clsx from 'clsx'

/*
  not using these props below any more
  errors, register, setError, setValue, handleClearError
  note: delete this after all components has been updated
*/

interface InputProps {
  type: InputType
  required?: boolean
  isDisabled?: boolean
  name: string
  placeholder: string
  errors?: FieldErrors
  register?: (arg0: string, arg1: RegisterOptions) => void
  setError?: (name: string, error: FieldError) => void
  handleClearError?: (name: string) => void
  setValue?: (name: string, value: string) => void
  registerOption?: RegisterOptions
  className?: string
  label?: string
  minDigit?: number
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
    required = false,
    isDisabled,
    placeholder,
    name,
    minDigit = 2,
    label = '',
  } = props

  const {
    setValue,
    setError,
    clearErrors,
    register,
    formState: { errors },
  } = useFormContext()

  const handleClearError = () => {
    clearErrors(name)
  }

  const clearErrorRequired = (value: string) => {
    if (required && value !== '' && errors[name]?.message === ERROR_REQUIRED) {
      handleClearError()
      return
    }
  }

  const clearErrorServer = (value: string) => {
    if (value !== '' && includes(error_server, errors[name]?.message)) {
      handleClearError()
      return
    }
  }

  let validation = {
    ...props.registerOption,
    required: {
      value: required,
      message: ERROR_REQUIRED,
    },
    onChange: (e: any) => {
      const value = e.target.value
      clearErrorRequired(value)
      clearErrorServer(value)
      props.registerOption?.onChange(e)
    },
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
        handleClearError()
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
            handleClearError()
            return
          }
          if (
            isFormatEmailValid(value) &&
            errors[name]?.message === EMAIL_ERROR_FORMAT
          ) {
            handleClearError()
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
        handleClearError()
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (errors[name]?.message === ERROR_ALPHABET_ONLY) {
          if (value !== '' && isOnlyAlphabet(value)) {
            handleClearError()
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
        handleClearError()
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (errors[name]?.message === NAMA_ERROR_VALIDATION) {
          if (value !== '' && isNameValid(value)) {
            handleClearError()
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
          return (
            value.length >= minDigit || ERROR_NOMINAL_MINLENGTH(label, minDigit)
          )
        },
      },
      onBlur: (e) => {
        const value = e.target.value.replace(/[^,\d]/g, '').toString()
        if (value.length < minDigit) {
          setError(name, {
            type: 'manual',
            message: ERROR_NOMINAL_MINLENGTH(label, minDigit),
          })
          return
        }
        handleClearError()
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
        if (
          value.length >= minDigit &&
          errors[name]?.message === ERROR_NOMINAL_MINLENGTH(label, minDigit)
        ) {
          handleClearError()
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
        handleClearError()
      },
      onChange: (e) => {
        const value = e.target.value
        clearErrorRequired(value)
        clearErrorServer(value)
        props.registerOption?.onChange(e)
        if (value.length === 8 && errors.npsn?.message === NPSN_ERROR_LENGTH) {
          handleClearError()
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
      isInvalid={!isEmpty(findValueDeep(errors, name))}
      errorMessage={findValueDeep(errors, name)?.message}
      {...register(name, validation)}
    />
  )
}

export default InputComponent
