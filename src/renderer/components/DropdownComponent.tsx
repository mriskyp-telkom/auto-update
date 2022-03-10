import React, { FC, useState } from 'react'
import { Listbox } from '@headlessui/react'

import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

const listAll = [
  { id: 1, key: 'tahap', label: 'Lihat per tahapan' },
  { id: 2, key: 'tahun', label: 'Lihat per tahun' },
]

const DropdownComponent: FC = () => {
  const [selectedValue, setSelectedValue] = useState(listAll[0])

  return (
    <Listbox value={selectedValue} onChange={setSelectedValue}>
      <Listbox.Button
        className={clsx(
          'w-[224px]',
          'border rounded border-gray-500 border-solid',
          'px-4 py-3',
          'text-large text-gray-900'
        )}
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
          'w-[224px] absolute bg-white z-10',
          'rounded border-gray-500 border-solid',
          'py-1 mt-2',
          'text-large text-gray-900'
        )}
        style={{ boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)' }}
      >
        {listAll.map((list) => (
          <Listbox.Option
            key={list.id}
            value={list}
            className={({ selected }) =>
              clsx(
                'px-3 py-3 hover:bg-gray-5 cursor-pointer',
                selected && 'bg-gray-5'
              )
            }
          >
            {list.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default DropdownComponent
