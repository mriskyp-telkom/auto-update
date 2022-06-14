import { Icon } from '@wartek-id/icon'
import clsx from 'clsx'
import React, { FC, useState } from 'react'

interface NotificationProps {
  children: React.ReactNode
}

const NotificationComponent: FC = (props: NotificationProps) => {
  const [hide, setHide] = useState(false)
  return (
    <div
      className={clsx(
        hide
          ? 'hidden'
          : 'flex border border-gray-20 rounded-[10px] px-5 py-2 mb-5 bg-gray-5 items-center'
      )}
    >
      <div className="flex-grow">{props.children}</div>
      <div className="flex items-center">
        <Icon size={12} onClick={() => setHide(true)}>
          close
        </Icon>
      </div>
    </div>
  )
}

export default NotificationComponent
