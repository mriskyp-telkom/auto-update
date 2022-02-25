import React, { FC, useEffect, useRef } from 'react'

import styles from './index.module.css'

import clsx from 'clsx'

interface OptionsSearchProps {
  width: number
  headers: Array<any>
  dataOptions: Array<any>
  children: React.ReactNode
  open: boolean
  filter: string
  setOpen: (open: boolean) => void
  onClick: (e: any) => void
}

const OptionsSearch: FC<OptionsSearchProps> = (props: OptionsSearchProps) => {
  const ref = useRef(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (props.open && ref.current && !ref.current.contains(event.target)) {
      props.setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const handleClick = (e: any) => {
    console.log('hi', e)
  }

  const makeBold = (item: string) => {
    const { filter } = props
    const begin = item.toLowerCase().indexOf(filter.toLowerCase())
    const end = filter.length
    const tempItem = item
    const textReplace = tempItem.substr(begin, end)
    if (begin > -1) {
      return item.replace(textReplace, '<b>' + textReplace + '</b>')
    }
    return item
  }

  return (
    <table className={clsx(styles.searchTable, 'w-full text-left')}>
      <thead ref={ref} className="text-[14px] font-semibold bg-gray-5">
        <tr>
          <th colSpan={props.headers?.length}>{props.children}</th>
        </tr>
        <tr>
          {props.headers?.map((header: any) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className={`text-[14px] font-normal truncate`}>
        {props.dataOptions?.map((data: any, indexData) => (
          <tr
            key={indexData}
            className="hover:bg-gray-5 cursor-pointer"
            onClick={handleClick}
          >
            {props.headers?.map((header: any) => (
              <td
                key={header.key}
                dangerouslySetInnerHTML={{
                  __html: makeBold(data[header.key]),
                }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OptionsSearch
