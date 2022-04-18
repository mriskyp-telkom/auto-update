import React, { FC } from 'react'

import { Badge } from '@wartek-id/badge'

import clsx from 'clsx'

import includes from 'lodash/includes'

type BadgeMainType =
  | 'success'
  | 'warning'
  | 'critical'
  | 'informational'
  | 'neutral'

export type BadgeType =
  | BadgeMainType
  | 'disabled'
  | 'disabled-with-border'
  | 'soft-blue-with-border'
  | 'soft-gray-with-border'
  | 'custom'

interface BadgeProps {
  type: BadgeType
  label: string
  class?: string
}

const includesNeutral = [
  'disabled',
  'disabled-with-border',
  'soft-blue-with-border',
  'soft-gray-with-border',
  'neutral-with-border',
  'custom',
]

const BadgeComponent: FC<BadgeProps> = (props: BadgeProps) => {
  const type = includes(includesNeutral, props.type) ? 'neutral' : props.type

  const classes = clsx(
    props.type === 'soft-blue-with-border' && 'bg-[#e7f6fe] border-blue-700',
    props.type === 'soft-gray-with-border' && 'bg-gray-10 border-gray-300',
    props.type === 'disabled-with-border' && 'bg-gray-200 border-gray-500',
    props.type === 'disabled' && 'bg-gray-200 border-none',
    props.type === 'neutral' && 'border-none',
    props.type === 'custom' && props.class,
    'text-[13px] py-1 px-3'
  )

  return (
    <Badge variant={type as BadgeMainType} className={classes}>
      {props.label}
    </Badge>
  )
}

export default BadgeComponent
