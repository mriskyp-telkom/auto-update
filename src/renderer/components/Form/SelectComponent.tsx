import React, { FC, useState, useRef, useEffect } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import { Listbox } from '@headlessui/react'

import { Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { ERROR_REQUIRED } from 'renderer/constants/errorForm'

import { amountFormatting } from 'renderer/utils/number-formatting'

import clsx from 'clsx'

interface SelectProps {
  border?: boolean
  isDisabled?: boolean
  name: string
  options: any
  placeholder?: string
  required?: boolean
  selected?: string
  registerOption?: RegisterOptions
  width?: number
  handleSelect: (value: string) => void
}

const SelectComponent: FC<SelectProps> = (props: SelectProps) => {
  const ref = useRef(null)

  const [selectedValue, setSelectedValue] = useState(null)

  const { name, required = false, placeholder = 'Pilih', border = true } = props

  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext()

  const isInvalid = !!errors[name]

  const clearErrorRequired = (value: string) => {
    if (required && value !== '' && errors[name]?.message === ERROR_REQUIRED) {
      clearErrors(name)
      return
    }
  }

  let validation = {
    ...props.registerOption,
    onChange: (e: any) => {
      props.registerOption?.onChange(e)
    },
  }

  if (required) {
    validation = {
      ...validation,
      required: ERROR_REQUIRED,
      onChange: (e: any) => {
        const value = e.target.value
        clearErrorRequired(value)
        props.registerOption?.onChange(e)
      },
    }
  }

  const handleChange = (value: any) => {
    setSelectedValue(value)
    setValue(name, value, { shouldValidate: true })
    props.handleSelect(value)
  }

  const getOptions = (isOptions: boolean, option: any) => {
    const isObject = selectedValue !== null && typeof option === 'object'
    if (isObject && name === 'transaction_type') {
      return (
        <div className="w-full flex justify-between items-center">
          <span>{option.label}</span>
          <span
            className={clsx(
              option.amount > 0 ? 'text-blue-700' : 'text-red-600',
              'text-tiny font-semibold'
            )}
          >
            {option.amount <= 0 && isOptions
              ? option.errorInfo.replace(
                  '$amount',
                  amountFormatting(option.amount)
                )
              : option.additionalInfo.replace(
                  '$amount',
                  amountFormatting(option.amount)
                )}
          </span>
        </div>
      )
    }
    return <span className="capitalize-first">{option || placeholder}</span>
  }

  useEffect(() => {
    setSelectedValue(props.selected)
  }, [])

  return (
    <div ref={ref}>
      <Input
        type="text"
        className="hidden"
        id={name}
        name={name}
        {...register(name, validation)}
      />
      <Listbox
        value={selectedValue}
        onChange={handleChange}
        disabled={props.isDisabled}
      >
        <Listbox.Button
          className={clsx(
            border &&
              'rounded border border-solid py-3 px-4 text-form h-[46px] flex items-center',
            border && props.isDisabled
              ? 'bg-gray-10 border-gray-200 text-gray-500 cursor-not-allowed'
              : 'border-gray-500',
            isInvalid && 'border-red-600 bg-red-0'
          )}
          style={{
            width: props.width > 0 ? `${props.width}px` : '100%',
          }}
        >
          <span className="w-full flex justify-between items-center">
            {getOptions(false, selectedValue)}
            {!props.isDisabled && (
              <Icon as="i" color="default" fontSize="default">
                arrow_drop_down
              </Icon>
            )}
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            'absolute bg-white z-10',
            'rounded border-gray-500 border-solid',
            'py-1 mt-2',
            'text-base text-gray-900',
            'overflow-y-scroll max-h-[194px]'
          )}
          style={{
            width: `${ref.current?.clientWidth}px`,
            boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)',
          }}
        >
          {props.options.map((option: any, index: number) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ selected }) =>
                clsx(
                  'px-3 py-3 hover:bg-gray-5 cursor-pointer',
                  selected && 'bg-gray-5'
                )
              }
            >
              {getOptions(true, option)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <span
        className={clsx(!isInvalid && 'hidden', 'text-tiny text-red-600 pt-1')}
      >
        {errors[name]?.message}
      </span>
    </div>
  )
}

export default SelectComponent
