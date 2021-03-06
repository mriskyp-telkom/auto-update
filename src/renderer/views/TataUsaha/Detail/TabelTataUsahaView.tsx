import React, { useEffect, useState } from 'react'

import { Icon } from '@wartek-id/icon'

import { numberUtils } from '@wartek-id/fe-toolbox'

import { GetListKasUmumRequest, TarikTunaiData } from 'global/types/TataUsaha'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import { headerTataUsaha } from 'renderer/constants/table'
import { IPC_TATA_USAHA } from 'global/ipc'
import { KAS_UMUM_TYPE } from 'global/constants'

import { format } from 'global/format'

import { formatDateToString } from 'renderer/utils/date-formatting'

import syncToIpcMain from 'renderer/configs/ipc'

import styles from 'renderer/views/TataUsaha/tata-usaha.module.css'

import clsx from 'clsx'

interface TabelTataUsahaProps {
  idAnggaran: string
  idPeriode: number
}

interface KasUmumDataProps {
  data: TarikTunaiData
}

const LineType = (props: KasUmumDataProps) => {
  const message = format(
    props.data.messageTemplate,
    numberUtils.delimit(props.data.jumlah, '.'),
    formatDateToString(new Date(props.data.date))
  )

  return (
    <tr className={clsx(styles.blue, 'bg-blue-5 p-4')}>
      <td className="flex items-center float-root">
        <Icon as="i" color="default" fontSize="small" className="mr-3">
          subdirectory_arrow_right
        </Icon>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </td>
    </tr>
  )
}

const RowType = (props: any) => {
  return (
    <tr>
      {headerTataUsaha.map((col: any) => (
        <td key={col.key} style={{ width: col.width }}>
          {props.data[col.key]}
        </td>
      ))}
    </tr>
  )
}

const TabelTataUsahaView = (props: TabelTataUsahaProps) => {
  const [kasUmumList, setKasUmumList] = useState([])
  const isFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.isFocused
  )

  const setIsFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsFocused
  )

  const fetchData = () => {
    const getListKasUmumRequest: GetListKasUmumRequest = {
      idAnggaran: props.idAnggaran,
      idPeriode: props.idPeriode,
    }
    const res = syncToIpcMain(
      IPC_TATA_USAHA.getListKasUmum,
      getListKasUmumRequest
    )
    if (res.error) {
      //TODO display error fetch data
    } else {
      setKasUmumList(res.value)
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetchData()
      setIsFocused(false)
    }
  }, [isFocused])

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
        {kasUmumList.map((kasUmum: any, index: number) => {
          if (kasUmum.type === KAS_UMUM_TYPE.line) {
            return <LineType data={kasUmum.data} key={index} />
          } else if (kasUmum.type === KAS_UMUM_TYPE.row) {
            return <RowType data={kasUmum.data} key={index} />
          }
        })}
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelTataUsahaView
