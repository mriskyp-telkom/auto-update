import React, { FC } from 'react'

import { Badge } from '@wartek-id/badge'

import clsx from 'clsx'

export type BadgeType =
  | 'success'
  | 'warning'
  | 'critical'
  | 'informational'
  | 'neutral'
  | 'disabled'

interface BadgeProps {
  type: BadgeType
  label: string
}

const BadgeComponent: FC<BadgeProps> = (props: BadgeProps) => {
  const type = props.type === 'disabled' ? 'neutral' : props.type

  const classes = clsx(
    props.type === 'disabled' && 'bg-gray-200',
    'border-none text-[13px] py-1 px-3'
  )

  return (
    <Badge variant={type} className={classes}>
      {props.label}
    </Badge>
  )
}

export default BadgeComponent
