import React, { FC } from 'react'

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCancel,
  DialogAction,
} from '@wartek-id/dialog'
import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

interface AlertDialogProps {
  type: 'success' | 'warning' | 'failed'
  icon: string
  title: string
  desc: string
  isOpen: boolean
  hideBtnCancel?: boolean
  btnCancelText?: string
  btnActionText: string
  setIsOpen: (value: boolean) => void
  onSubmit: () => void
}

const AlertDialogComponent: FC<AlertDialogProps> = (
  props: AlertDialogProps
) => {
  const iconColor = () => {
    if (props.type === 'success') {
      return 'bg-green-500'
    }
    if (props.type === 'warning') {
      return 'bg-warning'
    }
    if (props.type === 'failed') {
      return 'bg-red-600'
    }
  }

  return (
    <Dialog
      customSize={560}
      onClose={() => props.setIsOpen(false)}
      isOpen={props.isOpen}
    >
      <DialogOverlay closeOnOverlayClick={false} />
      <DialogContent>
        <div className="p-3">
          <div
            className={clsx(
              iconColor(),
              'rounded-full h-[60px] w-[60px] flex items-center justify-center mb-[20px]'
            )}
          >
            <Icon
              as="i"
              color="default"
              fontSize="default"
              style={{ color: '#ffffff' }}
            >
              {props.icon}
            </Icon>
          </div>
          <DialogTitle className="font-semibold text-[22px] text-gray-900 pb-[12px]">
            {props.title}
          </DialogTitle>
          <DialogDescription className="font-normal text-[16px] text-gray-900 pb-[40px]">
            {props.desc}
          </DialogDescription>
          <div className="flex justify-end">
            {!props.hideBtnCancel && (
              <DialogCancel
                as={Button}
                color="white"
                size="sm"
                variant="solid"
                className="px-4 py-2 mr-4"
                onClick={() => props.setIsOpen(false)}
              >
                {props.btnCancelText}
              </DialogCancel>
            )}
            <DialogAction
              as={Button}
              color="black"
              size="sm"
              variant="solid"
              className="px-4 py-2"
              onClick={() => props.onSubmit()}
            >
              {props.btnActionText}
            </DialogAction>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialogComponent
