import React, { FC, useState, forwardRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import id from 'date-fns/locale/id'

registerLocale('id', id)

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

const DatePickerComponent: FC = () => {
  const [startDate, setStartDate] = useState(new Date())

  const handleChange = (date: Date) => {
    setStartDate(date)
  }

  return (
    <DatePicker
      dateFormat="d MMM yyyy"
      locale="id"
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput />}
    />
  )
}

export default DatePickerComponent
