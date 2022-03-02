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
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import clsx from 'clsx'

interface FormDialogProps {
  title: string
  subtitle?: string
  width: number
  maxHeight?: number
  isOpen: boolean
  children: React.ReactNode
  className?: string
  btnSubmitText?: string
  icon?: string
  onCancel: () => void
  onSubmit: () => void
}

const FormDialogComponent: FC<FormDialogProps> = (props: FormDialogProps) => {
  return (
    <Dialog onClose={props.onCancel} isOpen={props.isOpen}>
      <DialogOverlay closeOnOverlayClick={false} />
      <DialogContent style={{ padding: 0, width: props.width }}>
        <form onSubmit={props.onSubmit}>
          <DialogTitle
            as="div"
            className="bg-gray-0 rounded-t-lg px-9 py-5 text-gray-900"
            style={{ boxShadow: '0px 2px 2px rgba(37, 40, 43, 0.12)' }}
          >
            <div className="font-semibold text-xl pt-2">{props.title}</div>
            <div className="font-normal text-base pt-3">{props.subtitle}</div>
          </DialogTitle>
          <DialogDescription
            as="div"
            className={clsx(
              props.className,
              props.maxHeight > 0 && 'scrollBar overflow-y-scroll',
              props.maxHeight > 0 ? 'm-3 py-4 px-6' : 'py-7 px-9',
              'font-normal text-gray-900'
            )}
            style={
              props.maxHeight > 0 ? { maxHeight: `${props.maxHeight}px` } : {}
            }
          >
            {props.children}
          </DialogDescription>
          <div
            className="flex justify-end pt-9 pb-7 px-9"
            style={{ boxShadow: '0px -2px 2px rgba(37, 40, 43, 0.12)' }}
          >
            <DialogCancel
              as={Button}
              color="white"
              size="sm"
              variant="solid"
              className="px-4 py-2 mr-4"
              onClick={props.onCancel}
            >
              Batal
            </DialogCancel>
            <DialogAction
              as={Button}
              color="black"
              size="sm"
              variant="solid"
              className="px-4 py-2"
              type="submit"
            >
              {props.icon && (
                <Icon
                  as="i"
                  color="default"
                  fontSize="default"
                  style={{ color: '#ffffff', fontSize: '22px' }}
                  className="mr-2"
                >
                  {props.icon}
                </Icon>
              )}
              {props.btnSubmitText ? props.btnSubmitText : 'Lanjutkan'}
            </DialogAction>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialogComponent
