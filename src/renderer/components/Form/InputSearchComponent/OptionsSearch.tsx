import React, { FC, useEffect, useRef } from 'react'

import filter from 'lodash/filter'

import styles from './index.module.css'

import clsx from 'clsx'

interface OptionsSearchProps {
  width: number
  name: string
  headerShow?: boolean
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

  const handleClick = (event: any) => {
    const id = event.target.dataset.id
    const name = event.target.dataset.name
    const fieldShow = filter(props.headers, ['show', true])[0].key
    const value = filter(props.dataOptions, ['id', parseInt(id)])[0][fieldShow]
    const sendData = {
      id: id,
      name: name,
      value: value,
    }
    props.setOpen(false)
    props.onClick(sendData)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

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
    <table
      ref={ref}
      className={clsx(styles.searchTable, 'text-left absolute z-10 bg-white')}
      style={{ width: `${props.width}px` }}
    >
      <thead className="text-[14px] font-semibold bg-gray-5">
        <tr>
          <th colSpan={props.headers?.length}>{props.children}</th>
        </tr>
        {props.headerShow && (
          <tr className={styles.headerTable} style={{ display: 'flex' }}>
            {props.headers?.map((header: any) => (
              <th key={header.key} style={{ width: header.width }}>
                {header.label}
              </th>
            ))}
          </tr>
        )}
      </thead>
      <tbody className={`text-[14px] font-normal`}>
        {props.dataOptions?.map((data: any, indexData) => (
          <tr
            key={indexData}
            className="hover:bg-gray-5 cursor-pointer"
            onClick={handleClick}
            style={{ display: 'flex' }}
          >
            {props.headers?.map((header: any) => (
              <td
                key={header.key}
                dangerouslySetInnerHTML={{
                  __html: makeBold(data[header.key]),
                }}
                data-name={props.name}
                data-id={data.id}
                style={{ width: header.width }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

OptionsSearch.defaultProps = {
  headerShow: true,
}

export default OptionsSearch
