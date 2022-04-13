import React, { FC } from 'react'

import { Icon } from '@wartek-id/icon'

interface InformationCardProps {
  text: string
}

const InformationCardComponent: FC<InformationCardProps> = (
  props: InformationCardProps
) => {
  return (
    <div className="border border-gray-300 border-solid rounded p-5 flex items-center">
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
