import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'

import { FORM_PENARIKAN_TUNAI_PAGE_URL } from 'renderer/constants/routes'

import clsx from 'clsx'
import { GetTotalSaldoByPeriodeRequest, Saldo } from 'global/types/TataUsaha'
import syncToIpcMain from 'renderer/configs/ipc'
import { IPC_TATA_USAHA } from 'global/ipc'
import { numberUtils } from '@wartek-id/fe-toolbox'
import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

interface CardTotalDanaDataProps {
  idAnggaran: string
  idPeriode: number
}
interface CardTotalDanaProps {
  class: string
  data: CardTotalDanaDataProps
}

const CardTotalDanaView: FC<CardTotalDanaProps> = (
  props: CardTotalDanaProps
) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { data } = props
  const [saldo, setSaldo] = useState(null as Saldo)
  const isFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.isFocused
  )

  const handleClickTarikTunai = () => {
    const url = FORM_PENARIKAN_TUNAI_PAGE_URL(
      encodeURIComponent(data.idAnggaran),
      data.idPeriode
    )
    navigate(url, {
      state: { backgroundLocation: location },
    })
  }

  const fetchData = () => {
    const payload: GetTotalSaldoByPeriodeRequest = {
      idAnggaran: data.idAnggaran,
      idPeriode: data.idPeriode,
    }
    const res = syncToIpcMain(IPC_TATA_USAHA.getTotalSaldoByPeriod, payload)
    if (res?.value) {
      setSaldo(res.value)
    }
  }
  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused])

  return (
    <div
      className={clsx(props.class, 'bg-blue-5 w-min px-6 pb-6 pt-5 rounded')}
    >
      <div className="flex justify-end text-large text-blue-700 font-semibold">
        <span className="mr-11 cursor-pointer" onClick={handleClickTarikTunai}>
          Tarik Tunai
        </span>
        <span className="cursor-pointer">Setor Tunai</span>
      </div>
      <div className="font-semibold text-base text-gray-600">
        TOTAL DANA TERSEDIA
      </div>
      <div className="font-semibold text-[28px] text-blue-800 pb-[18px]">
        Rp{' '}
        {saldo
          ? numberUtils.delimit(saldo?.sisaBank + saldo?.sisaTunai, '.')
          : 0}
      </div>
      <div className="flex">
        <AmountCardComponent
          type="default"
          width={284}
          label="Non Tunai"
          amount={saldo ? saldo?.sisaBank : 0}
          class="mr-6 bg-white"
        />
        <AmountCardComponent
          type="default"
          width={284}
          label="Tunai"
          amount={saldo ? saldo?.sisaTunai : 0}
          class="bg-white"
        />
      </div>
    </div>
  )
}

export default CardTotalDanaView
