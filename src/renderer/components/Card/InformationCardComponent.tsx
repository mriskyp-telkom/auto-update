import React, { FC } from 'react'

import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

interface InformationCardProps {
  text: string
  class?: string
}

const InformationCardComponent: FC<InformationCardProps> = (
  props: InformationCardProps
) => {
  return (
    <div
      className={clsx(
        props.class,
        'flex items-center p-5',
        'border border-gray-300 border-solid rounded'
      )}
    >
      <Icon
        as="i"
        color="default"
        fontSize="small"
        style={{ fontSize: '20px' }}
        className="mr-[10px]"
      >
        info
      </Icon>
      <span>{props.text}</span>
    </div>
  )
}

export default InformationCardComponent
