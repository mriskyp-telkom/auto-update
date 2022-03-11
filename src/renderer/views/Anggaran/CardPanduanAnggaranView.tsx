import React, { FC } from 'react'

import styles from './anggaran.module.css'

import { AlertType } from 'renderer/types/ComponentType'

import clsx from 'clsx'

interface CardPanduanAnggaranProps {
  type: AlertType
  children: React.ReactNode
}

const CardPanduanAnggaranView: FC<CardPanduanAnggaranProps> = (
  props: CardPanduanAnggaranProps
) => {
  const cardColor = () => {
    if (props.type === 'info') {
      return 'bg-gray-5 border-gray-300'
    }
    if (props.type === 'warning') {
      return 'bg-orange-10 border-[#ffc453]'
    }
    if (props.type === 'failed') {
      return 'bg-pink-0 border-red-600'
    }
    if (props.type === 'success') {
      return 'bg-[#ecfef2] border-[#9AE5B9]'
    }
  }

  return (
    <div
      className={clsx(
        styles.pointKertasKerja,
        cardColor(),
        'border rounded p-6 w-[860px]'
      )}
    >
      {props.children}
    </div>
  )
}

export default CardPanduanAnggaranView
