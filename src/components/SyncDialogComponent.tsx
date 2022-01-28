import React, { FC } from 'react'

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@wartek-id/dialog'

interface SyncDialogProps {
  title: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const SyncDialogComponent: FC<SyncDialogProps> = (props: SyncDialogProps) => {
  return (
    <Dialog
      customSize={560}
      onClose={() => props.setIsOpen(false)}
      isOpen={props.isOpen}
    >
      <DialogOverlay closeOnOverlayClick={false} />
      <DialogContent>
        <div className="p-3">
          <DialogTitle className="font-semibold text-[22px] text-gray-900 pb-[12px]">
            {props.title}
          </DialogTitle>
          <DialogDescription className="font-normal text-[16px] text-gray-900">
            Pastikan Anda terkoneksi ke internet yang lancar.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SyncDialogComponent
