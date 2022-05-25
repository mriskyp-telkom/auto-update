import React from 'react'

import { headerTataUsaha } from 'renderer/constants/table'

import { Icon } from '@wartek-id/icon'

import { numberUtils } from '@wartek-id/fe-toolbox'

import styles from 'renderer/views/TataUsaha/tata-usaha.module.css'

import { formatDateToString } from 'renderer/utils/date-formatting'

import clsx from 'clsx'

const RowInfo = () => {
  return (
    <tr className={clsx(styles.blue, 'bg-blue-5 p-4')}>
      <td className="flex items-center">
        <Icon as="i" color="default" fontSize="small" className="mr-3">
          subdirectory_arrow_right
        </Icon>
        Anda telah melakukan{' '}
        <b>tarik tunai Rp {numberUtils.delimit(100000, '.')}</b> pada{' '}
        {formatDateToString(new Date())}
      </td>
    </tr>
  )
}

const TabelTataUsahaView = () => {
  return (
    <table className={clsx(styles.tableTataUsaha, 'w-full text-left')}>
      <thead>
        <tr className="text-base font-semibold text-gray-900">
          {headerTataUsaha.map((col: any) => (
            <th key={col.key} style={{ width: col.width }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="scrollBar overflow-y-scroll">
        <RowInfo />
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelTataUsahaView
