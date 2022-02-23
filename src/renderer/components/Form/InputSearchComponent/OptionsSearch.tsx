import React, { FC, useEffect, useRef } from 'react'

import styles from './index.module.css'

import clsx from 'clsx'

interface OptionsSearchProps {
  children: React.ReactNode
  open: boolean
  filter: string
  setOpen: (open: boolean) => void
  dataOptions: Array<any>
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
          <th colSpan={3}>{props.children}</th>
        </tr>
        <tr>
          <th>Kode</th>
          <th>Program</th>
          <th>Kegiatan</th>
        </tr>
      </thead>
      <tbody className="text-[14px] font-normal truncate">
        {props.dataOptions.map((data: any) => (
          <tr key={data.id} className="hover:bg-gray-5 cursor-pointer">
            <td
              dangerouslySetInnerHTML={{
                __html: makeBold(data.kode),
              }}
              width="20%"
            ></td>
            <td
              dangerouslySetInnerHTML={{
                __html: makeBold(data.program),
              }}
            ></td>
            <td
              dangerouslySetInnerHTML={{
                __html: makeBold(data.kegiatan),
              }}
            ></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OptionsSearch
