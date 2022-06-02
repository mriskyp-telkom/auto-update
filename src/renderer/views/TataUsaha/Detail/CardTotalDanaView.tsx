import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'

import { FORM_PENARIKAN_TUNAI_PAGE_URL } from 'renderer/constants/routes'

import clsx from 'clsx'

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

  const handleClickTarikTunai = () => {
    const url = FORM_PENARIKAN_TUNAI_PAGE_URL(
      encodeURIComponent(data.idAnggaran),
      data.idPeriode
    )
    navigate(url, {
      state: { backgroundLocation: location },
    })
  }

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
        Rp 100.000.000
      </div>
      <div className="flex">
        <AmountCardComponent
          type="default"
          width={284}
          label="Non Tunai"
          amount={100000000}
          class="mr-6 bg-white"
        />
        <AmountCardComponent
          type="default"
          width={284}
          label="Tunai"
          amount={0}
          class="bg-white"
        />
      </div>
    </div>
  )
}

export default CardTotalDanaView
