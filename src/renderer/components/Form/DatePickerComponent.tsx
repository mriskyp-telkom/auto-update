import React, { FC, useState, useEffect, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'

import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { DATA_BULAN } from 'renderer/constants/general'
import { ERROR_REQUIRED } from 'renderer/constants/errorForm'

import { formatDateToString } from 'renderer/utils/date-formatting'

import id from 'date-fns/locale/id'

import clsx from 'clsx'

registerLocale('id', id)

interface DatePickerProps {
  name: string
  placeholder: string
  required?: boolean
  defaultValue: Date
  isDisabled: boolean
}

const months = DATA_BULAN.map((b: any) => b.name)

const CustomInput = forwardRef((props: any, ref) => {
  return (
    <InputGroup>
      <Input {...props} type="text" ref={ref} />
      <InputRightAddon>
        <Icon as="i" color="default" fontSize="default">
          date_range
        </Icon>
      </InputRightAddon>
    </InputGroup>
  )
})

const CustomHeader = (props: any) => {
  const { date, changeMonth, decreaseMonth, increaseMonth } = props

  const getMonth = () => {
    return formatDateToString(date, 'MMMM')
  }

  const getYear = () => {
    return formatDateToString(date, 'Y')
  }

  return (
    <div className="flex justify-between items-center mx-[0.4rem]">
      <span>
        <select
          className="capitalize-first"
          value={getMonth().toLowerCase()}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
          style={{
            background: '#f0f0f0',
          }}
        >
          {months.map((option) => (
            <option className="capitalize-first" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="ml-4">{getYear()}</span>
      </span>
      <span>
        <button type="button" className="mr-4" onClick={decreaseMonth}>
          <Icon as="i" color="default" fontSize="small">
            chevron_left
          </Icon>
        </button>
        <button type="button" onClick={increaseMonth}>
          <Icon as="i" color="default" fontSize="small">
            chevron_right
          </Icon>
        </button>
      </span>
    </div>
  )
}

const DatePickerComponent: FC<DatePickerProps> = (props: DatePickerProps) => {
  const [startDate, setStartDate] = useState(null)

  const { name, required } = props

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  let validation = {}
  if (required) {
    validation = {
      ...validation,
      required: ERROR_REQUIRED,
    }
  }

  const handleChange = (date: Date) => {
    setStartDate(date)
    setValue(name, date)

    if (required && date !== null && errors[name]?.message === ERROR_REQUIRED) {
      clearErrors(name)
      return
    }
  }

  useEffect(() => {
    setStartDate(props.defaultValue)
    setValue(name, props.defaultValue)
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
      renderCustomHeader={({
        date,
        changeMonth,
        decreaseMonth,
        increaseMonth,
      }) => (
        <CustomHeader
          date={date}
          changeMonth={changeMonth}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
    />
  )
}

DatePickerComponent.defaultProps = {
  required: false,
}

export default DatePickerComponent
