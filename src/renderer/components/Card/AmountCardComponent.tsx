import React, { FC } from 'react'

import { numberUtils } from '@wartek-id/fe-toolbox'
import clsx from 'clsx'

interface AmountCardProps {
  type: 'default' | 'disabled' | 'warning'
  label?: string
  amount: number
  width?: number
  class?: string
}

const AmountCardComponent: FC<AmountCardProps> = (props: AmountCardProps) => {
  let borderColor = 'border-blue-700'
  let amountColor = 'text-blueCustom'
  if (props.type === 'disabled') {
    borderColor = 'border-gray-500'
    amountColor = 'text-gray-600'
  }
  if (props.type === 'warning') {
    borderColor = 'border-[#d93640]'
    amountColor = 'text-red-600'
  }

  return (
    <div
      className={clsx(
        props.class,
        borderColor,
        'flex justify-between items-center',
        'rounded border',
        'px-[14px] py-1'
      )}
      style={{ width: props.width }}
    >
      <span className="font-normal text-[12px] text-gray-900">
        {props.label}
      </span>
      <span className={clsx(amountColor, 'font-semibold text-[19px]')}>
        Rp {numberUtils.delimit(props.amount, '.')}
      </span>
    </div>
  )
}

export default AmountCardComponent
