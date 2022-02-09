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

interface FormDialogProps {
  title: string
  subtitle: string
  width: number
  isOpen: boolean
  content: React.ReactNode
  // btnCancelText?: string
  // btnActionText: string
  setIsOpen: (value: boolean) => void
  // onSubmit: () => void
}

const FormDialogComponent: FC<FormDialogProps> = (props: FormDialogProps) => {
  return (
    <Dialog onClose={() => props.setIsOpen(false)} isOpen={props.isOpen}>
      <DialogOverlay closeOnOverlayClick={false} />
      <DialogContent style={{ padding: 0, width: 960 }}>
        <DialogTitle
          as="div"
          className="bg-gray-0 rounded-t-lg px-9 py-5 text-gray-900"
          style={{ boxShadow: '0px 2px 2px rgba(37, 40, 43, 0.12)' }}
        >
          <div className="font-semibold text-xl pt-2">{props.title}</div>
          <div className="font-normal text-base pt-3">{props.subtitle}</div>
        </DialogTitle>
        <DialogDescription className="font-normal text-gray-900 py-7 px-9">
          {props.content}
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
            onClick={() => props.setIsOpen(false)}
          >
            Batal
          </DialogCancel>
          <DialogAction
            as={Button}
            color="black"
            size="sm"
            variant="solid"
            className="px-4 py-2"
            onClick={() => props.setIsOpen(false)}
          >
            Lanjutkan
          </DialogAction>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialogComponent