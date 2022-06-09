import React, { FC, useState, useRef } from 'react'
import { Listbox } from '@headlessui/react'

import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

interface DropdownOptions {
  id: number
  key: string
  label: string
}

interface DropdownProps {
  width?: number
  options: Array<DropdownOptions>
  handleChange: (value: string) => void
}

const DropdownComponent: FC<DropdownProps> = (props: DropdownProps) => {
  const ref = useRef(null)

  const [selectedValue, setSelectedValue] = useState(props.options[0])

  const handleChange = (value: DropdownOptions) => {
    props.handleChange(value.key)
    setSelectedValue(value)
  }

  return (
    <div ref={ref}>
      <Listbox value={selectedValue} onChange={handleChange}>
        <Listbox.Button
          className={clsx(
            'border rounded border-gray-500 border-solid',
            'px-4 py-3',
            'text-large text-gray-900'
          )}
          style={{
            width: `${props.width}px`,
          }}
        >
          <span className="w-full flex justify-between items-center">
            {selectedValue.label}
            <Icon as="i" color="default" fontSize="default">
              arrow_drop_down
            </Icon>
          </span>
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            `w-[${props.width}px]`,
            'absolute bg-white z-10',
            'rounded border-gray-500 border-solid',
            'py-1 mt-2',
            'text-large text-gray-900'
          )}
          style={{
            width: `${ref.current?.clientWidth}px`,
            boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)',
          }}
        >
          {props.options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ selected }) =>
                clsx(
                  'px-3 py-3 hover:bg-gray-5 cursor-pointer',
                  selected && 'bg-gray-5'
                )
              }
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

DropdownComponent.defaultProps = {
  width: 224,
}

export default DropdownComponent
