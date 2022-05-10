import React, { FC, useState, useRef } from 'react'
import { RegisterOptions } from 'react-hook-form'

import { Listbox } from '@headlessui/react'

import { Input } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

interface SelectProps {
  name: string
  width?: number
  selected?: string
  border?: boolean
  options: any
  register: (arg0: string, arg1: RegisterOptions) => void
  handleSelect: (value: string) => void
  disabled?: boolean
}

const SelectComponent: FC<SelectProps> = (props: SelectProps) => {
  const ref = useRef(null)

  const [selectedValue, setSelectedValue] = useState(props.selected)

  const { name, register } = props

  const width = props.width ? `w-[${props.width}px]` : 'w-full'

  const handleChange = (value: string) => {
    setSelectedValue(value)
    props.handleSelect(value)
  }

  return (
    <div ref={ref}>
      <Input
        type="text"
        className="hidden"
        id={name}
        name={name}
        {...register(name, {})}
      />
      <Listbox
        value={selectedValue}
        onChange={handleChange}
        disabled={props.disabled}
      >
        <Listbox.Button
          className={clsx(
            props.disabled && 'cursor-not-allowed',
            width,
            props.border &&
              'rounded border border-solid border-gray-500 py-3 px-4 text-form'
          )}
        >
          <span className="w-full flex justify-between items-center">
            <span className="capitalize-first">{selectedValue}</span>
            {!props.disabled && (
              <Icon as="i" color="default" fontSize="default">
                arrow_drop_down
              </Icon>
            )}
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            width,
            'absolute bg-white z-10',
            'rounded border-gray-500 border-solid',
            'py-1 mt-2',
            'text-base text-gray-900',
            'overflow-y-scroll max-h-[194px]'
          )}
          style={{ boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)' }}
        >
          {props.options.map((option: any, index: number) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ selected }) =>
                clsx(
                  'px-3 py-3 hover:bg-gray-5 cursor-pointer capitalize-first',
                  selected && 'bg-gray-5'
                )
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

SelectComponent.defaultProps = {
  border: true,
}

export default SelectComponent
