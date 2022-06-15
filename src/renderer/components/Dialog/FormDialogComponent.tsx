import React, { FC, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import StepperComponent from 'renderer/components/StepperComponent/index'

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

import isEmpty from 'lodash/isEmpty'

import clsx from 'clsx'

interface FormDialogProps {
  title: string
  width: number
  maxHeight?: number
  isOpen: boolean
  children: React.ReactNode
  className?: string
  btnAlertSubmitText?: string
  btnSubmitText?: string
  btnCancelText?: string
  isSubmitDisabled?: boolean
  icon?: string
  isDelete?: boolean
  steps?: Array<string>
  subtitle?: string
  onDelete?: () => void
  onCancel: () => void
  onSubmit: () => void
}

const FormDialogComponent: FC<FormDialogProps> = (props: FormDialogProps) => {
  const [openModalConfirmCancel, setOpenModalConfirmCancel] = useState(false)
  const [activeStep, setActiveStep] = useState(1)

  const isSteps = props.steps.length > 0
  const btnCancelText =
    isSteps && activeStep !== 1 ? 'Kembali' : props.btnCancelText
  const btnSubmitText =
    isSteps && activeStep !== props.steps.length
      ? 'Lanjut'
      : props.btnSubmitText

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext()

  const handleCloseForm = () => {
    if (isSteps && activeStep !== 1) {
      setActiveStep(activeStep - 1)
      return
    }
    if (isDirty) {
      setOpenModalConfirmCancel(true)
    } else {
      props.onCancel()
    }
  }

  const handleSubmitForm = () => {
    if (isSteps && activeStep !== props.steps.length) {
      setActiveStep(activeStep + 1)
      return
    }
    props.onSubmit()
  }

  const btnFormDisabled = () => {
    if (!isEmpty(errors)) {
      return true
    }
    return false
  }

  return (
    <>
      <Dialog onClose={props.onCancel} isOpen={props.isOpen}>
        <DialogOverlay closeOnOverlayClick={false} />
        <DialogContent style={{ padding: 0, width: props.width }}>
          <form>
            <DialogTitle
              as="div"
              style={{ boxShadow: '0px 2px 2px rgba(37, 40, 43, 0.12)' }}
            >
              <div className="flex justify-between items-center bg-gray-0 rounded-t-lg px-9 pt-7 pb-5 text-gray-900">
                <span>
                  <div className="font-semibold text-xl">{props.title}</div>
                  {props.subtitle !== '' && (
                    <div className="font-normal text-base pt-3">
                      {props.subtitle}
                    </div>
                  )}
                </span>
                {props.isDelete && (
                  <span className="flex items-center text-blue-700">
                    <Icon
                      color="default"
                      fontSize="default"
                      className="mr-2"
                      style={{ color: '#0b5fef' }}
                      onClick={props.onDelete}
                    >
                      delete
                    </Icon>
                    <span
                      className="cursor-pointer font-semibold text-large"
                      onClick={props.onDelete}
                    >
                      Hapus Semua
                    </span>
                  </span>
                )}
              </div>
              {isSteps && (
                <div className="bg-gray-5 py-4 px-9">
                  <StepperComponent
                    activeStep={activeStep}
                    label={props.steps}
                  />
                </div>
              )}
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
              {!isSteps && props.children}
              {isSteps &&
                React.Children.map(
                  props.children,
                  (child: any, index: number) => {
                    return React.cloneElement(child, {
                      className: clsx(
                        props.className,
                        activeStep !== index + 1 && 'hidden'
                      ),
                    })
                  }
                )}
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
                onClick={handleCloseForm}
              >
                {btnCancelText}
              </DialogCancel>
              <DialogAction
                as={Button}
                color="black"
                size="sm"
                variant="solid"
                className="px-4 py-2"
                disabled={props.isSubmitDisabled || btnFormDisabled()}
                onClick={handleSubmit(handleSubmitForm)}
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
                {btnSubmitText}
              </DialogAction>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialogComponent
        type="failed"
        icon="exit_to_app"
        title="Keluar dari halaman ini?"
        desc="Jika Anda keluar, data yang baru saja Anda isi akan hilang."
        isOpen={openModalConfirmCancel}
        btnCancelText="Keluar"
        btnActionText={props.btnAlertSubmitText}
        onCancel={props.onCancel}
        onSubmit={() => setOpenModalConfirmCancel(false)}
        layer={2}
      />
    </>
  )
}

FormDialogComponent.defaultProps = {
  subtitle: '',
  isDelete: false,
  btnCancelText: 'Batal',
  btnSubmitText: 'Lanjutkan',
  btnAlertSubmitText: 'Kembali Isi Data',
  steps: [],
}

export default FormDialogComponent
