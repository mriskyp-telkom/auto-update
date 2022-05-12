import React, { FC, useState, forwardRef, useEffect } from 'react'
import { RegisterOptions } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import id from 'date-fns/locale/id'

registerLocale('id', id)

interface DatePickerProps {
  name: string
  defaultValue: Date
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
  const { name, register } = props

  const [startDate, setStartDate] = useState(null)

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
      id={name}
      name={name}
      dateFormat="d MMM yyyy"
      locale="id"
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput register={register(name, {})} />}
    />
  )
}

export default DatePickerComponent
