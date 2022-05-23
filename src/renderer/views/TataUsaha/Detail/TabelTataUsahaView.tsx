import React from 'react'

import { headerTataUsaha } from 'renderer/constants/table'

import styles from 'renderer/views/TataUsaha/tata-usaha.module.css'

import clsx from 'clsx'

const TabelTataUsahaView = () => {
  return (
    <table className={clsx(styles.tableTataUsaha, 'w-full text-left')}>
      <thead>
        <tr className="text-base font-semibold text-gray-900">
          {headerTataUsaha.map((col) => (
            <th key={col.key} style={{ width: col.width }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="scrollBar overflow-y-scroll">
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelTataUsahaView
