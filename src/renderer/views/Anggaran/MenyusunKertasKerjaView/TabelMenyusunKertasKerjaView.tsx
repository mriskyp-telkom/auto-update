import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import { numberUtils } from '@wartek-id/fe-toolbox'

import { FormTableKertasKerjaData } from 'renderer/types/forms/AnggaranType'

import { headerKertasKerja } from 'renderer/constants/table'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import styles from './index.module.css'

import clsx from 'clsx'
import { IPC_KK } from 'global/ipc'
interface Bulan {
  id: number
  name: string
}
interface TabelMenyusunKertasKerjaProps {
  bulan: Bulan
  idAnggaran: string
}

const ipcRenderer = window.require('electron').ipcRenderer

const TabelMenyusunKertasKerjaView: FC<TabelMenyusunKertasKerjaProps> = (
  props: TabelMenyusunKertasKerjaProps
) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState([])

  const setTempDetailKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setTempDetailKertasKerja
  )

  const isFocused = useAnggaranStore((state: AnggaranStates) => state.isFocused)
  const setIsFocused = useAnggaranStore(
    (state: AnggaranStates) => state.setIsFocused
  )

  const handleClickRow = (event: any, row: FormTableKertasKerjaData) => {
    if (!event.target.id.includes('headlessui-popover-button')) {
      setTempDetailKertasKerja(row)
      const link = `/form/kertas-kerja/update/${encodeURIComponent(
        props.idAnggaran
      )}/${encodeURIComponent(row.idRapbs)}`
      navigate(link, {
        state: { backgroundLocation: location },
      })
    }
  }

  const fetchData = () => {
    const data = {
      idAnggaran: props.idAnggaran,
      idPeriode: props.bulan.id,
    }
    const dataRapbs = ipcRenderer.sendSync(IPC_KK.getRapbsBulan, data)
    setData(dataRapbs)
  }

  useEffect(() => {
    if (isFocused) {
      fetchData()
      setIsFocused(false)
    }
  }, [isFocused])

  useEffect(() => {
    fetchData()
  }, [])

  const TDTable = (props: { text: string; width: string }) => {
    return (
      <td style={{ width: props.width }}>
        <Tooltip
          content={props.text}
          placement="top"
          strategy="fixed"
          trigger="hover"
        >
          <span className="cursor-pointer">{props.text}</span>
        </Tooltip>
      </td>
    )
  }

  return (
    <table
      key={props.bulan.id}
      className={clsx(styles.tableKertasKerja, 'w-full text-left')}
    >
      <thead>
        <tr className="text-base font-semibold text-gray-900">
          {headerKertasKerja.map((col) => (
            <th key={col.key} style={{ width: col.width }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, indexRow) => {
          return (
            <tr
              key={indexRow}
              onClick={(e) => handleClickRow(e, row)}
              className={
                // flag error per row
                row.errorReferensi ? 'text-red-600' : ''
              }
            >
              {headerKertasKerja.map((col) => {
                if (col.key === 'no') {
                  return (
                    <TDTable
                      key={col.key}
                      text={(indexRow + 1).toString()}
                      width={col.width}
                    />
                  )
                } else if (col.key === 'total' || col.key === 'hargaSatuan') {
                  return (
                    <TDTable
                      key={col.key}
                      text={`Rp ${numberUtils.delimit(row[col.key], '.')}`}
                      width={col.width}
                    />
                  )
                } else if (col.key === 'jumlah') {
                  return (
                    <TDTable
                      key={col.key}
                      text={numberUtils.delimit(row.jumlah, '.')}
                      width={col.width}
                    />
                  )
                } else {
                  return (
                    <TDTable
                      key={col.key}
                      text={
                        row[col.key as keyof FormTableKertasKerjaData] as string
                      }
                      width={col.width}
                    />
                  )
                }
              })}
            </tr>
          )
        })}
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  )
}

export default TabelMenyusunKertasKerjaView
