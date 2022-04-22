import React, { FC } from 'react'

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCancel,
} from '@wartek-id/dialog'
import { Button } from '@wartek-id/button'

interface InfoDialogProps {
  title: string
  width: number
  text: string
  isOpen: boolean
  onCancel: () => void
}

const InfoDialogComponent: FC<InfoDialogProps> = (props: InfoDialogProps) => {
  return (
    <Dialog onClose={props.onCancel} isOpen={props.isOpen}>
      <DialogOverlay closeOnOverlayClick={false} />
      <DialogContent style={{ padding: 0, width: props.width }}>
        <DialogTitle
          as="div"
          className="flex justify-between items-center bg-gray-0 rounded-t-lg px-9 pt-7 pb-5 text-gray-900"
          style={{ boxShadow: '0px 2px 2px rgba(37, 40, 43, 0.12)' }}
        >
          <span>
            <div className="font-semibold text-xl">{props.title}</div>
          </span>
        </DialogTitle>
        <DialogDescription as="div" className="p-7">
          <div className="rounded border border-solid border-gray-200 bg-gray-10 py-3 px-4 text-gray-500">
            {props.text}
          </div>
        </DialogDescription>
        <div
          className="flex justify-end pt-9 pb-7 px-9"
          style={{ boxShadow: '0px -2px 2px rgba(37, 40, 43, 0.12)' }}
        >
          <DialogCancel
            as={Button}
            color="black"
            size="sm"
            variant="solid"
            className="px-4 py-2"
            onClick={props.onCancel}
          >
            Tutup
          </DialogCancel>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InfoDialogComponent
