import React, { FC, useState, forwardRef, useEffect } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import id from 'date-fns/locale/id'
import clsx from 'clsx'

registerLocale('id', id)

interface DatePickerProps {
  name: string
  placeholder: string
  required?: boolean
  defaultValue: Date
  isDisabled: boolean
  errors: FieldErrors
  register: (arg0: string, arg1: RegisterOptions) => void
  handleSelect: (value: Date) => void
}

const CustomInput = forwardRef((props: any, ref) => {
  return (
    <InputGroup>
      <Input type="text" {...props} ref={ref} />
      <InputRightAddon>
        <Icon as="i" color="default" fontSize="default">
          date_range
        </Icon>
      </InputRightAddon>
    </InputGroup>
  )
})

const DatePickerComponent: FC<DatePickerProps> = (props: DatePickerProps) => {
  const { name, register, required, errors } = props

  const [startDate, setStartDate] = useState(null)

  let validation = {}
  if (required) {
    validation = {
      required: 'Wajib diisi',
    }
  }

  const handleChange = (date: Date) => {
    setStartDate(date)
    props.handleSelect(date)
  }

  useEffect(() => {
    setStartDate(props.defaultValue)
    props.handleSelect(props.defaultValue)
  }, [])

  return (
    <DatePicker
      className={clsx(props.isDisabled && 'cursor-not-allowed')}
      id={name}
      name={name}
      placeholderText={props.placeholder}
      dateFormat="d MMM yyyy"
      locale="id"
      selected={startDate}
      onChange={handleChange}
      disabled={props.isDisabled}
      customInput={
        <CustomInput
          required={props.required}
          register={register(name, validation)}
          isDisabled={props.isDisabled}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message}
        />
      }
    />
  )
}

DatePickerComponent.defaultProps = {
  required: false,
}

export default DatePickerComponent
